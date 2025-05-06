
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import GamePlay from "./pages/GamePlay";
import Store from "./pages/Store";
import { authenticateUser } from "./server/logic/user";

// Auth context
type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Game context
type GameContextType = {
  energy: number;
  points: number;
  solvedPasswords: string[];
  updateEnergy: (amount: number) => void;
  updatePoints: (amount: number) => void;
  addSolvedPassword: (password: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  // Auth state
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  
  // Game state - Changed initial points from 0 to 100
  const [energy, setEnergy] = useState(100);
  const [points, setPoints] = useState(100);
  const [solvedPasswords, setSolvedPasswords] = useState<string[]>([]);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cipher_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load game data
    const storedEnergy = localStorage.getItem('cipher_energy');
    const storedPoints = localStorage.getItem('cipher_points');
    const storedPasswords = localStorage.getItem('cipher_passwords');
    
    if (storedEnergy) setEnergy(parseInt(storedEnergy));
    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedPasswords) setSolvedPasswords(JSON.parse(storedPasswords));
    
    setLoading(false);
  }, []);
  
  // Save game data when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('cipher_energy', energy.toString());
      localStorage.setItem('cipher_points', points.toString());
      localStorage.setItem('cipher_passwords', JSON.stringify(solvedPasswords));
    }
  }, [energy, points, solvedPasswords, user]);

  // Energy regeneration effect (1 energy every 30 seconds, up to 100)
  useEffect(() => {
    if (energy < 100) {
      const timer = setTimeout(() => {
        setEnergy(prev => Math.min(prev + 1, 100));
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [energy]);

  // Auth functions
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, we would verify credentials with the backend
      const mockUser = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('cipher_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    
    try {
      // call a function that register the user in the database 
      const key = await authenticateUser(email, password, name)

      user = {}
      
      setUser(user);
      localStorage.setItem('cipher_user', JSON.stringify(user));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cipher_user');
  };

  // Game functions
  const updateEnergy = (amount: number) => {
    setEnergy((prev) => {
      const newValue = Math.max(0, Math.min(100, prev + amount));
      return newValue;
    });
  };
  
  const updatePoints = (amount: number) => {
    setPoints((prev) => Math.max(0, prev + amount));
  };
  
  const addSolvedPassword = (password: string) => {
    setSolvedPasswords((prev) => {
      if (prev.includes(password)) return prev;
      return [...prev.slice(0, 99), password];
    });
  };

  // Auth context value
  const authValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  };
  
  // Game context value
  const gameValue: GameContextType = {
    energy,
    points,
    solvedPasswords,
    updateEnergy,
    updatePoints,
    addSolvedPassword,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <GameContext.Provider value={gameValue}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
                <Route path="/gameplay/:gameId" element={user ? <GamePlay /> : <Navigate to="/login" />} />
                <Route path="/store" element={user ? <Store /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GameContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
