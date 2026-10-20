export const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
export const slugify = (text: string) =>
  normalize(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'expressao';

export const regions = [
  {
    id: 'norte',
    name: 'Norte & Porto',
    short: 'Norte',
    description: 'Da pronúncia do Minho às conversas da Invicta.',
    pattern: /norte|minho|porto|mirandela|guimarães|caxinas|leixões|trás.os.montes/i,
  },
  {
    id: 'centro',
    name: 'Centro & Beiras',
    short: 'Centro',
    description: 'Palavras da serra, da aldeia e da beira-mar.',
    pattern: /centro|beira|viseu|leiria|alcanena|bairrada/i,
  },
  {
    id: 'lisboa',
    name: 'Lisboa & Tejo',
    short: 'Lisboa',
    description: 'Entre o bairro, a rua e as margens do Tejo.',
    pattern: /lisboa|tejo|ribatejo/i,
  },
  {
    id: 'sul',
    name: 'Alentejo & Algarve',
    short: 'Sul',
    description: 'O vagar e a expressividade das terras do sul.',
    pattern: /sul|alentejo|algarve|olhão/i,
  },
  {
    id: 'ilhas',
    name: 'Açores & Madeira',
    short: 'Ilhas',
    description: 'Expressões que atravessam o Atlântico.',
    pattern: /açores|madeira/i,
  },
  {
    id: 'brasil',
    name: 'Brasil',
    short: 'Brasil',
    description: 'Outras vozes, a mesma língua viva.',
    pattern: /brasil|amazonas|rio de janeiro/i,
  },
  {
    id: 'africa',
    name: 'África lusófona',
    short: 'África',
    description: 'O português em diálogo com outras línguas.',
    pattern: /angola|guiné|moçambique|cabo verde/i,
  },
  {
    id: 'portugal',
    name: 'Portugal',
    short: 'Portugal',
    description: 'Uso português sem região especificada.',
    pattern: /^(pt|portugal)$/i,
  },
];
export const classifyRegion = (local: string) =>
  regions.find((r) => r.pattern.test(local))?.id || '';
