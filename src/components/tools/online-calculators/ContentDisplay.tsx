import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentDisplayProps {
  title: string;
  content: React.ReactNode;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ title, content }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default ContentDisplay;
