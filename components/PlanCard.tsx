'use client';

interface Plan {
  name: string;
  age: string;
  price: string;
  emoji: string;
  color: string;
  accent: string;
  popular?: boolean;
  features: string[];
}

export function PlanCard({ plan }: { plan: Plan }) {
  const scrollToForm = () => {
    const input = document.querySelector('input[type="email"]') as HTMLElement | null;
    input?.scrollIntoView({ behavior: 'smooth' });
    input?.focus();
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 ${plan.color} p-8 text-left shadow-sm transition-all hover:shadow-lg ${
        plan.popular ? 'ring-2 ring-tinki-orange ring-offset-2' : ''
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tinki-orange px-4 py-1 text-xs font-bold text-white">
          El más popular
        </span>
      )}

      <span className="text-4xl">{plan.emoji}</span>
      <h3 className="mt-4 text-2xl font-black text-tinki-dark">{plan.name}</h3>
      <p className="text-sm text-tinki-dark/50">{plan.age}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-black text-tinki-dark">
          {plan.price}€
        </span>
        <span className="text-sm text-tinki-dark/50">/mes</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-tinki-dark/70">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={scrollToForm}
        className={`mt-8 w-full rounded-xl py-3 font-bold text-white transition-all active:scale-95 ${plan.accent} hover:opacity-90`}
      >
        Lo quiero
      </button>
    </div>
  );
}
