import { Calendar, Briefcase, Plus } from 'lucide-react';

interface LeaveCardProps {
    type: string;
    balance: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}

function LeaveCard({ type, balance, icon: Icon, color, bgColor }: LeaveCardProps) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square transition-transform active:scale-95">
            <div className={`p-4 rounded-full ${bgColor} mb-3`}>
                <Icon size={28} className={color} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold text-gray-800">{balance}</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{type}</span>
        </div>
    );
}

export function Dashboard() {
    const leaves = [
        { type: 'Casual', balance: 8, icon: Calendar, color: 'text-blue-500', bgColor: 'bg-blue-50' },
        { type: 'Sick', balance: 12, icon: Plus, color: 'text-red-500', bgColor: 'bg-red-50' },
        { type: 'Earned', balance: 18, icon: Briefcase, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-gray-500">Manage your leaves efficiently</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {leaves.map((leave) => (
                    <LeaveCard key={leave.type} {...leave} />
                ))}
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg shadow-primary-200">
                <h3 className="tex-lg font-bold mb-1">Plan your holidays</h3>
                <p className="text-indigo-100 text-sm mb-4">You have 3 upcoming long weekends this month!</p>
                <button className="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors">
                    View Calendar
                </button>
            </div>
        </div>
    );
}
