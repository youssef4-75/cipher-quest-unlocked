import { Card } from "./card";

export const LoadingGameCard = () => (
  <Card className="cipher-card overflow-hidden flex flex-col animate-pulse">
    <div className="relative h-48 w-full bg-muted" />
    <div className="p-5 flex-grow flex flex-col">
      <div className="h-6 w-3/4 bg-muted rounded mb-2" />
      <div className="h-4 w-full bg-muted rounded mb-4" />
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center p-2 bg-muted rounded-md">
            <div className="h-3 w-16 bg-muted-foreground/20 rounded mx-auto mb-1" />
            <div className="h-4 w-12 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        ))}
      </div>
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  </Card>
);