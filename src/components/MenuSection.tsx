import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Check, Plus} from 'lucide-react';
import {MENU_GROUPS, MenuCategoryId, MenuItem} from '../data/noireData';
import {SafeImage} from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onReserveClick: () => void;
}

const FILTERS: {id: 'all' | MenuCategoryId; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'coffee', label: 'Coffee'},
  {id: 'matcha', label: 'Matcha'},
  {id: 'tea', label: 'Tea & More'},
  {id: 'patisserie', label: 'Desserts'},
];

export function MenuSection({
  onSelectItem,
  onQuickAdd,
  onReserveClick,
}: MenuSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | MenuCategoryId>('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const visibleGroups =
    activeFilter === 'all'
      ? MENU_GROUPS
      : MENU_GROUPS.filter((group) => group.id === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.amber-menu-card', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleQuickAddClick = (item: MenuItem) => {
    onQuickAdd(item);
    setAddedId(item.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="bg-[#152615] text-[#FFFFFF] py-[50px] md:py-[106px]"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px]">
        <div className="flex sm:hidden items-center justify-between gap-[16px] mb-[20px]">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-[-0.02em] text-[#FFA929]">
            MENU
          </h2>
          <button
            type="button"
            onClick={onReserveClick}
            className="px-4 py-2 rounded-[4px] border border-[#FFFFFF]/65 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF] hover:border-[#FFA929] hover:bg-[#FFA929] hover:text-[#152615] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reservation
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 mb-[26px]">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-1 p-1 rounded-[4px] bg-[#1e321e] border border-[#FFFFFF]/12 max-w-full"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929] ${
                    isActive
                      ? 'bg-[#FFA929] text-[#152615]'
                      : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] lg:grid-cols-12 gap-[26px] lg:gap-[50px] items-start">
          <div className="hidden sm:flex lg:col-span-5 sticky top-24 flex-col items-center justify-center pt-2 min-w-0">
            <h2
              className="vertical-menu-word font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.85] text-[#FFA929] select-none"
              style={{fontSize: 'clamp(3.75rem, 9vw, 8.75rem)'}}
            >
              MENU
            </h2>

            <button
              type="button"
              onClick={onReserveClick}
              className="mt-[26px] px-4 lg:px-5 py-2.5 rounded-[4px] border border-[#FFFFFF]/65 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF] hover:border-[#FFA929] hover:bg-[#FFA929] hover:text-[#152615] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA929]"
            >
              Reservation
            </button>
          </div>

          <div className="lg:col-span-7 min-w-0 space-y-[26px] md:space-y-[50px]">
            {visibleGroups.map((group) => (
              <article
                key={group.id}
                className="amber-menu-card relative w-full rounded-[6px] bg-[#FFA929] text-[#152615] p-[20px] sm:p-[26px] md:p-[50px]"
              >
                <div className="flex items-baseline justify-between gap-[16px] mb-[26px]">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#FFFFFF]">
                    {group.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#152615]/75 tabular-nums whitespace-nowrap shrink-0">
                    {group.items.length} items
                  </span>
                </div>

                <div className="space-y-[20px] sm:space-y-[26px]">
                  {group.items.map((item) => {
                    const isAdded = addedId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="group flex items-start justify-between gap-[12px] sm:gap-[16px] pb-[20px] sm:pb-[26px] border-b border-[#152615]/14 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start gap-[12px] sm:gap-[16px] min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => onSelectItem(item)}
                            aria-label={`Inspect ${item.name}`}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-[4px] overflow-hidden bg-[#152615]/10 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152615]"
                          >
                            <SafeImage
                              src={item.image}
                              alt={item.imageAlt}
                              fallbackTitle={item.name}
                              surface="amber"
                              compactFallback
                              sizes="(max-width: 639px) 48px, 64px"
                              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                            />
                          </button>

                          <div className="min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={() => onSelectItem(item)}
                              className="text-left font-display text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-tight text-[#152615] hover:underline decoration-[#152615] underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152615] rounded-[4px] break-words"
                            >
                              {item.name}
                            </button>
                            <p className="mt-1 text-xs sm:text-sm text-[#152615]/85 leading-relaxed max-w-lg">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-[12px] shrink-0 pt-0.5">
                          <span className="font-display text-sm sm:text-base font-bold text-[#152615] tabular-nums">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickAddClick(item)}
                            aria-label={`Add ${item.name} to pickup bag`}
                            className={`w-8 h-8 rounded-[4px] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152615] ${
                              isAdded
                                ? 'bg-[#FFFFFF] text-[#152615]'
                                : 'bg-[#152615] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#152615]'
                            }`}
                          >
                            {isAdded ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
