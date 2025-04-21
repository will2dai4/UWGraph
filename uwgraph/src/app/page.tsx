// src/app/page.tsx
import Graph from '../components/Graph'
import type { ElementDefinition } from 'cytoscape'

export default function Home() {
  const elements: ElementDefinition[] = [
    { data: { id: 'CSC101', label: 'some course' } },
    { data: { id: 'CSC102', label: 'another course' } },
    { data: { source: 'CSC101', target: 'CSC102' } },
  ]

  return (
    <div className="h-screen p-4">
      <div className="container mx-auto h-full">
        <Graph elements={elements} />
      </div>
    </div>
  )
}