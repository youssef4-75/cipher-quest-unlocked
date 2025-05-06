
import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth, useGame } from "@/context";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {
  Coins,
  Zap,
  ShoppingBag,
  Gift,
  Star,
  Info,
  Plus,
  User,
  Key,
  Search
} from "lucide-react";
 
import StoreItemCard from "@/components/ui/StoreItemCard";
 
import { useToast } from "@/hooks/use-toast";

// Store item types
type ItemCategory = "powerUps" | "cosmetics" | "energy" | "special";

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: ItemCategory;
  isPermanent: boolean;
  effect?: string;
}

const Store = () => {
  const { points, updatePoints } = useGame();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<ItemCategory>("powerUps");
<<<<<<< HEAD

=======
  
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
  // Store items data
  const storeItems: StoreItem[] = [
    // Power-Ups
    {
      id: "hint-pack",
      name: "Hint Pack",
      description: "Reveals a portion of the password",
      price: 50,
      icon: <Info className="text-primary h-10 w-10" />,
      category: "powerUps",
      isPermanent: false,
      effect: "Reveals 2 characters of the password"
    },
    {
      id: "extra-attempts",
      name: "Extra Attempts",
      description: "Get 3 more attempts at solving puzzles",
      price: 100,
      icon: <Plus className="text-green-500 h-10 w-10" />,
      category: "powerUps",
      isPermanent: false,
      effect: "+3 attempts on any puzzle"
    },

    // Cosmetics
    {
      id: "dark-theme",
      name: "Dark Hacker Theme",
      description: "Change your profile appearance to a sleek dark hacker theme",
      price: 200,
      icon: <Star className="text-yellow-500 h-10 w-10" />,
      category: "cosmetics",
      isPermanent: true
    },
    {
      id: "avatar-pack",
      name: "Elite Avatar Pack",
      description: "Unlock exclusive profile avatars",
      price: 150,
      icon: <User className="text-blue-500 h-10 w-10" />,
      category: "cosmetics",
      isPermanent: true
    },

    // Energy & Boosts
    {
      id: "energy-refill",
      name: "Full Energy Refill",
      description: "Instantly refill your energy to maximum",
      price: 120,
      icon: <Zap className="text-yellow-400 h-10 w-10" />,
      category: "energy",
      isPermanent: false,
      effect: "Restores energy to 100%"
    },
    {
      id: "energy-booster",
      name: "Energy Booster",
      description: "Double energy regeneration for 1 hour",
      price: 80,
      icon: <Zap className="text-purple-500 h-10 w-10" />,
      category: "energy",
      isPermanent: false,
      effect: "2x energy regen for 1 hour"
    },
    // Special Abilities
    {
      id: "password-reveal",
      name: "Password Reveal",
      description: "Instantly solve one password puzzle",
      price: 300,
      icon: <Key className="text-red-500 h-10 w-10" />,
      category: "special",
      isPermanent: false,
      effect: "Instantly solve one puzzle"
    },
    {
      id: "similarity-boost",
      name: "Similarity Detector",
      description: "Improves similarity detection for 3 games",
      price: 250,
      icon: <Search className="text-indigo-500 h-10 w-10" />,
      category: "special",
      isPermanent: false,
      effect: "Enhanced similarity detection for 3 games"
    },
  ];
<<<<<<< HEAD

  // Filter items by category
  const filteredItems = storeItems.filter(item => item.category === selectedTab);

=======
  
  // Filter items by category
  const filteredItems = storeItems.filter(item => item.category === selectedTab);
  
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
  // Handle purchase
  const handlePurchase = (item: StoreItem) => {
    if (points >= item.price) {
      // Deduct points
      updatePoints(-item.price);
<<<<<<< HEAD

=======
      
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
      // Show success message
      toast({
        title: "Purchase Successful!",
        description: `You bought ${item.name}`,
        variant: "default",
      });
<<<<<<< HEAD

=======
      
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
      // In a real app, we would update the user's inventory here
    } else {
      // Show error message
      toast({
        title: "Insufficient Funds",
        description: `You need ${item.price - points} more points!`,
        variant: "destructive",
      });
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
  return (
    <Layout title="Store">
      <div className="max-w-6xl mx-auto">
        {/* Player balance */}
        <div className="flex items-center justify-between mb-6 p-4 bg-card/70 backdrop-blur-sm rounded-lg border border-cipher-400/30">
          <div className="flex items-center gap-3">
            <Coins className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-medium">Your Balance</h3>
              <p className="text-2xl font-bold">{points} Points</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Gift size={18} />
            <span>Earn More</span>
          </Button>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
        {/* Store categories */}
        <Tabs defaultValue="powerUps" className="w-full" onValueChange={(value) => setSelectedTab(value as ItemCategory)}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="powerUps" className="flex items-center gap-2">
              <Star size={16} />
              <span className="hidden sm:inline">Power-Ups</span>
            </TabsTrigger>
            <TabsTrigger value="cosmetics" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cosmetics</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap size={16} />
              <span className="hidden sm:inline">Energy & Boosts</span>
            </TabsTrigger>
            <TabsTrigger value="special" className="flex items-center gap-2">
              <Gift size={16} />
              <span className="hidden sm:inline">Special</span>
            </TabsTrigger>
          </TabsList>
<<<<<<< HEAD

=======
          
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
          {/* Items grid */}
          {["powerUps", "cosmetics", "energy", "special"].map((category) => (
            <TabsContent value={category} key={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
<<<<<<< HEAD
                  <StoreItemCard
=======
                  <StoreItemCard 
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
                    key={item.id}
                    item={item}
                    onPurchase={handlePurchase}
                    canAfford={points >= item.price}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default Store;
=======
export default Store;
>>>>>>> 7712aad8748ce77e13d16837a50996473935fb64
