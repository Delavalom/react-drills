import { useEffect, useState } from "react";
import "./App.css";

const getRandomColor = () => {
  const digits = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += digits[Math.floor(Math.random() * 16)];
  }
  return color;
};

enum Result {
  Correct,
  Wrong
}

function App() {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const generateColor = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  }

  useEffect(() => {
    generateColor()
  }, []);

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      generateColor()
    } else {
      setResult(Result.Wrong);
    }
  }

  return (
    <main className="App">
      <div className="w-full h-80" style={{ backgroundColor: color }}></div>
      <div className="flex w-full justify-center gap-4 items-center my-5">
        {answers.map((answer) => (
            <button
              onClick={() => handleAnswerClicked(answer)}
              key={answer}
              className="bg-slate-300"
            >
              {answer}
            </button>
        ))}
      </div>
      {result === Result.Wrong && <p className="text-red-800">Wrong Answer</p>}
      {result === Result.Correct && <p className="text-green-800">Good job</p>}
    </main>
  );
}

export default App;
