// Text generator utility
// Easy difficulty texts
const easyTexts = ['O gato dorme tranquilo na janela. O sol brilha forte hoje. As crianças brincam no parque. A água do rio está clara. Os pássaros cantam nas árvores.', 'A casa tem quatro quartos grandes. O livro conta uma bela história. Meu amigo gosta de jogar futebol. O café da manhã estava delicioso. Vamos passear no shopping.', 'A música toca suavemente. O céu está azul e sem nuvens. O cachorro corre pelo jardim. A menina desenha flores coloridas. O menino lê um livro de aventuras.', 'O pão quente saiu do forno agora. A vovó conta histórias à noite. O ônibus chegou no horário certo. Gosto de tomar suco de laranja. O parque tem muitas árvores verdes.', 'Hoje é um bom dia para passear. O peixe nada dentro do aquário. A chuva caiu rápido e parou. Meu irmão gosta de andar de bicicleta. A praia estava cheia de gente.', 'A borboleta pousou na flor amarela. O professor explicou a lição com calma. Nós fomos ao mercado comprar frutas. O bebê dorme no berço macio. A lua brilha no céu escuro.'];
// Medium difficulty texts
const mediumTexts = ['A tecnologia avança rapidamente e transforma nossa maneira de viver e trabalhar. Os cientistas desenvolvem novas soluções para problemas ambientais complexos. A educação é fundamental para o desenvolvimento de qualquer sociedade moderna.', 'O exercício físico regular contribui para a saúde mental e física. As redes sociais mudaram a forma como nos comunicamos e compartilhamos informações. O aquecimento global é um desafio que exige ação coordenada de todos os países.', 'A literatura brasileira tem grandes nomes como Machado de Assis e Clarice Lispector. A economia mundial enfrenta desafios constantes que afetam milhões de pessoas. A preservação da biodiversidade é essencial para o equilíbrio do planeta.', 'A alimentação saudável influencia diretamente a qualidade de vida das pessoas. O mercado de trabalho exige cada vez mais profissionais capacitados e flexíveis. A comunicação clara evita boa parte dos conflitos dentro de uma equipe.', 'O turismo sustentável busca equilibrar o desenvolvimento econômico com a preservação ambiental. As cidades grandes enfrentam desafios constantes relacionados à mobilidade urbana. A leitura frequente amplia o vocabulário e a capacidade de argumentação.', 'A inovação tecnológica exige investimento constante em pesquisa e desenvolvimento. O trabalho em equipe torna processos complexos mais rápidos e eficientes. A gestão do tempo é uma habilidade essencial na vida profissional moderna.'];
// Hard difficulty texts
const hardTexts = ['A interdisciplinaridade na pesquisa científica contemporânea possibilita abordagens inovadoras para questões socioeconômicas e ambientais que transcendem fronteiras geopolíticas estabelecidas.', 'A inteligência artificial e o aprendizado de máquina revolucionam diversos setores da economia global, suscitando debates éticos sobre autonomia, privacidade e o futuro do trabalho humano.', 'O desenvolvimento sustentável requer uma reconciliação entre crescimento econômico, inclusão social e proteção ambiental, desafiando paradigmas tradicionais de produção e consumo.', 'As manifestações culturais autóctones enfrentam o paradoxo da globalização: ganham visibilidade internacional, mas arriscam-se à descaracterização de suas expressões mais autênticas.', 'A neuroplasticidade cerebral demonstra a extraordinária capacidade adaptativa do cérebro humano, permitindo reorganização neural em resposta a experiências e até mesmo lesões traumáticas.', 'A epistemologia contemporânea questiona as fronteiras entre conhecimento científico e outras formas de saber, problematizando hierarquias e promovendo diálogos entre diferentes tradições intelectuais.'];
const textsByDifficulty: Record<string, string[]> = {
  facil: easyTexts,
  medio: mediumTexts,
  dificil: hardTexts
};
/**
 * Generates a random text based on difficulty level
 * @param difficulty - The difficulty level: "facil", "medio", or "dificil"
 * @param exclude - A text to avoid picking again (e.g. the text currently on screen), so chained phrases don't repeat back-to-back
 * @returns A randomly selected text of appropriate difficulty
 */
export const generateText = (difficulty: string, exclude?: string): string => {
  const textArray = textsByDifficulty[difficulty] || easyTexts;
  const candidates = exclude ? textArray.filter(t => t !== exclude) : textArray;
  const pool = candidates.length > 0 ? candidates : textArray;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};
