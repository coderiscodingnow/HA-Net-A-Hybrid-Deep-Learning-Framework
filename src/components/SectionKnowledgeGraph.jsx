import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Search, Info, SlidersHorizontal } from 'lucide-react';

const mockNodes = [
  { id: 'C_botulinum', label: 'C. botulinum', group: 'pathogen', desc: 'Anaerobic bacterium producing deadly neurotoxin.', risk: 'Critical' },
  { id: 'Salmonella', label: 'Salmonella spp.', group: 'pathogen', desc: 'Common cause of foodborne illness.', risk: 'High' },
  { id: 'Listeria', label: 'L. monocytogenes', group: 'pathogen', desc: 'Can grow at refrigeration temperatures.', risk: 'High' },
  { id: 'E_coli', label: 'E. coli O157:H7', group: 'pathogen', desc: 'Produces Shiga toxin.', risk: 'Critical' },
  
  { id: 'Pasteurization', label: 'Pasteurization (121°C/3m)', group: 'ccp', desc: 'Thermal process to destroy vegetative cells.', limit: 'Temp ≥ 121°C, Time ≥ 3m' },
  { id: 'pH_level', label: 'pH < 4.6', group: 'ccp', desc: 'Acidity level preventing C. botulinum growth.', limit: 'pH < 4.6' },
  { id: 'Cold_Chain', label: 'Cold Chain (≤4°C)', group: 'ccp', desc: 'Temperature control during storage and transport.', limit: 'Temp ≤ 4°C' },
  
  { id: 'FSSAI_Act', label: 'FSSAI FSS Act 2006', group: 'regulation', desc: 'Indian food safety regulation.' },
  { id: 'CODEX', label: 'CODEX STAN 121-1981', group: 'regulation', desc: 'International standard for canned foods.' },
  { id: 'EU_Reg', label: 'EU Reg 2073/2005', group: 'regulation', desc: 'Microbiological criteria for foodstuffs.' },

  { id: 'MAP', label: 'Modified Atmosphere Packaging', group: 'material', desc: 'Alters internal gas composition to extend shelf life.' },
  { id: 'Retort', label: 'Retort Processing', group: 'material', desc: 'Commercial sterilization in hermetically sealed containers.' }
];

const mockLinks = [
  { source: 'C_botulinum', target: 'Pasteurization', type: 'inhibited_by' },
  { source: 'C_botulinum', target: 'pH_level', type: 'inhibited_by' },
  { source: 'C_botulinum', target: 'Retort', type: 'associated_with' },
  { source: 'Listeria', target: 'Cold_Chain', type: 'inhibited_by' },
  { source: 'Salmonella', target: 'Pasteurization', type: 'inhibited_by' },
  { source: 'Pasteurization', target: 'CODEX', type: 'regulated_under' },
  { source: 'pH_level', target: 'FSSAI_Act', type: 'regulated_under' },
  { source: 'Cold_Chain', target: 'EU_Reg', type: 'regulated_under' },
  { source: 'MAP', target: 'C_botulinum', type: 'critical_for' }
];

const SectionKnowledgeGraph = () => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG contents
    d3.select(svgRef.current).selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    const filteredNodes = mockNodes.filter(n => {
      if (activeFilter === 'biological' && n.group !== 'pathogen') return false;
      return true;
    });
    
    // Create a set of valid node IDs for the filtered links
    const validNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = mockLinks.filter(l => validNodeIds.has(l.source) && validNodeIds.has(l.target));

    const simulation = d3.forceSimulation(filteredNodes)
      .force('link', d3.forceLink(filteredLinks).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Marker for arrows
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', 'var(--text-muted)')
      .attr('d', 'M0,-5L10,0L0,5');

    const link = svg.append('g')
      .attr('stroke', 'var(--text-muted)')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(filteredLinks)
      .join('line')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    const linkText = svg.append('g')
      .selectAll('text')
      .data(filteredLinks)
      .join('text')
      .attr('font-size', '10px')
      .attr('fill', 'var(--text-muted)')
      .attr('font-family', '"Space Mono", monospace')
      .text(d => d.type.replace('_', ' '));

    const node = svg.append('g')
      .selectAll('g')
      .data(filteredNodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d) => setSelectedNode(d));

    const getColor = (group) => {
      switch(group) {
        case 'pathogen': return 'var(--accent-red)';
        case 'ccp': return 'var(--accent-amber)';
        case 'regulation': return 'var(--accent-blue)';
        case 'material': return 'var(--accent-green)';
        default: return '#fff';
      }
    };

    node.append('circle')
      .attr('r', 12)
      .attr('fill', d => getColor(d.group))
      .attr('stroke', 'var(--bg-primary)')
      .attr('stroke-width', 2);

    node.append('text')
      .text(d => d.label)
      .attr('x', 16)
      .attr('y', 4)
      .attr('fill', 'var(--text-primary)')
      .attr('font-size', '12px')
      .attr('font-family', '"Sora", sans-serif');

    // Drag behavior
    node.call(d3.drag()
      .on('start', (event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on('drag', (event) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on('end', (event) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }));

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      linkText
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
        
      // Highlight based on search
      node.selectAll('circle')
        .attr('r', d => (searchTerm && d.label.toLowerCase().includes(searchTerm.toLowerCase())) ? 16 : 12)
        .attr('stroke', d => (searchTerm && d.label.toLowerCase().includes(searchTerm.toLowerCase())) ? 'white' : 'var(--bg-primary)')
        .attr('stroke-width', d => (searchTerm && d.label.toLowerCase().includes(searchTerm.toLowerCase())) ? 3 : 2);
    });

    return () => simulation.stop();
  }, [searchTerm, activeFilter]);

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
      {/* Main Graph Area */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0' }}>Semantic Knowledge Graph</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.875rem' }}>Ontology mapping: Pathogens → Conditions → Regulations</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search nodes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2rem', width: '200px' }}
              />
            </div>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderColor: activeFilter === 'all' ? 'var(--accent-blue)' : 'var(--border)' }} onClick={() => setActiveFilter('all')}>
            Show All
          </button>
          <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderColor: activeFilter === 'biological' ? 'var(--accent-red)' : 'var(--border)' }} onClick={() => setActiveFilter('biological')}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-red)', display: 'inline-block' }}></span> Biological Hazards Only
          </button>
        </div>

        <div style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="glass-card" style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={18} color="var(--accent-blue)" /> Node Details
        </h3>
        
        {selectedNode ? (
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {selectedNode.label}
            </div>
            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
              {selectedNode.group}
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description</div>
              <div style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{selectedNode.desc}</div>
            </div>

            {selectedNode.risk && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Risk Level</div>
                <div className={`badge ${selectedNode.risk === 'Critical' ? 'badge-critical' : 'badge-warning'}`}>
                  {selectedNode.risk}
                </div>
              </div>
            )}

            {selectedNode.limit && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Threshold Value</div>
                <div style={{ fontFamily: '"Space Mono", monospace', color: 'var(--accent-amber)', backgroundColor: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  {selectedNode.limit}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Connected Nodes</div>
              {mockLinks.filter(l => (l.source.id === selectedNode.id || l.target.id === selectedNode.id) || (l.source === selectedNode.id || l.target === selectedNode.id)).map((l, i) => {
                const isSource = l.source.id === selectedNode.id || l.source === selectedNode.id;
                const connectedNodeId = isSource ? (l.target.id || l.target) : (l.source.id || l.source);
                const connectedNode = mockNodes.find(n => n.id === connectedNodeId);
                if (!connectedNode) return null;
                return (
                  <div key={i} style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{isSource ? '→' : '←'}</span>
                    <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: 'var(--accent-blue)' }}>{l.type}</span>
                    <span>{connectedNode.label}</span>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
            Click on any node in the graph to view its details, connected regulations, and risk threshold values.
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionKnowledgeGraph;
