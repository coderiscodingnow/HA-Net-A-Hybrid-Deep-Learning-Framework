import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SectionHome from './components/SectionHome';
import SectionKnowledgeGraph from './components/SectionKnowledgeGraph';
import SectionRiskAnalyzer from './components/SectionRiskAnalyzer';
import SectionXAI from './components/SectionXAI';
import SectionGAN from './components/SectionGAN';
import SectionFederated from './components/SectionFederated';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <SectionHome />;
      case 'knowledge-graph':
        return <SectionKnowledgeGraph />;
      case 'risk-analyzer':
        return <SectionRiskAnalyzer />;
      case 'xai':
        return <SectionXAI />;
      case 'gan':
        return <SectionGAN />;
      case 'federated':
        return <SectionFederated />;
      case 'settings':
        return <div style={{ padding: '2rem' }}><h2>Settings (Placeholder)</h2></div>;
      default:
        return <SectionHome />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
