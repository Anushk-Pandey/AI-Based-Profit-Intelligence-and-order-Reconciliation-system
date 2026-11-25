import React from 'react';
import { ProfitProvider, useProfit } from './context/ProfitContext';
import TopTaskbar from './components/Taskbar/TopTaskbar';
import ProfitDashboard from './components/ProfitDashboard/ProfitDashboard';
import InputCenter from './components/InputCenter/InputCenter';
import OrderReconciliation from './components/Reconciliation/OrderReconciliation';
import AIRecommendations from './components/AIRecommendations/AIRecommendations';
import PresentationModal from './components/Presentation/PresentationModal';
import Toast from './components/Common/Toast';

function MainAppContent() {
  const { activeTab } = useProfit();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {activeTab === 'dashboard' && <ProfitDashboard />}
      {activeTab === 'input' && <InputCenter />}
      {activeTab === 'reconciliation' && <OrderReconciliation />}
      {activeTab === 'recommendations' && <AIRecommendations />}
    </main>
  );
}

export default function App() {
  return (
    <ProfitProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        
        {/* Sleek, Small Top Taskbar */}
        <TopTaskbar />

        {/* Clean, Simple Main Content */}
        <MainAppContent />

        {/* Presentation Pitch Deck Modal for Sir */}
        <PresentationModal />

        {/* Floating Notification Feedback */}
        <Toast />

        {/* Minimal Clean Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span><strong>ProfitIQ.AI</strong> • AI-Based Profit Intelligence & Order Reconciliation System</span>
            <span>Presentation Mode Ready • Indian E-Commerce Optimized</span>
          </div>
        </footer>

      </div>
    </ProfitProvider>
  );
}
