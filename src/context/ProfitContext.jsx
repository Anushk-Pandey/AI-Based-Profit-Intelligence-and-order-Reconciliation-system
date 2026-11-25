import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ProfitContext = createContext();

export function ProfitProvider({ children }) {
  // Products start 100% fresh and empty (no mock data!)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('profit_iq_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Start directly on input if no products exist, or dashboard if products exist
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem('profit_iq_products');
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? 'dashboard' : 'input';
    } catch {
      return 'input';
    }
  });

  // Default currency is Indian Rupee (₹ INR)
  const [currency, setCurrency] = useState('₹');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync products to local storage
  useEffect(() => {
    localStorage.setItem('profit_iq_products', JSON.stringify(products));
  }, [products]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  // Indian Rupee (INR ₹) Formatter with Indian numbering format (Lakhs & Crores)
  const formatPrice = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return `${currency}0.00`;
    const num = Number(amount);
    const converted = currency === '$' ? num / 83 : num;
    const locale = currency === '₹' ? 'en-IN' : 'en-US';
    return `${currency}${converted.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Detailed Unit-level Economics in Indian Rupee
  const analyzedProducts = useMemo(() => {
    return products.map(item => {
      const price = Number(item.price) || 0;
      const cost = Number(item.cost) || 0;
      const feePct = Number(item.feePercent) || 0;
      const adSpend = Number(item.adSpend) || 0;
      const units = Number(item.unitsSold) || 0;

      const unitFee = price * (feePct / 100);
      const unitTotalExpense = cost + unitFee + adSpend;
      const unitNetProfit = price - unitTotalExpense;
      const marginPercent = price > 0 ? (unitNetProfit / price) * 100 : 0;

      const totalRevenue = price * units;
      const totalExpenses = unitTotalExpense * units;
      const totalNetProfit = unitNetProfit * units;

      let status = 'healthy';
      let aiAdvice = 'Balanced performance. Healthy margin.';

      if (marginPercent <= 0) {
        status = 'loss';
        aiAdvice = `Losing money! Increase price by ${formatPrice(Math.abs(unitNetProfit) + 50)} or reduce ad budget.`;
      } else if (marginPercent < 12) {
        status = 'thin';
        aiAdvice = 'Thin margins. Highly vulnerable to marketplace commission increases.';
      } else if (marginPercent >= 28) {
        status = 'champion';
        aiAdvice = 'High Profit Champion! Reallocate ad budget here to scale sales.';
      }

      return {
        ...item,
        price,
        cost,
        feePercent: feePct,
        adSpend,
        unitsSold: units,
        unitFee,
        unitTotalExpense,
        unitNetProfit,
        marginPercent,
        totalRevenue,
        totalExpenses,
        totalNetProfit,
        status,
        aiAdvice
      };
    });
  }, [products, currency]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalRevenue = analyzedProducts.reduce((acc, p) => acc + p.totalRevenue, 0);
    const totalExpenses = analyzedProducts.reduce((acc, p) => acc + p.totalExpenses, 0);
    const totalCOGS = analyzedProducts.reduce((acc, p) => acc + (p.cost * p.unitsSold), 0);
    const totalPlatformFees = analyzedProducts.reduce((acc, p) => acc + (p.unitFee * p.unitsSold), 0);
    const totalAdSpend = analyzedProducts.reduce((acc, p) => acc + (p.adSpend * p.unitsSold), 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const totalUnits = analyzedProducts.reduce((acc, p) => acc + p.unitsSold, 0);
    const avgProfitPerUnit = totalUnits > 0 ? (netProfit / totalUnits) : 0;

    return {
      totalRevenue,
      totalExpenses,
      totalCOGS,
      totalPlatformFees,
      totalAdSpend,
      netProfit,
      profitMargin,
      totalUnits,
      avgProfitPerUnit
    };
  }, [analyzedProducts]);

  // Dynamic AI Recommendations in Indian Rupee
  const aiRecommendations = useMemo(() => {
    if (analyzedProducts.length === 0) return [];

    const list = [];

    // Check for loss-making products
    const lossProducts = analyzedProducts.filter(p => p.marginPercent <= 0);
    if (lossProducts.length > 0) {
      list.push({
        id: 'rec-loss',
        type: 'critical',
        title: `Warning: You are losing money on "${lossProducts[0].name}"`,
        impact: `-${formatPrice(Math.abs(Math.round(lossProducts[0].totalNetProfit)))} Loss`,
        summary: `For every unit sold on ${lossProducts[0].channel}, you lose ${formatPrice(Math.abs(lossProducts[0].unitNetProfit))} because platform fees (${lossProducts[0].feePercent}%) and ad costs (${formatPrice(lossProducts[0].adSpend)}) exceed your price.`,
        action: `Increase price by ${formatPrice(Math.abs(lossProducts[0].unitNetProfit) + 50)} or stop advertising on this product.`
      });
    }

    // Channel comparison: Amazon India vs Flipkart vs Shopify / Meesho
    const amazonProds = analyzedProducts.filter(p => p.channel.toLowerCase().includes('amazon'));
    const d2cProds = analyzedProducts.filter(p => p.channel.toLowerCase().includes('shopify') || p.channel.toLowerCase().includes('meesho'));

    if (amazonProds.length > 0 && d2cProds.length > 0) {
      const amzMargin = amazonProds.reduce((sum, p) => sum + p.marginPercent, 0) / amazonProds.length;
      const d2cMargin = d2cProds.reduce((sum, p) => sum + p.marginPercent, 0) / d2cProds.length;

      if (d2cMargin > amzMargin) {
        list.push({
          id: 'rec-channel-shift',
          type: 'opportunity',
          title: `Tip: Sell on Your Own Website to Keep +${(d2cMargin - amzMargin).toFixed(1)}% More Profit`,
          impact: `+${(d2cMargin - amzMargin).toFixed(1)}% More Profit`,
          summary: `Amazon India's 15% fee cuts your profit to ${amzMargin.toFixed(1)}%, while selling on your own website / Shopify lets you keep ${d2cMargin.toFixed(1)}% profit.`,
          action: 'Put coupon flyers in your parcel boxes giving ₹100 off when customers reorder on your website.'
        });
      }
    }

    // Top Profit Champion
    const champions = [...analyzedProducts].sort((a, b) => b.totalNetProfit - a.totalNetProfit);
    if (champions.length > 0 && champions[0].totalNetProfit > 0) {
      list.push({
        id: 'rec-scale',
        type: 'growth',
        title: `Top Earner: ${champions[0].name} Makes ${Math.round((champions[0].totalNetProfit / (metrics.netProfit || 1)) * 100)}% of Your Entire Store Profit`,
        impact: `+${formatPrice(Math.round(champions[0].totalNetProfit))} Profit`,
        summary: `With a strong ${champions[0].marginPercent.toFixed(1)}% profit, this is your single most profitable item.`,
        action: 'Order more stock in bulk from your supplier to get lower wholesale rates and increase ad budget.'
      });
    }

    return list;
  }, [analyzedProducts, metrics, currency]);

  // Dynamic Order Reconciliation Data
  const reconciliationData = useMemo(() => {
    if (analyzedProducts.length === 0) return [];

    const baseDates = ['24 Nov 2026', '23 Nov 2026', '22 Nov 2026', '21 Nov 2026', '20 Nov 2026', '19 Nov 2026', '18 Nov 2026'];
    const orders = [];

    analyzedProducts.forEach((prod, index) => {
      const price = prod.price;
      const fee = prod.unitFee;
      const expectedPayout = price - fee;

      // Clean Matched Order
      orders.push({
        id: `OD-IN-${10000 + index * 142 + 21}`,
        date: baseDates[index % baseDates.length],
        productName: prod.name,
        channel: prod.channel,
        sellingPrice: price,
        expectedPayout: expectedPayout,
        actualSettled: expectedPayout,
        discrepancy: 0,
        status: 'matched',
        auditLabel: 'Clean Match',
        evidence: `Full expected payout deposited to bank account.`
      });

      // Special Discrepancies to demonstrate real leaks in India
      if (prod.channel.toLowerCase().includes('amazon') && index === 0) {
        // Commission overcharge
        const chargedFee = price * 0.18; // charged 18% instead of 15%
        const actualPayout = price - chargedFee;
        const diff = expectedPayout - actualPayout;
        orders.push({
          id: `OD-AMZ-${89210 + index}`,
          date: '23 Nov 2026',
          productName: prod.name,
          channel: prod.channel,
          sellingPrice: price,
          expectedPayout: expectedPayout,
          actualSettled: actualPayout,
          discrepancy: Math.round(diff * 100) / 100,
          status: 'commission_overcharge',
          auditLabel: 'Commission Overcharge',
          evidence: `Amazon charged 18% fee instead of contractual 15% category referral rate.`
        });
      }

      if (prod.channel.toLowerCase().includes('flipkart')) {
        // Weight slab error
        const extraWeightCharge = 72.00;
        const actualPayout = expectedPayout - extraWeightCharge;
        orders.push({
          id: `OD-FK-${76510 + index}`,
          date: '22 Nov 2026',
          productName: prod.name,
          channel: prod.channel,
          sellingPrice: price,
          expectedPayout: expectedPayout,
          actualSettled: actualPayout,
          discrepancy: extraWeightCharge,
          status: 'weight_slab_leak',
          auditLabel: 'Weight Slab Error',
          evidence: `Ekart courier scanned parcel as 1.5kg slab instead of actual 500g volumetric weight.`
        });
      }

      if (prod.channel.toLowerCase().includes('meesho') || (prod.channel.toLowerCase().includes('amazon') && index === 6)) {
        // RTO return leak
        const rtoReverseFee = 110.00;
        const actualPayout = expectedPayout - rtoReverseFee;
        orders.push({
          id: `OD-RTO-${33100 + index}`,
          date: '21 Nov 2026',
          productName: prod.name,
          channel: prod.channel,
          sellingPrice: price,
          expectedPayout: expectedPayout,
          actualSettled: actualPayout,
          discrepancy: rtoReverseFee,
          status: 'rto_leak',
          auditLabel: 'RTO Return Fee Leak',
          evidence: `Customer return processed. Duplicate reverse shipping deducted without fee reversal.`
        });
      }
    });

    // Add 1 pending order
    if (analyzedProducts.length > 0) {
      const p = analyzedProducts[0];
      orders.push({
        id: `OD-PENDING-9941`,
        date: '25 Nov 2026',
        productName: p.name,
        channel: p.channel,
        sellingPrice: p.price,
        expectedPayout: p.price - p.unitFee,
        actualSettled: 0,
        discrepancy: 0,
        status: 'pending',
        auditLabel: 'Pending Settlement',
        evidence: `Order delivered. Payment scheduled in next bank settlement cycle.`
      });
    }

    return orders;
  }, [analyzedProducts]);

  const reconciliationMetrics = useMemo(() => {
    const totalOrdersCount = analyzedProducts.reduce((acc, p) => acc + p.unitsSold, 0) || reconciliationData.length;
    const cleanOrders = reconciliationData.filter(o => o.status === 'matched');
    const discrepancyOrders = reconciliationData.filter(o => o.status !== 'matched' && o.status !== 'pending');
    const pendingOrders = reconciliationData.filter(o => o.status === 'pending');

    const totalDiscrepancy = discrepancyOrders.reduce((acc, o) => acc + o.discrepancy, 0);
    const pendingPayout = pendingOrders.reduce((acc, o) => acc + o.expectedPayout, 0);
    const reconciliationRate = reconciliationData.length > 0
      ? Math.round((cleanOrders.length / reconciliationData.length) * 100)
      : 100;

    return {
      totalOrdersCount,
      cleanOrdersCount: cleanOrders.length,
      discrepancyOrdersCount: discrepancyOrders.length,
      pendingOrdersCount: pendingOrders.length,
      totalDiscrepancy,
      pendingPayout,
      reconciliationRate
    };
  }, [reconciliationData, analyzedProducts]);

  // Actions
  const addProduct = (newProduct) => {
    const item = {
      id: 'prod-' + Date.now(),
      name: newProduct.name || 'Unnamed Product',
      channel: newProduct.channel || 'Shopify India',
      price: Number(newProduct.price) || 0,
      cost: Number(newProduct.cost) || 0,
      feePercent: Number(newProduct.feePercent) || 0,
      adSpend: Number(newProduct.adSpend) || 0,
      unitsSold: Number(newProduct.unitsSold) || 1,
      category: newProduct.category || 'General'
    };
    setProducts(prev => [item, ...prev]);
    setActiveTab('dashboard');
    showToast(`Added "${item.name}" & calculated INR profit metrics!`, 'success');
    try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch {}
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed.', 'info');
  };

  const clearData = () => {
    setProducts([]);
    localStorage.removeItem('profit_iq_products');
    setActiveTab('input');
    showToast('Clean fresh start: all data cleared.', 'info');
  };

  // CSV / Excel Paste Ingestion
  const importCSV = (text) => {
    if (!text || !text.trim()) {
      showToast('No data detected to import.', 'warning');
      return;
    }

    try {
      const lines = text.trim().split(/\r?\n/);
      if (lines.length < 2) {
        showToast('Please provide at least a header row and one data row.', 'warning');
        return;
      }

      const firstLine = lines[0];
      const delimiter = firstLine.includes('\t') ? '\t' : ',';

      const parsed = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(delimiter).map(s => s.trim().replace(/^["']|["']$/g, ''));
        if (row.length >= 4 && row[0]) {
          // Clean currency symbols if user pasted ₹ or Rs or $
          const cleanNum = (str) => parseFloat((str || '0').replace(/[^0-9.-]+/g, '')) || 0;

          parsed.push({
            id: 'import-' + Date.now() + '-' + i,
            name: row[0],
            channel: row[1] || 'Amazon India',
            price: cleanNum(row[2]),
            cost: cleanNum(row[3]),
            feePercent: cleanNum(row[4]) || 12.0,
            adSpend: cleanNum(row[5]),
            unitsSold: parseInt(row[6], 10) || 50,
            category: 'Imported'
          });
        }
      }

      if (parsed.length > 0) {
        setProducts(parsed);
        setActiveTab('dashboard');
        showToast(`Successfully imported ${parsed.length} products in Indian Rupee (₹)!`, 'success');
        try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } }); } catch {}
      } else {
        showToast('Could not parse rows. Please check column format.', 'warning');
      }
    } catch {
      showToast('Error parsing spreadsheet file.', 'warning');
    }
  };

  return (
    <ProfitContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        formatPrice,
        products: analyzedProducts,
        rawProducts: products,
        metrics,
        aiRecommendations,
        reconciliationData,
        reconciliationMetrics,
        addProduct,
        deleteProduct,
        clearData,
        importCSV,
        isPresentationOpen,
        setIsPresentationOpen,
        toast,
        showToast
      }}
    >
      {children}
    </ProfitContext.Provider>
  );
}

export function useProfit() {
  const context = useContext(ProfitContext);
  if (!context) throw new Error('useProfit must be used within ProfitProvider');
  return context;
}
