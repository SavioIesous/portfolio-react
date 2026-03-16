import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Briefcase,
  Target,
  Globe,
  Zap,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { projects, categories } from "../../data/projects";
import ProjectCard from "../Ui/ProjectCard";
import FadeIn from "../animations/FadeIn";
import type { Project } from "../../data/projects";

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects: Project[] =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const getStepAndChildren = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return { step: 0 };
    const track = container.querySelector(".projects-track") as HTMLElement | null;
    const children = track ? (Array.from(track.children) as HTMLElement[]) : [];
    
    let step = 0;
    if (children.length > 1) {
      step = children[1].offsetLeft - children[0].offsetLeft;
    } else if (children.length === 1) {
      step = children[0].offsetWidth;
    } else {
      step = container.clientWidth;
    }
    return { step };
  }, []);

  const computeMaxIndex = useCallback(
    (step: number) => {
      const container = scrollContainerRef.current;
      if (!container || !step || step <= 0) return 0;
      const visible = Math.max(1, Math.floor(container.clientWidth / step));
      return Math.max(0, filteredProjects.length - visible);
    },
    [filteredProjects.length]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const { step } = getStepAndChildren();
      const targetLeft = step * index;
      
      container.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    },
    [getStepAndChildren]
  );

  // Unificando a lógica de atualização de Layout
  const updateLayout = useCallback(() => {
    const { step } = getStepAndChildren();
    const newMax = computeMaxIndex(step);
    
    // Atualiza o maxIndex para os cálculos de botões/dots
    setMaxIndex(newMax);

    // Se o índice atual ficou "fora" da nova grade (ex: mudou de 3 colunas para 1)
    if (currentIndex > newMax) {
      const clamped = Math.max(0, newMax);
      scrollToIndex(clamped);
    } else {
      // Garante que o scroll esteja alinhado ao index atual após resize
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({ left: step * currentIndex, behavior: "auto" });
      }
    }
  }, [currentIndex, computeMaxIndex, getStepAndChildren, scrollToIndex]);

  // Efeito principal para Resize e Mudança de Categoria
  useEffect(() => {
    // Timeout leve para garantir que o DOM renderizou os novos cards da categoria
    const timer = setTimeout(updateLayout, 100);
    
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timer);
    };
  }, [updateLayout, filteredProjects.length]); // Executa quando a lista de projetos muda

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const categoryIcons: Record<string, React.ElementType> = {
    All: Target,
    Frontend: Globe,
    Experiments: FlaskConical,
    "Full Stack": Zap,
  };



  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Showcasing my best work and achievements</p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeCategory === category ? "bg-primary/10 opacity-100" : "bg-white/5 border border-white/10 group-hover:bg-white/10"}`} />
                <div className="relative flex items-center gap-2">
                  {React.createElement(categoryIcons[category] || Target, { className: "w-4 h-4" })}
                  <span className="text-sm">{category}</span>
                </div>
                {activeCategory === category && <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 z-10" />}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              <div className="projects-track flex gap-6 pb-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - sempre renderizadas, mas desabilitadas quando não pode avançar */}
            <>
              <button
                onClick={prevSlide}
                disabled={!canPrev}
                className={`flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:translate-x-4 items-center justify-center h-10 w-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 z-10 ${!canPrev ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextSlide}
                disabled={!canNext}
                className={`flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 items-center justify-center h-10 w-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 z-20 ${!canNext ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
                aria-label="Next projects"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex ? "bg-primary w-6 h-2" : "bg-white/30 w-2 h-2 hover:bg-white/50"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Projects;