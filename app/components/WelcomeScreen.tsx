'use client'

import { useState } from 'react'
import type { QuizData } from '@/lib/quiz-types'
import { defaultQuizData } from '@/lib/quiz-data'

interface WelcomeScreenProps {
  onStart: (data: QuizData) => void
  onHistory: () => void
  attemptCount: number
}

export default function WelcomeScreen({ onStart, onHistory, attemptCount }: WelcomeScreenProps) {
  const [showJson, setShowJson] = useState(false)
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState('')

  function handleStart() {
    if (!showJson) {
      onStart(defaultQuizData)
      return
    }
    if (!jsonText.trim()) {
      onStart(defaultQuizData)
      return
    }
    try {
      const parsed = JSON.parse(jsonText) as QuizData
      const keys = Object.keys(parsed)
      if (keys.length === 0) throw new Error('Празен обект')
      onStart(parsed)
    } catch {
      setError('Невалиден JSON формат. Моля проверете данните.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      {/* Book cover style masthead */}
      <div className="w-full max-w-2xl text-center mb-4 animate-fade-in-up">
        {/* Top ornament row */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-gold-accent text-2xl">❧</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-gold-accent" />
            <span className="w-2 h-2 rounded-full bg-gold-dark" />
            <span className="w-2 h-2 rounded-full bg-gold-accent" />
          </div>
          <span className="text-gold-accent text-2xl rotate-180">❧</span>
        </div>

        {/* Ministry header */}
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-serif mb-3">
          Министерство на Народното Просвещение
        </p>

        {/* Main title block with decorative borders */}
        <div className="relative border-t-[3px] border-b-[3px] border-double border-border py-6 my-3">
          {/* Corner decorations */}
          <span className="absolute -top-1 left-4 text-gold-accent text-lg leading-none">◆</span>
          <span className="absolute -top-1 right-4 text-gold-accent text-lg leading-none">◆</span>
          <span className="absolute -bottom-1 left-4 text-gold-accent text-lg leading-none">◆</span>
          <span className="absolute -bottom-1 right-4 text-gold-accent text-lg leading-none">◆</span>

          <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-tight text-sepia-ink leading-tight text-balance">
            Българска История
          </h1>
          <p className="text-lg italic text-sepia-brown font-serif mt-2 tracking-wide">
            Викторина за знатоци
          </p>
          <p className="text-sm text-muted-foreground font-serif mt-1">
            1878 — 1939
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="ornate-divider mt-6">
          <span className="text-gold-accent font-serif text-xl">❦</span>
        </div>
      </div>

      {/* Main card - styled as vintage certificate */}
      <div className="vintage-frame corner-frame bg-card w-full max-w-2xl rounded-sm mt-4 p-8 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Decorative header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-2xl text-gold-accent">⚜</span>
            <h2 className="text-2xl font-bold font-serif text-sepia-ink tracking-wide">
              Добре Дошли
            </h2>
            <span className="text-2xl text-gold-accent">⚜</span>
          </div>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-gold-accent to-transparent mb-4" />
          <p className="text-muted-foreground font-serif leading-relaxed text-base max-w-md mx-auto">
            Настоящата викторина съдържа{' '}
            <strong className="text-sepia-ink font-semibold">15 въпроса</strong> — по три от пет
            видни личности на нашето Отечество. Въпросите и отговорите се разбъркват
            при всяко ново изпитание.
          </p>
        </div>

        {/* Personalities list - styled as ledger */}
        <div className="border-2 border-border rounded-sm bg-gradient-to-b from-parchment to-parchment-dark p-5 mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-4 font-serif flex items-center justify-center gap-2">
            <span className="text-gold-accent">—</span>
            Изпитвани Личности
            <span className="text-gold-accent">—</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            {Object.keys(defaultQuizData).map((name, i) => (
              <div key={name} className="flex items-center gap-3 text-sm font-serif text-sepia-ink py-1 border-b border-dashed border-border/50 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <span className="text-gold-accent text-xs font-bold">{['I', 'II', 'III', 'IV', 'V'][i]}.</span>
                <span className="flex-1">{name}</span>
                <span className="text-xs text-muted-foreground italic">3 въпр.</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleStart}
            className="vintage-btn flex-1 text-primary-foreground font-serif font-semibold text-lg py-3.5 px-6 rounded-sm tracking-wide uppercase flex items-center justify-center gap-2 focus:outline-none"
          >
            <span className="text-xl">⚜</span>
            <span>Начало на теста</span>
          </button>
          {attemptCount > 0 && (
            <button
              onClick={onHistory}
              className="vintage-btn-secondary sm:w-auto font-serif text-base py-3.5 px-5 rounded-sm tracking-wide flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2"
            >
              <span>Архив</span>
              <span className="bg-ornament text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-sm">
                {attemptCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="ornate-divider max-w-xs mx-auto">
            <span className="text-gold-accent font-serif italic text-sm tracking-wide">
              Иван Вазов
            </span>
        </div>
        <p className="text-xs text-muted-foreground mt-3 font-serif italic max-w-sm mx-auto">
          &ldquo;И ний сме дали нещо на света и на вси славяни книга да четат.&rdquo;
        </p>

        {/* Credits */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-serif">
            Създадено от
          </p>
          <p className="text-sm font-serif font-semibold text-foreground mt-1">
            Илиян Георгиев
          </p>
          <p className="text-xs text-muted-foreground font-serif italic">
            10 клас
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-border" />
          <span className="text-gold-accent text-lg">❧</span>
          <span className="w-8 h-px bg-border" />
        </div>
      </div>
    </div>
  )
}
