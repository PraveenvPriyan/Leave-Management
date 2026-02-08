export function Reports() {
    const stats = [
        { label: 'Total Allowance', value: 24, color: 'bg-gray-200' },
        { label: 'Taken', value: 6, color: 'bg-primary-500' },
        { label: 'Remaining', value: 18, color: 'bg-green-500' },
    ];

    const monthlyData = [
        { month: 'Jan', taken: 2 },
        { month: 'Feb', taken: 1 },
        { month: 'Mar', taken: 3 },
        { month: 'Apr', taken: 0 },
        { month: 'May', taken: 0 },
        { month: 'Jun', taken: 0 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
                <p className="text-gray-500">Overview of your leave usage</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-semibold text-gray-800">Annual Summary</h3>
                <div className="flex items-end gap-2 h-4 space-x-0.5 rounded-full overflow-hidden bg-gray-100">
                    <div className="h-full bg-primary-500" style={{ width: '25%' }}></div>
                    <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center p-3 rounded-lg bg-gray-50">
                            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 px-1">Monthly Breakdown</h3>
                <div className="space-y-3">
                    {monthlyData.map((data) => (
                        <div key={data.month} className="flex items-center gap-4">
                            <span className="w-8 text-sm font-medium text-gray-500">{data.month}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-400 rounded-full"
                                    style={{ width: `${(data.taken / 5) * 100}%` }}
                                ></div>
                            </div>
                            <span className="w-8 text-sm font-semibold text-gray-700 text-right">{data.taken}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
