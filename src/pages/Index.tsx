
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";


const Index = () => {
  useEffect(() => {
    document.title = "Cipher Quest - Puzzle Adventure";
  }, []);

  return (
    <Layout title="" active={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          <span className="glitch">Cipher</span>
          <span className="text-primary">Quest</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Decode hidden messages, solve puzzles, and unlock the mysteries in this
          challenging cipher-based adventure game.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl w-full">
          <Link to="/login">
            <div className="cipher-card p-6 flex flex-col items-center">
              <div className="text-4xl mb-4 text-cyan-400 animate-float">🧩</div>
              <h3 className="text-xl font-semibold mb-2 glow-text">Challenging Puzzles</h3>
              <p className="text-muted-foreground text-sm">
                Test your code-breaking skills with increasingly difficult cipher challenges.
              </p>
            </div>
          </Link>
          <Link to="/login">

            <div className="cipher-card p-6 flex flex-col items-center">
              <div className="text-4xl mb-4 text-purple-400 animate-float">🔐</div>
              <h3 className="text-xl font-semibold mb-2 glow-text">Crack the Code</h3>
              <p className="text-muted-foreground text-sm">
                Decipher hidden messages and unravel the secrets behind each puzzle.
              </p>
            </div>
          </Link>
          <Link to="/login">
            <div className="cipher-card p-6 flex flex-col items-center">
              <div className="text-4xl mb-4 text-yellow-400 animate-float">🏆</div>
              <h3 className="text-xl font-semibold mb-2 glow-text">Earn Rewards</h3>
              <p className="text-muted-foreground text-sm">
                Collect points, unlock achievements, and climb the global leaderboards.
              </p>
            </div>
          </Link>


        </div>

        <div className="flex gap-4">
          <>
            <Link to="/register">
              <Button size="lg" className="px-8">
                Start Playing
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
