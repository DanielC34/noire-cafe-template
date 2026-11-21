import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {NOIRE_IMAGES} from '../data/noireData';
import {SafeImage} from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (progressRailRef.current) {
        gsap.fromTo(
          progressRailRef.current,
          {scaleY: 0},
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 80%',
              scrub: true,
            },
          },
        );
      }

      gsap.from('.exp-row', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#152615] text-[#FFFFFF] pt-[26px] md:pt-[50px] pb-[50px] md:pb-[106px]"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px] relative">
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-[#FFA929]/25"
        />
        <div
          ref={progressRailRef}
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1.5px] bg-[#FFA929] origin-top"
        />

        <div className="space-y-[50px] md:space-y-[106px]">
          <div className="exp-row relative grid grid-cols-1 md:grid-cols-12 gap-[26px] md:gap-[50px] items-center">
            <span
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FFA929] ring-4 ring-[#152615]"
            />

            <div className="md:col-span-6 md:pr-[26px] order-2 md:order-1 min-w-0">
              <div className="group relative w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#1e321e] border border-[#FFFFFF]/10">
                <SafeImage
                  src={NOIRE_IMAGES.experienceSanctuary}
                  alt="Minimalist forest green and walnut wood interior of NOIRÉ cafe"
                  fallbackTitle="02 — Work & Relax"
                  surface="green"
                  sizes="(max-width: 767px) calc(100vw - 32px), 560px"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#152615]/80 to-transparent pointer-events-none"
                />
                <span className="absolute bottom-4 left-5 font-display text-4xl md:text-5xl font-extrabold text-[#FFA929] tabular-nums leading-none">
                  02
                </span>
              </div>
            </div>

            <div className="md:col-span-6 md:pl-[26px] order-1 md:order-2 min-w-0">
              <h2
                className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.94] text-[#FFA929]"
                style={{fontSize: 'clamp(2.1rem, 4.6vw, 4.25rem)'}}
              >
                WORK
                <br />
                &amp; RELAX
              </h2>

              <p className="mt-[26px] text-sm md:text-base text-[#FFFFFF]/85 leading-relaxed max-w-md">
                Warm walnut banquettes, a travertine communal table, and soft amber lighting
                designed for deep morning focus, quiet reading, and unhurried conversation.
              </p>

              <div className="mt-[26px] flex flex-wrap items-center gap-x-[16px] gap-y-2 text-xs uppercase tracking-[0.12em] text-[#FFA929]">
                <span>Acoustic Sanctuary</span>
                <span aria-hidden="true" className="text-[#FFFFFF]/30">
                  /
                </span>
                <span>Analog Vinyl Sound</span>
              </div>
            </div>
          </div>

          <div className="exp-row relative grid grid-cols-1 md:grid-cols-12 gap-[26px] md:gap-[50px] items-center">
            <span
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FFA929] ring-4 ring-[#152615]"
            />

            <div className="md:col-span-6 md:pr-[26px] min-w-0">
              <h2
                className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.94] text-[#FFA929]"
                style={{fontSize: 'clamp(2.1rem, 4.6vw, 4.25rem)'}}
              >
                EVENTS
                <br />
                &amp; LABS
              </h2>

              <p className="mt-[26px] text-sm md:text-base text-[#FFFFFF]/85 leading-relaxed max-w-md">
                Every Thursday and Saturday at 18:30, our head roasters host guided sensory
                cuppings, V60 extraction labs, and intimate acoustic sessions.
              </p>

              <div className="mt-[26px]">
                <a
                  href="#visit"
                  className="inline-flex items-center px-5 py-2.5 rounded-[4px] border border-[#FFFFFF]/65 text-xs font-semibold uppercase tracking-[0.12em] text-[#FFFFFF] hover:border-[#FFA929] hover:bg-[#FFA929] hover:text-[#152615] transition-colors"
                >
                  Reserve Cupping Spot
                </a>
              </div>
            </div>

            <div className="md:col-span-6 md:pl-[26px] min-w-0">
              <div className="group relative w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#1e321e] border border-[#FFFFFF]/10">
                <SafeImage
                  src={NOIRE_IMAGES.experienceCuppingLab}
                  alt="Specialty coffee sensory cupping bowls and brass spoons on dark walnut table"
                  fallbackTitle="03 — Events & Labs"
                  surface="green"
                  sizes="(max-width: 767px) calc(100vw - 32px), 560px"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#152615]/80 to-transparent pointer-events-none"
                />
                <span className="absolute bottom-4 left-5 font-display text-4xl md:text-5xl font-extrabold text-[#FFA929] tabular-nums leading-none">
                  03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
