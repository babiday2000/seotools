import React from 'react';
import { Link } from 'react-router-dom';
import { tools, Tool } from '@/data/tools';
import { Button } from '@/components/ui/button';

interface RelatedToolsProps {
  category: string;
  currentToolName: string;
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ category, currentToolName }) => {
  const relatedTools = tools
    .filter(tool => tool.category === category && tool.name !== currentToolName)
    .slice(0, 4);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
      <div className="flex flex-wrap gap-4">
        {relatedTools.map((tool: Tool) => (
          <Link to={`/tools/${tool.category}/${tool.slug}`} key={tool.name}>
            <Button variant="default" className="transform transition-transform duration-300 hover:scale-105">{tool.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
