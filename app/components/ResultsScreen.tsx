'use client'

import { useState } from 'react'
import type { QuizAttempt } from '@/lib/quiz-types'
import { scoreLabel, formatDate } from '@/lib/quiz-utils'

interface ResultsScreenProps {
  attempt: QuizAttempt
  onRestart: () => void
  onHistory: () => void
}

export default function ResultsScreen({ attempt, onRestart, onHistory }: ResultsScreenProps) {
  const [showDetails, setShowDetails] = useState(false)
  const { score, total, questions, date } = attempt
  const pct = Math.round((score / total) * 100)
  const label = scoreLabel(score, total)

  // Determine certificate "grade" styling
  const gradeColor = pct >= 80 
    ? 'text-gold-accent' 
    : pct >= 60 
    ? 'text-sepia-brown' 
    : 'text-muted-foreground'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      {/* Certificate header */}
      <div className="w-full max-w-2xl text-center mb-6 animate-fade-in-up">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-gold-accent text-xl">❧</span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold-accent" />
            <span className="w-2 h-2 rounded-full bg-gold-dark" />
            <span className="w-2 h-2 rounded-full bg-gold-accent" />
          </div>
          <span className="text-gold-accent text-xl rotate-180">❧</span>
        </div>

        <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground font-serif mb-2">
          Удостоверение за Изпит
        </p>
        
        <div className="border-t-[3px] border-b-[3px] border-double border-border py-4 my-2">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-sepia-ink tracking-tight">
            Резултати
          </h1>
          <p className="text-sm italic text-muted-foreground font-serif mt-2">
            {formatDate(date)}
          </p>
        </div>

        <div className="ornate-divider mt-4">
          <span className="text-gold-accent text-lg">❦</span>
        </div>
      </div>

      {/* Certificate card */}
      <div className="vintage-frame corner-frame bg-card w-full max-w-2xl rounded-sm p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Score display - certificate style */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center border-[3px] border-double border-border rounded-sm px-12 py-8 bg-gradient-to-b from-parchment to-parchment-dark relative">
            {/* Corner marks */}
            <span className="absolute top-2 left-2 text-gold-accent text-sm">◆</span>
            <span className="absolute top-2 right-2 text-gold-accent text-sm">◆</span>
            <span className="absolute bottom-2 left-2 text-gold-accent text-sm">◆</span>
            <span className="absolute bottom-2 right-2 text-gold-accent text-sm">◆</span>
            
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-serif mb-3">
              Получени Точки
            </p>
            
            <span className="text-7xl md:text-8xl font-bold font-serif text-sepia-ink leading-none">
              {score}
            </span>
            <span className="text-muted-foreground font-serif text-xl mt-1">
              от {total}
            </span>
            
            {/* Grade label with decorations */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-gold-accent">⚜</span>
              <span className={`text-2xl font-serif font-bold italic ${gradeColor}`}>
                {label}
              </span>
              <span className="text-gold-accent">⚜</span>
            </div>

            {/* Progress bar */}
            <div className="mt-5 w-full max-w-[200px]">
              <div className="progress-vintage h-3 rounded-sm overflow-hidden">
                <div
                  className="progress-vintage-fill h-full rounded-sm transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-serif font-semibold">{pct}%</p>
            </div>
          </div>
        </div>

        {/* Per-personality breakdown */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-serif text-center mb-4 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-border" />
            Резултати по Личности
            <span className="w-12 h-px bg-border" />
          </p>
          
          <div className="border-2 border-border rounded-sm bg-gradient-to-b from-parchment to-parchment-dark p-4">
            {(() => {
              const map: Record<string, { correct: number; total: number }> = {}
              for (const q of questions) {
                if (!map[q.personality]) map[q.personality] = { correct: 0, total: 0 }
                map[q.personality].total++
                if (q.correct === q.selected) map[q.personality].correct++
              }
              return Object.entries(map).map(([name, { correct, total: t }], idx) => {
                const rowPct = (correct / t) * 100
                return (
                  <div key={name} className="flex items-center gap-4 py-2.5 border-b border-dashed border-border/60 last:border-0">
                    <span className="text-gold-accent text-xs font-bold font-serif w-6">
                      {['I', 'II', 'III', 'IV', 'V'][idx]}.
                    </span>
                    <span className="font-serif text-sm text-sepia-ink flex-1">{name}</span>
                    <span className="font-serif text-sm font-bold text-sepia-brown whitespace-nowrap">
                      {correct}/{t}
                    </span>
                    <div className="w-20 progress-vintage h-2 rounded-sm overflow-hidden">
                      <div
                        className="progress-vintage-fill h-full rounded-sm"
                        style={{ width: `${rowPct}%` }}
                      />
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>

        {/* Toggle detail view */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-sm font-serif text-muted-foreground border-2 border-dashed border-border rounded-sm py-2.5 px-4 hover:border-ornament hover:text-sepia-ink hover:bg-parchment-dark/30 transition-all duration-200 mb-6 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-card"
        >
          {showDetails ? '▲ Скрий подробностите' : '▼ Покажи всички въпроси'}
        </button>

        {showDetails && (
          <div className="flex flex-col gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2 animate-fade-in-up">
            {questions.map((q, i) => {
              const isCorrect = q.correct === q.selected
              return (
                <div
                  key={i}
                  className={`border-2 rounded-sm p-4 font-serif text-sm relative ${
                    isCorrect
                      ? 'border-[oklch(0.35_0.10_145)] bg-[oklch(0.35_0.10_145_/_0.08)] stamp-correct'
                      : 'border-[oklch(0.40_0.14_25)] bg-[oklch(0.40_0.14_25_/_0.08)] stamp-incorrect'
                  }`}
                >
                  {/* Question number badge */}
                  <span className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCorrect ? 'bg-[oklch(0.35_0.10_145)] text-white' : 'bg-[oklch(0.40_0.14_25)] text-white'
                  }`}>
                    {i + 1}
                  </span>
                  
                  <div className="flex items-start gap-3 mb-2 pl-4">
                    <span className={`text-lg font-bold ${isCorrect ? 'text-[oklch(0.35_0.10_145)]' : 'text-[oklch(0.40_0.14_25)]'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <span className="text-sepia-ink font-semibold leading-snug">{q.question}</span>
                  </div>
                  
                  <div className="pl-11 text-xs text-muted-foreground space-y-1">
                    <p>
                      <span className="text-sepia-brown font-semibold">Вашият отговор:</span>{' '}
                      <span className={isCorrect ? 'text-[oklch(0.35_0.10_145)] font-semibold' : 'text-[oklch(0.40_0.14_25)] font-semibold'}>
                        {q.selected}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p>
                        <span className="text-sepia-brown font-semibold">Верен отговор:</span>{' '}
                        <span className="text-[oklch(0.35_0.10_145)] font-semibold">{q.correct}</span>
                      </p>
                    )}
                    <p className="mt-1.5 italic text-muted-foreground flex items-center gap-1.5">
                      <span className="text-gold-accent text-xs">◆</span>
                      {q.personality}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="vintage-btn flex-1 text-primary-foreground font-serif font-semibold text-base py-3.5 px-6 rounded-sm uppercase tracking-wide flex items-center justify-center gap-2 focus:outline-none"
          >
            <span className="text-xl">⚜</span>
            <span>Ново Изпитание</span>
          </button>
          <button
            onClick={onHistory}
            className="vintage-btn-secondary sm:w-auto font-serif text-base py-3.5 px-5 rounded-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2"
          >
            Архив
          </button>
        </div>
      </div>

      {/* Footer seal */}
      <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-8 h-px bg-border" />
          <span className="text-gold-accent text-2xl">❦</span>
          <span className="w-8 h-px bg-border" />
        </div>
        <p className="text-xs text-muted-foreground font-serif italic">
          Издадено от Министерството на Народното Просвещение
        </p>
      </div>
    </div>
  )
}
