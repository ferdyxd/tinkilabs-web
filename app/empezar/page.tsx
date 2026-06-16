import type { Metadata } from 'next';
import { KiwiCoFlow } from '@/components/KiwiCoFlow';

export const metadata: Metadata = {
  title: 'Empieza — Tinkilabs',
  description: 'Elige tu plan, construye algo alucinante cada mes.',
};

export default function EmpezarPage() {
  return (
    <main className="min-h-screen bg-tinki-light pt-24 pb-20">
      <KiwiCoFlow />
    </main>
  );
}
