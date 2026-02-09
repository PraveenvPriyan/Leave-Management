import { LayoutGrid, PlusCircle, Clock, BarChart3 } from 'lucide-react';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
    const navItems = [
        { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
        { id: 'apply', icon: PlusCircle, label: 'Apply' },
        { id: 'status', icon: Clock, label: 'Status' },
        { id: 'reports', icon: BarChart3, label: 'Reports' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <div className="max-w-md mx-auto h-screen flex flex-col bg-white shadow-xl overflow-hidden relative">
                <header className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                        AdoraLeaves
                    </h1>
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                        JD
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto pb-24 p-6 custom-scrollbar">
                    {children}
                </main>

                <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100">
                    <div className="flex justify-around items-center h-20 px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 ${isActive
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon
                                        size={24}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className={`transition-transform duration-300 ${isActive ? '-translate-y-0.5' : ''}`}
                                    />
                                    <span className={`text-[10px] font-medium mt-1 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </div>
    );
}
