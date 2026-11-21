import {FormEvent, useState} from 'react';
import {CheckCircle2, Minus, Plus, ShoppingBag, Trash2} from 'lucide-react';
import {MenuItem} from '../data/noireData';
import {SafeImage} from './SafeImage';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from './ui/sheet';

export interface BagLineItem {
  item: MenuItem;
  quantity: number;
}

interface PickupBagDrawerProps {
  items: BagLineItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onClearBag: () => void;
}

export function PickupBagDrawer({
  items,
  isOpen,
  onOpenChange,
  onUpdateQty,
  onClearBag,
}: PickupBagDrawerProps) {
  const [pickupWindow, setPickupWindow] = useState('In 15 minutes');
  const [guestName, setGuestName] = useState('');
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  const totalCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = items.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!guestName.trim()) {
      setError('Enter a name for counter pickup.');
      return;
    }
    setOrderCode(`PK-${Math.floor(100 + Math.random() * 900)}`);
    onClearBag();
  };

  return (
    <>
      {totalCount > 0 && !isOpen && (
        <button
          type="button"
          onClick={() => {
            setOrderCode(null);
            onOpenChange(true);
          }}
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 rounded-[4px] bg-[#FFA929] text-[#152615] font-display font-bold text-xs uppercase tracking-[0.08em] sm:tracking-[0.1em] border border-[#152615]/15 hover:bg-[#FA9A0A] transition-colors cursor-pointer max-w-[calc(100vw-2rem)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
        >
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span className="truncate tabular-nums">
            Pickup Bag ({totalCount}) · ${subtotal.toFixed(2)}
          </span>
        </button>
      )}

      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="bg-[#FFFFFF] text-[#152615] border-l border-[#152615]/15 flex flex-col justify-between p-[26px] overflow-y-auto">
          <div>
            <div className="pb-5 pr-10 border-b border-[#152615]/12">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#152615]/60">
                SoHo Counter Pickup
              </p>
              <SheetTitle className="mt-1 font-display text-xl font-extrabold text-[#152615]">
                Your Tasting Order
              </SheetTitle>
              <SheetDescription className="sr-only">
                Review selected items and choose a pickup time at NOIRÉ SoHo.
              </SheetDescription>
            </div>

            {orderCode ? (
              <div className="py-[50px]">
                <div className="inline-flex items-center gap-2 text-[#152615] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#152615]" />
                  <span>Order Sent to Barista Bar</span>
                </div>
                <h4 className="mt-3 font-display text-2xl font-extrabold text-[#152615]">
                  Ticket {orderCode}
                </h4>
                <p className="mt-2 text-sm text-[#152615]/75 leading-relaxed">
                  Prepared fresh for{' '}
                  <span className="font-semibold text-[#152615]">{guestName}</span>. Ready at the
                  SoHo pickup pass ({pickupWindow.toLowerCase()}).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderCode(null);
                    setGuestName('');
                    onOpenChange(false);
                  }}
                  className="mt-[26px] px-6 py-3 rounded-[4px] bg-[#FFA929] text-[#152615] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#FA9A0A] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-[50px] text-center">
                <p className="font-display text-lg font-bold text-[#152615]">
                  Your pickup bag is empty.
                </p>
                <p className="mt-2 text-sm text-[#152615]/65">
                  Select any espresso, matcha, or pastry from the menu to order ahead.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#152615]/10 my-4">
                {items.map(({item, quantity}) => (
                  <li key={item.id} className="py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-[4px] overflow-hidden bg-[#152615]/10 shrink-0">
                        <SafeImage
                          src={item.image}
                          alt={item.imageAlt}
                          fallbackTitle={item.name}
                          surface="light"
                          compactFallback
                          loading="eager"
                          sizes="48px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm text-[#152615] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#152615]/65 tabular-nums mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-7 h-7 rounded-[4px] border border-[#152615]/20 flex items-center justify-center hover:bg-[#152615]/8 cursor-pointer"
                      >
                        {quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="w-5 text-center text-sm font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-7 h-7 rounded-[4px] border border-[#152615]/20 flex items-center justify-center hover:bg-[#152615]/8 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && !orderCode && (
            <form
              onSubmit={handleCheckout}
              className="pt-5 border-t border-[#152615]/12 space-y-[16px]"
            >
              {error && <p className="text-xs font-medium text-red-700">{error}</p>}

              <div>
                <label
                  htmlFor="pickup-name"
                  className="block text-xs font-medium text-[#152615]/70 mb-1.5"
                >
                  Name for Cup
                </label>
                <input
                  id="pickup-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#152615]/5 border border-[#152615]/15 text-sm text-[#152615] focus:outline-none focus:border-[#152615]"
                />
              </div>

              <div>
                <label
                  htmlFor="pickup-window"
                  className="block text-xs font-medium text-[#152615]/70 mb-1.5"
                >
                  Pickup Time
                </label>
                <select
                  id="pickup-window"
                  value={pickupWindow}
                  onChange={(e) => setPickupWindow(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#152615]/5 border border-[#152615]/15 text-sm text-[#152615] focus:outline-none focus:border-[#152615]"
                >
                  <option value="In 15 minutes">In 15 minutes</option>
                  <option value="In 30 minutes">In 30 minutes</option>
                  <option value="In 45 minutes">In 45 minutes</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 text-base font-display font-bold">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-[4px] bg-[#FFA929] text-[#152615] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#FA9A0A] transition-colors cursor-pointer"
              >
                Place Pickup Order
              </button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
