
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { useGame } from "@/App";
import { Button } from "@/components/ui/button";
import { Trophy, User, Home, LogOut, Zap } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Cipher Quest" }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { energy, points } = useGame();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background matrix-bg flex flex-col">
      <header className="bg-card/90 backdrop-blur-sm border-b border-cipher-400/30 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tighter glitch">
                Cipher<span className="text-primary">Quest</span>
              </span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">{points} Points</span>
              </div>
              
              <div className="flex flex-col w-32">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Energy</span>
                  <span className="text-xs font-medium">{energy}/100</span>
                </div>
                <div className="bg-secondary rounded-full h-2 w-full">
                  <div 
                    className="energy-bar" 
                    style={{ width: `${energy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
                <Link to="/store">
                  <Button variant="ghost" size="sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Store</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="ghost" size="sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Leaderboard</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {title && (
          <h1 className="text-3xl font-bold mb-8 glow-text">{title}</h1>
        )}
        {children}
      </main>
      
      <footer className="bg-card/50 backdrop-blur-sm border-t border-cipher-400/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Cipher Quest – Puzzle Adventure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
