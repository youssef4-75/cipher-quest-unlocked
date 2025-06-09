import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context";
import { getLeaderboard, getOwnRank } from "@/fetching/leaderboard";
import { useToast } from "@/hooks/use-toast";

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
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            onClick={() => setFilter('points')}
            variant={filter === 'points' ? 'default' : 'outline'}
          >
            Sort by Points
          </Button>
          <Button
            onClick={() => setFilter('solved')}
            variant={filter === 'solved' ? 'default' : 'outline'}
          >
            Sort by Puzzles Solved
          </Button>
        </div>

        <Card className="cipher-card overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-12 py-3 px-4 font-medium border-b border-border text-sm">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-3 text-right">Points</div>
              <div className="col-span-3 text-right">Puzzles Solved</div>
            </div>

            {leaderboardData.map((player, index) => {
              const isCurrentUser = player.id === user?.id;

              return (
                <div
                  key={player.id}
                  className={`grid grid-cols-12 py-3 px-4 border-b border-border ${isCurrentUser ? 'bg-primary/10' : ''}`}
                >
                  <div className="col-span-1 font-medium">#{index + 1}</div>
                  <div className="col-span-5 font-medium">
                    {player.name}
                    {isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                  </div>
                  <div className="col-span-3 text-right">{player.points.toLocaleString()}</div>
                  <div className="col-span-3 text-right">{player.solved}</div>
                </div>
              );
            })}

            {ownRankData.rank > 10 && (
              <div className="grid grid-cols-12 py-3 px-4 bg-primary/10">
                <div className="col-span-1 font-medium">#{ownRankData.rank}</div>
                <div className="col-span-5 font-medium">
                  {user?.name} <span className="ml-2 text-xs text-primary">(You)</span>
                </div>
                <div className="col-span-3 text-right">{ownRankData.points.toLocaleString()}</div>
                <div className="col-span-3 text-right">{ownRankData.solved}</div>
              </div>
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
