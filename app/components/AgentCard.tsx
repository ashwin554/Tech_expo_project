import { MoreVertical } from 'lucide-react';

interface AgentCardProps {
    name: string;
    status: 'Published' | 'Not Published';
    statusColor?: 'green' | 'gray';
    description: string;
    lastRun?: string;
    icons?: React.ReactNode[];
}

export function AgentCard({ name, status, statusColor = 'gray', description, lastRun, icons }: AgentCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm bg-purple-100 text-purple-600 flex items-center justify-center text-[10px]">⚡</span>
                    {name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3 leading-relaxed">
                {description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    {icons && icons.map((icon, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm text-xs">
                            {icon}
                        </div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                        OK
                    </div>
                </div>
                <span className="text-xs text-gray-400">
                    {lastRun || 'No runs yet...'}
                </span>
            </div>
        </div>
    );
}
