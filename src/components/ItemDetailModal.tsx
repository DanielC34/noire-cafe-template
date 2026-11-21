import {Plus} from 'lucide-react';
import {MenuItem} from '../data/noireData';
import {SafeImage} from './SafeImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToBag: (item: MenuItem) => void;
}

export function ItemDetailModal({item, onClose, onAddToBag}: ItemDetailModalProps) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#FFFFFF] text-[#152615] border-[#152615]/15 p-0 overflow-hidden max-w-lg rounded-[6px]">
        {item && (
          <div>
            <div className="relative aspect-[16/10] bg-[#152615] overflow-hidden">
              <SafeImage
                src={item.image}
                alt={item.imageAlt}
                fallbackTitle={item.name}
                surface="green"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 512px) 100vw, 512px"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#152615]/70 to-transparent"
              />
              <span className="absolute bottom-3 left-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFA929]">
                {item.origin}
              </span>
            </div>

            <div className="p-[20px] sm:p-[26px]">
              <DialogTitle className="font-display text-2xl font-extrabold text-[#152615]">
                {item.name}
              </DialogTitle>

              <DialogDescription className="mt-2.5 text-sm md:text-base text-[#152615]/80 leading-relaxed">
                {item.description}
              </DialogDescription>

              <dl className="mt-[26px] space-y-3 py-4 border-y border-[#152615]/12 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#152615]/60 shrink-0">Tasting Notes</dt>
                  <dd className="font-medium text-right text-[#152615] min-w-0 break-words">
                    {item.notes}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#152615]/60 shrink-0">Preparation</dt>
                  <dd className="font-medium text-right text-[#152615] tabular-nums min-w-0 break-words">
                    {item.brewSpec}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#152615]/60 shrink-0">Caffeine Level</dt>
                  <dd className="font-medium text-right text-[#152615] min-w-0">{item.caffeine}</dd>
                </div>
              </dl>

              <div className="mt-[26px] flex flex-wrap items-center justify-between gap-4">
                <span className="font-display text-2xl font-extrabold text-[#152615] tabular-nums">
                  ${item.price.toFixed(2)}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onAddToBag(item);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-[4px] bg-[#FFA929] text-[#152615] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#FA9A0A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152615]"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>Add to Pickup Order</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
