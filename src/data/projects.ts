export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  metrics: string;
  demoUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CEP Finder",
    description:
      "Fast Brazilian postal code lookup using ViaCEP with caching and nice UX.",
    image: "/images/projects/project-cep.jpg",
    category: "Frontend",
    technologies: ["React", "TypeScript", "ViaCEP API"],
    metrics: "Lookup avg. 120ms — 99.9% uptime",
    demoUrl: "https://demo-cep-finder.com",
    githubUrl: "https://github.com/SavioIesous/CEP",
  },
  {
    id: 2,
    title: "Realtime Chat",
    description:
      "Realtime chat app with rooms, typing indicators and message history.",
    image: "/images/projects/project-chat.jpg",
    category: "Full Stack",
    technologies: ["React", "Socket.io", "Tailwind"],
    metrics: "Supports 200+ concurrent users per room",
    demoUrl: "https://chat-frontend-pnyk.onrender.com/",
    githubUrl: "https://github.com/SavioIesous/chat-v1-main",
  },
  {
    id: 3,
    title: "Medium-clone Blog",
    description:
      "Content publishing platform with rich text editor, tags and claps.",
    image: "/images/projects/project-medium.jpg",
    category: "Experiments",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    metrics: "500+ published articles in beta",
    demoUrl: "https://demo-medium-clone.com",
    githubUrl: "https://github.com/youruser/medium-clone",
  },
  {
    id: 4,
    title: "Perguntai",
    description:
      "Community Q&A platform that combines user posts with AI suggestions and moderation.",
    image: "/images/projects/project-perguntai.jpg",
    category: "Full Stack",
    technologies: ["Next.js", "OpenAI API", "Firebase"],
    metrics: "3k+ active members",
    demoUrl: "https://perguntai-nvid.onrender.com/",
    githubUrl: "https://github.com/SavioIesous/TCEM-duvidas",
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description:
      "Real-time weather forecast with animated UI and hourly charts.",
    image: "/images/projects/project-weather.jpg",
    category: "Frontend",
    technologies: ["React", "OpenWeather API", "Framer Motion"],
    metrics: "4.8★ user rating",
    demoUrl: "https://previsao-do-tempo-black.vercel.app/",
    githubUrl: "https://github.com/SavioIesous/previsaoDoTempo",
  },
];

export const categories = ["All", "Frontend", "Experiments", "Full Stack"];
