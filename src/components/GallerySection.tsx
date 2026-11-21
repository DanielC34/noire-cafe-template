import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ChevronLeft, ChevronRight, Expand} from 'lucide-react';
import {GALLERY_PHOTOS, GalleryPhoto} from '../data/noireData';
import {SafeImage} from './SafeImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gallery-tile', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
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

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length,
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const activePhoto: GalleryPhoto | null =
    lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#152615] text-[#FFFFFF] py-[50px] md:py-[106px] border-t border-[#FFFFFF]/10"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[26px] mb-[40px] md:mb-[50px]">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#FFA929] mb-[16px]">
              Atmosphere &amp; Craft
            </p>
            <h2
              className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95] text-[#FFA929]"
              style={{
                fontSize: 'clamp(1.95rem, 4.4vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              THE ROASTERY
              <br />
              GALLERY
            </h2>
          </div>

          <p className="text-sm text-[#FFFFFF]/75 max-w-sm min-w-0">
            Click any frame to inspect the textures, vessels, and quiet morning light inside
            NOIRÉ SoHo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[26px]">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className={`gallery-tile group relative w-full min-w-0 rounded-[6px] overflow-hidden bg-[#1e321e] border border-[#FFFFFF]/10 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] ${photo.spanClass} ${photo.aspectClass}`}
            >
              <SafeImage
                src={photo.src}
                alt={photo.alt}
                fallbackTitle={photo.title}
                surface="green"
                sizes={
                  idx === 0
                    ? '(max-width: 767px) calc(100vw - 32px), 800px'
                    : '(max-width: 767px) calc(100vw - 32px), 390px'
                }
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#152615]/85 to-transparent pointer-events-none"
              />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-[4px] bg-[#152615]/85 text-[#FFA929] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Expand className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/75 mb-0.5">
                    {photo.category}
                  </p>
                  <p className="font-display text-base md:text-lg font-bold text-[#FFFFFF] leading-snug break-words">
                    {photo.title}
                  </p>
                </div>
                <span className="font-display text-2xl md:text-3xl font-extrabold text-[#FFA929] tabular-nums leading-none shrink-0">
                  0{idx + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#1e321e] border-[#FFFFFF]/15 rounded-[6px]">
          {activePhoto && lightboxIndex !== null && (
            <div>
              <div className="flex items-center justify-between px-5 py-4 pr-14 border-b border-[#FFFFFF]/10">
                <div className="flex items-center gap-3 text-xs text-[#FFFFFF]/75">
                  <span className="font-semibold text-[#FFA929] uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    0{lightboxIndex + 1} / 0{GALLERY_PHOTOS.length}
                  </span>
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-[#152615]">
                <SafeImage
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fallbackTitle={activePhoto.title}
                  surface="green"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-[16px] md:p-[26px] flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] border-t border-[#FFFFFF]/10">
                <div>
                  <DialogTitle className="font-display text-lg font-bold text-[#FFFFFF]">
                    {activePhoto.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-[#FFFFFF]/75">
                    {activePhoto.caption}
                  </DialogDescription>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label="Previous photograph"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + GALLERY_PHOTOS.length) %
                          GALLERY_PHOTOS.length,
                      )
                    }
                    className="w-10 h-10 rounded-[4px] border border-[#FFFFFF]/25 text-[#FFFFFF] hover:border-[#FFA929] hover:text-[#FFA929] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photograph"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length)
                    }
                    className="w-10 h-10 rounded-[4px] border border-[#FFFFFF]/25 text-[#FFFFFF] hover:border-[#FFA929] hover:text-[#FFA929] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
