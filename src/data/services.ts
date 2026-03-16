import * as Icons from "lucide-react";

export type Service = {
  id: number;
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: 1,
    icon: "Layout",
    title: "Frontend Development",
    description:
      "Building modern and responsive user interfaces using HTML, CSS, JavaScript, React and modern UI frameworks.",
  },
  {
    id: 2,
    icon: "Server",
    title: "Backend Development",
    description:
      "Developing server-side logic, APIs and application structure using Node.js and modern backend practices.",
  },
  {
    id: 3,
    icon: "Layers",
    title: "Fullstack Applications",
    description:
      "Creating complete web applications connecting frontend interfaces with backend systems and APIs.",
  },
  {
    id: 4,
    icon: "Smartphone",
    title: "Responsive Design",
    description:
      "Ensuring websites work perfectly across mobile, tablet and desktop devices with adaptive layouts.",
  },
  {
    id: 5,
    icon: "Zap",
    title: "Performance Optimization",
    description:
      "Improving loading speed, structure and user experience through frontend optimization techniques.",
  },
  {
    id: 6,
    icon: "GitBranch",
    title: "Deployment & Version Control",
    description:
      "Managing code with Git and deploying projects using modern platforms like Vercel and Netlify.",
  },
];