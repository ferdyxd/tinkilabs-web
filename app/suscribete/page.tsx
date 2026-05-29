import type { Metadata } from 'next';
import { PurchaseWizard } from '@/components/PurchaseWizard';

export const metadata: Metadata = {
  title: 'Suscríbete — Tinkilabs',
  description: 'Elige tu plan, construye algo alucinante cada mes.',
};

export default function SuscribetePage() {
  return (
    <main className="min-h-screen bg-tinki-light pt-24 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-tinki-dark">Empieza la aventura</h1>
        <p className="text-tinki-dark/40 mt-2">Una caja distinta cada mes. Sin permanencia. Cancela cuando quieras.</p>
      </div>
      <PurchaseWizard />
    </main>
  );
}
