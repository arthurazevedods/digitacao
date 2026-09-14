import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrophyIcon, ClockIcon, BrainIcon, CheckIcon } from 'lucide-react';
import logo from '../assets/logo.png';

type Mode = 'chain' | 'finish';

const Home = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('chain');

  const handleDifficultySelect = (difficulty: string) => {
    navigate(`/game/${difficulty}/${mode}`);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] px-4 py-8 sm:py-12 flex items-center justify-center">
      <section className="w-full max-w-5xl rounded-3xl border border-black/5 bg-white/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
        <header className="mx-auto max-w-2xl text-center">
          <img
            src={logo}
            alt="Próximo Nível — Tecnologia e Aprendizado"
            className="mx-auto h-auto w-[260px] sm:w-[320px] md:w-[380px]"
          />

          <h1 className="sr-only">Próximo Nível</h1>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Desafio de Digitação
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              Teste sua velocidade e precisão com diferentes níveis de dificuldade.
            </p>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-[#efe4dd] bg-[#fff8f4] p-5 sm:p-6">
            <h2 className="text-center text-lg font-semibold text-zinc-900">
              Quando eu terminar o texto antes do tempo acabar, eu quero:
            </h2>

            <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={mode === 'chain'}
                onClick={() => setMode('chain')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                  mode === 'chain'
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                }`}
              >
                {mode === 'chain' && <CheckIcon className="h-4 w-4" />}
                Continuar com outra frase
              </button>

              <button
                type="button"
                aria-pressed={mode === 'finish'}
                onClick={() => setMode('finish')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                  mode === 'finish'
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                }`}
              >
                {mode === 'finish' && <CheckIcon className="h-4 w-4" />}
                Ver o resultado na hora
              </button>
            </div>
          </section>

          <section>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                Escolha seu desafio
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
                Nível de dificuldade
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => handleDifficultySelect('facil')}
                className="group rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <BrainIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-emerald-800">Fácil</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-800/80">
                  Palavras simples
                </p>
                <p className="mt-4 text-sm font-semibold text-emerald-900">
                  2 minutos
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleDifficultySelect('medio')}
                className="group rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <ClockIcon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-amber-800">Médio</h3>
                <p className="mt-2 text-sm leading-6 text-amber-800/80">
                  Palavras de média complexidade
                </p>
                <p className="mt-4 text-sm font-semibold text-amber-900">
                  1 min 40 s
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleDifficultySelect('dificil')}
                className="group rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <TrophyIcon className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-rose-800">Difícil</h3>
                <p className="mt-2 text-sm leading-6 text-rose-800/80">
                  Palavras complexas
                </p>
                <p className="mt-4 text-sm font-semibold text-rose-900">
                  1 min 30 s
                </p>
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-950 p-5 text-white sm:p-6">
            <h2 className="text-lg font-semibold">Como jogar</h2>

            <ol className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300 sm:grid-cols-2">
              <li>
                <span className="font-semibold text-white">1.</span> Escolha o comportamento ao terminar o texto.
              </li>
              <li>
                <span className="font-semibold text-white">2.</span> Selecione o nível de dificuldade.
              </li>
              <li>
                <span className="font-semibold text-white">3.</span> Comece a digitar para iniciar o tempo.
              </li>
              <li>
                <span className="font-semibold text-white">4.</span> Veja quantos caracteres você acertou.
              </li>
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
