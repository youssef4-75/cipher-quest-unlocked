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
    <Layout title="Store">
      <div className="max-w-6xl mx-auto">
        {/* Player balance */}
        <div className="flex items-center justify-between mb-6 p-4 bg-card/70 backdrop-blur-sm rounded-lg border border-cipher-400/30">
          <div className="flex items-center gap-3">
            <Coins className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-medium">Your Balance</h3>
              <p className="text-2xl font-bold">{userPower.points} Points</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Gift size={18} />
            <span>Earn More</span>
          </Button>
        </div>
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
          {/* Items grid */}
          {["powerUps", "cosmetics", "energy", "special"].map((category) => (
            <TabsContent value={category} key={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  return <StoreItemCard
                    key={item.id}
                    item={item}
                    onPurchase={handlePurchase}
                    canAfford={points >= item.price}
                  />
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};


export default Store;
