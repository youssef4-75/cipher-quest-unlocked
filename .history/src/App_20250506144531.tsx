
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
import { loginUser, registerUser } from "./server/logic/user";
import { AuthContextType, GameContextType, User } from "./types";
import { AuthContext, GameContext, useAuth as useAuth__ } from "./context";


export const useAuth = useAuth__


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

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);


    try {
      // call a function that register the user in the database 
      const key = await registerUser(email, password, name)

      setUser({ id: key, name, email })

      localStorage.setItem('cipher_user', JSON.stringify({ id: key, name, email }));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Auth functions
  const login = async (email: string, password: string) => {
    setLoading(true);

    try {

      // In a real app, we would verify credentials with the backend
      const user = await loginUser(email, password)
      setUser(user);
      localStorage.setItem('cipher_user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed', error);
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
