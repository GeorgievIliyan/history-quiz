'use client'

import { useState, useEffect, useCallback } from 'react'
import type { QuizData, SessionQuestion, QuizAttempt, AppScreen } from '@/lib/quiz-types'
import { buildSession, loadAttempts, saveAttempt } from '@/lib/quiz-utils'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'
import HistoryScreen from './components/HistoryScreen'
import ResultsScreen from './components/ResultsScreen'

interface AnswerState {
  selected: string
  isCorrect: boolean
}

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('welcome')
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [questions, setQuestions] = useState<SessionQuestion[]>([])
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])

  useEffect(() => {
    setAttempts(loadAttempts())
  }, [])

  const handleStart = useCallback((data: QuizData) => {
    setQuizData(data)
    const session = buildSession(data)
    setQuestions(session)
    setCurrentAttempt(null)
    setScreen('quiz')
  }, [])

  const handleQuizComplete = useCallback(
    (answers: AnswerState[]) => {
      if (!questions.length) return
      const score = answers.filter((a) => a.isCorrect).length
      const attempt: QuizAttempt = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        score,
        total: questions.length,
        questions: questions.map((q, i) => ({
          question: q.question,
          personality: q.personality,
          correct: q.correct,
          selected: answers[i]?.selected ?? '',
        })),
      }
      saveAttempt(attempt)
      setCurrentAttempt(attempt)
      setAttempts(loadAttempts())
      setScreen('results')
    },
    [questions]
  )

  const handleRestart = useCallback(() => {
    if (quizData) {
      const session = buildSession(quizData)
      setQuestions(session)
      setCurrentAttempt(null)
      setScreen('quiz')
    } else {
      setScreen('welcome')
    }
  }, [quizData])

  const handleGoHistory = useCallback(() => {
    setAttempts(loadAttempts())
    setScreen('history')
  }, [])

  const handleClearHistory = useCallback(() => {
    setAttempts([])
    setScreen('welcome')
  }, [])

  const handleBackFromHistory = useCallback(() => {
    if (currentAttempt) {
      setScreen('results')
    } else {
      setScreen('welcome')
    }
  }, [currentAttempt])

  return (
    <main className="relative">
      {screen === 'welcome' && (
        <WelcomeScreen
          onStart={handleStart}
          onHistory={handleGoHistory}
          attemptCount={attempts.length}
        />
      )}
      {screen === 'quiz' && questions.length > 0 && (
        <QuizScreen questions={questions} onComplete={handleQuizComplete} />
      )}
      {screen === 'results' && currentAttempt && (
        <ResultsScreen
          attempt={currentAttempt}
          onRestart={handleRestart}
          onHistory={handleGoHistory}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          attempts={attempts}
          onBack={handleBackFromHistory}
          onClear={handleClearHistory}
        />
      )}
    </main>
  )
}
