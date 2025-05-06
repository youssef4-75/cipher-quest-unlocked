
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/App";
import { useGame } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Terminal, Shield, Database, Code } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockAchievements = [
  { id: 1, name: "First Steps", description: "Complete your first game", unlocked: true },
  { id: 2, name: "Apprentice Decoder", description: "Solve 5 puzzles", unlocked: true },
  { id: 3, name: "Code Cracker", description: "Complete a Hard difficulty game", unlocked: false },
  { id: 4, name: "Perfect Run", description: "Complete a game without any failed attempts", unlocked: true },
  { id: 5, name: "Cipher Master", description: "Solve 50 puzzles", unlocked: false },
];

const mockStats = {
  totalPlaytime: "5h 23m",
  gamesPlayed: 8,
  gamesWon: 6,
  successRate: "75%",
  longestStreak: 3,
  totalPhasesSolved: 18,
};

const mockInventory = [
  { id: 1, name: "Energy Refill", description: "Instantly refill 50 energy", quantity: 2, icon: "⚡" },
  { id: 2, name: "Letter Reveal", description: "Reveal one letter in the password", quantity: 1, icon: "🔍" },
  { id: 3, name: "Extra Attempt", description: "Get an additional attempt for a game", quantity: 0, icon: "🎯" },
];

const Profile = () => {
  const { user } = useAuth();
  const { energy, points, solvedPasswords } = useGame();
  const [passwordFilter, setPasswordFilter] = useState("");
  
  const filteredPasswords = passwordFilter 
    ? solvedPasswords.filter(pwd => pwd.toLowerCase().includes(passwordFilter.toLowerCase())) 
    : solvedPasswords;

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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Left column - Player info */}
        <div className="lg:col-span-1">
          <Card className="cipher-card mb-6 relative overflow-hidden border-cipher-400/50 shadow-lg shadow-cipher-400/20">
            <div className="absolute top-0 right-0 p-2">
              <Badge variant="outline" className="font-mono bg-cipher-500/10 border-cipher-300/30">
                <Code className="w-3 h-3 mr-1" /> Level 5
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
                <p className="text-sm font-medium">{user?.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Authentication
                </p>
                <p className="font-medium font-mono">{user?.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-md bg-cipher-900/30">
                  <p className="text-xs text-muted-foreground">Energy</p>
                  <div className="flex items-center">
                    <p className="font-medium font-mono text-cipher-300">{energy}</p>
                    <p className="text-xs text-muted-foreground">/100</p>
                    <div className="ml-2 w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full energy-bar" style={{ width: `${energy}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 rounded-md bg-cipher-900/30">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Database className="w-3 h-3" /> Points
                  </p>
                  <p className="font-medium font-mono text-cipher-300">{points}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Passwords Collected</p>
                <p className="font-medium font-mono">{solvedPasswords.length}</p>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-primary" 
                    style={{ width: `${Math.min(100, (solvedPasswords.length / 100) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-muted-foreground mt-1">{solvedPasswords.length}/100</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cipher-card relative border-cipher-400/50">
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
                {mockInventory.map(item => (
                  <div key={item.id} className="flex items-center justify-between cipher-card p-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-cipher-900 border border-cipher-400/30 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">x{item.quantity}</Badge>
                      <Button onClick={sendUseDemand()} size="sm" disabled={item.quantity === 0}>Use</Button>
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
        </div>
        
        {/* Right column - Tabs */}
        <div className="lg:col-span-2">
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
                {Object.entries(mockStats).map(([key, value]) => (
                  <Card key={key} className="bg-card/50 border-cipher-400/20 shadow-inner">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground font-mono">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="text-lg font-medium font-mono text-cipher-300">{value}</p>
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
                {mockAchievements.map(achievement => (
                  <Card 
                    key={achievement.id} 
                    className={`${achievement.unlocked ? 'bg-card border-cipher-400/30' : 'bg-card/30 opacity-70 border-dashed'}`}
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium font-mono">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked ? (
                        <Badge className="bg-primary">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline" className="font-mono text-xs">LOCKED</Badge>
                      )}
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
                  {filteredPasswords.map((password, index) => (
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
