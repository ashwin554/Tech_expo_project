'use client';
import { Sidebar } from '../components/Sidebar';
import { Activity, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ActivityPage() {
    // Mock activity data since n8n execution log API is complex to proxy fully without auth
    const activities = [
        { id: 1, action: 'Agent Created', target: 'Daily Report', time: '2 mins ago', user: 'Om Kumar' },
        { id: 2, action: 'Workflow Executed', target: 'Email Sync', time: '1 hour ago', status: 'Success' },
        { id: 3, action: 'Workflow Executed', target: 'Jira Alert', time: '3 hours ago', status: 'Failed' },
        { id: 4, action: 'Agent Updated', target: 'Slack Bot', time: 'Yesterday', user: 'Om Kumar' },
        { id: 5, action: 'System', target: 'n8n connected', time: '2 days ago', status: 'Info' },
    ];

    return (
        <div className="flex h-screen bg-[#F9FAFB] text-slate-800 font-sans tracking-tight">
            <Sidebar />
            <main className="flex-1 overflow-auto p-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-indigo-600" />
                            All Activity
                        </h1>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {activities.map((act) => (
                                <div key={act.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.action.includes('Executed') ? (act.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600') : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {act.action.includes('Executed') ? '⚡' : '📝'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {act.action}: <span className="font-bold">{act.target}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Clock className="w-3 h-3" /> {act.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {act.user || act.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
