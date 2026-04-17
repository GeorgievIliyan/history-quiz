import type { QuizData, SessionQuestion, QuizAttempt } from './quiz-types'

/** Fisher-Yates shuffle */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Build a 15-question session: 3 random questions from each of 5 personalities */
export function buildSession(data: QuizData): SessionQuestion[] {
  const personalities = Object.keys(data)
  const questions: SessionQuestion[] = []

  for (const personality of personalities) {
    const pool = shuffle(data[personality]).slice(0, 3)
    for (const q of pool) {
      questions.push({
        ...q,
        personality,
        shuffledAnswers: shuffle(q.answers),
      })
    }
  }

  return shuffle(questions)
}

const STORAGE_KEY = 'bg_history_quiz_attempts'

export function loadAttempts(): QuizAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveAttempt(attempt: QuizAttempt): void {
  if (typeof window === 'undefined') return
  const attempts = loadAttempts()
  attempts.unshift(attempt)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
}

export function clearAttempts(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function scoreLabel(score: number, total: number): string {
  const pct = score / total
  if (pct === 1) return 'Отличен!'
  if (pct >= 0.8) return 'Много добър'
  if (pct >= 0.6) return 'Добър'
  if (pct >= 0.4) return 'Среден'
  return 'Слаб'
}
