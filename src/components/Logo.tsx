import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Target className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground">
        Seotooler
      </span>
    </Link>
  );
}
