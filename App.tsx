import React, { useState, useEffect } from 'react';
import { Atom, Printer, Sparkles, Search, Share2, AlertCircle } from 'lucide-react';
import { generateCareerConnections } from './services/geminiService';
import { InfographicData, LoadingState } from './types';
import { CareerNode } from './components/CareerNode';
import { StatsChart } from './components/StatsChart';

const SUGGESTED_TOPICS = [
  "Electromagnetism",
  "Thermodynamics",
  "Quantum Mechanics",
  "Fluid Dynamics",
  "Optics & Light",
  "Nuclear Physics"
];

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>("Electromagnetism");
  const [inputTopic, setInputTopic] = useState<string>("");
  const [data, setData] = useState<InfographicData | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    fetchData(topic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const fetchData = async (searchTopic: string) => {
    setStatus(LoadingState.LOADING);
    setError(null);
    try {
      const result = await generateCareerConnections(searchTopic);
      setData(result);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please check your API key or try again.");
      setStatus(LoadingState.ERROR);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTopic.trim()) {
      setTopic(inputTopic);
      fetchData(inputTopic);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-physics-dark bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-physics-dark to-black text-white selection:bg-physics-accent selection:text-black pb-20">
      
      {/* Header / Nav - Hidden on Print */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-physics-accent/10 p-2 rounded-lg text-physics-accent">
              <Atom size={24} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Physics<span className="text-physics-accent">Nexus</span></span>
          </div>
          
          <div className="hidden md:flex gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Printer size={16} />
              Print Infographic
            </button>
            <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300">
                Curated by Girish Sharma
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Controls Section - Hidden on Print */}
        <section className="mb-12 max-w-3xl mx-auto text-center no-print">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-white via-physics-accent to-physics-secondary bg-clip-text text-transparent">
            Link Curriculum to Careers
          </h1>
          <p className="text-slate-400 mb-8 text-lg">
            Generate an instant infographic connecting abstract physics concepts to real-world opportunities.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6">
            <input
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder="Enter a topic (e.g., Circular Motion)"
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-physics-accent text-white placeholder-slate-500 transition-all shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <button 
                type="submit"
                disabled={status === LoadingState.LOADING}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-physics-accent hover:bg-sky-400 text-black font-semibold p-2 rounded-full transition-colors disabled:opacity-50"
            >
                {status === LoadingState.LOADING ? <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" /> : <Sparkles size={18} />}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => { setTopic(t); setInputTopic(t); fetchData(t); }}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700 hover:border-physics-accent hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Error State */}
        {status === LoadingState.ERROR && (
          <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center text-red-200 flex flex-col items-center gap-3">
            <AlertCircle size={32} />
            <p>{error}</p>
            <button onClick={() => fetchData(topic)} className="text-sm underline hover:text-white">Try Again</button>
          </div>
        )}

        {/* Loading State Skeleton */}
        {status === LoadingState.LOADING && (
           <div className="animate-pulse space-y-8 max-w-5xl mx-auto">
             <div className="h-12 bg-slate-800 rounded-lg w-1/3 mx-auto mb-8"></div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="h-64 bg-slate-800 rounded-xl"></div>
               <div className="h-64 bg-slate-800 rounded-xl"></div>
               <div className="h-64 bg-slate-800 rounded-xl"></div>
               <div className="h-64 bg-slate-800 rounded-xl"></div>
             </div>
           </div>
        )}

        {/* The Infographic View */}
        {status === LoadingState.SUCCESS && data && (
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden print-bg-white print:border-none print:shadow-none print:p-0">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-physics-accent/5 rounded-full blur-3xl pointer-events-none print:hidden"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none print:hidden"></div>

            {/* Infographic Header */}
            <div className="text-center mb-16 relative z-10">
                <span className="text-physics-accent font-mono text-sm tracking-widest uppercase mb-2 block print:text-black">Curriculum Connection</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 print-text-black">{data.topic}</h2>
                <div className="max-w-3xl mx-auto">
                    <p className="text-xl text-slate-300 leading-relaxed print-text-black">{data.summary}</p>
                </div>
            </div>

            {/* Central Visual Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
                
                {/* Left Column: Careers */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-2 print-text-black">
                        <Share2 className="text-physics-accent print:text-black" />
                        Career Pathways
                    </h3>
                    {data.careers.map((career, idx) => (
                        <CareerNode key={career.id || idx} career={career} index={idx} />
                    ))}
                </div>

                {/* Right Column: Analytics & Visualization */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    
                    {/* Sticky container for charts */}
                    <div className="lg:sticky lg:top-24 space-y-8">
                        
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900/50 border border-indigo-500/30 rounded-2xl p-6 print:border print:border-gray-300 print:bg-white">
                            <h3 className="text-xl font-display font-bold text-white mb-2 print-text-black">Why It Matters</h3>
                            <p className="text-indigo-200 text-sm print-text-black">
                                Understanding {data.topic} opens doors to industries driving the future economy. 
                                The careers listed here represent a mix of research, engineering, and practical application.
                            </p>
                        </div>

                        {/* Chart */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 print:bg-white print-border">
                             <StatsChart careers={data.careers} />
                        </div>

                         {/* Skills Cloud Summary */}
                         <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 print:bg-white print-border">
                            <h3 className="text-lg font-display font-bold text-physics-accent mb-4 print-text-black">Common Skill Intersection</h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(data.careers.flatMap(c => c.skills))).slice(0, 10).map((skill: string, i) => (
                                    <span key={i} className="text-xs font-mono px-2 py-1 border border-slate-600 rounded text-slate-400 print:border-gray-300 print:text-black">
                                        #{skill.replace(/\s/g, '')}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer / Copyright for Print */}
            <div className="mt-16 text-center border-t border-slate-800 pt-8 print:border-gray-300">
                <p className="text-slate-500 text-sm print-text-black">Generated by PhysicsNexus AI • Linking Classroom Theory to Future Reality</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;