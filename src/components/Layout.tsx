import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useGame } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trophy, User, Home, LogOut, Zap, Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  active?: boolean;
  infoText?: string;
};

const Layout = ({ children, title = "Cipher Quest", active=true, infoText="" }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  const {energy, points} = useGame()
  
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
              <span className="text-2xl font-bold tracking-tighter glitch font-mono">
                Cipher<span className="text-primary">Quest</span>
                <span className="text-xs text-muted-foreground ml-2">v1.0.0</span>
              </span>
            </Link>
          </div>

          {user && active && (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-mono">{points} Credits</span>
              </div>

              <div className="flex flex-col w-32">
                <div className="flex items-center justify-between mb-1">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">CPU Power</span>
                  <span className="text-xs font-mono">{energy}/100</span>
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

          <nav className="flex items-center gap-1">
            {user && active ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/dashboard">
                        <Button variant="ghost" size="icon" className="font-mono group">
                          <Home className="h-4 w-4" />
                          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap left-full ml-2 bg-background px-2 py-1 rounded text-sm">
                            Mission Control
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mission Control</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/store">
                        <Button variant="ghost" size="icon" className="font-mono group">
                          <Trophy className="h-4 w-4" />
                          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap left-full ml-2 bg-background px-2 py-1 rounded text-sm">
                            Black Market
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Black Market</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/profile">
                        <Button variant="ghost" size="icon" className="font-mono group">
                          <User className="h-4 w-4" />
                          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap left-full ml-2 bg-background px-2 py-1 rounded text-sm">
                            Operator Profile
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Operator Profile</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/leaderboard">
                        <Button variant="ghost" size="icon" className="font-mono group">
                          <Trophy className="h-4 w-4" />
                          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap left-full ml-2 bg-background px-2 py-1 rounded text-sm">
                            Global Rankings
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Global Rankings</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleLogout} className="font-mono group">
                        <LogOut className="h-4 w-4" />
                        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap left-full ml-2 bg-background px-2 py-1 rounded text-sm">
                          Terminate Session
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Terminate Session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-mono">Access System</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="font-mono">New Operator</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {title && (
          <h1 className="text-3xl font-bold mb-8 glow-text font-mono">{title}</h1>
        )}
        {infoText && (
          <div className="absolute right-4 top-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsInfoOpen(true)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between font-mono">
                    <span>System Information</span>                    
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-muted-foreground whitespace-pre-wrap font-mono">
                  {infoText}
                </div>
                <div className="mt-6 flex justify-end">
                  <DialogClose asChild>
                    <Button className="font-mono">Close Terminal</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {children}
      </main>

      <footer className="bg-card/50 backdrop-blur-sm border-t border-cipher-400/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-mono">
          <p>© 2025 Cipher Quest – Advanced Security Breach Simulation. All rights reserved.</p>
          <p className="text-xs mt-1">System Status: Operational</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
