import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  DollarSign, 
  CheckCircle2, 
  Calculator, 
  Layers,
  Percent,
  Check
} from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';

export default function AIRecommendations() {
  const { aiRecommendations, formatPrice, products, showToast } = useProfit();

  // Breakeven Calculator State
  const [calcCost, setCalcCost] = useState('450.00');
  const [calcAd, setCalcAd] = useState('120.00');
  const [targetMargin, setTargetMargin] = useState('25');

  // Calculate Breakeven Price for Amazon India (15% fee) and Shopify India (2.5% fee)
  const costNum = parseFloat(calcCost) || 0;
  const adNum = parseFloat(calcAd) || 0;
  const targetPct = (parseFloat(targetMargin) || 20) / 100;

  // Formula: Price = (Cost + AdSpend) / (1 - FeeRate - TargetMarginRate)
  const amzPrice = (costNum + adNum) / Math.max(0.1, 1 - 0.15 - targetPct);
  const shpPrice = (costNum + adNum) / Math.max(0.1, 1 - 0.025 - targetPct);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Recommendations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How to Increase Your Profit
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Simple advice to cut losses, reduce wasted ad spend, and set the right selling price.
        </p>
      </div>

      {/* AI Recommendations Cards */}
      <div className="space-y-4">
        {aiRecommendations.length === 0 ? (
          <div className="surface-card rounded-2xl p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">Your Products are in Good Health</h3>
            <p className="text-xs text-slate-500">
              No losing products or severe fee leaks detected in your current sales data.
            </p>
          </div>
        ) : (
          aiRecommendations.map((rec) => (
            <div
              key={rec.id}
              className={`surface-card rounded-2xl p-6 space-y-3 border transition-all ${
                rec.type === 'critical'
                  ? 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rec.type === 'critical'
                      ? 'bg-rose-100 text-rose-800'
                      : rec.type === 'opportunity'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rec.type === 'critical' ? 'ATTENTION' : rec.type === 'opportunity' ? 'GROWTH TIP' : 'TOP SELLER'}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {rec.title}
                  </h3>
                </div>

                <span className="text-sm font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 flex-shrink-0">
                  {rec.impact}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {rec.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  💡 What to do: {rec.action}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Interactive AI Breakeven Pricing Calculator */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Price Calculator: What Should You Charge?
            </h3>
            <p className="text-xs text-slate-500">
              Type your product cost below. See the exact price you should charge on Amazon vs your website to reach your desired profit.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 mb-0.5 block">Product Making / Buying Cost (₹)</label>
            <span className="text-[10px] text-slate-400 block mb-1">What it costs you per item</span>
            <input
              type="number"
              step="0.01"
              value={calcCost}
              onChange={(e) => setCalcCost(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-0.5 block">Ad Spend per Unit (₹)</label>
            <span className="text-[10px] text-slate-400 block mb-1">Advertising spent to get 1 sale</span>
            <input
              type="number"
              step="0.01"
              value={calcAd}
              onChange={(e) => setCalcAd(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-0.5 block">Desired Profit Margin (%)</label>
            <span className="text-[10px] text-slate-400 block mb-1">What % profit you want to keep</span>
            <input
              type="number"
              value={targetMargin}
              onChange={(e) => setTargetMargin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>
        </div>

        {/* Calculated Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900">Amazon India (15% Commission)</span>
              <span className="text-[10px] text-amber-700 font-bold uppercase">Amazon.in FBA</span>
            </div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {formatPrice(amzPrice)}
            </div>
            <p className="text-[11px] text-slate-600 leading-tight">
              To keep {targetMargin}% pure profit in Indian Rupees after Amazon's 15% marketplace fee, list this product at a minimum of <strong>{formatPrice(amzPrice)}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900">Shopify India Direct D2C (2.5% PG Fee)</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">Razorpay / Cashfree</span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              {formatPrice(shpPrice)}
            </div>
            <p className="text-[11px] text-slate-600 leading-tight">
              On your own website / Shopify store, you can price lower at <strong>{formatPrice(shpPrice)}</strong> and still achieve the exact same {targetMargin}% profit margin.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
