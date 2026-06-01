import React, { useState, useEffect } from 'react';
import { Settings, ShieldAlert, Cpu, Lock, Sliders, RefreshCw, CheckCircle2 } from 'lucide-react';

const SectionSettings = () => {
  const [haccpLimits, setHaccpLimits] = useState({
    tempLimit: 121,
    durationLimit: 3.0,
    phLimit: 4.6,
    awLimit: 0.85
  });

  const [modelParams, setModelParams] = useState({
    learningRate: 0.001,
    tcnKernel: 3,
    attentionHeads: 8,
    activeStages: ['Pasteurization', 'Cooling', 'Packaging']
  });

  const [privacyParams, setPrivacyParams] = useState({
    dpEnabled: true,
    epsilon: 0.1,
    delta: '1e-5',
    clipNorm: 1.0
  });

  const [systemConfig, setSystemConfig] = useState({
    pollingInterval: 5,
    debugMode: true,
    uiTheme: 'Dark Industrial'
  });

  const [syncStatus, setSyncStatus] = useState('SYNCHRONIZED');

  // Load from localStorage on mount
  useEffect(() => {
    const savedHaccp = localStorage.getItem('hanet_haccp_limits');
    const savedModel = localStorage.getItem('hanet_model_params');
    const savedPrivacy = localStorage.getItem('hanet_privacy_params');
    const savedSystem = localStorage.getItem('hanet_system_config');

    if (savedHaccp) setHaccpLimits(JSON.parse(savedHaccp));
    if (savedModel) setModelParams(JSON.parse(savedModel));
    if (savedPrivacy) setPrivacyParams(JSON.parse(savedPrivacy));
    if (savedSystem) setSystemConfig(JSON.parse(savedSystem));
  }, []);

  // Sync to localStorage on update
  const triggerSync = (type, value) => {
    setSyncStatus('SYNCING...');
    localStorage.setItem(type, JSON.stringify(value));
    setTimeout(() => {
      setSyncStatus('SYNCHRONIZED');
    }, 600);
  };

  const handleHaccpChange = (key, value) => {
    const updated = { ...haccpLimits, [key]: value };
    setHaccpLimits(updated);
    triggerSync('hanet_haccp_limits', updated);
  };

  const handleModelChange = (key, value) => {
    const updated = { ...modelParams, [key]: value };
    setModelParams(updated);
    triggerSync('hanet_model_params', updated);
  };

  const handlePrivacyChange = (key, value) => {
    const updated = { ...privacyParams, [key]: value };
    setPrivacyParams(updated);
    triggerSync('hanet_privacy_params', updated);
  };

  const handleSystemChange = (key, value) => {
    const updated = { ...systemConfig, [key]: value };
    setSystemConfig(updated);
    triggerSync('hanet_system_config', updated);
  };

  const toggleStage = (stage) => {
    const active = modelParams.activeStages.includes(stage)
      ? modelParams.activeStages.filter(s => s !== stage)
      : [...modelParams.activeStages, stage];
    handleModelChange('activeStages', active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', overflowY: 'auto', paddingRight: '0.5rem' }}>
      
      {/* Header Panel */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={28} color="var(--accent-blue)" /> System Configuration
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Configure real-time safety thresholds, neural architectures, and distributed privacy parameters.</p>
        </div>
        
        {/* Sync Status Badge */}
        <div style={{
          backgroundColor: syncStatus === 'SYNCHRONIZED' ? 'rgba(0, 229, 160, 0.1)' : 'rgba(245, 166, 35, 0.1)',
          border: `1px solid ${syncStatus === 'SYNCHRONIZED' ? 'var(--accent-green)' : 'var(--accent-amber)'}`,
          color: syncStatus === 'SYNCHRONIZED' ? 'var(--accent-green)' : 'var(--accent-amber)',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 700,
          fontFamily: '"Space Mono", monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {syncStatus === 'SYNCHRONIZED' ? <CheckCircle2 size={14} /> : <RefreshCw size={14} className="animate-data-flow" />}
          LOCAL STORAGE: {syncStatus}
        </div>
      </header>

      {/* Grid of Control Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
        
        {/* Card 1: HACCP Safety Limits */}
        <div className="glass-card glow-card-amber" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
            <ShieldAlert size={18} color="var(--accent-amber)" /> HACCP Critical Control Limits
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Sterilization Temperature (CL)</label>
                <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{haccpLimits.tempLimit}°C</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="140" 
                value={haccpLimits.tempLimit} 
                onChange={(e) => handleHaccpChange('tempLimit', Number(e.target.value))} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>100°C</span>
                <span>Target: 121°C</span>
                <span>140°C</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Minimum Duration Limit (F0)</label>
                <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{haccpLimits.durationLimit} min</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="0.5"
                value={haccpLimits.durationLimit} 
                onChange={(e) => handleHaccpChange('durationLimit', Number(e.target.value))} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>1 min</span>
                <span>Target: 3.0 min</span>
                <span>10 min</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Maximum Safety pH Level</label>
                <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>pH {haccpLimits.phLimit}</span>
              </div>
              <input 
                type="range" 
                min="3.0" 
                max="6.0" 
                step="0.1"
                value={haccpLimits.phLimit} 
                onChange={(e) => handleHaccpChange('phLimit', Number(e.target.value))} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>3.0</span>
                <span>Anomalous Limit: 4.6</span>
                <span>6.0</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Maximum Water Activity (Aw)</label>
                <span className="mono-text" style={{ color: 'var(--accent-amber)' }}>{haccpLimits.awLimit} Aw</span>
              </div>
              <input 
                type="range" 
                min="0.75" 
                max="0.95" 
                step="0.01"
                value={haccpLimits.awLimit} 
                onChange={(e) => handleHaccpChange('awLimit', Number(e.target.value))} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>0.75 Aw</span>
                <span>Safety Limit: 0.85 Aw</span>
                <span>0.95 Aw</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Neural Model Config */}
        <div className="glass-card glow-card-blue" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
            <Cpu size={18} color="var(--accent-blue)" /> HA-Net Neural Hyperparameters
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>TCN Conv Kernel Size</label>
                <select value={modelParams.tcnKernel} onChange={(e) => handleModelChange('tcnKernel', Number(e.target.value))}>
                  <option value={2}>2 (Local Context)</option>
                  <option value={3}>3 (Balanced Context)</option>
                  <option value={5}>5 (Broad Context)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Transformer Attention Heads</label>
                <select value={modelParams.attentionHeads} onChange={(e) => handleModelChange('attentionHeads', Number(e.target.value))}>
                  <option value={4}>4 Heads</option>
                  <option value={8}>8 Heads (Standard)</option>
                  <option value={16}>16 Heads (Complex)</option>
                </select>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Gradient Descent Learning Rate</label>
                <span className="mono-text" style={{ color: 'var(--accent-blue)' }}>{modelParams.learningRate}</span>
              </div>
              <input 
                type="range" 
                min="-4" 
                max="-2" 
                step="0.1"
                value={Math.log10(modelParams.learningRate)} 
                onChange={(e) => handleModelChange('learningRate', Math.round(Math.pow(10, Number(e.target.value)) * 10000) / 10000)} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>0.0001 (Slow)</span>
                <span>0.001 (Standard)</span>
                <span>0.01 (Aggressive)</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Active Time-Series Stages</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Pre-processing', 'Pasteurization', 'Cooling', 'Packaging', 'Storage'].map(stage => {
                  const isActive = modelParams.activeStages.includes(stage);
                  return (
                    <button
                      key={stage}
                      onClick={() => toggleStage(stage)}
                      className="btn"
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        borderColor: isActive ? 'var(--accent-blue)' : 'var(--border)',
                        backgroundColor: isActive ? 'rgba(77, 158, 255, 0.1)' : 'transparent',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                        borderRadius: '6px'
                      }}
                    >
                      {isActive ? '✓ ' : '+ '} {stage}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                *Disabling a stage filters its sensor embeddings out of the Transformer Attention loop.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Federated Privacy */}
        <div className="glass-card glow-card-green" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
            <Lock size={18} color="var(--accent-green)" /> Federated Privacy & Encryption
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Differential Privacy (DP)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Inject noise to local node gradients before centralizing</div>
              </div>
              <input 
                type="checkbox" 
                checked={privacyParams.dpEnabled}
                onChange={(e) => handlePrivacyChange('dpEnabled', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            {privacyParams.dpEnabled && (
              <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Privacy Budget (Epsilon ε)</label>
                    <span className="mono-text" style={{ color: 'var(--accent-green)' }}>ε = {privacyParams.epsilon}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.01" 
                    max="1.0" 
                    step="0.01"
                    value={privacyParams.epsilon} 
                    onChange={(e) => handlePrivacyChange('epsilon', Number(e.target.value))} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>0.01 (High Privacy)</span>
                    <span>0.1 (Balanced)</span>
                    <span>1.0 (Low Privacy)</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Delta Parameter (δ)</label>
                    <input 
                      type="text" 
                      value={privacyParams.delta} 
                      onChange={(e) => handlePrivacyChange('delta', e.target.value)} 
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Gradient Clip Norm ($C$)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={privacyParams.clipNorm} 
                      onChange={(e) => handlePrivacyChange('clipNorm', Number(e.target.value))} 
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card 4: General Systems Options */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem' }}>
            <Sliders size={18} color="var(--text-muted)" /> General telemetry options
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Telemetry Autosave Polling Interval</label>
                <span className="mono-text" style={{ color: 'var(--accent-blue)' }}>{systemConfig.pollingInterval} seconds</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={systemConfig.pollingInterval} 
                onChange={(e) => handleSystemChange('pollingInterval', Number(e.target.value))} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>1s (Real-time)</span>
                <span>5s (Standard)</span>
                <span>30s (Sparse)</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Neural Embeddings Trace Log</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Log mathematical tensors to browser console in developer mode</div>
              </div>
              <input 
                type="checkbox" 
                checked={systemConfig.debugMode}
                onChange={(e) => handleSystemChange('debugMode', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Scientific UI Theme Profile</label>
              <select value={systemConfig.uiTheme} onChange={(e) => handleSystemChange('uiTheme', e.target.value)}>
                <option>Dark Industrial (Primary)</option>
                <option>Deep Submarine Blue</option>
                <option>Cyberpunk Amber Alert</option>
              </select>
            </div>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              *Local storage persistence operates on asynchronous triggers. Custom setups will override simulated runtime batches.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SectionSettings;
