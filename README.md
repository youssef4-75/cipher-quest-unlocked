# Cipher Quest Unlocked

A modern web-based puzzle game built with React, TypeScript, and Vite. Players solve cryptographic challenges through multiple phases, earning points and achievements along the way.

## 🚀 Features

- **Multi-phase Gameplay**: Progress through increasingly challenging cryptographic puzzles
- **Hint System**: Get help with hints at the cost of points or missing attempts
- **Achievement System**: Track your progress and unlock achievements
- **Point System**: Earn points based on difficulty and performance
- **Streak Tracking**: Maintain win streaks and compete for high scores
- **Theme Collection**: Collect and track different puzzle themes
- **Real-time Feedback**: Get immediate feedback on password attempts
- **Time Limits**: Challenge yourself with time-based puzzles
- **Store Items**: Get help by buying items from the store to help you in your future quests

## In the future

- **Random puzzle**: Dashboard contains a limited number of puzzles to solve wich is generated randomly
- **Challenge**: Challenge your freind by sending them puzzles you found interesting
- **Co-Decipher**: Co-operate with a freind to solve difficult puzzle 
- **Revenge Opportunity**: Puzzles you failed solving remain exposed for 24h to solve before being updated 


## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **State Management**: React Context 
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **Development Tools**: ESLint, TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/youssef4-75/cipher-quest-unlocked.git
cd cipher-quest-unlocked
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
## 🎯 Try it 

### visit the site 
https://cipher-quest-unlocked-i54x.vercel.app/


## 🎮 Game Mechanics

### Scoring System
- Points are awarded based on:
  - Puzzle difficulty (Easy, Medium, Hard)
  - Number of attempts
  - Time taken to solve
  - Whether the password was previously collected

### Hint System
- Players can purchase hints using points
- Each hint reveals a character in the password
- Hint cost: 5 points

### Game Phases
- Each game consists of multiple phases
- Players must solve each phase to progress
- The approach to take to solve eac phase may be different
- Time limits apply to each phase
- Maximum attempts are enforced per game

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── server/        # Mimic the code in the server side for future development
│   ├── connection/  # Code accessible via components and pages
│   ├── database/    # Mimic the database and store sample data for tests
│   └── logic/       # Primary logic for retreiving data from database and inserting into it
├── security/      # Security-related code // Server-side part, not included yet
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── types.tsx      # TypeScript type definitions
```

## 🚀 Deployment

```bash
npm run build
npm run deploy
```

## 🎯 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## ❗ Feedback? 
If you have any feedback or mechanics to suggest they are very welcomed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

