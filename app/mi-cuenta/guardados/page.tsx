import { EmptyState } from '@/components/EmptyState';

export default function GuardadosPage() {
  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Guardados</h1>
      <p className="mt-1 text-[13px] text-tinki-dark/40">Proyectos y artículos que has guardado para ver más tarde.</p>
      <EmptyState
        icono="🔖"
        titulo="Guarda proyectos para más tarde"
        descripcion="Cuando veas un proyecto o artículo que te guste, guárdalo aquí para encontrarlo rápido."
        accion={{ label: 'Explorar actividades', href: '/actividades' }}
      />
    </div>
  );
}
