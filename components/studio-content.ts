export const studio = {
  name: 'AI—FIRST',
  descriptor: 'Independent design & technology studio',
  email: 'hello@aifirst.studio',
  hero: {
    eyebrow: 'Human taste. Machine velocity.',
    title: ['Designing', 'what comes', 'after now.'],
    intro:
      'We pair senior creative direction with AI-native systems to make brands, products, and digital experiences move at impossible speed.',
  },
  services: [
    {
      index: '01',
      title: 'AI product design',
      copy: 'From a useful idea to an intuitive, production-ready interface. Research, product strategy, UX, UI and prototyping in one senior team.',
      tags: ['Product strategy', 'UX/UI systems', 'Rapid prototyping'],
    },
    {
      index: '02',
      title: 'Brand systems',
      copy: 'Identity systems designed to learn, adapt and scale across every channel without losing their point of view.',
      tags: ['Positioning', 'Visual identity', 'Generative toolkits'],
    },
    {
      index: '03',
      title: 'Creative development',
      copy: 'High-performance websites and interactive launches where code is part of the idea—not merely the plumbing beneath it.',
      tags: ['WebGL & motion', 'Next.js builds', 'Design engineering'],
    },
    {
      index: '04',
      title: 'AI transformation',
      copy: 'Practical consulting for teams ready to redesign how creative work happens, from workflows to proprietary tools.',
      tags: ['Workflow audits', 'Team enablement', 'AI prototypes'],
    },
  ],
  work: [
    { number: '001', client: 'Noma', title: 'A living identity for machine intelligence', discipline: 'Brand / Product', tone: 'signal' },
    { number: '002', client: 'Arc', title: 'Turning climate data into decisive action', discipline: 'Platform / AI', tone: 'acid' },
    { number: '003', client: 'Forma', title: 'The operating system for creative work', discipline: 'Product / Build', tone: 'paper' },
  ],
  process: [
    ['Frame', 'We define the real problem, the useful ambition and the proof that matters.'],
    ['Make', 'Designers, strategists and engineers work in one accelerated loop.'],
    ['Teach', 'Every engagement leaves your team with systems, fluency and momentum.'],
  ],
} as const

export type Studio = typeof studio
