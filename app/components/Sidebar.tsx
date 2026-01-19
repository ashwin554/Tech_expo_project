import { LayoutGrid, Users, Zap, Box, BarChart3, Settings, HelpCircle, FileText } from 'lucide-react';

export function Sidebar() {
    return (
        <div className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col font-sans">
            <div className="p-6">
                <h1 className="text-xl font-bold flex items-center gap-2 text-orange-600">
                    <Zap className="w-6 h-6 fill-orange-600 text-orange-600" />
                    Agents
                </h1>
            </div>

            <div className="px-4 mb-6">
                <button className="w-full flex items-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm">
                    <span className="text-lg leading-none">+</span> New agent
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
                    <LayoutGrid className="w-4 h-4" />
                    My agents
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                    <Users className="w-4 h-4" />
                    Shared with me
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                    <Zap className="w-4 h-4" />
                    All activity
                </a>
            </nav>

            <div className="px-4 mt-8 pb-4">
                <h3 className="tex-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-[10px] pl-3">
                    Free plan
                </h3>
                <div className="px-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
                        <span>Activities</span>
                        <span className="ml-auto">0/400</span>
                    </div>
                </div>
                <button className="w-full mt-2 bg-purple-600 text-white rounded-md py-2 text-sm font-medium hover:bg-purple-700">
                    Upgrade
                </button>
            </div>

            <div className="px-4 py-4 border-t border-gray-100 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <Zap className="w-4 h-4" />
                    What's new
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <BarChart3 className="w-4 h-4" />
                    Data usage
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <Box className="w-4 h-4" />
                    Install Chrome extension
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <HelpCircle className="w-4 h-4" />
                    Support
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <FileText className="w-4 h-4" />
                    Manage cookies
                </a>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                        OK
                    </div>
                    <span className="text-sm font-medium text-gray-700">Om Kumar</span>
                </div>
            </div>
        </div>
    );
}
