import {FormEvent, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {CheckCircle2} from 'lucide-react';
import {OPENING_HOURS} from '../data/noireData';

gsap.registerPlugin(ScrollTrigger);

interface ReservationRecord {
  code: string;
  name: string;
  email: string;
  date: string;
  time: string;
  notes: string;
}

const TIME_SLOTS = ['08:30', '10:00', '12:30', '15:00', '17:30', '18:30'];

export function VisitSection() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState<ReservationRecord | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.visit-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name for the reservation.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!date) {
      setError('Please select a preferred date.');
      return;
    }

    const code = `NR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      code,
      name: name.trim(),
      email: email.trim(),
      date,
      time,
      notes: notes.trim(),
    });
  };

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="bg-[#152615] text-[#FFFFFF] py-[50px] md:py-[106px] border-t border-[#FFFFFF]/10"
    >
      <div className="max-w-[1320px] w-full mx-auto px-[16px] md:px-[50px]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="visit-reveal font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.88] text-[#FFA929]"
            style={{fontSize: 'clamp(2.4rem, 7.5vw, 6.25rem)'}}
          >
            SECURE
            <br />
            YOUR
            <br />
            TABLE
          </h2>

          <p className="visit-reveal mt-[26px] text-sm md:text-base text-[#FFA929]/90 max-w-md mx-auto leading-relaxed">
            Whether it’s a slow morning brew or an afternoon meeting, we’ll make sure your spot is
            ready. Simply fill out the form below.
          </p>

          <div className="visit-reveal mt-[40px] md:mt-[50px] text-left">
            {confirmed ? (
              <div className="rounded-[6px] bg-[#213421] border border-[#FFA929]/40 p-[20px] sm:p-[26px] md:p-[50px] text-center">
                <div className="inline-flex items-center gap-2 text-[#FFA929] text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Reservation Confirmed</span>
                </div>
                <h3 className="mt-[16px] font-display text-2xl font-extrabold text-[#FFFFFF]">
                  See you soon, {confirmed.name}.
                </h3>
                <p className="mt-2 text-sm text-[#FFFFFF]/80">
                  Confirmation code{' '}
                  <span className="font-display font-bold text-[#FFA929] tabular-nums">
                    {confirmed.code}
                  </span>{' '}
                  for <span className="tabular-nums">{confirmed.date}</span> at{' '}
                  <span className="tabular-nums">{confirmed.time}</span>.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null);
                    setNotes('');
                  }}
                  className="mt-[26px] px-6 py-3 rounded-[4px] border border-[#FFFFFF]/65 text-xs font-semibold uppercase tracking-[0.12em] text-[#FFFFFF] hover:border-[#FFA929] hover:text-[#FFA929] transition-colors cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-[16px]">
                {error && (
                  <div
                    role="alert"
                    className="px-4 py-3 rounded-[4px] bg-[#FFA929]/15 border border-[#FFA929]/40 text-xs font-medium text-[#FFA929]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div className="min-w-0">
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-medium text-[#FFA929] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Clara Laurent"
                      className="min-w-0 w-full max-w-full px-4 py-3 rounded-[4px] bg-[#213421] border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#FFA929] transition-colors"
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="res-email"
                      className="block text-xs font-medium text-[#FFA929] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@domain.com"
                      className="min-w-0 w-full max-w-full px-4 py-3 rounded-[4px] bg-[#213421] border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#FFA929] transition-colors"
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-medium text-[#FFA929] mb-1.5"
                    >
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={todayStr}
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="min-w-0 w-full max-w-full appearance-none px-4 py-3 rounded-[4px] bg-[#213421] border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] tabular-nums focus:outline-none focus:border-[#FFA929] transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="res-time"
                      className="block text-xs font-medium text-[#FFA929] mb-1.5"
                    >
                      Time
                    </label>
                    <select
                      id="res-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="min-w-0 w-full max-w-full px-4 py-3 rounded-[4px] bg-[#213421] border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] tabular-nums focus:outline-none focus:border-[#FFA929] transition-colors"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="res-notes"
                    className="block text-xs font-medium text-[#FFA929] mb-1.5"
                  >
                    Special needs
                  </label>
                  <input
                    id="res-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type a message..."
                    className="min-w-0 w-full max-w-full px-4 py-3 rounded-[4px] bg-[#213421] border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/40 focus:outline-none focus:border-[#FFA929] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[4px] bg-[#FFA929] text-[#152615] font-display font-bold text-sm hover:bg-[#FA9A0A] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="visit-reveal mt-[50px] md:mt-[106px] pt-[50px] border-t border-[#FFFFFF]/12 grid grid-cols-1 md:grid-cols-3 gap-[26px] md:gap-[50px]">
          <div className="min-w-0">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-[#FFA929]">
              Where to Find Us
            </p>
            <p className="mt-3 font-display text-xl font-bold text-[#FFFFFF]">NOIRÉ SoHo</p>
            <p className="mt-1.5 text-sm text-[#FFFFFF]/75 leading-relaxed">
              148 Mercer Street,
              <br />
              New York, NY 10012
            </p>
          </div>

          <div className="min-w-0">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-[#FFA929]">
              Opening Hours
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {OPENING_HOURS.map((row) => (
                <div key={row.days} className="flex items-center justify-between max-w-xs gap-4">
                  <dt className="text-[#FFFFFF]/75">{row.days}:</dt>
                  <dd className="font-medium text-[#FFFFFF] tabular-nums shrink-0">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-[#FFA929]">
              Direct Contact
            </p>
            <div className="mt-3 space-y-1.5 text-sm text-[#FFFFFF]/80">
              <p>
                <a
                  href="tel:+12125550194"
                  className="hover:text-[#FFA929] transition-colors tabular-nums"
                >
                  +1 (212) 555-0194
                </a>
              </p>
              <p>
                <a
                  href="mailto:bonjour@noirecoffee.com"
                  className="hover:text-[#FFA929] transition-colors break-words"
                >
                  bonjour@noirecoffee.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
