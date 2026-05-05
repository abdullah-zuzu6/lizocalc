"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Trash2, 
  Calculator, 

  Bookmark, 
  Search, 
  X, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { getSavedCalculators, toggleSavedCalculator, SavedTool } from "@/lib/storage";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Assuming your component paths
import Footer from "@/components/Footer";

export default function SavedCalculatorsPage() {
  const [savedTools, setSavedTools] = useState<SavedTool[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Initial Load ---
  useEffect(() => {
    setIsMounted(true);
    setSavedTools(getSavedCalculators());
  }, []);

  // --- Filter Logic ---
  const filteredTools = useMemo(() => {
    return savedTools.filter((tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, savedTools]);

  const handleRemove = (tool: SavedTool) => {
    toggleSavedCalculator(tool);
    setSavedTools(getSavedCalculators());
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all saved tools?")) {
      // Logic to clear all from storage would go here
      // For now, removing one by one or clearing the array:
      savedTools.forEach(tool => toggleSavedCalculator(tool));
      setSavedTools([]);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-grow py-16 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER SECTION */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20">
                <Bookmark size={32} className="fill-current" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight uppercase">My Toolkit</h1>
                <p className="text-muted-foreground font-medium opacity-70">
                   {savedTools.length} precision tools ready for action.
                </p>
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search your tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-[1.5rem] font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </header>

          {/* CONTENT AREA */}
          {savedTools.length === 0 ? (
            <div className="text-center py-24 border-4 border-dashed rounded-[3rem] bg-secondary/5 transition-all">
              <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                 <Calculator size={40} className="opacity-20" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Your library is empty</h3>
              <p className="text-muted-foreground text-sm mb-8 mt-2 max-w-xs mx-auto leading-relaxed">
                Save time by hearting the calculators you use most frequently.
              </p>
              <Link href="/calculators" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                Browse Directory <Sparkles size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-4 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Quick Access List</span>
                {savedTools.length > 1 && (
                  <button onClick={clearAll} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:opacity-70 transition-opacity">
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid gap-4">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <div 
                      key={tool.href} 
                      className="group relative flex items-center justify-between p-6 bg-card border rounded-[2.5rem] hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                      
                      <Link href={tool.href} className="flex-1">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-blue-600/60 tracking-widest mb-1.5 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30" />
                            {tool.category}
                          </span>
                          <h3 className="text-2xl font-black group-hover:text-blue-600 transition-colors tracking-tighter">
                            {tool.name}
                          </h3>
                        </div>
                      </Link>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleRemove(tool)}
                          className="p-4 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                          title="Unsave Tool"
                        >
                          <Trash2 size={20} />
                        </button>
                        <Link 
                          href={tool.href}
                          className="p-4 bg-secondary text-muted-foreground group-hover:bg-blue-600 group-hover:text-white rounded-2xl transition-all flex items-center gap-2"
                        >
                          <span className="hidden md:inline text-xs font-black uppercase tracking-widest ml-1">Open</span>
                          <ExternalLink size={20} />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center opacity-50">
                    <p className="font-black uppercase text-xs tracking-[0.2em]">No matches found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}