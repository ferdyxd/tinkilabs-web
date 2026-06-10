'use client';

import { useState } from 'react';

export default function ReferidosPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'TINKI-ALBY'; // TODO: generar código único por usuario

  const referralUrl = `https://tinkilabs.com/suscribete?ref=${referralCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Referidos</h1>
        <p className="mt-1 text-[13px] text-tinki-dark/40">Comparte Tinkilabs y gana 5€ por cada amigo que se suscriba.</p>
      </div>

      {/* Cómo funciona */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icono: '🔗', titulo: 'Comparte tu enlace', desc: 'Pásaselo a quien quieras por WhatsApp, email o donde sea.' },
          { icono: '📦', titulo: 'Tu amigo se suscribe', desc: 'Recibe su primera caja y aplica el descuento de 5€.' },
          { icono: '💰', titulo: 'Ambos ganáis 5€', desc: 'Tu amigo ahorra 5€ en su primera caja. Tú recibes 5€ en tu próxima renovación.' },
        ].map((item) => (
          <div key={item.titulo} className="rounded-xl border border-neutral-100 bg-white p-5 text-center">
            <span className="text-3xl">{item.icono}</span>
            <h3 className="mt-3 text-sm font-bold text-tinki-dark">{item.titulo}</h3>
            <p className="mt-1 text-[12px] text-tinki-dark/40">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Enlace */}
      <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6">
        <h3 className="text-sm font-bold text-tinki-dark">Tu enlace de referido</h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-[13px] text-tinki-dark/60"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-tinki-orange px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-tinki-orange-dark active:scale-[0.97]"
          >
            {copied ? 'Copiado ✓' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  );
}
