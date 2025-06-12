import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth, useGame } from "@/context";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  Search,
} from "lucide-react";
import StoreItemCard from "@/components/ui/StoreItemCard";
import { useToast } from "@/hooks/use-toast";
import { getInv as getInventory, purchaseItem } from "@/fetching/store";
import { StoreItem, ItemCategory } from "@/types";
import { getPower } from "@/fetching/profile";





const Store = () => {
  const { points, updatePoints } = useGame();
  const {user: {id}} = useAuth();
  const [userPower, setUserPower] = useState<{energy: number, points: number}>({energy: 0, points})
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<ItemCategory>("powerUps");
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [buying, setBuying] = useState<boolean>(false);
  const [itemToBuy, setItemToBuy] = useState<StoreItem|null>(null)
  
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      info: <Info className="text-indigo-500 h-10 w-10" size={24} />,
      plus: <Plus className="text-indigo-500 h-10 w-10"size={24} />,
      star: <Star className="text-indigo-500 h-10 w-10" size={24} />,
      user: <User className="text-indigo-500 h-10 w-10" size={24} />,
      zap: <Zap className="text-indigo-500 h-10 w-10" size={24} />,
      key: <Key className="text-indigo-500 h-10 w-10" size={24} />,
      search: <Search className="text-indigo-500 h-10 w-10" size={24} />,
    };
    return iconMap[iconName] || <Info size={24} />;
  };
  
  useEffect(() => {
    const fetchInventory = async () => {
      const items: StoreItem[] = await getInventory();
      items.forEach(item => {
        item.icon = getIconComponent(item._icon as string);
      });
      setStoreItems(items);
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchPower = async (id) => {
      const power = await getPower(id);
      
      setUserPower(power);
    };
    fetchPower(id);
  }, []);

  useEffect(()=>{
    if(!buying || !itemToBuy){
      return 
    }
    const buyFromServer = async ()=>{
      const done = await purchaseItem(itemToBuy, id);
      if(done){
        toast({
        title: "Purchase Successful!",
        description: `You bought ${itemToBuy.name}`,
        variant: "default",
      });
      }else{
        toast({
        title: "Unknown error occured",
        description: `something went wrong with your query, repeat again later`,
        variant: "destructive",
      });
      }
    }

    buyFromServer();

    setBuying(false);

  }, [buying])


  // Filter items by category
  const filteredItems = storeItems.filter(item => item.category === selectedTab);

  // Handle purchase
  const handlePurchase = (item: StoreItem) => {
    
    setItemToBuy(item);
    setBuying(true);
    
    if (points >= item.price) {
      // Deduct points
      updatePoints(-item.price);
      setUserPower(prev => {return {energy: prev.energy, points: prev.points - item.price}})
      // Show success message
      
      // In a real app, we would update the user's inventory here
    }
  };
  return (
    <Layout title="Black Market" infoText="Welcome to the underground marketplace. Here you can acquire tools, exploits, and resources to enhance your hacking capabilities. Choose wisely, as each purchase could be the difference between success and failure in your next mission.">
      <div className="mb-8">
        <Card className="p-4 cipher-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Available Credits</h3>
              <p className="text-2xl font-bold text-cipher-300">{userPower.points}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Transaction</p>
              <p className="text-sm font-mono">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button
          onClick={() => setSelectedTab("powerUps")}
          variant={selectedTab === "powerUps" ? "default" : "outline"}
          className="h-auto py-3"
        >
          <div className="text-center">
            <div className="text-lg mb-1">⚡</div>
            <div>Exploits</div>
          </div>
        </Button>
        <Button
          onClick={() => setSelectedTab("cosmetics")}
          variant={selectedTab === "cosmetics" ? "default" : "outline"}
          className="h-auto py-3"
        >
          <div className="text-center">
            <div className="text-lg mb-1">🎭</div>
            <div>Disguises</div>
          </div>
        </Button>
        <Button
          onClick={() => setSelectedTab("energy")}
          variant={selectedTab === "energy" ? "default" : "outline"}
          className="h-auto py-3"
        >
          <div className="text-center">
            <div className="text-lg mb-1">🔋</div>
            <div>Power Sources</div>
          </div>
        </Button>
        <Button
          onClick={() => setSelectedTab("special")}
          variant={selectedTab === "special" ? "default" : "outline"}
          className="h-auto py-3"
        >
          <div className="text-center">
            <div className="text-lg mb-1">💎</div>
            <div>Rare Tools</div>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cipher-card overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <div className="text-sm font-mono bg-card/50 px-2 py-1 rounded">
                  {item.isPermanent ? "Permanent" : "One-time Use"}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm font-mono">
                  <span className="text-cipher-300">{item.price}</span> credits
                </div>
                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={points < item.price}
                  size="sm"
                >
                  Acquire
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};


export default Store;
