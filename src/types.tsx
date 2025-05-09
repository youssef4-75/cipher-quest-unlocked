



// Auth context
export type User = {
  id: string;
  email: string;
  name: string;
} | null;


export type UserData = UserDataPrivate & {
  password: string;
}

export type UserDataPrivate = {
  name: string;
  auth_mail: string;
  winStreak: number;
  level: number;
  themes: Record<string, number>;
  energy: number;
  points: number;
  collectedPwd: string[];
  memberSince: string;
  totalGamePlayed: number;
  accomplishedMission: number;
  wellAttempts: number; // the number of correct attempts
  totalAttempts: number;
  longestStreak: number; // successive mission accomplished
  phaseSolved: number;
  currentGame: {
    gameId: string | null;
    phase: number | null;
    attempt: number | null;
    startTime: number | null;
    entryTimes: number | null;
  };
}

export type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
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
  };

}