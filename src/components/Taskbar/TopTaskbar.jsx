import React from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Sparkles, 
  Presentation, 
  Trash2, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';

export default function TopTaskbar() {
  const { 
    activeTab, 
    setActiveTab, 
    currency, 
    setCurrency, 
    setIsPresentationOpen, 
    products, 
    clearData 
  } = useProfit();

  const hasData = products.length > 0;

  const tabs = [
    { id: 'input', label: 'Upload Excel / Input', icon: FileSpreadsheet },
    { id: 'dashboard', label: 'Profit Dashboard', icon: BarChart3 },
    { id: 'reconciliation', label: 'Order Reconciliation', icon: FileText },
    { id: 'recommendations', label: 'AI Advice', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          
          {/* Logo & Product Title */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0" 
            onClick={() => setActiveTab(hasData ? 'dashboard' : 'input')}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                ProfitIQ<span className="text-indigo-600">.AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Profit & Order Reconciliation
              </span>
            </div>
          </div>

          {/* Simple, Easy-to-See Center Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Compact Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Currency Toggle (Defaults to Indian Rupee ₹ INR) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setCurrency('₹')}
                className={`px-2.5 py-1 rounded transition-all ${
                  currency === '₹' ? 'bg-white text-indigo-600 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Indian Rupee (INR ₹)"
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('$')}
                className={`px-2 py-1 rounded transition-all ${
                  currency === '$' ? 'bg-white text-indigo-600 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-700'
                }`}
                title="US Dollars (USD $)"
              >
                $ USD
              </button>
            </div>

            {/* Clear Data (Only shown when user has added items) */}
            {hasData && (
              <button
                onClick={clearData}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 text-xs font-medium transition-colors"
                title="Clear all entered data"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Clear</span>
              </button>
            )}

            {/* Presentation Pitch Deck Button for Sir */}
            <button
              onClick={() => setIsPresentationOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
              title="Open Project Presentation Deck for Sir"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Presentation Deck</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
