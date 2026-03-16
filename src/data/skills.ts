export interface Skill {
  id: number;
  name: string;
  icon: string;
  level: string;
  experience: string;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "HTML5",
    icon: "FileCode2",
    level: "Expert",
    experience: "3+ year",
  },

  {
    id: 2,
    name: "CSS3",
    icon: "Layers",
    level: "Expert",
    experience: "3+ year",
  },
  {
    id: 3,
    name: "TypeScript / JS",
    icon: "FileType",
    level: "Intermediate",
    experience: "3+ year",
  },
  {
    id: 4,
    name: "React.js",
    icon: "Code2",
    level: "Intermediate",
    experience: "1+ year",
  },
  {
    id: 5,
    name: "Next.js",
    icon: "Zap",
    level: "Beginner",
    experience: "1 year",
  },
  {
    id: 6,
    name: "Node.js",
    icon: "Server",
    level: "Intermediate",
    experience: "2+ year",
  },
  {
    id: 7,
    name: "MongoDB",
    icon: "Database",
    level: "Intermediate",
    experience: "1+ year",
  },
  {
    id: 8,
    name: "TailwindCSS",
    icon: "Palette",
    level: "Advanced",
    experience: "2+ year",
  },
  {
    id: 9,
    name: "Git & GitHub",
    icon: "GitBranch",
    level: "Advanced",
    experience: "3+ year",
  },
  {
    id: 10,
    name: "Responsive Design",
    icon: "MonitorSmartphone",
    level: "Expert",
    experience: "3+ year",
  },
  {
    id: 11,
    name: "Vite",
    icon: "Rocket",
    level: "Advanced",
    experience: "2+ year",
  },
];
