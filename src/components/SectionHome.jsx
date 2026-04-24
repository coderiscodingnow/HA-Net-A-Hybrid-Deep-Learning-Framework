import React from 'react';
import { AlertCircle, CheckCircle, Activity, ShieldCheck, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockChartData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  dairy: Math.random() * 20 + 10,
  seafood: Math.random() * 30 + 15,
  meat: i === 14 ? 85 : Math.random() * 25 + 5 // Spike at 14:00
}));

const mockBatches = [
  { id: 'BATCH-0847', product: 'Canned Tomatoes', stage: 'Pasteurization', risk: 12, status: 'SAFE' },
  { id: 'BATCH-0502', product: 'Canned Beans', stage: 'Cooling', risk: 92, status: 'CRITICAL' },
  { id: 'BATCH-0613', product: 'Dairy UHT', stage: 'Packaging', risk: 34, status: 'WARNING' },
  { id: 'BATCH-0721', product: 'Frozen Shrimp', stage: 'Pre-processing', risk: 8, status: 'SAFE' },
  { id: 'BATCH-0834', product: 'RTE Chicken', stage: 'Storage', risk: 67, status: 'WARNING' },
  { id: 'BATCH-0848', product: 'Canned Tomatoes', stage: 'Cooling', risk: 15, status: 'SAFE' },
  { id: 'BATCH-0849', product: 'Beverages', stage: 'Packaging', risk: 5, status: 'SAFE' },
];

const SectionHome = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Executive Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>System-wide overview of food safety pipeline and risk assessment.</p>
        </div>
        <div className="badge badge-safe">
          <CheckCircle size={14} style={{ marginRight: '0.5rem' }} />
          System Operational
        </div>
      </header>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card glow-card-blue">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Batches Analyzed Today
            <Activity size={16} color="var(--accent-blue)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: '"Space Mono", monospace' }}>
            247
          </div>
        </div>
        
        <div className="glass-card glow-card-red animate-pulse-red">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Active Hazard Flags
            <AlertCircle size={16} color="var(--accent-red)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-red)', fontFamily: '"Space Mono", monospace' }}>
            3
          </div>
        </div>

        <div className="glass-card glow-card-green" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Compliance Rate</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-green)', fontFamily: '"Space Mono", monospace' }}>98.2%</div>
          </div>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="10" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-green)" strokeWidth="10" 
                strokeDasharray="283" strokeDashoffset="28" className="animate-sweep" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="glass-card glow-card-amber">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Model Confidence Avg
            <ShieldCheck size={16} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-amber)', fontFamily: '"Space Mono", monospace' }}>
            94.7%
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1, minHeight: 400 }}>
        {/* Risk Timeline Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--accent-blue)" /> Risk Timeline (24h)
          </h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontFamily: '"Space Mono", monospace' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="dairy" stroke="var(--accent-blue)" name="Dairy Products" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="seafood" stroke="var(--accent-amber)" name="Frozen Seafood" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="meat" stroke="var(--accent-red)" name="RTE Meat" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Batch Table */}
        <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Live Batch Monitoring</h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Product</th>
                  <th>Risk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockBatches.map(batch => (
                  <tr key={batch.id}>
                    <td style={{ color: 'var(--accent-blue)' }}>{batch.id}</td>
                    <td>{batch.product}</td>
                    <td>
                      <div style={{ width: '100%', height: 4, backgroundColor: 'var(--border)', borderRadius: 2, marginTop: 4 }}>
                        <div style={{ 
                          height: '100%', 
                          borderRadius: 2, 
                          width: `${batch.risk}%`,
                          backgroundColor: batch.risk > 80 ? 'var(--accent-red)' : batch.risk > 30 ? 'var(--accent-amber)' : 'var(--accent-green)'
                        }}></div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${batch.status.toLowerCase()}`}>
                        {batch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alert Ticker */}
      <div style={{ 
        backgroundColor: 'rgba(255, 59, 92, 0.1)', 
        border: '1px solid rgba(255, 59, 92, 0.3)', 
        borderRadius: '8px', 
        padding: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: 'auto'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--accent-red)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} className="animate-pulse-red" /> ALERTS
        </div>
        <div className="ticker-wrap" style={{ flex: 1 }}>
          <div className="ticker-content" style={{ color: 'var(--text-primary)', fontFamily: '"Space Mono", monospace', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--accent-red)', marginRight: '2rem' }}>⚠ Batch #502 — Temperature anomaly detected in pasteurization stage</span>
            <span style={{ color: 'var(--accent-green)', marginRight: '2rem' }}>✅ Batch #498 cleared — FSSAI compliant</span>
            <span style={{ color: 'var(--accent-amber)', marginRight: '2rem' }}>⚠ Batch #613 — pH level warning, secondary check required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHome;
