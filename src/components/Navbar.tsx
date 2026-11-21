import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ArrowUpRight} from 'lucide-react';

const NAV_ITEMS = [
  {num: '01', label: 'Menu', href: '#menu'},
  {num: '02', label: 'Our Story', href: '#story'},
  {num: '03', label: 'Experience', href: '#experience'},
  {num: '04', label: 'Gallery', href: '#gallery'},
  {num: '05', label: 'Visit Us', href: '#visit'},
];

interface NavbarProps {
  onReserveClick: () => void;
}

export function Navbar({onReserveClick}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerPanelRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          {opacity: 0},
          {opacity: 1, duration: 0.22, ease: 'power2.out'},
        );
      }
      if (drawerPanelRef.current) {
        gsap.fromTo(
          drawerPanelRef.current,
          {x: '100%'},
          {x: '0%', duration: 0.34, ease: 'power3.out'},
        );
      }
      gsap.from('.drawer-nav-item', {
        x: 18,
        opacity: 0,
        duration: 0.28,
        stagger: 0.04,
        delay: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }

    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  const closeDrawer = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !drawerPanelRef.current || !backdropRef.current) {
      setDrawerOpen(false);
      return;
    }

    gsap.to(backdropRef.current, {opacity: 0, duration: 0.18, ease: 'power2.in'});
    gsap.to(drawerPanelRef.current, {
      x: '100%',
      duration: 0.24,
      ease: 'power2.in',
      onComplete: () => setDrawerOpen(false),
    });
  };

  const handleNavSelect = (href: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDrawerOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
          isScrolled || drawerOpen
            ? 'bg-[#152615]/95 backdrop-blur-md border-b border-[#FFFFFF]/10'
            : 'bg-[#152615]/85 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px] h-16 md:h-20 flex items-center justify-between gap-[16px] md:gap-[26px]">
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onReserveClick}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-[4px] border border-[#FFFFFF]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFFFFF] hover:border-[#FFA929] hover:bg-[#FFA929] hover:text-[#152615] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
            >
              Reservation
            </button>

            <a
              href="#hero"
              className="md:hidden font-display text-lg font-extrabold tracking-[0.1em] text-[#FFFFFF] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
            >
              NOIRÉ
            </a>
          </div>

          <a
            href="#hero"
            className="hidden md:inline-flex lg:hidden font-display text-xl font-extrabold tracking-[0.08em] text-[#FFFFFF] hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
          >
            NOIRÉ
          </a>

          <div className="hidden lg:flex items-center gap-[26px] min-w-0">
            <nav
              aria-label="Primary Navigation Left"
              className="flex items-center gap-[26px] text-xs font-medium uppercase tracking-[0.12em] text-[#FFFFFF]/80"
            >
              <a
                href="#menu"
                className="py-1 hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
              >
                Menu
              </a>
              <a
                href="#story"
                className="py-1 hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
              >
                Story
              </a>
            </nav>

            <a
              href="#hero"
              className="font-display text-xl lg:text-2xl font-extrabold tracking-[0.08em] text-[#FFFFFF] hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
            >
              NOIRÉ
            </a>

            <nav
              aria-label="Primary Navigation Right"
              className="flex items-center gap-[26px] text-xs font-medium uppercase tracking-[0.12em] text-[#FFFFFF]/80"
            >
              <a
                href="#experience"
                className="py-1 hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
              >
                Experience
              </a>
              <a
                href="#gallery"
                className="py-1 hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
              >
                Gallery
              </a>
              <a
                href="#visit"
                className="py-1 hover:text-[#FFA929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
              >
                Visit
              </a>
            </nav>
          </div>

          <div className="flex items-center shrink-0">
            <button
              ref={triggerRef}
              type="button"
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              aria-controls="noire-nav-drawer"
              onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
              className="relative z-50 inline-flex items-center justify-center w-9 h-9 rounded-[4px] bg-[#FFFFFF] text-[#152615] hover:bg-[#FFA929] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] focus-visible:ring-offset-2 focus-visible:ring-offset-[#152615]"
            >
              <span className="relative w-4 h-3 flex flex-col justify-between items-center">
                <span
                  className={`block w-4 h-[2px] bg-[#152615] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    drawerOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-[2px] bg-[#152615] transition-opacity duration-150 ${
                    drawerOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block w-4 h-[2px] bg-[#152615] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    drawerOpen ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          <div
            ref={backdropRef}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#0b140b]/80 backdrop-blur-sm"
          />

          <aside
            ref={drawerPanelRef}
            id="noire-nav-drawer"
            className="relative z-10 w-full max-w-sm bg-[#152615] border-l border-[#FFFFFF]/15 h-full flex flex-col justify-between p-[26px] md:p-[50px] overflow-y-auto overflow-x-hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-[26px] border-b border-[#FFFFFF]/12">
                <span className="font-display text-xl font-extrabold tracking-[0.08em] text-[#FFA929]">
                  NOIRÉ
                </span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => {
                    closeDrawer();
                    triggerRef.current?.focus();
                  }}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-[4px] bg-[#FFFFFF] text-[#152615] hover:bg-[#FFA929] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
                >
                  <span className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-[2px] bg-[#152615] rotate-45" />
                    <span className="absolute w-4 h-[2px] bg-[#152615] -rotate-45" />
                  </span>
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="mt-[26px] flex flex-col">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.href}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavSelect(item.href);
                    }}
                    className="drawer-nav-item group flex items-center justify-between py-4 min-h-[52px] border-b border-[#FFFFFF]/10 text-[#FFFFFF] hover:text-[#FFA929] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] rounded-[4px]"
                  >
                    <div className="flex items-baseline gap-[16px]">
                      <span className="font-display text-xs font-bold text-[#FFA929] tabular-nums">
                        {item.num}
                      </span>
                      <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-[26px] space-y-[16px]">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onReserveClick();
                }}
                className="w-full py-3.5 px-6 rounded-[4px] bg-[#FFA929] text-[#152615] font-display text-xs font-extrabold uppercase tracking-[0.14em] hover:bg-[#FA9A0A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
              >
                Reservation
              </button>

              <div className="pt-[16px] border-t border-[#FFFFFF]/12 text-xs text-[#FFFFFF]/70 space-y-1">
                <p className="font-semibold text-[#FFFFFF]">148 Mercer Street, SoHo</p>
                <p className="tabular-nums">Mon–Fri 07:00–20:00 · Sat 08:00–22:00</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
