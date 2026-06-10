'use client';

import { EmptyState } from '@/components/EmptyState';

export default function PedidosPage() {
  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Pedidos</h1>
      <p className="mt-1 text-[13px] text-tinki-dark/40">Historial de compras y regalos.</p>
      <EmptyState
        icono="📜"
        titulo="No has hecho ningún pedido"
        descripcion="Cuando compres una suscripción, un certificado de regalo o algo de merch, aparecerá aquí."
        accion={{ label: 'Explorar tienda', href: '/tienda' }}
      />
    </div>
  );
}
