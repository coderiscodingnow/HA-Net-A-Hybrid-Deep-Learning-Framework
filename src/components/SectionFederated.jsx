import React, { useEffect, useState } from 'react';
import { Server, Lock, Activity, ShieldCheck, DownloadCloud, UploadCloud } from 'lucide-react';

const factories = [
  { id: 'A', name: 'Mumbai', size: '24 GB', acc: '93.2%', x: 50, y: 50 },
  { id: 'B', name: 'Delhi', size: '18 GB', acc: '94.5%', x: 800, y: 100 },
  { id: 'C', name: 'Bangalore', size: '32 GB', acc: '96.1%', x: 850, y: 350 },
  { id: 'D', name: 'Chennai', size: '21 GB', acc: '92.8%', x: 150, y: 400 },
  { id: 'E', name: 'Pune', size: '15 GB', acc: '91.4%', x: 450, y: 450 },
];

const mockLogs = [
  "[10:42:01] INFO: Initializing Federated Round 142...",
  "[10:42:03] SYNC: Broadcasting Global Model v3.7.1 to 5 nodes.",
  "[10:42:08] Node A (Mumbai): Local training completed. Loss: 0.124",
  "[10:42:09] Node D (Chennai): Local training completed. Loss: 0.142",
  "[10:42:11] Node C (Bangalore): Local training completed. Loss: 0.098",
  "[10:42:15] Node B (Delhi): Local training completed. Loss: 0.111",
  "[10:42:16] Node E (Pune): Local training completed. Loss: 0.156",
  "[10:42:18] AGG: Receiving encrypted weight updates...",
  "[10:42:20] PRIVACY: Applying Differential Privacy (ε=0.1, δ=1e-5)",
  "[10:42:22] AGG: Secure aggregation successful. FedAvg completed.",
  "[10:42:24] EVAL: New Global Accuracy: 94.1% (+0.2%)",
  "[10:42:25] INFO: Committing Global Model v3.7.2.",
  "[10:42:26] INFO: Sleeping for 300s before next round."
];

const SectionFederated = () => {
  const [logs, setLogs] = useState([]);
  const [roundProgress, setRoundProgress] = useState(0);

  useEffect(() => {
    // Simulate log streaming
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[i]]);
        setRoundProgress((i / mockLogs.length) * 100);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <header>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Server color="var(--accent-blue)" /> Federated Learning Network Monitor
        </h2>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Privacy-preserving distributed training across multiple manufacturing facilities.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1 }}>
        
        {/* Architecture Diagram */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <h3 style={{ margin: '0 0 1rem 0', zIndex: 1 }}>Network Topology</h3>
          
          <div style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 1000 500">
              
              {/* Connections */}
              {factories.map((f, i) => (
                <g key={`conn-${i}`}>
                  {/* Upload flow */}
                  <line 
                    x1={f.x} y1={f.y} x2={500} y2={250} 
                    stroke="var(--accent-blue)" 
                    strokeWidth="2" 
                    strokeDasharray="10 10" 
                    className="animate-data-flow" 
                    opacity="0.4"
                  />
                  {/* Download flow (reverse animation by just having it static or different style) */}
                  <line 
                    x1={500} y1={250} x2={f.x} y2={f.y} 
                    stroke="var(--accent-amber)" 
                    strokeWidth="1" 
                    opacity="0.2"
                  />
                </g>
              ))}

              {/* Central Node */}
              <g transform="translate(500, 250)">
                <circle r="60" fill="rgba(17, 24, 39, 0.9)" stroke="var(--accent-blue)" strokeWidth="3" className="glow-card-blue" />
                <circle r="75" fill="none" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="5 5" className="animate-data-flow" opacity="0.5" />
                <Server x="-16" y="-25" color="var(--accent-blue)" size={32} />
                <text x="0" y="15" textAnchor="middle" fill="var(--text-primary)" fontFamily='"Sora", sans-serif' fontSize="14" fontWeight="600">Global</text>
                <text x="0" y="30" textAnchor="middle" fill="var(--text-muted)" fontFamily='"Space Mono", monospace' fontSize="10">Model Server</text>
              </g>

              {/* Factory Nodes */}
              {factories.map((f, i) => (
                <g key={`node-${i}`} transform={`translate(${f.x}, ${f.y})`}>
                  <rect x="-60" y="-40" width="120" height="80" rx="8" fill="rgba(17, 24, 39, 0.9)" stroke="var(--border)" strokeWidth="2" />
                  <text x="-50" y="-20" fill="var(--text-primary)" fontFamily='"Sora", sans-serif' fontSize="14" fontWeight="600">{f.name}</text>
                  <text x="-50" y="0" fill="var(--text-muted)" fontFamily='"Space Mono", monospace' fontSize="10">Data: {f.size}</text>
                  <text x="-50" y="15" fill="var(--text-muted)" fontFamily='"Space Mono", monospace' fontSize="10">Acc: <tspan fill="var(--accent-green)">{f.acc}</tspan></text>
                  <circle cx="45" cy="-25" r="4" fill="var(--accent-green)" className="animate-pulse-red" style={{ animationDuration: `${2 + Math.random()}s` }} />
                </g>
              ))}

            </svg>
            
            <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ width: 30, height: 2, borderBottom: '2px dashed var(--accent-blue)' }}></div> Upload Gradient Updates
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ width: 30, height: 1, backgroundColor: 'var(--accent-amber)', opacity: 0.5 }}></div> Broadcast Global Weights
              </div>
            </div>
          </div>
        </div>

        {/* Status Panel & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card glow-card-green">
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Training Status</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Version</div>
                <div className="mono-text" style={{ fontSize: '1.25rem', color: 'var(--accent-blue)' }}>v3.7.2</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fed Round</div>
                <div className="mono-text" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>142 / 200</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Nodes</div>
                <div className="mono-text" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>5 / 5</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Acc.</div>
                <div className="mono-text" style={{ fontSize: '1.25rem', color: 'var(--accent-green)' }}>94.1%</div>
              </div>
            </div>

            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              <span>Round Progress</span>
              <span className="mono-text">{Math.round(roundProgress)}%</span>
            </div>
            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--border)', borderRadius: 3 }}>
              <div style={{ width: `${roundProgress}%`, height: '100%', backgroundColor: 'var(--accent-blue)', borderRadius: 3, transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(0, 229, 160, 0.05)', 
            border: '1px solid var(--accent-green)', 
            borderRadius: '8px', 
            padding: '1rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <Lock size={20} color="var(--accent-green)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              <strong style={{ color: 'var(--accent-green)', display: 'block', marginBottom: '0.25rem' }}>Differential Privacy Active: ε = 0.1</strong>
              No raw data leaves factory premises. Compliant with IT Act 2000 & GDPR Article 25.
            </div>
          </div>

          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.2)', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={14} /> Aggregation Log
            </div>
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#000', fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes('INFO') ? 'var(--text-muted)' : log.includes('SYNC') || log.includes('AGG') ? 'var(--accent-blue)' : log.includes('EVAL') ? 'var(--accent-green)' : log.includes('PRIVACY') ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                  {log}
                </div>
              ))}
              {roundProgress < 100 && (
                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div className="animate-pulse-red" style={{ width: 6, height: 6, backgroundColor: 'var(--accent-amber)', borderRadius: '50%' }}></div> Waiting for node computation...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SectionFederated;
