import React from 'react';
import { FileText, Download, Terminal, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, ZAxis } from 'recharts';

const shapData = [
  { feature: 'Core Temp', value: 0.38 },
  { feature: 'pH Level', value: 0.21 },
  { feature: 'Water Activity', value: 0.17 },
  { feature: 'Humidity', value: 0.06 },
  { feature: 'Packaging', value: -0.04 },
  { feature: 'Duration', value: -0.09 },
];

const limeDataPoint = [{ x: 118, y: 3.2, z: 1 }]; // The specific instance
const limeBoundaryDataSafe = Array.from({ length: 20 }).map(() => ({
  x: Math.random() * 20 + 90, // Temp
  y: Math.random() * 2 + 1,   // Time
  z: 1
}));
const limeBoundaryDataRisk = Array.from({ length: 20 }).map(() => ({
  x: Math.random() * 20 + 110,
  y: Math.random() * 2 + 3,
  z: 1
}));

const SectionXAI = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText color="var(--accent-blue)" /> HA-Net Explanation Report
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Why was Batch #502 flagged? — AI Decision Interpretability</p>
        </div>
        <button className="btn" style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)', color: 'var(--accent-amber)', borderColor: 'var(--accent-amber)' }}>
          <Download size={18} />
          Export PDF Compliance Report
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
        
        {/* SHAP Values Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb size={18} color="var(--accent-amber)" /> SHAP Feature Importance
          </h3>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Features pushing risk higher (red) vs lowering risk (green)
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shapData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="feature" type="category" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
                <ReferenceLine x={0} stroke="var(--text-muted)" />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {shapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? 'var(--accent-red)' : 'var(--accent-green)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LIME Visualization */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb size={18} color="var(--accent-blue)" /> LIME Local Decision Boundary
          </h3>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Local approximation around instance (Temp vs Time)
          </div>
          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
             {/* Decision Boundary Background (Simulated) */}
             <div style={{ position: 'absolute', top: 10, bottom: 30, left: 40, right: 10, background: 'linear-gradient(to top right, rgba(0,229,160,0.1) 40%, rgba(255,59,92,0.1) 60%)', zIndex: 0, borderRadius: 4 }}></div>
             
             <ResponsiveContainer width="100%" height="100%" style={{ position: 'relative', zIndex: 1 }}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" dataKey="x" name="Temp (°C)" stroke="var(--text-muted)" fontSize={12} domain={[90, 130]} />
                <YAxis type="number" dataKey="y" name="Time (min)" stroke="var(--text-muted)" fontSize={12} domain={[0, 6]} />
                <ZAxis type="number" range={[50, 50]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
                <Scatter name="Safe Region" data={limeBoundaryDataSafe} fill="var(--accent-green)" opacity={0.3} />
                <Scatter name="Risk Region" data={limeBoundaryDataRisk} fill="var(--accent-red)" opacity={0.3} />
                {/* The specific instance causing the flag */}
                <Scatter name="Batch #502" data={limeDataPoint} fill="var(--accent-amber)" shape="cross" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ color: 'var(--accent-green)' }}>●</span> Safe Examples</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ color: 'var(--accent-red)' }}>●</span> Risk Examples</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ color: 'var(--accent-amber)', fontSize: '1.2rem', lineHeight: 1 }}>+</span> Batch #502</span>
          </div>
        </div>

      </div>

      {/* Natural Language Report */}
      <div className="glass-card" style={{ flex: '0 0 auto' }}>
        <div style={{ 
          backgroundColor: '#000', 
          border: '1px solid var(--border)', 
          borderRadius: '8px', 
          padding: '1.5rem',
          fontFamily: '"Space Mono", monospace',
          color: 'var(--accent-green)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, var(--accent-red), transparent)', opacity: 0.5 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <Terminal size={16} /> <span style={{ fontSize: '0.875rem' }}>system@hanet:~$ cat report_502.txt</span>
          </div>
          
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.875rem' }}>
<span style={{ color: 'var(--accent-amber)' }}>⚠ HAZARD ANALYSIS REPORT — Batch #502</span>
────────────────────────────────────────
Risk Score: <span style={{ color: 'var(--accent-red)' }}>92%</span> | Classification: <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>CRITICAL</span>

<span style={{ color: 'var(--text-primary)' }}>Primary Driver:</span> Core Temperature recorded at 118°C exceeded 
the safe threshold of 121°C for 3.2 minutes — insufficient 
for F0 value compliance per FSSAI Schedule II.

<span style={{ color: 'var(--text-primary)' }}>Biological Risk:</span> Clostridium botulinum spore survival 
probability estimated at 73% based on Unit III thermal 
resistance models (D-value at 121°C = 0.21 min).

<span style={{ color: 'var(--text-primary)' }}>Regulatory Breach:</span> Non-compliant with CODEX STAN 121-1981 
and FSSAI FSS (Food Products Standards) Regulations 2011.

<span style={{ color: 'var(--accent-blue)' }}>Recommended Action:</span> Reject batch. Re-sterilize or dispose 
per SOP-BIO-007. Notify QA supervisor immediately.
          </pre>
        </div>
      </div>
    </div>
  );
};

// Simple CartesianGrid wrapper since Recharts might complain if it's missing in imports above
import { CartesianGrid } from 'recharts';

export default SectionXAI;
