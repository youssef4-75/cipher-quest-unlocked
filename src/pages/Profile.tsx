
import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/App";
import { useGame } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Player info */}
        <div className="lg:col-span-1">
          <Card className="cipher-card mb-6">
            <CardHeader>
              <CardTitle>Player Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Energy</p>
                <p className="font-medium">{energy}/100</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points</p>
                <p className="font-medium">{points}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passwords Collected</p>
                <p className="font-medium">{solvedPasswords.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cipher-card">
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>Items and power-ups you've collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInventory.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-secondary flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">x{item.quantity}</Badge>
                      <Button size="sm" disabled={item.quantity === 0}>Use</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Visit Shop</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="stats" className="cipher-card">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="passwords">Passwords</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="p-4">
              <h3 className="text-xl font-semibold mb-4">Player Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Total Playtime</p>
                    <p className="text-lg font-medium">{mockStats.totalPlaytime}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Games Played</p>
                    <p className="text-lg font-medium">{mockStats.gamesPlayed}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Games Won</p>
                    <p className="text-lg font-medium">{mockStats.gamesWon}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-medium">{mockStats.successRate}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Longest Streak</p>
                    <p className="text-lg font-medium">{mockStats.longestStreak}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Phases Solved</p>
                    <p className="text-lg font-medium">{mockStats.totalPhasesSolved}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="p-4">
              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              <div className="space-y-4">
                {mockAchievements.map(achievement => (
                  <Card 
                    key={achievement.id} 
                    className={`${achievement.unlocked ? 'bg-card' : 'bg-card/30 opacity-70'}`}
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked ? (
                        <Badge className="bg-primary">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="passwords" className="p-4">
              <h3 className="text-xl font-semibold mb-4">Password Collection</h3>
              
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search passwords..."
                  className="pl-10"
                  value={passwordFilter}
                  onChange={(e) => setPasswordFilter(e.target.value)}
                />
              </div>
              
              {filteredPasswords.length > 0 ? (
                <div className="password-collection">
                  {filteredPasswords.map((password, index) => (
                    <div key={index} className="password-item">
                      {password}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  {passwordFilter ? (
                    <p className="text-muted-foreground">No passwords match your search.</p>
                  ) : (
                    <p className="text-muted-foreground">You haven't collected any passwords yet.</p>
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
