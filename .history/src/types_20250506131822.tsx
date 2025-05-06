



// Auth context
export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

// Game context
xptype GameContextType = {
  energy: number;
  points: number;
  solvedPasswords: string[];
  updateEnergy: (amount: number) => void;
  updatePoints: (amount: number) => void;
  addSolvedPassword: (password: string) => void;
};
