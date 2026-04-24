import React, { useState } from 'react';
import { Cpu, RefreshCw, Info, Database } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const generateMockData = (type, count, isReal) => {
  return Array.from({ length: count }).map(() => ({
    x: isReal ? Math.random() * 20 + 90 : Math.random() * 30 + 100, // Temp
    y: isReal ? Math.random() * 2 + 1 : Math.random() * 4 + 2,      // Time
    z: isReal ? 1 : Math.random() * 50 + 50 // Risk score
  }));
};

const SectionGAN = () => {
  const [generating, setGenerating] = useState(false);
  const [hasData, setHasData] = useState(false);
  
  const [config, setConfig] = useState({
    scenario: 'Temperature Breach',
    severity: 'Severe',
    samples: 100
  });

  const [realData, setRealData] = useState(generateMockData('real', 50, true));
  const [ganData, setGanData] = useState([]);

  const mockGeneratedBatches = [
    { id: 'SYN-001', type: 'Temp Breach', params: 'T=131°C, t=4.2m', risk: 96, impact: 'FSSAI Sch II' },
    { id: 'SYN-002', type: 'Temp Breach', params: 'T=128°C, t=3.8m', risk: 88, impact: 'CODEX 121' },
    { id: 'SYN-003', type: 'Temp Breach', params: 'T=135°C, t=2.1m', risk: 99, impact: 'FSSAI Sch II' },
    { id: 'SYN-004', type: 'Temp Breach', params: 'T=126°C, t=5.0m', risk: 82, impact: 'Warning' },
    { id: 'SYN-005', type: 'Temp Breach', params: 'T=130°C, t=4.5m', risk: 94, impact: 'FSSAI Sch II' },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setHasData(false);
    setGanData([]);
    
    setTimeout(() => {
      setGenerating(false);
      setHasData(true);
      setGanData(generateMockData('gan', config.samples, false));
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Cpu color="var(--accent-blue)" /> GAN Failure Mode Simulator
        </h2>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Generating Synthetic HACCP Breach Scenarios for Model Robustness</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', flex: 1 }}>
        
        {/* Left Col: Config & Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card">
            <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
              <SlidersHorizontal size={18} /> Configuration
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Scenario Type</label>
              <select value={config.scenario} onChange={(e) => setConfig({ ...config, scenario: e.target.value })}>
                <option>Temperature Breach</option>
                <option>Biosafety Cabinet Failure</option>
                <option>Cold Chain Break</option>
                <option>pH Deviation</option>
                <option>Cross-contamination Event</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Severity Level</label>
              <select value={config.severity} onChange={(e) => setConfig({ ...config, severity: e.target.value })}>
                <option>Minor</option>
                <option>Moderate</option>
                <option>Severe</option>
                <option>Catastrophic</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Number of Samples</label>
                <span className="mono-text" style={{ color: 'var(--accent-blue)', fontSize: '0.875rem' }}>{config.samples}</span>
              </div>
              <input type="range" min="10" max="500" value={config.samples} onChange={(e) => setConfig({ ...config, samples: Number(e.target.value) })} />
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
              onClick={handleGenerate}
              disabled={generating}
            >
              <RefreshCw size={18} className={generating ? 'animate-data-flow' : ''} />
              {generating ? 'GENERATING...' : 'GENERATE SCENARIOS'}
            </button>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(77, 158, 255, 0.1)', 
            border: '1px solid rgba(77, 158, 255, 0.3)', 
            borderRadius: '8px', 
            padding: '1rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <Info size={24} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              Synthetic data generated using a <strong>Conditional GAN (cGAN)</strong> to simulate rare food safety failure events. Used to augment the training dataset and improve HA-Net model robustness for edge cases.
            </div>
          </div>
        </div>

        {/* Right Col: Output & Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Distribution Chart */}
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
            <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
              <Database size={18} color="var(--accent-green)" /> Data Distribution Space
            </h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" dataKey="x" name="Core Temp (°C)" stroke="var(--text-muted)" fontSize={12} domain={['auto', 'auto']} />
                  <YAxis type="number" dataKey="y" name="Duration (min)" stroke="var(--text-muted)" fontSize={12} domain={['auto', 'auto']} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Scatter name="Real Safe Data" data={realData} fill="var(--accent-green)" opacity={0.6} />
                  {hasData && <Scatter name="GAN-Generated Anomalies" data={ganData} fill="var(--accent-red)" opacity={0.6} />}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Generated Table */}
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Generated Synthetic Batches</h3>
            
            {hasData ? (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Scenario ID</th>
                      <th>Failure Type</th>
                      <th>Key Parameters</th>
                      <th>Risk</th>
                      <th>Regulatory Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGeneratedBatches.map((batch, i) => (
                      <tr key={i}>
                        <td style={{ color: 'var(--text-muted)' }}>{batch.id}</td>
                        <td>{batch.type}</td>
                        <td className="mono-text" style={{ color: 'var(--accent-amber)' }}>{batch.params}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 40, height: 4, backgroundColor: 'var(--border)', borderRadius: 2 }}>
                              <div style={{ width: `${batch.risk}%`, height: '100%', backgroundColor: 'var(--accent-red)', borderRadius: 2 }}></div>
                            </div>
                            <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-red)' }}>{batch.risk}</span>
                          </div>
                        </td>
                        <td><span className="badge badge-critical">{batch.impact}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {generating ? 'Generating synthetic tensor data...' : 'Configure parameters and generate scenarios to view synthetic output.'}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

// Import needed for missing SlidersHorizontal in above
import { SlidersHorizontal } from 'lucide-react';

export default SectionGAN;
