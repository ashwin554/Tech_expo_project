'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AgentCard } from './components/AgentCard';
import { Search, LayoutGrid, List, Plus } from 'lucide-react';
import { AI_ARCHITECT_PROMPT } from './lib/prompts';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ai' | 'manual'>('ai');
  const [prompt, setPrompt] = useState('');
  const [manualJson, setManualJson] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [agents, setAgents] = useState<any[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);

  // New State for View and Sort
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'date' | 'name' | 'status'>('date');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Agents (Workflows) from n8n
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch('/api/n8n/workflows');
        const data = await res.json();
        if (data && data.data) {
          // Map n8n workflows to our UI format
          const mapped = data.data.map((wf: any) => ({
            id: wf.id,
            name: wf.name,
            status: wf.active ? 'Published' : 'Not Published',
            description: `Workflow ID: ${wf.id}`,
            lastRun: wf.updatedAt ? new Date(wf.updatedAt).toLocaleDateString() : 'Unknown',
            updatedAt: wf.updatedAt ? new Date(wf.updatedAt).getTime() : 0,
            createdAt: wf.createdAt ? new Date(wf.createdAt).getTime() : 0,
            icons: ['⚡']
          }));
          setAgents(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch agents", e);
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchAgents();
  }, [isModalOpen]);

  // Filter and Sort Agents
  const filteredAgents = agents
    .filter(agent => agent.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'date') return b.createdAt - a.createdAt; // Newest first
      if (sortOrder === 'name') return a.name.localeCompare(b.name);
      if (sortOrder === 'status') return a.status === 'Published' ? -1 : 1;
      return 0;
    });

  const handleGenerate = async () => {
    setIsGenerating(true);
    let payload: any = {};

    try {
      if (modalMode === 'ai') {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.details || 'AI generation failed');
        payload = data;
      } else {
        // Manual Mode
        try {
          payload = JSON.parse(manualJson);
        } catch (e) {
          alert('Invalid JSON');
          setIsGenerating(false);
          return;
        }
      }

      // Sanitize
      if (payload.active !== undefined) delete payload.active;
      if (payload.id !== undefined) delete payload.id;

      // Create in n8n
      const n8nRes = await fetch('/api/n8n/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const n8nData = await n8nRes.json();

      if (n8nData.id) {
        alert('Agent created successfully!');
        setIsModalOpen(false);
      } else {
        alert('Failed to create agent in n8n');
      }

    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
      setPrompt('');
      setManualJson('');
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-slate-800 font-sans tracking-tight">
      <Sidebar onNewAgentClick={() => { setIsModalOpen(true); setModalMode('ai'); }} />

      <main className="flex-1 overflow-auto">
        <header className="px-10 py-8 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My agents</h2>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{agents.length}</span>
          </div>
          <button
            onClick={() => { setIsModalOpen(true); setModalMode('ai'); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4" /> New agent
          </button>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-10">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <div
                onClick={() => setSortOrder('date')}
                className={`hidden md:flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition-colors shadow-sm text-sm font-medium ${sortOrder === 'date' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                Date created
              </div>
              <div
                onClick={() => setSortOrder('status')}
                className={`hidden md:flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition-colors shadow-sm text-sm font-medium ${sortOrder === 'status' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                Status
              </div>

              <div className="w-px h-8 bg-slate-200 mx-2"></div>

              <div className="flex bg-slate-100/50 rounded-lg p-1 border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {loadingAgents ? (
            <div className="flex justify-center py-20">
              <span className="animate-spin text-indigo-600 text-2xl">⏳</span>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                  {filteredAgents.map((agent, idx) => (
                    <AgentCard
                      key={idx}
                      name={agent.name}
                      status={agent.status as any}
                      description={agent.description}
                      lastRun={agent.lastRun}
                      icons={agent.icons?.map((i: string) => <span key={i}>{i}</span>)}
                      workflowUrl={`http://localhost:5678/workflow/${agent.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Last Run</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAgents.map((agent, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                              ⚡
                            </div>
                            {agent.name}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agent.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                              {agent.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{agent.lastRun}</td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href={`http://localhost:5678/workflow/${agent.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900 font-medium hover:underline"
                            >
                              Open
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredAgents.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400">
                  No agents found matching your search.
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* AI Chat / New Agent Interface */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1C1C1C] z-50 flex flex-col items-center justify-center animate-in fade-in duration-200">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="w-full max-w-3xl px-4 flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-medium text-white/90 tracking-tight text-center">
              What can I help with?
            </h2>

            <div className="relative w-full">
              {/* Toggle Mode */}
              <div className="absolute -top-12 right-0 flex gap-4 text-sm font-medium">
                <button
                  onClick={() => setModalMode('ai')}
                  className={`${modalMode === 'ai' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  AI Agent
                </button>
                <button
                  onClick={() => setModalMode('manual')}
                  className={`${modalMode === 'manual' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Manual JSON
                </button>
              </div>

              <div className="relative group w-full">
                {modalMode === 'ai' ? (
                  <div className="relative">
                    <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      className="w-full bg-[#2C2C2C] text-white text-lg rounded-full py-4 pl-14 pr-32 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-shadow placeholder:text-gray-500"
                      placeholder="Ask anything"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                      autoFocus
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {/* Input Buttons */}
                      <button
                        onClick={handleGenerate}
                        disabled={!prompt || isGenerating}
                        className={`p-2 rounded-full transition-all ${prompt ? 'bg-white text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                      >
                        {isGenerating ? (
                          <span className="animate-spin block w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="20"></line><line x1="6" y1="20" x2="6" y2="20"></line></svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <textarea
                      className="w-full bg-[#2C2C2C] text-white text-sm font-mono rounded-3xl py-6 px-8 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-shadow placeholder:text-gray-500 min-h-[200px]"
                      placeholder='Paste your n8n workflow JSON here...'
                      value={manualJson}
                      onChange={(e) => setManualJson(e.target.value)}
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={!manualJson || isGenerating}
                      className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? 'Importing...' : 'Import JSON'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
