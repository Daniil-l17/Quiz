import { FC, useState } from 'react';
import { questions } from './game';

interface isd {
  setRes: () => void,
  setStep: () => void,
  res: number
}

function Result({ setRes, setStep, res }:isd) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Вы отгадали {res} ответа из {questions.length}
      </h2>
      <button
        onClick={() => {
          setStep(0) 
          setRes(0)
        }}>
        Попробовать снова
      </button>
    </div>
  );
}

interface inf {
  infClick: (index: number) => void;
  quiz: {
    title: string;
    variants: string[];
    correct: number;
  };
  step: number;
}

function Game({quiz, step, infClick }: inf) {
  const isExsict = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${isExsict}%` }} className="progress__inner"></div>
      </div>
      <>
        <h1>{quiz.title}</h1>
        <ul>
          {quiz.variants.map((el, index: number) => (
            <li onClick={() => infClick(index)}>{el}</li>
          ))}
        </ul>
      </>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const quiz = questions[step];
  const [res, setRes] = useState(0);

  const infClick = (id: number) => {
    setStep(step + 1);
    if (id === quiz.correct) setRes(res + 1);
  };

  return (
    <>
      <div className="App">
        <h1 style={{ marginBottom: 30, textAlign: 'center' }}>React Quiz</h1>
        {questions.length > step ? (
          <Game infClick={infClick}step={step} quiz={quiz} />
        ) : (
          <Result setRes={setRes} res={res} setStep={setStep} />
        )}
      </div>
    </>
  );
}

export default App;
