import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import FadeIn from "../animations/FadeIn";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    scrollToIndex(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(newIndex);
  };

  const testimonialStats = [
    { value: "3x", label: "Faster Delivery" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "100%", label: "On-Time Delivery" },
    { value: "5⭐", label: "Average Rating" },
  ];

  return (
    <section id="testimonials" className="relative py-24 bg-black overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Adicionado o Título e Cabeçalho conforme solicitado */}
        <FadeIn delay={0}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Quote className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-6">Trusted by forward-thinking teams</h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Empowering clients with design-driven, high-quality solutions built for success.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="relative group">
            
            {/* Navigation Arrows - Absolute Positioning */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 md:left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white/70" />
            </button>

            <button 
              onClick={nextTestimonial}
              className="absolute right-4 md:right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center z-10"
            >
              <ChevronRight className="w-6 h-6 text-white/70" />
            </button>

            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-hidden snap-x snap-mandatory"
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="min-w-full w-full snap-start pb-4">
                  <div className="grid md:grid-cols-[400px_1fr] gap-12 items-center">
                    
                    {/* Image Column */}
                    <div className="relative group/img">
                      <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/50 border border-white/10 shadow-xl">
                        <div className="text-primary font-bold text-2xl mb-1">
                          {testimonialStats[index % testimonialStats.length]?.value}
                        </div>
                        <div className="text-white/60 text-sm font-medium">
                          {testimonialStats[index % testimonialStats.length]?.label}
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col justify-center">
                      <Quote className="w-12 h-12 text-primary mb-8 opacity-80" />
                      
                      <blockquote className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed mb-10">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="flex items-end justify-between border-t border-white/10 pt-8">
                        <div>
                          <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-white/50">{testimonial.role}, {testimonial.company}</p>
                        </div>
                        
                        {/* Star Rating */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 transition-all duration-500 rounded-full ${
                    index === currentIndex ? "w-6 bg-primary" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;