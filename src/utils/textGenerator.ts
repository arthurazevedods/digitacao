// Text generator utility
// Easy difficulty texts
const easyTexts = ['O gato dorme tranquilo na janela. O sol brilha forte hoje. As crianças brincam no parque. A água do rio está clara. Os pássaros cantam nas árvores.', 'A casa tem quatro quartos grandes. O livro conta uma bela história. Meu amigo gosta de jogar futebol. O café da manhã estava delicioso. Vamos passear no shopping.', 'A música toca suavemente. O céu está azul e sem nuvens. O cachorro corre pelo jardim. A menina desenha flores coloridas. O menino lê um livro de aventuras.'];
// Medium difficulty texts
const mediumTexts = ['A tecnologia avança rapidamente e transforma nossa maneira de viver e trabalhar. Os cientistas desenvolvem novas soluções para problemas ambientais complexos. A educação é fundamental para o desenvolvimento de qualquer sociedade moderna.', 'O exercício físico regular contribui para a saúde mental e física. As redes sociais mudaram a forma como nos comunicamos e compartilhamos informações. O aquecimento global é um desafio que exige ação coordenada de todos os países.', 'A literatura brasileira tem grandes nomes como Machado de Assis e Clarice Lispector. A economia mundial enfrenta desafios constantes que afetam milhões de pessoas. A preservação da biodiversidade é essencial para o equilíbrio do planeta.'];
// Hard difficulty texts
const hardTexts = ['A interdisciplinaridade na pesquisa científica contemporânea possibilita abordagens inovadoras para questões socioeconômicas e ambientais que transcendem fronteiras geopolíticas estabelecidas. A inteligência artificial e o aprendizado de máquina revolucionam diversos setores da economia global, suscitando debates éticos sobre autonomia, privacidade e o futuro do trabalho humano.', 'O desenvolvimento sustentável requer uma reconciliação entre crescimento econômico, inclusão social e proteção ambiental, desafiando paradigmas tradicionais de produção e consumo. As manifestações culturais autóctones enfrentam o paradoxo da globalização: enquanto ganham visibilidade internacional, arriscam-se à descaracterização e à mercantilização de suas expressões mais autênticas.', 'A neuroplasticidade cerebral demonstra a extraordinária capacidade adaptativa do cérebro humano, permitindo a reorganização neural em resposta a experiências, aprendizados e até mesmo após lesões traumáticas. A epistemologia contemporânea questiona as fronteiras entre conhecimento científico e outras formas de saber, problematizando hierarquias estabelecidas e promovendo diálogos mais inclusivos entre diferentes tradições intelectuais.'];
/**
 * Generates a random text based on difficulty level
 * @param difficulty - The difficulty level: "facil", "medio", or "dificil"
 * @returns A randomly selected text of appropriate difficulty
 */
export const generateText = (difficulty: string): string => {
  let textArray: string[];
  switch (difficulty) {
    case 'dificil':
      textArray = hardTexts;
      break;
    case 'medio':
      textArray = mediumTexts;
      break;
    case 'facil':
    default:
      textArray = easyTexts;
      break;
  }
  // Get a random text from the array
  const randomIndex = Math.floor(Math.random() * textArray.length);
  return textArray[randomIndex];
};