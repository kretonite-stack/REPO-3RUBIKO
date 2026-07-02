import React, { useEffect, useState } from "react";
import { Building2, DraftingCompass, HardHat, Hammer, ArrowUpRight } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";

interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "Arquitectura",
    description: "Planificación técnica, anteproyecto y desarrollo espacial para obras residenciales y comerciales.",
    icon: Building2,
    href: "#contacto",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Propuestas funcionales y estéticas pensadas desde el detalle, la materialidad y el uso.",
    icon: DraftingCompass,
    href: "#contacto",
  },
  {
    number: "03",
    title: "Construcción",
    description: "Ejecución, coordinación en obra y control de calidad en cada etapa del proyecto.",
    icon: HardHat,
    href: "#contacto",
  },
  {
    number: "04",
    title: "Remodelación",
    description: "Mejoras, ampliaciones y renovación de espacios con enfoque técnico y terminaciones limpias.",
    icon: Hammer,
    href: "#contacto",
  },
];

const shaderColors = [
  ["hsl(72, 72%, 7%)", "hsl(72, 55%, 18%)", "hsl(72, 70%, 28%)", "hsl(72, 45%, 10%)"],
  ["hsl(210, 18%, 5%)", "hsl(78, 40%, 14%)", "hsl(75, 58%, 24%)", "hsl(210, 15%, 8%)"],
  ["hsl(72, 60%, 10%)", "hsl(75, 50%, 20%)", "hsl(72, 65%, 26%)", "hsl(72, 55%, 12%)"],
  ["hsl(215, 15%, 5%)", "hsl(75, 45%, 16%)", "hsl(72, 55%, 22%)", "hsl(220, 10%, 6%)"],
];

export default function FeatureShaderCards({ className = "" }: { className?: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section id="servicios" className={`w-full bg-[#0A0A0A] py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#A7C520] mb-4">
            Servicios
          </p>
          <div className="h-[2px] w-12 bg-[#A7C520] mb-6"></div>
          <h2 className="text-[#F5F5F2] font-semibold tracking-tight" style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", lineHeight: 1.1 }}>
            Lo que hacemos
          </h2>
          <p className="mt-6 text-[#A4A7A1] text-lg max-w-lg">
            Soluciones integrales para proyectar, diseñar y construir con precisión.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = shaderColors[index % shaderColors.length];
            
            return (
              <article 
                key={service.title}
                className="group relative flex flex-col h-auto min-h-[350px] lg:h-[430px] w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#101419]/80 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#A7C520]/50"
              >
                {/* Background Shader */}
                <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60">
                  {!prefersReducedMotion ? (
                    <Warp 
                      colors={colors}
                      proportion={0.22}
                      softness={1.4}
                      distortion={0.06}
                      swirl={0.25}
                      swirlIterations={5}
                      shapeScale={0.16}
                      speed={0.18}
                      scale={1}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div 
                      className="h-full w-full"
                      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[2]})` }}
                    />
                  )}
                </div>

                {/* Overlay */}
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.80) 65%, rgba(10,10,10,0.96) 100%)"
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-20 flex flex-col flex-grow p-8">
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-[#F5F5F2] transition-colors duration-500 group-hover:bg-[#A7C520]/10 group-hover:text-[#A7C520]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-[#A7C520]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#F5F5F2] mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#A4A7A1] text-[15px] leading-relaxed line-clamp-4">
                    {service.description}
                  </p>

                  <a 
                    href={service.href}
                    className="mt-auto pt-8 flex items-center gap-2 text-sm font-medium text-[#F5F5F2] transition-colors group-hover:text-[#A7C520] focus:outline-none focus:ring-2 focus:ring-[#A7C520] rounded-md focus:ring-offset-2 focus:ring-offset-[#101419]"
                  >
                    Ver servicio
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </a>
                  
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
