import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrophyIcon, ClockIcon, BrainIcon } from 'lucide-react';
const Home = () => {
  const navigate = useNavigate();
  const handleDifficultySelect = (difficulty: string) => {
    navigate(`/game/${difficulty}`);
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 w-full">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-indigo-700">
            Desafio de Digitação
          </h1>
          <p className="text-xl text-gray-600">
            Teste sua velocidade e precisão de digitação!
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600 text-center">
            Escolha o nível de dificuldade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => handleDifficultySelect('facil')} className="flex flex-col items-center p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all duration-300">
              <BrainIcon className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-xl font-bold text-green-600">Fácil</h3>
              <p className="text-sm text-green-600 text-center mt-2">
                Palavras simples e 3 minutos para digitar
              </p>
            </button>
            <button onClick={() => handleDifficultySelect('medio')} className="flex flex-col items-center p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg hover:bg-yellow-100 hover:border-yellow-300 transition-all duration-300">
              <ClockIcon className="h-10 w-10 text-yellow-500 mb-3" />
              <h3 className="text-xl font-bold text-yellow-600">Médio</h3>
              <p className="text-sm text-yellow-600 text-center mt-2">
                Palavras de média complexidade e 2 minutos para digitar
              </p>
            </button>
            <button onClick={() => handleDifficultySelect('dificil')} className="flex flex-col items-center p-6 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-300">
              <TrophyIcon className="h-10 w-10 text-red-500 mb-3" />
              <h3 className="text-xl font-bold text-red-600">Difícil</h3>
              <p className="text-sm text-red-600 text-center mt-2">
                Palavras complexas e apenas 1 minuto para digitar
              </p>
            </button>
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-600 mb-2">Como jogar:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Escolha um nível de dificuldade</li>
            <li>Digite o texto mostrado o mais rápido e preciso possível</li>
            <li>O tempo começa assim que você começar a digitar</li>
            <li>Veja quantos caracteres corretos você conseguiu digitar!</li>
          </ul>
        </div>
      </div>
    </div>;
};
export default Home;