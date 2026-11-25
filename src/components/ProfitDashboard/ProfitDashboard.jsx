import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Percent, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Trash2, 
  Sparkles, 
  FileSpreadsheet, 
  Download, 
  Printer, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';

export default function ProfitDashboard() {
  const { 
    products, 
    metrics, 
    formatPrice, 
    deleteProduct, 
    setActiveTab 
  } = useProfit();

  const handlePrint = () => {
    window.print();
  };

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <div className="surface-card rounded-3xl p-12 border border-dashed border-slate-300 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800">No Sales Data Loaded Yet</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Upload your sales Excel / CSV file or enter product manufacturing costs manually to generate complete AI profit diagnostics.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('input')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Go to Upload Excel / Input Data</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate percentage shares of expenses
  const rev = metrics.totalRevenue || 1;
  const cogsPct = Math.round((metrics.totalCOGS / rev) * 100);
  const feePct = Math.round((metrics.totalPlatformFees / rev) * 100);
  const adPct = Math.round((metrics.totalAdSpend / rev) * 100);
  const marginPct = Math.max(0, Math.round(metrics.profitMargin));

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top AI Diagnostic Verdict Banner */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50 border border-indigo-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                Store Summary
              </span>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {metrics.profitMargin.toFixed(1)}% Profit Margin
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
              {metrics.profitMargin >= 20
                ? "Good News: Your Store is Making Healthy Profit"
                : "Warning: High Platform Fees and Ads are Eating Your Profits"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl mt-0.5">
              From {formatPrice(metrics.totalRevenue)} in total sales, you spent {formatPrice(metrics.totalCOGS)} to make products, {formatPrice(metrics.totalPlatformFees)} ({feePct}%) on platform fees, and {formatPrice(metrics.totalAdSpend)} ({adPct}%) on ads, leaving you with {formatPrice(metrics.netProfit)} real profit in hand.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 print:hidden w-full md:w-auto">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>View AI Advice</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Gross Revenue */}
        <div className="surface-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Sales</span>
            <span className="font-black text-xs font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">₹ INR</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {formatPrice(metrics.totalRevenue)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {metrics.totalUnits} total items sold
          </span>
        </div>

        {/* Net Profit & Margin */}
        <div className="surface-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Real Profit (In Hand)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono ${
            metrics.netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {formatPrice(metrics.netProfit)}
          </div>
          <span className={`text-[11px] font-bold mt-1 block ${
            metrics.profitMargin >= 20 ? 'text-emerald-600' : 'text-amber-600'
          }`}>
            {metrics.profitMargin.toFixed(1)}% (What you keep)
          </span>
        </div>

        {/* Operating Costs */}
        <div className="surface-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Money Spent</span>
            <Percent className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {formatPrice(metrics.totalExpenses)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Product Cost + Fees + Ads
          </span>
        </div>

        {/* Avg Profit Per Unit */}
        <div className="surface-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider">Profit on Each Item</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {formatPrice(metrics.avgProfitPerUnit)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Money left in your pocket per sale
          </span>
        </div>

      </div>

      {/* Visual Revenue vs Cost Breakdown Bar */}
      <div className="surface-card rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">
            Where Does Your Money Go?
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Total Sales: {formatPrice(metrics.totalRevenue)}
          </span>
        </div>

        {/* Proportional Split Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
          <div 
            className="bg-blue-500 h-full transition-all" 
            style={{ width: `${cogsPct}%` }} 
            title={`Product Making Cost: ${cogsPct}%`}
          />
          <div 
            className="bg-amber-500 h-full transition-all" 
            style={{ width: `${feePct}%` }} 
            title={`Platform Commissions: ${feePct}%`}
          />
          <div 
            className="bg-purple-500 h-full transition-all" 
            style={{ width: `${adPct}%` }} 
            title={`Ad Spend: ${adPct}%`}
          />
          <div 
            className="bg-emerald-500 h-full transition-all" 
            style={{ width: `${marginPct}%` }} 
            title={`Take-Home Profit: ${marginPct}%`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span>Product Cost: <strong>{cogsPct}%</strong> ({formatPrice(metrics.totalCOGS)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
            <span>Platform Fees: <strong>{feePct}%</strong> ({formatPrice(metrics.totalPlatformFees)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0" />
            <span>Ad Spend: <strong>{adPct}%</strong> ({formatPrice(metrics.totalAdSpend)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>Real Profit: <strong className="text-emerald-600">{marginPct}%</strong> ({formatPrice(metrics.netProfit)})</span>
          </div>
        </div>
      </div>

      {/* Product-by-Product Profit Table */}
      <div className="surface-card rounded-2xl overflow-hidden shadow-sm space-y-0">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Profit on Each Product</h3>
            <p className="text-xs text-slate-400">See which products make you money and which ones lose you money.</p>
          </div>

          <button
            onClick={() => setActiveTab('input')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add / Upload More</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Product & Platform</th>
                <th className="p-3.5">Selling Price</th>
                <th className="p-3.5">Product Cost <span className="text-[10px] text-slate-400 block font-normal lowercase">(making/buying)</span></th>
                <th className="p-3.5">Platform Fee</th>
                <th className="p-3.5">Ad Cost</th>
                <th className="p-3.5">Profit / Item</th>
                <th className="p-3.5">Profit Margin</th>
                <th className="p-3.5">Total Profit</th>
                <th className="p-3.5">AI Advice</th>
                <th className="p-3.5 text-right print:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {products.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Name & Channel */}
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                        item.channel.toLowerCase().includes('amazon')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : item.channel.toLowerCase().includes('shopify')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.channel.toLowerCase().includes('flipkart')
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : item.channel.toLowerCase().includes('meesho')
                          ? 'bg-pink-50 text-pink-800 border border-pink-200'
                          : item.channel.toLowerCase().includes('blinkit') || item.channel.toLowerCase().includes('zepto')
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.channel}
                      </span>
                    </td>

                    {/* Selling Price */}
                    <td className="p-3.5 font-mono font-semibold text-slate-900">
                      {formatPrice(item.price)}
                    </td>

                    {/* Cost */}
                    <td className="p-3.5 font-mono text-slate-500">
                      {formatPrice(item.cost)}
                    </td>

                    {/* Platform Fee */}
                    <td className="p-3.5 font-mono text-slate-600">
                      {formatPrice(item.unitFee)}
                      <span className="text-[10px] text-slate-400 block font-normal">({item.feePercent}%)</span>
                    </td>

                    {/* Ad Spend */}
                    <td className="p-3.5 font-mono text-slate-600">
                      {formatPrice(item.adSpend)}
                    </td>

                    {/* Unit Profit */}
                    <td className="p-3.5 font-mono font-bold">
                      <span className={item.unitNetProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {formatPrice(item.unitNetProfit)}
                      </span>
                    </td>

                    {/* Margin % */}
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        item.status === 'champion'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'healthy'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'thin'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.marginPercent.toFixed(1)}%
                      </span>
                    </td>

                    {/* Total Profit */}
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {formatPrice(item.totalNetProfit)}
                      <span className="text-[10px] text-slate-400 block font-normal font-sans">
                        ({item.unitsSold} sold)
                      </span>
                    </td>

                    {/* AI Advice */}
                    <td className="p-3.5 text-xs text-slate-600 max-w-[200px] leading-tight">
                      <span className="text-[11px] italic">{item.aiAdvice}</span>
                    </td>

                    {/* Delete action */}
                    <td className="p-3.5 text-right print:hidden">
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete product row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
