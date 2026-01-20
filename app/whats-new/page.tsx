'use client';
import { Sidebar } from '../components/Sidebar';
import { FileText, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WhatsNew() {
    const [readmeContent, setReadmeContent] = useState('');

    useEffect(() => {
        // Fetch README content from the public API or just usage instructions
        // For simplicity, we'll hardcode the key features here since we can't easily read server files from client without an API
        setReadmeContent(`
# What's New in V1.0

## 🚀 Intelligent Dashboard
- **AI Architect**: Create agents with natural language.
- **Visual Management**: Grid and List views for your agents.
- **Sorting**: Organize agents by date, status, or name.

## ⚡ Direct Integration
- **n8n Sync**: Agents are created directly in your local n8n instance.
- **One-Click Open**: Launch workflows instantly from the dashboard.

## 🛠️ Developer Friendly
- **Local Proxy**: Secure API proxying to n8n.
- **Extensible**: Built on Next.js 14 and Tailwind CSS.
        `);
    }, []);

    return (
        <div className="flex h-screen bg-[#F9FAFB] text-slate-800 font-sans tracking-tight">
            <Sidebar />
            <main className="flex-1 overflow-auto p-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">What's New</h1>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-slate max-w-none">
                        <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-50 rounded-lg text-indigo-700 border border-indigo-100">
                            <Star className="w-5 h-5 fill-indigo-700" />
                            <span className="font-semibold">Version 1.0.0 is live!</span>
                        </div>
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">🚀 Intelligent Dashboard</h2>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li><strong>AI Architect</strong>: Create agents with natural language.</li>
                                    <li><strong>Visual Management</strong>: Grid and List views for your agents.</li>
                                    <li><strong>Sorting</strong>: Organize agents by date, status, or name.</li>
                                </ul>
                            </section>
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">⚡ Direct Integration</h2>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li><strong>n8n Sync</strong>: Agents are created directly in your local n8n instance.</li>
                                    <li><strong>One-Click Open</strong>: Launch workflows instantly from the dashboard.</li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
