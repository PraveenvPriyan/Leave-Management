import { useState } from 'react';
import { Calendar as CalendarIcon, Briefcase, Plus } from 'lucide-react';
import { Toast } from '../components/Toast';

export function ApplyLeave() {
    const [selectedType, setSelectedType] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const leaveTypes = [
        { id: 'casual', label: 'Casual', icon: CalendarIcon, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'sick', label: 'Sick', icon: Plus, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
        { id: 'earned', label: 'Earned', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowToast(true);
            // Reset form logic would go here
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Apply Leave</h2>
                <p className="text-gray-500">Fill in the details below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Leave Type</label>
                    <div className="grid grid-cols-3 gap-3">
                        {leaveTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = selectedType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setSelectedType(type.id)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${isSelected
                                            ? `${type.border} ${type.bg}`
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className={`mb-2 ${isSelected ? type.color : 'text-gray-400'}`} size={24} />
                                    <span className={`text-xs font-medium ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
                                        {type.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">From Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-500 transition-shadow outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">To Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-500 transition-shadow outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Reason (Optional)</label>
                    <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-500 transition-shadow outline-none text-sm resize-none"
                        placeholder="e.g. Doctor's appointment"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!selectedType || isSubmitting}
                    className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all active:scale-95 ${!selectedType || isSubmitting
                            ? 'bg-gray-300 cursor-not-allowed shadow-none'
                            : 'bg-primary-600 shadow-primary-200'
                        }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Apply Leave Request'}
                </button>
            </form>

            <Toast
                isVisible={showToast}
                message="Leave application submitted successfully!"
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
