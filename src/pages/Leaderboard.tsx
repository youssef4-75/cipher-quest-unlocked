
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/App";

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: "CipherMaster", points: 7850, solved: 142, rank: 1 },
  { id: 2, name: "PuzzleKing", points: 6420, solved: 118, rank: 2 },
  { id: 3, name: "CodeBreaker99", points: 5980, solved: 105, rank: 3 },
  { id: 4, name: "DecoderElite", points: 4250, solved: 87, rank: 4 },
  { id: 5, name: "CryptoWizard", points: 3720, solved: 76, rank: 5 },
  { id: 6, name: "PuzzleSolver", points: 3190, solved: 62, rank: 6 },
  { id: 7, name: "SecretAgent", points: 2840, solved: 58, rank: 7 },
  { id: 8, name: "MysteryHunter", points: 2510, solved: 49, rank: 8 },
  { id: 9, name: "CipherSeeker", points: 2380, solved: 45, rank: 9 },
  { id: 10, name: "CodeMaster", points: 2150, solved: 41, rank: 10 },
  // Current user would be inserted here based on their points in a real implementation
];

const Leaderboard = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'points' | 'solved'>('points');

  const sortedLeaderboard = filter === 'points' 
    ? [...leaderboardData].sort((a, b) => b.points - a.points)
    : [...leaderboardData].sort((a, b) => b.solved - a.solved);

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

            {sortedLeaderboard.map((player, index) => {
              // Determine if the row is the current user
              const isCurrentUser = player.name === user?.name;
              
              return (
                <div 
                  key={player.id}
                  className={`grid grid-cols-12 py-3 px-4 border-b border-border ${
                    isCurrentUser ? 'bg-primary/10' : index % 2 === 0 ? 'bg-card/50' : ''
                  }`}
                >
                  <div className="col-span-1 font-medium">#{player.rank}</div>
                  <div className="col-span-5 font-medium">
                    {player.name}
                    {isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                  </div>
                  <div className="col-span-3 text-right">{player.points.toLocaleString()}</div>
                  <div className="col-span-3 text-right">{player.solved}</div>
                </div>
              );
            })}

            {/* Current user stats (in a real app, would get inserted at correct rank position) */}
            <div className="grid grid-cols-12 py-3 px-4 bg-primary/10">
              <div className="col-span-1 font-medium">#42</div> {/* Example rank */}
              <div className="col-span-5 font-medium">
                {user?.name} <span className="ml-2 text-xs text-primary">(You)</span>
              </div>
              <div className="col-span-3 text-right">320</div> {/* Example points */}
              <div className="col-span-3 text-right">8</div> {/* Example solved */}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Global Rank</p>
                <p className="text-4xl font-bold">#42</p> {/* Example rank */}
              </CardContent>
            </Card>
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Points</p>
                <p className="text-4xl font-bold">320</p> {/* Example points */}
              </CardContent>
            </Card>
            <Card className="cipher-card">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Puzzles Solved</p>
                <p className="text-4xl font-bold">8</p> {/* Example solved */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
