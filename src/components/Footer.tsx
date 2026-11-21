import {ArrowUpRight} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#152615] text-[#FFFFFF] pt-[50px] pb-[50px] border-t border-[#FFFFFF]/12">
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[26px] pb-[50px] border-b border-[#FFFFFF]/12">
          <div className="min-w-0">
            <a
              href="#hero"
              className="font-display text-4xl md:text-6xl font-extrabold tracking-[0.04em] text-[#FFA929] leading-none"
            >
              NOIRÉ
            </a>
            <p className="mt-[16px] text-sm text-[#FFFFFF]/75 max-w-sm">
              Beyond the ordinary cup. Small-batch roastery &amp; espresso bar in SoHo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-[16px] sm:gap-[26px] text-xs font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/80 min-w-0">
            <a href="#menu" className="hover:text-[#FFA929] transition-colors">
              Menu
            </a>
            <a href="#story" className="hover:text-[#FFA929] transition-colors">
              Story
            </a>
            <a href="#experience" className="hover:text-[#FFA929] transition-colors">
              Experience
            </a>
            <a href="#gallery" className="hover:text-[#FFA929] transition-colors">
              Gallery
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-1 text-[#FFA929] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-[26px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] text-xs text-[#FFFFFF]/55">
          <p>© {new Date().getFullYear()} NOIRÉ Coffee &amp; Roastery. All rights reserved.</p>
          <p>148 Mercer Street, New York</p>
        </div>
      </div>
    </footer>
  );
}
