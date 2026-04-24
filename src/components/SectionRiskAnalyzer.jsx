import React, { useState } from 'react';
import { Play, Loader2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SectionRiskAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [inputs, setInputs] = useState({
    batchId: 'BATCH-2024-0847',
    productType: 'Canned Vegetables',
    stage: 'Pasteurization',
    coreTemp: 118,
    phLevel: 4.8,
    waterActivity: 0.88,
    duration: 110,
    humidity: 65
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    // Simulate network delay and processing
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 92,
        classification: 'CRITICAL',
        confidence: 94.2,
        hazard: 'Clostridium botulinum (Biological)',
        breakdown: [
          { name: 'Pre-processing', risk: 15 },
          { name: 'Pasteurization', risk: 85 }, // High risk due to temp/time
          { name: 'Cooling', risk: 20 },
          { name: 'Packaging', risk: 10 },
          { name: 'Storage', risk: 5 }
        ]
      });
    }, 2000);
  };

  // Semi-circle gauge math
  const getGaugePath = (percentage) => {
    const radius = 80;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return { circumference, strokeDashoffset };
  };

  const scoreColor = result?.score > 80 ? 'var(--accent-red)' : result?.score > 40 ? 'var(--accent-amber)' : 'var(--accent-green)';
  const gaugeAnimStyle = result ? { strokeDashoffset: getGaugePath(result.score).strokeDashoffset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0.7, 0.1, 1)' } : {};

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
      {/* Input Panel */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0' }}>Real-Time Risk Analyzer</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Batch ID</label>
            <input type="text" value={inputs.batchId} onChange={(e) => handleInputChange('batchId', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Product Type</label>
            <select value={inputs.productType} onChange={(e) => handleInputChange('productType', e.target.value)}>
              <option>Canned Vegetables</option>
              <option>Dairy</option>
              <option>Ready-to-Eat Meat</option>
              <option>Frozen Seafood</option>
              <option>Beverages</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Processing Stage</label>
            <select value={inputs.stage} onChange={(e) => handleInputChange('stage', e.target.value)}>
              <option>Pre-processing</option>
              <option>Pasteurization</option>
              <option>Cooling</option>
              <option>Packaging</option>
              <option>Storage</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--accent-blue)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Sensor Telemetry Inputs</h3>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem' }}>Core Temperature (°C)</label>
              <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{inputs.coreTemp}°C</span>
            </div>
            <input type="range" min="0" max="150" value={inputs.coreTemp} onChange={(e) => handleInputChange('coreTemp', Number(e.target.value))} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem' }}>pH Level</label>
              <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{inputs.phLevel}</span>
            </div>
            <input type="range" min="0" max="14" step="0.1" value={inputs.phLevel} onChange={(e) => handleInputChange('phLevel', Number(e.target.value))} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem' }}>Water Activity (Aw)</label>
              <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{inputs.waterActivity}</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={inputs.waterActivity} onChange={(e) => handleInputChange('waterActivity', Number(e.target.value))} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem' }}>Processing Duration (min)</label>
              <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{inputs.duration}m</span>
            </div>
            <input type="range" min="0" max="120" value={inputs.duration} onChange={(e) => handleInputChange('duration', Number(e.target.value))} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem' }}>Humidity (%)</label>
              <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{inputs.humidity}%</span>
            </div>
            <input type="range" min="0" max="100" value={inputs.humidity} onChange={(e) => handleInputChange('humidity', Number(e.target.value))} />
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1.5rem', height: '3rem' }}
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          {analyzing ? <Loader2 className="animate-data-flow" /> : <Play size={20} />}
          {analyzing ? 'ANALYZING PIPELINE...' : 'RUN HA-NET ANALYSIS'}
        </button>
      </div>

      {/* Output Panel */}
      <div className={`glass-card ${result?.score > 80 ? 'glow-card-red' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0', color: 'var(--text-muted)' }}>Analysis Output</h2>
        
        {analyzing && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)' }}>
            <div style={{ position: 'relative', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" className="animate-data-flow" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-amber)" strokeWidth="4" strokeDasharray="60 40" />
              </svg>
              <Activity size={32} />
            </div>
            <div style={{ marginTop: '1rem', fontFamily: '"Space Mono", monospace' }}>Processing Neural Embeddings...</div>
          </div>
        )}

        {!analyzing && !result && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            Enter batch telemetry parameters and run the analysis to view HA-Net predictions.
          </div>
        )}

        {!analyzing && result && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'sweep 0.5s ease-out' }}>
            {/* Gauge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ position: 'relative', width: '200px', height: '100px', overflow: 'hidden' }}>
                <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%' }}>
                  <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={scoreColor} strokeWidth="20" strokeLinecap="round" 
                    strokeDasharray={getGaugePath(100).circumference} 
                    strokeDashoffset={getGaugePath(0).circumference} 
                    style={gaugeAnimStyle}
                  />
                </svg>
                <div style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, fontFamily: '"Space Mono", monospace', color: scoreColor, lineHeight: 1 }}>
                  {result.score}%
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Risk Score
              </div>
            </div>

            {/* Badges & Confidence */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div className={`badge badge-${result.classification === 'CRITICAL' ? 'critical' : result.classification === 'WARNING' ? 'warning' : 'safe'} ${result.classification === 'CRITICAL' ? 'animate-pulse-red' : ''}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                {result.classification === 'CRITICAL' ? <AlertTriangle size={18} style={{ marginRight: '0.5rem' }} /> : <ShieldCheck size={18} style={{ marginRight: '0.5rem' }} />}
                CLASSIFICATION: {result.classification}
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '999px', display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontFamily: '"Space Mono", monospace' }}>
                Confidence: {result.confidence}%
              </div>
            </div>

            {/* Hazard Alert */}
            <div style={{ backgroundColor: 'rgba(255, 59, 92, 0.1)', border: '1px solid var(--accent-red)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem' }}>
              <div style={{ color: 'var(--accent-red)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>Predicted Hazard</div>
              <div style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} color="var(--accent-red)" />
                {result.hazard}
              </div>
            </div>

            {/* Breakdown Chart */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Stage-by-Stage Risk Contribution</div>
              <div style={{ flex: 1, minHeight: '150px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.breakdown} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} />
                    <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                      {result.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.risk > 50 ? 'var(--accent-red)' : entry.risk > 20 ? 'var(--accent-amber)' : 'var(--accent-green)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SectionRiskAnalyzer;
