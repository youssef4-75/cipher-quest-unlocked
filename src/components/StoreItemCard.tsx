
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: string;
  isPermanent: boolean;
  effect?: string;
}

interface StoreItemCardProps {
  item: StoreItem;
  onPurchase: (item: StoreItem) => void;
  canAfford: boolean;
}

const StoreItemCard = ({ item, onPurchase, canAfford }: StoreItemCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border-cipher-400/30 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl">{item.name}</CardTitle>
            <CardDescription className="mt-1">
              {item.description}
            </CardDescription>
          </div>
          <div className="flex-shrink-0">
            {item.icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {item.effect && (
          <div className="text-sm text-cyan-400 font-medium my-1">
            Effect: {item.effect}
          </div>
        )}
        <div className="text-sm text-primary font-medium mt-1">
          {item.isPermanent ? "Permanent unlock" : "Consumable item"}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-1.5 font-bold">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span>{item.price}</span>
        </div>
        <Button 
          onClick={() => onPurchase(item)} 
          variant={canAfford ? "default" : "outline"}
          disabled={!canAfford}
          size="sm"
          className="gap-2"
        >
          {canAfford ? "Buy Now" : "Need More Points"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreItemCard;
