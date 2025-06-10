import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Construction } from 'lucide-react';

    const ToolPlaceholder = ({ toolName }: { toolName: string }) => {
      return (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>{toolName}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-10">
            <Construction className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              This tool is currently under construction.
            </p>
            <p className="text-sm text-muted-foreground">
              We're working hard to bring it to you soon!
            </p>
          </CardContent>
        </Card>
      );
    };

    export default ToolPlaceholder;
