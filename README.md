# 📜 Строителите на България - History Quiz App

A vintage-styled Bulgarian history quiz application featuring questions about prominent figures from 1878 onwards. Built with Next.js and styled with a classical 1900s aesthetic.

## ✨ Features

- 🎲 Random selection of 15 questions per session (3 from each personality)
- 📊 Score tracking and results saved in browser localStorage
- 📜 Authentic 1900s vintage paper design
- 🇧🇬 Bulgarian language interface
- 📱 Responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4
- **Styling:** Tailwind CSS
- **Fonts:** Playfair Display, Crimson Text
- **Icons:** Lucide React
- **Storage:** Browser localStorage (no backend)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/GeorgievIliyan/history-quiz.git
cd history-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Quiz Data Structure

Questions are organized by personality in `lib/quiz-data.ts`:

```typescript
{
  name: "Personality Name",
  questions: [
    {
      question: "Question text?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      correct: "Correct Answer"
    }
  ]
}
```

## 📄 License

MIT