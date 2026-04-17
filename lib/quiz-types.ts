export interface QuizQuestion {
  question: string
  answers: string[]
  correct: string
}

export type QuizData = Record<string, QuizQuestion[]>

export interface SessionQuestion extends QuizQuestion {
  personality: string
  shuffledAnswers: string[]
}

export interface QuizAttempt {
  id: string
  date: string
  score: number
  total: number
  questions: {
    question: string
    personality: string
    correct: string
    selected: string
  }[]
}

export type AppScreen = 'welcome' | 'quiz' | 'results' | 'history'
