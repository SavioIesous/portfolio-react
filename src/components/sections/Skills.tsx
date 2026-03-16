    import type { FC } from "react";
    import { skills } from "../../data/skills";
    import type { Skill } from "../../data/skills";
    import * as Icons from "lucide-react";
    import FadeIn from "../animations/FadeIn";

    // tipo para componentes de ícone (SVG)
    type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

    const Skills: FC = () => {
    // listas de nomes (mais simples de manter)
    const frontendNames = [
        "HTML5",
        "CSS3",
        "TypeScript / JS",
        "React.js",
        "Next.js",
        "TailwindCSS",
        // "Redux" // se você tiver depois, adiciona aqui
    ];

    const backendNames = ["Node.js", "MongoDB" /*, "REST APIs" */];

    const toolsNames = ["Git & GitHub", "Responsive Design", "Figma", "Vite"];

    const buildCategory = (names: string[]) =>
        names
        .map((name) => skills.find((s) => s.name === name))
        .filter((s): s is Skill => !!s);

    const skillCategories: Record<string, Skill[]> = {
        "Frontend Development": buildCategory(frontendNames),
        "Backend & APIs": buildCategory(backendNames),
        "Tools & Others": buildCategory(toolsNames),
    };

    // get proficiency percentage (case-insensitive)
    const getProficiencyLevel = (level: string): number => {
        const l = (level || "").toLowerCase();
        const levels: Record<string, number> = {
        expert: 95,
        advanced: 80,
        intermediate: 60,
        beginner: 40,
        };
        return levels[l] ?? 50;
    };

    // get level color (case-insensitive)
    const getLevelColor = (level: string): string => {
        const l = (level || "").toLowerCase();
        const colors: Record<string, string> = {
        expert: "text-[#8DFF69] bg-[#8BFF69]/20 border-[#8BFF69]/30",
        advanced: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
        intermediate: "text-emerald-500 bg-emerald-500/20 border-emerald-500/30",
        beginner: "text-gray-400 bg-gray-500/20 border-gray-500/30",
        };
        return colors[l] ?? "text-cyan-400 bg-cyan-500/20 border-cyan-500/30";
    };

    return (
        <section id="skills" className="relative py-20 bg-black overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={100}>
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <Icons.Sparkles className="text-primary" />
                <span className="text-sm text-primary font-medium">My Expertise</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">Skills & Technologies</h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                A comprehensive overview my technical skills and proficinecy level
                </p>
            </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, categorySkills], idx) => (
                <FadeIn key={category} delay={idx * 100}>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-1 h-8 bg-linear-to-b from-primary/30 to-primary/10 rounded-full"></div>
                    <h3 className="text-xl font-medium text-white">{category}</h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-5">
                    {categorySkills.map((skill) => {
                        // recupera o componente do ícone e força o tipo SVG component
                        const CandidateIcon = Icons[skill.icon as keyof typeof Icons] as unknown;
                        const IconComponent = (CandidateIcon as IconType) || (Icons.Code2 as IconType);

                        const proficiency = getProficiencyLevel(skill.level);

                        return (
                        <div key={skill.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg">
                                <IconComponent className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                <div className="text-sm font-medium text-white">{skill.name}</div>
                                <div className="text-xs text-white/50">{skill.experience}</div>
                                </div>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(
                                skill.level,
                                )}`}
                            >
                                {skill.level}
                            </span>
                            </div>

                            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-linear-to-r from-primary/10 to-primary/80 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                width: `${proficiency}%`,
                                }}
                            ></div>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </div>
                </FadeIn>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default Skills;