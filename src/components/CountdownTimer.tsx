import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div>
      {label && (
        <p className="text-dark-400 text-xs uppercase tracking-widest font-semibold mb-3">{label}</p>
      )}
      <div className="flex gap-3">
        {units.map(({ value, label: unitLabel }) => (
          <div
            key={unitLabel}
            className="flex flex-col items-center bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 min-w-[60px]"
          >
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary-400 tabular-nums">
              {mounted ? String(value).padStart(2, '0') : '--'}
            </span>
            <span className="text-dark-500 text-[10px] uppercase tracking-wider font-semibold">
              {unitLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
