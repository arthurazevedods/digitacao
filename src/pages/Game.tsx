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
const Game = () => {
  const {
    difficulty
  } = useParams<{
    difficulty: string;
  }>();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
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
    let timeInSeconds = 180; // Default: 3 minutes for easy
    if (difficulty === 'medio') {
      timeInSeconds = 120; // 2 minutes for medium
    } else if (difficulty === 'dificil') {
      timeInSeconds = 60; // 1 minute for hard
    }
    setTimer(timeInSeconds);
    // Generate text based on difficulty
    const generatedText = generateText(difficulty || 'facil');
    setText(generatedText);
  }, [difficulty]);
  // Timer countdown
  useEffect(() => {
    if (isActive && timer > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      clearInterval(intervalRef.current as number);
      endGame();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timer]);
  // Start timer when user begins typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }
    setUserInput(value);
  };
  // Calculate statistics when game ends
  const endGame = () => {
    setIsActive(false);
    setIsFinished(true);
    // Calculate correct characters
    let correctCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length && userInput[i] === text[i]) {
        correctCount++;
      }
    }
    const accuracy = Math.round(correctCount / userInput.length * 100) || 0;
    // Calculate WPM (words per minute)
    // Assuming average word is 5 characters
    const minutes = getDifficultyTime() / 60;
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
    if (difficulty === 'dificil') return 60;
    if (difficulty === 'medio') return 120;
    return 180; // facil
  };
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // Restart game
  const restartGame = () => {
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
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
          <div className="text-xl font-bold">
            {isFinished ? 'Tempo esgotado!' : formatTime(timer)}
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