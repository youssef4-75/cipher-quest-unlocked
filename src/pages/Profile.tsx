import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Star,
  Info,
  Plus,
  User,
  Key,
  Search, 
  Terminal, 
  Shield, 
  Database, 
  Code
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth, useGame } from "@/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getProfile, sendUseDemand } from "@/fetching/profile";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const {energy} = useGame();
  const { toast } = useToast();
  const [passwordFilter, setPasswordFilter] = useState("");
  const [profileData, setProfileData] = useState({
    solvedPasswords: [],
    name: "",
    email: "",
    level: 0,
    points: 0,
    energy: 0,
    achievements: [],
    inventory: [],
    stats: {}
  });

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
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user?.id);
        setProfileData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id, energy]);

  const handleUseItem = async (item: any) => {
    try {
      await sendUseDemand(item, user?.id);
      // Refresh profile data after using item
      const data = await getProfile(user?.id);
      setProfileData(data);
      toast({
        title: "Success",
        description: `Used ${item.name} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to use item",
        variant: "destructive",
      });
    }
  };

  const filteredPasswords = passwordFilter
    ? profileData.solvedPasswords.filter((pwd: string) => pwd.toLowerCase().includes(passwordFilter.toLowerCase()))
    : profileData.solvedPasswords;

  return (
    <Layout title="Player Profile">
      {/* Hacker-themed decorative elements */}
      <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden opacity-10 z-0">
        <div className="matrix-code text-xs font-mono text-cipher-300 whitespace-nowrap">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className="animate-matrix-flow" style={{ animationDelay: `${i * 0.3}s` }}>
              {Array(50).fill(0).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? '0' : '1'}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Left column - Player info */}
        <div className="lg:col-span-1">
          <Card className="cipher-card mb-6 relative overflow-hidden border-cipher-400/50 shadow-lg shadow-cipher-400/20">
            <div className="absolute top-0 right-0 p-2">
              <Badge variant="outline" className="font-mono bg-cipher-500/10 border-cipher-300/30">
                <Code className="w-3 h-3 mr-1" /> Level {profileData.level}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cipher-300" />
                <CardTitle>Player Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="cipher-terminal p-2 bg-cipher-900/50 rounded-md border border-cipher-400/30">
                <p className="text-sm text-cipher-300 font-mono mb-1">$ identify user</p>
                <p className="text-xs text-muted-foreground font-mono mb-2">{"> scanning biometrics..."}</p>
                <p className="text-sm font-medium">{profileData.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Authentication
                </p>
                <p className="font-medium font-mono">{profileData.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-md bg-cipher-900/30">
                  <p className="text-xs text-muted-foreground">Energy</p>
                  <div className="flex items-center">
                    <p className="font-medium font-mono text-cipher-300">{profileData.energy}</p>
                    <p className="text-xs text-muted-foreground">/100</p>
                    <div className="ml-2 w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full energy-bar" style={{ width: `${profileData.energy}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-md bg-cipher-900/30">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Database className="w-3 h-3" /> Points
                  </p>
                  <p className="font-medium font-mono text-cipher-300">{profileData.points}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Passwords Collected</p>
                <p className="font-medium font-mono">{profileData.solvedPasswords.length}</p>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-primary"
                    style={{ width: `${Math.min(100, (profileData.solvedPasswords.length / 100) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-muted-foreground mt-1">{profileData.solvedPasswords.length}/100</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cipher-card mb-6 relative overflow-hidden border-cipher-400/50 shadow-lg shadow-cipher-400/20">
            <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-primary/20 blur-2xl rounded-full"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cipher-300" />
                <CardTitle>Inventory</CardTitle>
              </div>
              <CardDescription>Items and power-ups you've collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.inventory.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between cipher-card p-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-cipher-900 border border-cipher-400/30 flex items-center justify-center text-xl">
                        {getIconComponent(item._icon)}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">x{item.quantity}</Badge>
                      <Button onClick={() => handleUseItem(item)} size="sm" disabled={item.quantity === 0}>Use</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/store">
                <Button variant="outline" className="w-full">Visit Shop</Button></Link>
            </CardFooter>
          </Card>

          <Tabs defaultValue="stats" className="cipher-card">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="stats" className="font-mono text-xs">STATS.SYS</TabsTrigger>
              <TabsTrigger value="achievements" className="font-mono text-xs">ACHIEVE.DAT</TabsTrigger>
              <TabsTrigger value="passwords" className="font-mono text-xs">PWD.LIST</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cipher-300" />
                <span>Player Statistics</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(profileData.stats).map(([key, value]) => (
                  <Card key={key} className="bg-card/50 border-cipher-400/20 shadow-inner">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground font-mono">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="text-lg font-medium font-mono text-cipher-300">{String(value)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cipher-300" />
                <span>Achievements</span>
              </h3>
              <div className="space-y-4">
                {profileData.achievements.map((achievement: any) => (
                  <Card
                    key={achievement.id}
                    className={'bg-card border-cipher-400/30'}
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium font-mono">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>

                      <Badge className="bg-primary">Unlocked</Badge>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="passwords" className="p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-cipher-300" />
                <span>Password Collection</span>
              </h3>

              <div className="mb-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search passwords..."
                  className="pl-10 font-mono bg-cipher-900/20 border-cipher-400/30 focus:border-cipher-300"
                  value={passwordFilter}
                  onChange={(e) => setPasswordFilter(e.target.value)}
                />
              </div>

              {filteredPasswords.length > 0 ? (
                <div className="password-collection">
                  {filteredPasswords.map((password: string, index: number) => (
                    <div key={index} className="password-item font-mono text-xs hover:bg-cipher-900/30 hover:border-cipher-300 transition-colors">
                      {password}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  {passwordFilter ? (
                    <p className="text-muted-foreground font-mono">No passwords match your search.</p>
                  ) : (
                    <p className="text-muted-foreground font-mono">You haven't collected any passwords yet.</p>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
