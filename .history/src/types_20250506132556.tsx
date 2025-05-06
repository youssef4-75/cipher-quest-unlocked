



// Auth context
export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
} | null;


// Game context
export type GameContextType = {
  energy: number;
  points: number;
  solvedPasswords: string[];
  updateEnergy: (amount: number) => void;
  updatePoints: (amount: number) => void;
  addSolvedPassword: (password: string) => void;
};
