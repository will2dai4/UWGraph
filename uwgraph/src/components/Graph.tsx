"use client";

import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition } from 'cytoscape';

export type GraphProps = {
  /** Array of Cytoscape element definitions (nodes and edges) */
  elements: ElementDefinition[];
  /** Inline style for the container (defaults to full width/height) */
  style?: React.CSSProperties;
  /** Layout options for Cytoscape (defaults to cose) */
  layout?: any;
};

const defaultStyle: React.CSSProperties = { width: '100%', height: '100%', backgroundColor: '#f0f0f0', overflow: 'hidden' };
const defaultLayout = { name: 'cose', animate: true, animationDuration: 500 };

// compute display label once (name on first line, code on second)
const defaultStylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': '#1976d2',
      'content': 'data(display)',
      'text-wrap': 'wrap',
      'text-max-width': 80,
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#fff',
      'font-size': 12
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#a0a0a0',
      'target-arrow-color': '#a0a0a0',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: 'node, edge',
    style: {
      'transition-property': 'transform, background-color, line-color',
      'transition-duration': '500ms',
      'transition-timing-function': 'ease-in-out'
    }
  }
];

const Graph: React.FC<GraphProps> = ({
  elements,
  style = defaultStyle,
  layout = defaultLayout,
}) => {
  // add a computed `display` field to each node
  const displayElements = elements.map(el => ({
    ...el,
    data: {
      ...el.data,
      display: `${el.data.label}\n${el.data.id}`
    }
  }));
  return (
    <CytoscapeComponent
      elements={displayElements}
      style={style}
      layout={layout}
      stylesheet={defaultStylesheet}
      wheelSensitivity={0.20}
      cy={(cy: any) => {
        // animate zoom/pan transforms with easing
        const vp = cy.container().getElementsByClassName('cy-viewport')[0] as HTMLElement;
        if (vp) vp.style.transition = 'transform 500ms ease-in-out';
      }}
    />
  );
};

export default Graph;
