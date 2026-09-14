import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateText } from '../utils/textGenerator';
import { ArrowLeftIcon } from 'lucide-react';
interface GameStats {
  correctChars: number;
  totalChars: number;
  accuracy: number;
  wpm: number;
}
type FinishReason = 'timeout' | 'completed' | 'manual' | null;
const DIFFICULTY_TIME: Record<string, number> = {
  facil: 120,
  medio: 100,
  dificil: 90
};
const Game = () => {
  const {
    difficulty,
    mode: modeParam
  } = useParams<{
    difficulty: string;
    mode: string;
  }>();
  const mode = modeParam === 'finish' ? 'finish' : 'chain';
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finishReason, setFinishReason] = useState<FinishReason>(null);
  const [stats, setStats] = useState<GameStats>({
    correctChars: 0,
    totalChars: 0,
    accuracy: 0,
    wpm: 0
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const intervalRef = useRef<number | null>(null);
  // Set timer based on difficulty
  useEffect(() => {
    setTimer(getDifficultyTime());
    // Generate text based on difficulty
    const generatedText = generateText(difficulty || 'facil');
    setText(generatedText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);
  // Timer countdown
  useEffect(() => {
    if (isActive && timer > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      clearInterval(intervalRef.current as number);
      endGame('timeout');
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timer]);
  // Detect when the current text has been fully typed before time runs out
  useEffect(() => {
    if (!isActive || isFinished || text.length === 0 || userInput.length < text.length) return;
    if (mode === 'finish') {
      endGame('completed');
    } else {
      setText(prevText => `${prevText} ${generateText(difficulty || 'facil', prevText)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, text, isActive, isFinished, mode]);
  // Start timer when user begins typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }
    setUserInput(value);
  };
  // Calculate statistics when game ends
  const endGame = (reason: FinishReason) => {
    setIsActive(false);
    setIsFinished(true);
    setFinishReason(reason);
    // Calculate correct characters
    let correctCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctCount++;
      }
    }
    const accuracy = Math.round(correctCount / userInput.length * 100) || 0;
    // Calculate WPM (words per minute) using the time actually spent typing
    // Assuming average word is 5 characters
    const elapsedSeconds = Math.max(getDifficultyTime() - timer, 1);
    const minutes = elapsedSeconds / 60;
    const wpm = Math.round(correctCount / 5 / minutes);
    setStats({
      correctChars: correctCount,
      totalChars: userInput.length,
      accuracy,
      wpm
    });
  };
  // Get the original time based on difficulty
  const getDifficultyTime = (): number => {
    return DIFFICULTY_TIME[difficulty || 'facil'] ?? DIFFICULTY_TIME.facil;
  };
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // Finish game immediately (zeroes the timer)
  const finishGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
    endGame('manual');
  };
  // Restart game
  const restartGame = () => {
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
    setFinishReason(null);
    setTimer(getDifficultyTime());
    const generatedText = generateText(difficulty || 'facil');
    setText(generatedText);
    // Focus on textarea
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  // Return to home
  const goHome = () => {
    navigate('/');
  };
  // Render characters with highlighting for correct/incorrect input
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-gray-800';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
      }
      return <span key={index} className={className}>
          {char}
        </span>;
    });
  };
  // Difficulty display name
  const getDifficultyName = () => {
    switch (difficulty) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Médio';
      case 'dificil':
        return 'Difícil';
      default:
        return 'Fácil';
    }
  };
  // Difficulty color class
  const getDifficultyColorClass = () => {
    switch (difficulty) {
      case 'facil':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medio':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'dificil':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };
  // Message shown on the timer/results depending on how the round ended
  const getFinishMessage = () => {
    switch (finishReason) {
      case 'completed':
        return 'Texto concluído!';
      case 'manual':
        return 'Encerrado por você';
      default:
        return 'Tempo esgotado!';
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 w-full">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={goHome} className="flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeftIcon className="h-5 w-5 mr-1" /> Voltar
          </button>
          <div className={`px-4 py-1 rounded-full border ${getDifficultyColorClass()}`}>
            Nível: {getDifficultyName()}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">
              {isFinished ? getFinishMessage() : formatTime(timer)}
            </div>
            {!isFinished && <button onClick={finishGame} className="px-3 py-1 text-sm bg-red-100 text-red-700 border border-red-200 rounded-full hover:bg-red-200">
                Finalizar
              </button>}
          </div>
        </div>
        {!isFinished ? <>
            {/* Text to type */}
            <div className="p-4 bg-gray-50 rounded-lg text-lg mb-6 leading-relaxed h-40 overflow-y-auto">
              {renderText()}
            </div>
            {/* User input */}
            <textarea ref={inputRef} value={userInput} onChange={handleInputChange} disabled={isFinished} className="w-full p-4 border border-gray-300 rounded-lg text-lg mb-4 h-40 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Comece a digitar aqui..." autoFocus />
            {/* Progress indicators */}
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                Caracteres: {userInput.length} / {text.length}
              </div>
              <div>{isActive ? 'Digitando...' : 'Pronto para começar'}</div>
            </div>
          </> :
      // Results
      <div className="space-y-6 py-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">
              Resultados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-sm text-indigo-600">
                  Caracteres Corretos
                </div>
                <div className="text-2xl font-bold text-indigo-700">
                  {stats.correctChars}
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-sm text-indigo-600">Total Digitado</div>
                <div className="text-2xl font-bold text-indigo-700">
                  {stats.totalChars}
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-sm text-indigo-600">Precisão</div>
                <div className="text-2xl font-bold text-indigo-700">
                  {stats.accuracy}%
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-sm text-indigo-600">PPM</div>
                <div className="text-2xl font-bold text-indigo-700">
                  {stats.wpm}
                </div>
                <div className="text-xs text-indigo-500">
                  Palavras por minuto
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button onClick={restartGame} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                <div className="h-5 w-5 mr-2" /> Tentar Novamente
              </button>
              <button onClick={goHome} className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Mudar Dificuldade
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
export default Game;
