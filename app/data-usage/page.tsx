'use client';
import { Sidebar } from '../components/Sidebar';
import { BarChart3, ArrowLeft, Database, HardDrive } from 'lucide-react';
import Link from 'next/link';

export default function DataUsage() {
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
                            <BarChart3 className="w-8 h-8 text-indigo-600" />
                            Data Usage
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Monthly Operations</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">1,245</h3>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <Database className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-[25%]"></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">25% of 5,000 quota</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Storage Used</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">45 MB</h3>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <HardDrive className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[10%]"></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">10% of 500 MB quota</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Usage History</h3>
                        <div className="space-y-4">
                            {[
                                { month: 'January', ops: 1245, cost: '$0.00' },
                                { month: 'December', ops: 3890, cost: '$0.00' },
                                { month: 'November', ops: 2100, cost: '$0.00' },
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                    <span className="font-medium text-gray-700">{row.month}</span>
                                    <div className="flex gap-8 text-sm text-gray-600">
                                        <span>{row.ops} operations</span>
                                        <span>{row.cost}</span>
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
