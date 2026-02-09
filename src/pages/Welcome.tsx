import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeProps {
    onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
    const [username, setUsername] = useState<string>('');

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
        }
    }, []);

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

                <button
                    onClick={onStart}
                    className="group flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary-900/20 hover:bg-opacity-95 transition-all active:scale-95"
                >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>

            <div className="absolute bottom-8 text-xs text-indigo-200/60 font-medium">
                AdoraLeaves v1.0
            </div>
        </div>
    );
}
