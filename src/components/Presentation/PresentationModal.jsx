import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  TrendingUp, 
  Layers, 
  FileSpreadsheet, 
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Sparkles
} from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';

export default function PresentationModal() {
  const { isPresentationOpen, setIsPresentationOpen } = useProfit();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isPresentationOpen) return null;

  const slides = [
    // Slide 1: Title & Project Overview
    {
      title: "ProfitIQ.AI",
      subtitle: "AI-Based Profit Intelligence and Order Reconciliation System",
      category: "Title & Overview",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <TrendingUp className="w-7 h-7" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI-Based Profit Intelligence & Order Reconciliation System
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600">
              Major Project Progress Presentation
            </p>
          </div>

          <p className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed">
            A specialized web system designed for Indian e-commerce sellers on Amazon India, Flipkart, Meesho, and Shopify. It takes raw sales spreadsheets, calculates true net profit after all fees and advertising costs, and reconciles marketplace bank payouts to catch fee leaks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              ✓ Phase 1: Profit Intelligence (Completed)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
              ⏳ Phase 2: Order Reconciliation (In Development)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold">
              React 18 • Vite 6 • Tailwind CSS • Indian Rupee (₹)
            </span>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Statement
    {
      title: "The Problem We Are Solving",
      subtitle: "Why High E-Commerce Sales Often Mask Secret Net Losses",
      category: "Problem Statement",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-rose-200 space-y-2">
            <div className="text-xl font-black text-rose-600 font-mono">1. Revenue Illusion</div>
            <h4 className="text-xs font-bold text-slate-900">Gross Sales vs Real Profit</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Sellers see ₹20–30 Lakhs in sales on their dashboard and assume they are profitable. In reality, marketplace fees (12–15%) and ad costs secretly push their net margins below zero.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-amber-200 space-y-2">
            <div className="text-xl font-black text-amber-600 font-mono">2. Runaway Ad Costs</div>
            <h4 className="text-xs font-bold text-slate-900">High Advertising Drain</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              PPC advertising costs (₹120–₹250 per sale) often exceed the profit margin of an item. Without unit-level tracking, sellers lose money on every unit they ship.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-indigo-200 space-y-2">
            <div className="text-xl font-black text-indigo-600 font-mono">3. Settlement Leaks</div>
            <h4 className="text-xs font-bold text-slate-900">Marketplace Fee Overcharges</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Over 8% of marketplace bank payouts have errors: incorrect courier weight slab deductions, extra commission tiers, or duplicate return shipping fees.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: How It Works / System Workflow
    {
      title: "How ProfitIQ Works",
      subtitle: "4-Step Pipeline: From Raw Spreadsheet to Real Profit",
      category: "System Workflow",
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Step 1</span>
              <h4 className="text-xs font-bold text-slate-900">Upload Sales File</h4>
              <p className="text-[10px] text-slate-500">Drag & drop CSV or Excel export, or paste directly.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Step 2</span>
              <h4 className="text-xs font-bold text-slate-900">Client-Side Parser</h4>
              <p className="text-[10px] text-slate-500">In-browser stream parsing strips ₹ symbols and formats data.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Step 3</span>
              <h4 className="text-xs font-bold text-slate-900">Profit Engine</h4>
              <p className="text-[10px] text-slate-500">Deducts product cost, platform fees, and ads.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Step 4</span>
              <h4 className="text-xs font-bold text-slate-900">Smart Advice & Pricing</h4>
              <p className="text-[10px] text-slate-500">Highlights losing products and calculates breakeven prices.</p>
            </div>

          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200 text-xs text-slate-700">
            <strong className="text-slate-900 block mb-1">Simple Mathematical Formula Used:</strong>
            <code className="text-[11px] font-mono text-indigo-700 bg-white p-2 rounded-xl border border-indigo-100 block">
              Real Profit / Item = Selling Price - [Product Making Cost + (Selling Price × Platform Fee %) + Ad Spend]
            </code>
          </div>
        </div>
      )
    },

    // Slide 4: Major Project Progress & Milestones
    {
      title: "Project Progress & Milestones",
      subtitle: "What is Completed vs What is In Development for Phase 2",
      category: "Progress Status",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-xs">
          
          {/* Phase 1 Completed */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Phase 1: Completed & Functional</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Clean Light-Theme UI:</strong> Built with React 18, Vite 6, and Tailwind CSS.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Spreadsheet Ingestion:</strong> In-browser CSV/Excel file reader with 1-click test data loader.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Multi-Channel Profit Engine:</strong> Configured for Amazon India (15%), Flipkart (12%), Meesho (0%), and Shopify (2.5%).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>AI Recommendations & Breakeven Calculator:</strong> Automatically detects loss-making items and calculates target selling prices.</span>
              </li>
            </ul>
          </div>

          {/* Phase 2 In Progress */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Phase 2: In Development (Next Milestone)</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">⏳</span>
                <span><strong>Order Reconciliation Engine:</strong> Cross-checking bank settlement deposits against expected order revenue.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">⏳</span>
                <span><strong>Discrepancy Heuristics:</strong> Detecting courier weight slab errors and duplicate return fee deductions.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">⏳</span>
                <span><strong>Dispute Claim Generator:</strong> 1-click claim ticket generator ready for Amazon and Flipkart Seller Support.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">⏳</span>
                <span><strong>PDF Statements:</strong> Exporting formatted monthly profit & settlement statements.</span>
              </li>
            </ul>
          </div>

        </div>
      )
    },

    // Slide 5: Viva Defense Q&A
    {
      title: "Expected Viva Questions & Answers",
      subtitle: "Top Questions Faculty May Ask with Winning Answers",
      category: "Viva Defense",
      content: (
        <div className="space-y-3 py-1 text-xs">
          
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-indigo-900 block font-bold">
              Q1: "How does the system read and process Excel files without a backend server?"
            </strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <strong>Answer:</strong> We use the browser's native W3C `FileReader` stream API. It tokenizes delimited rows in memory, strips currency symbols (`₹`, commas), and calculates unit economics locally in under 5 milliseconds with 100% data privacy.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-indigo-900 block font-bold">
              Q2: "What is your contribution versus what AI did?"
            </strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <strong>Answer:</strong> While AI was used as a modern coding productivity tool, the core system architecture, the recursive pricing mathematical formulas, the Indian marketplace fee structures, and the regex data sanitizer were designed and implemented by us.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-indigo-900 block font-bold">
              Q3: "Why is the Order Reconciliation module currently in development?"
            </strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <strong>Answer:</strong> Our major project is structured in 2 sequential phases. Phase 1 focuses on Profit Intelligence and Unit Economics (now 100% complete and working). Phase 2 focuses on Order Settlement Matching, which is our next milestone for final submission.
            </p>
          </div>

        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Evaluation Pitch Deck • {slides[currentSlide].category}
              </span>
              <div className="text-xs text-slate-500">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPresentationOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 flex flex-col justify-center my-1">
          <div className="mb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          <div className="min-h-[260px] flex flex-col justify-center">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-3">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
