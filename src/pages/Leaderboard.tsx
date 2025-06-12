import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context";
import { getLeaderboard, getOwnRank } from "@/fetching/leaderboard";
import { useToast } from "@/hooks/use-toast";
import { Shield, Trophy } from "lucide-react";

const userCard = (id: number, highlight: boolean, index, solved, name, points) =>  {
    return <Card 
            key={id} 
            className={`cipher-card overflow-hidden ${
              highlight ? "border-cipher-300" : ""
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-card/50 font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono">
                      <p>points: <span className="text-cipher-300">{points}</span> </p>
                      <p>breaches: <span className="text-cipher-300">{solved}</span></p>
                  </p>
                </div>
              </div>
            </div>
          </Card>
}


const Leaderboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'points' | 'solved'>('points');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [ownRankData, setOwnRankData] = useState<any>({ rank: 0, points: 0, solved: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboard, rank] = await Promise.all([
          getLeaderboard(filter),
          getOwnRank(filter, user?.id)
        ]);
        setLeaderboardData(leaderboard);
        setOwnRankData(rank);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch leaderboard data",
          variant: "destructive",
        });
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [filter, user?.id]);

  return (
    <Layout title="Leaderboard">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setFilter('points')}
            variant={filter === 'points' ? 'default' : 'outline'}
          >
            
            <Trophy className="h-4 w-4 mr-2" />
            by Points
          </Button>
          <Button
            onClick={() => setFilter('solved')}
            variant={filter === 'solved' ? 'default' : 'outline'}
          >
            <Shield className="h-4 w-4 mr-2" />
            By Breaches
          </Button>
        </div>

        <Card className="cipher-card overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-12 py-3 px-4 font-medium border-b border-border text-sm">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-3 text-right">Known for</div>
            </div>

            {leaderboardData.map((player, index) => (
          userCard(player.id, player.name === user.name, index, player.solved, player.name, player.points)
        ))}

            {ownRankData.rank > 10 && (
                userCard(ownRankData.rank, true, ownRankData.rank, ownRankData.solved, user.name, ownRankData.points)
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Global Rank</p>
                <p className="text-4xl font-bold">#{ownRankData.rank}</p>
              </CardContent>
            </Card>
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Points</p>
                <p className="text-4xl font-bold">{ownRankData.points.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Puzzles Solved</p>
                <p className="text-4xl font-bold">{ownRankData.solved.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;