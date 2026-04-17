'use client'

import { useState } from 'react'
import type { SessionQuestion } from '@/lib/quiz-types'

interface AnswerState {
  selected: string
  isCorrect: boolean
}

interface QuizScreenProps {
  questions: SessionQuestion[]
  onComplete: (answers: AnswerState[]) => void
}

export default function QuizScreen({ questions, onComplete }: QuizScreenProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(AnswerState | null)[]>(
    Array(questions.length).fill(null)
  )
  const [chosen, setChosen] = useState<string | null>(null)

  const q = questions[current]
  const totalQ = questions.length
  const answered = answers.filter(Boolean).length
  const currentAnswer = answers[current]
  const progressPct = (answered / totalQ) * 100

  function handleSelect(option: string) {
    if (currentAnswer) return
    const isCorrect = option === q.correct
    const state: AnswerState = { selected: option, isCorrect }
    setChosen(option)
    const updated = [...answers]
    updated[current] = state
    setAnswers(updated)
  }

  function handleNext() {
    if (current < totalQ - 1) {
      setCurrent(current + 1)
      setChosen(null)
    } else {
      onComplete(answers.filter(Boolean) as AnswerState[])
    }
  }

  function getButtonClass(option: string): string {
    const base = 'answer-btn w-full text-left py-3.5 px-5 rounded-sm font-serif text-base leading-relaxed cursor-pointer'
    if (!currentAnswer) return base
    if (option === q.correct) return `${base} correct`
    if (option === chosen && !currentAnswer.isCorrect) return `${base} selected-incorrect`
    return `${base} opacity-50`
  }

  // Roman numeral for question number
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
      {/* Header strip with progress */}
      <div className="w-full max-w-2xl mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-gold-accent font-bold font-serif text-lg">{romanNumerals[current]}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-serif">
              Въпрос {current + 1} от {totalQ}
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-serif flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold-accent" />
            {answered} отговорено
          </p>
        </div>
        {/* Vintage progress bar */}
        <div className="progress-vintage h-2.5 rounded-sm overflow-hidden">
          <div
            className="progress-vintage-fill h-full transition-all duration-500 ease-out rounded-sm"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* Progress markers */}
        <div className="flex justify-between mt-1.5">
          {Array.from({ length: totalQ }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < answered ? 'bg-gold-accent' : i === current ? 'bg-ornament' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="vintage-frame bg-card w-full max-w-2xl rounded-sm p-7 md:p-10 animate-fade-in-up">
        {/* Personality badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-gold-accent text-lg">◆</span>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-serif font-semibold">
            {q.personality}
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Question text */}
        <h2 className="text-xl md:text-2xl font-bold font-serif text-sepia-ink leading-snug mb-8 text-balance">
          {q.question}
        </h2>

        {/* Answer options */}
        <div className="flex flex-col gap-3 mb-8">
          {q.shuffledAnswers.map((option, i) => {
            const letters = ['А', 'Б', 'В', 'Г']
            const isCorrectAnswer = currentAnswer && option === q.correct
            const isWrongSelected = currentAnswer && option === chosen && !currentAnswer.isCorrect
            
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={getButtonClass(option)}
                disabled={!!currentAnswer}
              >
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-sm mr-3 font-serif font-bold text-sm border ${
                  isCorrectAnswer 
                    ? 'bg-correct-text/20 border-correct-text/40 text-correct-text' 
                    : isWrongSelected 
                    ? 'bg-incorrect-text/20 border-incorrect-text/40 text-incorrect-text'
                    : 'bg-parchment-dark border-border text-muted-foreground'
                }`}>
                  {letters[i]}
                </span>
                <span className="flex-1">{option}</span>
                {isCorrectAnswer && (
                  <span className="text-correct-text text-xl ml-2 animate-stamp">✓</span>
                )}
                {isWrongSelected && (
                  <span className="text-incorrect-text text-xl ml-2 animate-stamp">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback + Next button */}
        {currentAnswer && (
          <div className="border-t-2 border-dashed border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-start gap-3">
              {currentAnswer.isCorrect ? (
                <>
                  <span className="text-3xl">✓</span>
                  <div>
                    <p className="font-serif text-lg font-bold text-sepia-ink">
                      Вярно! Браво.
                    </p>
                    <p className="text-sm text-muted-foreground font-serif italic">
                      Отличен отговор!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-3xl text-destructive">✗</span>
                  <div>
                    <p className="font-serif text-base text-destructive font-semibold">
                      Грешно.
                    </p>
                    <p className="font-serif text-sm text-sepia-ink">
                      Верният отговор:{' '}
                      <strong className="text-sepia-brown">{q.correct}</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleNext}
              className="vintage-btn text-primary-foreground font-serif font-semibold py-3 px-6 rounded-sm uppercase tracking-wide text-sm whitespace-nowrap flex items-center gap-2 focus:outline-none"
            >
              {current < totalQ - 1 ? (
                <>
                  <span>Следващ</span>
                  <span className="text-lg">→</span>
                </>
              ) : (
                <>
                  <span className="text-lg">⚜</span>
                  <span>Резултати</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom ornament */}
      <div className="mt-8 ornate-divider w-full max-w-2xl">
        <span className="text-gold-accent font-serif italic text-sm flex items-center gap-2">
          <span>{romanNumerals[current]}</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-muted-foreground">{romanNumerals[totalQ - 1]}</span>
        </span>
      </div>
    </div>
  )
}
