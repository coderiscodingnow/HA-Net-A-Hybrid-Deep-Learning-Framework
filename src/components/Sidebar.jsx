import React from 'react';
import { Home, Network, Activity, FileText, Cpu, Server, Settings, Hexagon } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: <Network size={20} /> },
    { id: 'risk-analyzer', label: 'Risk Analyzer', icon: <Activity size={20} /> },
    { id: 'xai', label: 'XAI Reports', icon: <FileText size={20} /> },
    { id: 'gan', label: 'GAN Simulator', icon: <Cpu size={20} /> },
    { id: 'federated', label: 'Federated Network', icon: <Server size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#060B18',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0'
    }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
          <Hexagon size={28} style={{ fill: 'rgba(77, 158, 255, 0.2)' }} />
          <h1 style={{ fontSize: '1.5rem', margin: 0, fontFamily: '"Space Mono", monospace', letterSpacing: '-0.5px' }}>HA-Net</h1>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          HACCP AI Framework v1.0
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: activeSection === item.id ? 'rgba(77, 158, 255, 0.1)' : 'transparent',
              color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: '"Sora", sans-serif',
              fontWeight: activeSection === item.id ? '600' : '400',
              transition: 'all 0.2s ease',
              borderLeft: activeSection === item.id ? '3px solid var(--accent-blue)' : '3px solid transparent'
            }}
          >
            <span style={{ color: activeSection === item.id ? 'var(--accent-blue)' : 'inherit' }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: '1.5rem', marginTop: 'auto' }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6
        }}>
          <div style={{ color: 'var(--accent-amber)', fontWeight: '600', marginBottom: '0.25rem' }}>Model Status</div>
          <div>TCN-Transformer Hybrid</div>
          <div>Dataset: SynFoodSafe-2024</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: 'var(--accent-green)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-green)' }}></div>
            FSSAI Compliant
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
