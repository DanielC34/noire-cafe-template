import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {NOIRE_IMAGES} from '../data/noireData';
import {SafeImage} from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onReserveClick: () => void;
}

export function Hero({onReserveClick}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-word-row', {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('.hero-cup-frame', {
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        delay: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('.hero-meta-fade', {
        y: 12,
        opacity: 0,
        duration: 0.55,
        delay: 0.28,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });

      if (cupRef.current) {
        gsap.to(cupRef.current, {
          y: -26,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-x-clip bg-[#152615] text-[#FFA929] pt-[96px] pb-[50px] md:pt-[106px] md:pb-[106px] min-h-[82vh] md:min-h-[86vh] flex flex-col justify-center"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px]">
        <p className="hero-meta-fade md:hidden text-center text-xs font-medium text-[#FFA929] mb-[20px]">
          Beyond the ordinary cup
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-[96px_minmax(0,1fr)_96px] lg:grid-cols-[136px_minmax(0,1fr)_136px] items-center gap-[16px] lg:gap-[24px]">
          <div className="hero-meta-fade hidden md:block text-left min-w-0">
            <p className="text-xs lg:text-sm leading-snug text-[#FFA929] font-normal max-w-[12ch]">
              Beyond the ordinary cup
            </p>
          </div>

          <div className="min-w-0 relative flex items-center justify-center py-2 md:py-4 select-none">
            <div
              aria-hidden="true"
              className="w-full max-w-full flex flex-col items-center font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.88] text-[#FFA929] text-[clamp(2.85rem,15.8vw,5.25rem)] md:text-[clamp(4.5rem,10.8vw,11.25rem)]"
            >
              <span className="block opacity-100">
                <span className="hero-word-row block">COFFEE</span>
              </span>
              <span className="block opacity-[0.82]">
                <span className="hero-word-row block">COFFEE</span>
              </span>
              <span className="block opacity-[0.58]">
                <span className="hero-word-row block">COFFEE</span>
              </span>
              <span className="block opacity-[0.34]">
                <span className="hero-word-row block">COFFEE</span>
              </span>
            </div>

            <h1 className="sr-only">
              NOIRÉ — Beyond the ordinary cup. Specialty Coffee &amp; Roastery
            </h1>

            <div
              ref={cupRef}
              className="hero-cup-frame absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
              <SafeImage
                src={NOIRE_IMAGES.heroSignatureColdFoam}
                alt="Signature ribbed crystal glass of iced espresso topped with velvety golden foam"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                surface="transparent"
                sizes="(max-width: 639px) 24vw, (max-width: 767px) 24vw, 225px"
                wrapperClassName="w-[23.5%] sm:w-[24%] md:w-[27%] lg:w-[24%] max-w-[225px]"
                fallbackTitle="NOIRÉ Signature Pour"
                className="w-full h-auto object-contain select-none [filter:drop-shadow(0_24px_34px_rgba(0,0,0,0.45))]"
              />
            </div>
          </div>

          <div className="hero-meta-fade hidden md:block text-right min-w-0">
            <p className="text-xs lg:text-sm text-[#FFA929] font-normal tabular-nums whitespace-nowrap">
              Since 2018
            </p>
          </div>
        </div>

        <div className="hero-meta-fade mt-[26px] md:mt-[50px] flex flex-col items-center gap-[20px]">
          <p className="md:hidden text-xs text-[#FFA929] tabular-nums">Since 2018</p>

          <div className="flex flex-wrap items-center justify-center gap-[12px] sm:gap-[16px]">
            <a
              href="#menu"
              className="px-5 sm:px-6 py-2.5 rounded-[4px] bg-[#FFA929] text-[#152615] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#FA9A0A] transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
            >
              Explore Menu
            </a>
            <button
              type="button"
              onClick={onReserveClick}
              className="px-5 sm:px-6 py-2.5 rounded-[4px] border border-[#FFFFFF]/65 text-[#FFFFFF] text-xs font-semibold uppercase tracking-[0.12em] hover:border-[#FFA929] hover:text-[#FFA929] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
            >
              Reservation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
