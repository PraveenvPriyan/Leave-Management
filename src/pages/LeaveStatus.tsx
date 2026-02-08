import { Calendar, Briefcase, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

interface LeaveRequest {
    id: string;
    type: 'casual' | 'sick' | 'earned';
    startDate: string;
    endDate: string;
    status: 'pending' | 'approved' | 'rejected';
    reason: string;
}

export function LeaveStatus() {
    // Mock data
    const requests: LeaveRequest[] = [
        {
            id: '1',
            type: 'sick',
            startDate: '2024-03-10',
            endDate: '2024-03-12',
            status: 'pending',
            reason: 'Viral fever'
        },
        {
            id: '2',
            type: 'casual',
            startDate: '2024-02-25',
            endDate: '2024-02-26',
            status: 'approved',
            reason: 'Personal work'
        },
        {
            id: '3',
            type: 'earned',
            startDate: '2024-01-15',
            endDate: '2024-01-20',
            status: 'rejected',
            reason: 'Project deadline conflict'
        },
        {
            id: '4',
            type: 'casual',
            startDate: '2023-12-20',
            endDate: '2023-12-25',
            status: 'approved',
            reason: 'Family trip'
        }
    ];

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'approved': return { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle, label: 'Approved' };
            case 'rejected': return { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle, label: 'Rejected' };
            default: return { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock, label: 'Pending' };
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'sick': return Plus;
            case 'earned': return Briefcase;
            default: return Calendar;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Leave Status</h2>
                <p className="text-gray-500">Track your leave applications</p>
            </div>

            <div className="space-y-4">
                {requests.map((request) => {
                    const statusConfig = getStatusConfig(request.status);
                    const TypeIcon = getTypeIcon(request.type);
                    const StatusIcon = statusConfig.icon;

                    return (
                        <div key={request.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full bg-gray-50 text-gray-600`}>
                                    <TypeIcon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 capitalize">{request.type} Leave</h4>
                                    <p className="text-xs text-gray-500">
                                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                    </p>
                                </div>
                            </div>

                            <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.color}`}>
                                <StatusIcon size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wide">{statusConfig.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
