import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {NOIRE_IMAGES} from '../data/noireData';
import {SafeImage} from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.story-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      if (photoRef.current) {
        gsap.from(photoRef.current, {
          scale: 1.07,
          duration: 1.0,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-[#152615] text-[#FFFFFF] pt-[50px] md:pt-[106px] pb-[26px] md:pb-[50px]"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px] relative">
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-[#FFA929]/55"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-[26px] md:gap-[50px] items-center">
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FFA929] ring-4 ring-[#152615]"
          />

          <div className="story-reveal md:col-span-6 md:pr-[26px] min-w-0">
            <h2
              className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.94] text-[#FFA929]"
              style={{fontSize: 'clamp(2.1rem, 4.6vw, 4.25rem)'}}
            >
              OUR STORY
              <br />
              SINCE 2018
            </h2>

            <p className="mt-[26px] text-sm md:text-base text-[#FFFFFF]/85 leading-relaxed max-w-md">
              NOIRÉ began with a quiet devotion to unhurried roasting. We source direct-trade
              micro-lots from high-altitude estates, roast in 12 kg cast-iron batches, and rest
              every harvest 72 hours for peak clarity and sweetness.
            </p>

            <div className="mt-[26px] flex flex-wrap items-center gap-x-[16px] gap-y-2 text-xs uppercase tracking-[0.12em] text-[#FFA929] tabular-nums">
              <span>12 kg Drum Roaster</span>
              <span aria-hidden="true" className="text-[#FFFFFF]/30">
                /
              </span>
              <span>93.5 °C Precision Brew</span>
            </div>
          </div>

          <div className="story-reveal md:col-span-6 md:pl-[26px] min-w-0">
            <div className="group relative w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#1e321e] border border-[#FFFFFF]/10">
              <div ref={photoRef} className="w-full h-full">
                <SafeImage
                  src={NOIRE_IMAGES.storyRoastingBeans}
                  alt="Freshly roasted specialty coffee beans cooling in brushed brass drum roaster tray"
                  fallbackTitle="01 — Our Story"
                  surface="green"
                  sizes="(max-width: 767px) calc(100vw - 32px), 560px"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#152615]/80 to-transparent pointer-events-none"
              />
              <span className="absolute bottom-4 left-5 font-display text-4xl md:text-5xl font-extrabold text-[#FFA929] tabular-nums leading-none">
                01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
