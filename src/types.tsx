



// Auth context
export type User = {
  id: string;
  email: string;
  name: string;
} | null;

export type PartialGame = {
    title: string;
    description: string;
    energyCost: number;
    timed: boolean;
    maxAttempts: number;
    timeLimit: number;
    length: number;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Varies';
    detailedDescription: string;
    phase: {
        description: string;
        messages: {
            id: number;
            text: string;
            hash: number;
            position: { top: number, left: number };
        }[];
        explanation: string;
    };    

}

export type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setUser: (_: any) => void
};

// Game context
export type GameContextType = {
  energy: number;
  points: number;
  solvedPasswords: string[];
  updateEnergy: (amount: number) => void;
  updatePoints: (amount: number) => void;
  addSolvedPassword: (password: string) => void;
};


export type ViewGame = {
  title: string;
  description: string;
  energyCost: number;
  timed: boolean;
  maxAttempts: number;
  timeLimit: number;
  length: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Varies';
  detailedDescription: string;
  phase: {
    description: string;
    messages: {
      id: number;
      text: string;
      hash: number;
    }[];
    explanation: string;
  };

}

export type DashboardGame = {
    id: string;
    title: string;
    description: string;
    image: string;
    timeLimit: number;
    timed: boolean;
    energyCost: number;
    maxAttempts: number;
    phases: number;
    difficulty: "Easy" | "Medium" | "Hard" | "Expert" | "Varies";
    preDone: boolean;
    theme: string;
    isDaily: boolean;
    playable: boolean;
}


export type ItemCategory = "powerUps" | "cosmetics" | "energy" | "special"

export type StoreItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  _icon: string;
  icon: JSX.Element|null;
  category: ItemCategory;
  isPermanent: boolean;
  
}
