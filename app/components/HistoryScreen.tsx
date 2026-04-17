'use client'

import type { QuizAttempt } from '@/lib/quiz-types'
import { formatDate, scoreLabel, clearAttempts } from '@/lib/quiz-utils'

interface HistoryScreenProps {
  attempts: QuizAttempt[]
  onBack: () => void
  onClear: () => void
}

export default function HistoryScreen({ attempts, onBack, onClear }: HistoryScreenProps) {
  function handleClear() {
    if (confirm('Сигурни ли сте? Всички записи ще бъдат изтрити.')) {
      clearAttempts()
      onClear()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      {/* Header - styled as ledger book cover */}
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
          Регистър на Изпитанията
        </p>
        
        <div className="border-t-[3px] border-b-[3px] border-double border-border py-4 my-2">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-sepia-ink tracking-tight">
            Архив
          </h1>
          <p className="text-sm italic text-muted-foreground font-serif mt-2">
            Всички ваши минали резултати
          </p>
        </div>

        <div className="ornate-divider mt-4">
          <span className="text-gold-accent text-lg">❦</span>
        </div>
      </div>

      {/* Main card - styled as ledger book */}
      <div className="vintage-frame bg-card w-full max-w-2xl rounded-sm p-7 md:p-9 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {attempts.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-px bg-border" />
              <span className="text-4xl text-gold-accent">⚜</span>
              <span className="w-12 h-px bg-border" />
            </div>
            <p className="font-serif italic text-muted-foreground text-lg">
              Все още няма записани изпитания.
            </p>
            <p className="font-serif text-sm text-muted-foreground mt-2">
              Започнете своето първо изпитание!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Table header */}
            <div className="flex items-center gap-4 pb-3 border-b-2 border-border text-xs uppercase tracking-widest text-muted-foreground font-serif">
              <span className="w-16">No.</span>
              <span className="flex-1">Дата</span>
              <span className="w-24 text-right">Резултат</span>
            </div>
            
            {attempts.map((attempt, idx) => {
              const pct = Math.round((attempt.score / attempt.total) * 100)
              const label = scoreLabel(attempt.score, attempt.total)
              const attemptNum = attempts.length - idx
              
              return (
                <div
                  key={attempt.id}
                  className="ledger-entry border-2 rounded-sm p-4 group"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Attempt number badge */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-serif">
                          Опит
                        </span>
                        <span className="text-2xl font-bold font-serif text-sepia-ink">
                          #{attemptNum}
                        </span>
                      </div>
                      
                      {/* Date and grade */}
                      <div className="flex-1 pt-1">
                        <p className="font-serif text-sm text-sepia-ink">
                          {formatDate(attempt.date)}
                        </p>
                        <p className="font-serif text-xs italic text-sepia-brown mt-0.5 flex items-center gap-1.5">
                          <span className="text-gold-accent">◆</span>
                          {label}
                        </p>
                      </div>
                    </div>
                    
                    {/* Score display */}
                    <div className="text-right border-l-2 border-dashed border-border pl-4">
                      <p className="font-serif text-3xl font-bold text-sepia-ink leading-none">
                        {attempt.score}
                        <span className="text-base font-normal text-muted-foreground">
                          /{attempt.total}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground font-serif mt-1">
                        {pct}%
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4 progress-vintage h-2 rounded-sm overflow-hidden">
                    <div
                      className="progress-vintage-fill h-full rounded-sm"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stats summary - styled as ledger totals */}
        {attempts.length > 1 && (
          <div className="mt-8 border-t-2 border-double border-border pt-6">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-serif text-center mb-4 flex items-center justify-center gap-3">
              <span className="w-12 h-px bg-border" />
              Обобщение
              <span className="w-12 h-px bg-border" />
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border-2 border-border rounded-sm bg-gradient-to-b from-parchment to-parchment-dark p-4">
                <p className="text-3xl font-bold font-serif text-sepia-ink">{attempts.length}</p>
                <p className="text-xs text-muted-foreground font-serif mt-1 uppercase tracking-wide">Изпитания</p>
              </div>
              <div className="border-2 border-border rounded-sm bg-gradient-to-b from-parchment to-parchment-dark p-4">
                <p className="text-3xl font-bold font-serif text-sepia-ink">
                  {Math.round(attempts.reduce((s, a) => s + a.score / a.total, 0) / attempts.length * 100)}%
                </p>
                <p className="text-xs text-muted-foreground font-serif mt-1 uppercase tracking-wide">Среден</p>
              </div>
              <div className="border-2 border-border rounded-sm bg-gradient-to-b from-parchment to-parchment-dark p-4">
                <p className="text-3xl font-bold font-serif text-gold-accent">
                  {Math.max(...attempts.map(a => a.score))}
                </p>
                <p className="text-xs text-muted-foreground font-serif mt-1 uppercase tracking-wide">Най-добър</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onBack}
            className="vintage-btn flex-1 text-primary-foreground font-serif font-semibold text-base py-3.5 px-6 rounded-sm uppercase tracking-wide flex items-center justify-center gap-2 focus:outline-none"
          >
            <span className="text-lg">←</span>
            <span>Обратно</span>
          </button>
          {attempts.length > 0 && (
            <button
              onClick={handleClear}
              className="sm:w-auto font-serif text-sm py-3.5 px-5 rounded-sm tracking-wide border-2 border-border bg-gradient-to-b from-parchment to-parchment-dark text-muted-foreground hover:border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
            >
              Изчисти архива
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-8 h-px bg-border" />
          <span className="text-gold-accent text-2xl">❦</span>
          <span className="w-8 h-px bg-border" />
        </div>
        <p className="text-xs text-muted-foreground font-serif italic">
          Регистър на изпитанията — съхранен локално
        </p>
      </div>
    </div>
  )
}
