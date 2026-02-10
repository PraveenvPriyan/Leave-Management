import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeProps {
    onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null); // null: not checked yet/error, false: not registered, true: registered
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // Check if running in Telegram Web App
        // @ts-ignore
        if (window.Telegram && window.Telegram.WebApp) {
            // @ts-ignore
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user && user.first_name) {
                setUsername(user.first_name);
            }

            // Expand to full height
            // @ts-ignore
            window.Telegram.WebApp.expand();

            // Check Registration
            if (user && user.id) {
                checkRegistration(user.id);
            } else {

                checkRegistration(0);
                // Fallback for testing effectively or if no user. 
                // In production Telegram, user.id should be there.
                // For now, if no user, we might want to just show the button or block?
                // Let's assume consistent with current behavior (allow) if we can't check, 
                // OR strictly block. The requirement implies checking a specific ID.
                // "if employee not found then the id 0 ... if its 0 pls show the message"
                // If we can't get an ID, we probably can't check.
                // Let's rely on user.id. 
                // If testing without Telegram, this won't run.
            }
        }
    }, []);

    const checkRegistration = async (telegramId: number) => {
        setIsLoading(true);
        try {
            //const response = await fetch('https://express-folder-files-architecture-sample.onrender.com/api/telegram/checkRegistration', {

            const response = await fetch('http://localhost:3000/api/telegram/checkRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ telegram_id: telegramId.toString() }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Expected response:
            // {
            //     "status": "Success",
            //     "timestamp": "...",
            //     "result": {
            //         "id": 2, // or 0
            //         "message": "..."
            //     }
            // }

            if (data.result && data.result.id === 0) {
                setIsRegistered(false);
                setErrorMessage("Your registration process not completed then pls complete the process.");
            } else if (data.result && data.result.id !== 0) {
                setIsRegistered(true);
                // Can optionally use data.result.message if needed, but requirements say "show the dash board like button"
            } else {
                // Unexpected structure handling
                setIsRegistered(false);
                setErrorMessage("Unexpected response from server.");
            }

        } catch (error) {
            console.error("Error checking registration:", error);
            setIsRegistered(false);
            setErrorMessage("Failed to check registration status. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 to-indigo-600 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-300 opacity-10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 flex flex-col items-center text-center space-y-8"
            >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl border border-white/30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M2 12h20"></path>
                        <path d="M2 12l5 5"></path>
                        <path d="M2 12l5-5"></path>
                        <path d="M22 6L12 12l10 6V6z"></path>
                    </svg>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome{username ? `, ${username}!` : '!'}
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-xs mx-auto">
                        Your simple and efficient leave management companion.
                    </p>
                </div>

                {isLoading && (
                    <div className="flex items-center gap-2 text-white/80">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Checking registration...</span>
                    </div>
                )}

                {!isLoading && isRegistered === false && (
                    <div className="bg-red-500/20 border border-red-200/50 rounded-xl p-4 max-w-xs backdrop-blur-sm">
                        <p className="text-white font-medium">{errorMessage}</p>
                    </div>
                )}

                {!isLoading && isRegistered === true && (
                    <button
                        onClick={onStart}
                        className="group flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary-900/20 hover:bg-opacity-95 transition-all active:scale-95"
                    >
                        <span>Go to Dashboard</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )}

                {/* Fallback for development/browser testing if needed or if not in Telegram environment? 
                     Currently, if not in Telegram (window.Telegram.WebApp is undefined), 
                     isLoading is false, isRegistered is null. 
                     The original code showed the button by default.
                     Let's verify requirement behavior: "if not 0 then show the dash board lik button".
                     If we are NOT in Telegram, we can't check registration. 
                     Should we show the button?
                     Original code showed it. 
                     I'll add a condition for `isRegistered === null` to show button IF we want to allow access outside Telegram,
                     OR if we want strict checking.
                     Given "show telegram user name... i want checking", implying strict check.
                     However, for development in browser, we might want a bypass.
                     
                     Let's stick to the logic: 
                     - If `window.Telegram.WebApp` is missing, we interpret this as "Not in Telegram".
                     - If `isRegistered === null` AND not loading, it means check didn't run or failed?
                     
                     Actually, if `window.Telegram` is missing, `isRegistered` remains `null`.
                     The button won't show.
                     The user might get stuck.
                     
                     Let's add a "Dev Bypass" or just default to showing button if `!window.Telegram?.WebApp`?
                     Requirements didn't specify, but for safety in dev environment, I'll allow button if not checked (null).
                     Wait, if "employee not found" (explicitly checked and `id: 0`), then block.
                     So `isRegistered !== false` might be better condition for the button?
                     
                     "if employee not found then ... show message ... if not 0 then show button"
                     
                     Let's separate concerns:
                     1. Loading -> Show Spinner
                     2. Checked & Not Found -> Show Error
                     3. Checked & Found -> Show Button
                     4. Not Checked (e.g. not in Telegram WebApp) -> ?
                        - Originally it showed the button.
                        - I will restore the button if `isRegistered === null` (meaning check didn't happen, e.g. dev mode)
                        - BUT, I will add a small text saying "Debug: No Telegram User" if in dev? No, keep it clean.
                        - Just show button if `isRegistered !== false`.
                        
                     Wait, if `id === 0`, `isRegistered` becomes `false`.
                     If `id !== 0`, `isRegistered` becomes `true`.
                     
                     If `isRegistered === null` (initial state), we shouldn't show the button if we ARE waiting for a check.
                     But we only check if `window.Telegram.WebApp` exists.
                     So if it doesn't exist, we never check, `isRegistered` stays `null`.
                     
                     Modified logic:
                     Show button if `!isLoading && (isRegistered === true || isRegistered === null)`.
                     This keeps dev environment working (since Telegram object missing -> isRegistered null -> button shows).
                     And in Prod (Telegram):
                        - Check starts -> isLoading true -> button hidden.
                        - Check ends -> 
                            - Found -> isRegistered true -> button shows.
                            - Not Found -> isRegistered false -> button hidden, error shows.
                            
                     This seems correct and robust.
                  */}
                {/* {!isLoading && (isRegistered === true || isRegistered === null) && (
                    <button
                        onClick={onStart}
                        className="group flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary-900/20 hover:bg-opacity-95 transition-all active:scale-95"
                    >
                        <span>Go to Dashboard</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )} */}
            </motion.div>

            <div className="absolute bottom-8 text-xs text-indigo-200/60 font-medium">
                AdoraLeaves v1.0
            </div>
        </div>
    );
}
