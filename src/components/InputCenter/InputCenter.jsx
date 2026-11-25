import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Download, 
  Sparkles, 
  ClipboardPaste,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';
import { CSV_TEMPLATE_CONTENT, SAMPLE_TEST_CSV } from '../../data/sampleData';

export default function InputCenter() {
  const { addProduct, importCSV, showToast } = useProfit();
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'manual'
  
  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Direct paste text state
  const [pastedText, setPastedText] = useState('');

  // Manual Form State
  const [manualName, setManualName] = useState('');
  const [manualChannel, setManualChannel] = useState('Amazon India');
  const [manualPrice, setManualPrice] = useState('');
  const [manualCost, setManualCost] = useState('');
  const [manualFee, setManualFee] = useState('15');
  const [manualAdSpend, setManualAdSpend] = useState('');
  const [manualUnits, setManualUnits] = useState('100');

  // Handle File Upload (.csv, .txt, .tsv)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importCSV(content);
      }
    };
    reader.readAsText(file);
  };

  // Handle Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          importCSV(content);
        }
      };
      reader.readAsText(file);
    }
  };

  // 1-Click Load Mock Test Data
  const handleLoadSampleData = () => {
    importCSV(SAMPLE_TEST_CSV);
    showToast('Loaded 7 realistic Indian e-commerce test products!', 'success');
  };

  // Download Sample Blank CSV for Microsoft Excel
  const handleDownloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ProfitIQ_Sales_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded ProfitIQ_Sales_Template.csv', 'success');
  };

  // Download Mock Test Data CSV
  const handleDownloadTestData = () => {
    const blob = new Blob([SAMPLE_TEST_CSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'indian_ecommerce_test_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded indian_ecommerce_test_data.csv', 'success');
  };

  // Submit Manual Form
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPrice || !manualCost) {
      alert("Please fill in Product Name, Selling Price, and Unit Cost.");
      return;
    }

    addProduct({
      name: manualName.trim(),
      channel: manualChannel,
      price: manualPrice,
      cost: manualCost,
      feePercent: manualFee || 15,
      adSpend: manualAdSpend || 0,
      unitsSold: manualUnits || 50
    });

    // Reset form
    setManualName('');
    setManualPrice('');
    setManualCost('');
    setManualAdSpend('');
    setManualUnits('100');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Add Your Sales & Costs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Enter Your Sales & Product Costs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Upload an Excel sheet, paste rows from your table, or type product numbers manually to see your real take-home profit.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-300">
          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'upload'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Excel File / Paste</span>
          </button>

          <button
            onClick={() => setActiveMode('manual')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'manual'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Type Details Manually</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Spreadsheet Upload & Paste */}
      {activeMode === 'upload' && (
        <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Drag & Drop File Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-600 bg-indigo-50/50'
                : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt,.tsv"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="w-14 h-14 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Upload className="w-7 h-7" />
            </div>

            <h3 className="text-sm font-bold text-slate-800">
              Drag & Drop your Excel / CSV file here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports any .csv file exported from Excel, Amazon, or Shopify
            </p>

            <span className="inline-block mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 transition-colors">
              Browse Computer Files
            </span>
          </div>

          {/* Test Data & Template Actions Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <div className="text-left text-xs text-slate-700 space-y-0.5">
              <span className="font-bold flex items-center gap-1.5 text-slate-900">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Want to test the website right away?
              </span>
              <p className="text-[11px] text-slate-500">
                Click below to load 7 real Indian products from Amazon, Flipkart, and Shopify with 1 click.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleLoadSampleData}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                title="Immediately loads 7 Indian products into the Profit Dashboard"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Test Data (1-Click)</span>
              </button>

              <button
                onClick={handleDownloadTestData}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-sm"
                title="Download the mock test CSV file to your computer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Test CSV</span>
              </button>

              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-sm"
                title="Download blank CSV template with empty headers"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Blank Template</span>
              </button>
            </div>
          </div>

          {/* Copy & Paste from Excel Box */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ClipboardPaste className="w-4 h-4 text-indigo-600" />
              <span>Or Paste Direct Table Rows (From Excel or Google Sheets):</span>
            </label>
            <textarea
              rows={4}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder={`Product,Channel,Price,Cost,PlatformFeePercent,AdSpend,UnitsSold\nboAt Airdopes Pro,Amazon India,1499,450,15,120,250\nNoise Pulse Smartwatch,Flipkart,2199,750,12,180,180\nAyurvedic Hair Oil,Shopify India,499,110,2,65,400`}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
            <div className="flex justify-end">
              <button
                onClick={() => importCSV(pastedText)}
                disabled={!pastedText.trim()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold shadow-sm transition-all"
              >
                Calculate My Profits (₹)
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Mode 2: Manual Form Entry */}
      {activeMode === 'manual' && (
        <div className="surface-card rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Product Name / Title</label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Wireless ANC Earbuds Pro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Sales Channel / Platform (India)</label>
                <select
                  value={manualChannel}
                  onChange={(e) => setManualChannel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="Amazon India">Amazon India (Amazon.in - 15%)</option>
                  <option value="Flipkart">Flipkart (12%)</option>
                  <option value="Meesho">Meesho (0% Commission)</option>
                  <option value="Shopify India">Shopify India / D2C (2.5%)</option>
                  <option value="Blinkit / Zepto">Blinkit / Zepto (Quick Commerce - 18%)</option>
                  <option value="Myntra">Myntra (Fashion - 20%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-0.5 block">Selling Price (₹)</label>
                <span className="text-[10px] text-slate-400 block mb-1">What customer pays</span>
                <input
                  type="number"
                  step="0.01"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  placeholder="1499.00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-0.5 block">Product Cost (₹)</label>
                <span className="text-[10px] text-slate-400 block mb-1">Making or buying cost</span>
                <input
                  type="number"
                  step="0.01"
                  value={manualCost}
                  onChange={(e) => setManualCost(e.target.value)}
                  placeholder="450.00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-0.5 block">Platform Fee (%)</label>
                <span className="text-[10px] text-slate-400 block mb-1">Marketplace commission</span>
                <input
                  type="number"
                  step="0.1"
                  value={manualFee}
                  onChange={(e) => setManualFee(e.target.value)}
                  placeholder="15.0"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-0.5 block">Ad Spend / Unit (₹)</label>
                <span className="text-[10px] text-slate-400 block mb-1">Advertising per sale</span>
                <input
                  type="number"
                  step="0.01"
                  value={manualAdSpend}
                  onChange={(e) => setManualAdSpend(e.target.value)}
                  placeholder="120.00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-0.5 block">Total Units Sold</label>
              <span className="text-[10px] text-slate-400 block mb-1">Quantity of items sold</span>
              <input
                type="number"
                value={manualUnits}
                onChange={(e) => setManualUnits(e.target.value)}
                placeholder="100"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                required
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Calculate & Add to Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
