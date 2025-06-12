import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth, useGame } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { LoadingGameCard } from "@/components/ui/loading-game-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { notifyEntry } from '@/fetching/dashboard'
import { getAvailableGames } from '@/fetching/dashboard'
import { DashboardGame } from "@/types";

// Loading template component


const Dashboard = () => {
  const { energy, updateEnergy } = useGame();
  const { toast } = useToast();
  const { user: { id } } = useAuth();
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [availableGames, setAvailableGames] = useState<DashboardGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<DashboardGame[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getAvailableGames(id).then(
      data => {
        setAvailableGames(data);
        setLoading(false);
      }
    ).catch(error => {
      console.error("Error fetching games:", error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const __filteredGames = filter === "all"
    ? availableGames
    : filter === "daily"
      ? availableGames.filter(game => game.isDaily)
      : availableGames.filter(game => game.difficulty.toLowerCase() === filter.toLowerCase());
    setFilteredGames(__filteredGames);
  }, [availableGames, filter]);

  const handleGameStart = async (gameId: string, energyCost: number) => {
    if (energy < energyCost) {
      toast({
        title: "Not enough energy",
        description: `You need ${energyCost} energy to play this game. Wait for your energy to replenish.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First notify the server about entry
      await notifyEntry(gameId, id);
      // Then notify local server
      // ne(gameId, id);
      // Update energy
      updateEnergy(-energyCost);
      // Navigate to game
      navigate(`/gameplay/${gameId}`);
    } catch (error) {
      console.error("Error starting game:", error);
      toast({
        title: "Error",
        description: "Failed to start the game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Mission Control" infoText="Welcome to the Cipher Quest mission hub. Here you'll find various targets to hack. Each mission represents a different system to breach, with varying levels of security and complexity.">
      <div className="mb-8 flex flex-wrap gap-3">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}>
          All Systems
        </Button>
        <Button
          onClick={() => setFilter("easy")}
          variant={filter === "easy" ? "default" : "outline"}>
          Low Security
        </Button>
        <Button
          onClick={() => setFilter("medium")}
          variant={filter === "medium" ? "default" : "outline"}>
          Medium Security
        </Button>
        <Button
          onClick={() => setFilter("hard")}
          variant={filter === "hard" ? "default" : "outline"}>
          High Security
        </Button>
        <Button
          onClick={() => setFilter("daily")}
          variant={filter === "daily" ? "default" : "outline"}>
          Daily Breaches
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show loading templates while data is being fetched
          [...Array(6)].map((_, index) => (
            <LoadingGameCard key={index} />
          ))
        ) : (
          filteredGames.map((game) => (
              <Card key={game.id} className="cipher-card overflow-hidden flex flex-col animate-fade-in">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                  System Type: {game.theme}
                </div>
                <div className="absolute top-10 right-3 bg-card/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                  Security Level: {game.difficulty}
                </div>
                {game.isDaily && (
                  <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                    Time-Sensitive Target
                  </div>
                )}
                {game.preDone && (
                  <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                    System Already Breached
                  </div>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-xl mb-2">{game.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{game.description}</p>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center p-2 bg-card rounded-md">
                    <div className="text-xs text-muted-foreground">CPU Load</div>
                    <div className="font-medium flex items-center justify-center">
                      <Zap className="h-3 w-3 text-yellow-400 mr-1" />
                      {game.energyCost}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-card rounded-md">
                    <div className="text-xs text-muted-foreground">Max Attempts</div>
                    <div className="font-medium">{game.maxAttempts}</div>
                  </div>
                  <div className="text-center p-2 bg-card rounded-md">
                    <div className="text-xs text-muted-foreground">Security Layers</div>
                    <div className="font-medium">{game.phases}</div>
                  </div>
                  <div className="text-center p-2 bg-card rounded-md">
                    <div className="text-xs text-muted-foreground">Time Window</div>
                    <div className="font-medium">{game.timed ? game.timeLimit : "∞"}</div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={energy < game.energyCost || !game.playable || loading}
                  onClick={() => handleGameStart(game.id, game.energyCost)}
                >
                  {loading ? "Initializing..." : 
                   energy < game.energyCost ? "Insufficient CPU Power" : 
                   game.playable ? "Begin Breach" : "Active Mission in Progress"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
