import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Envíos — Tinkilabs',
  description: 'Información sobre envíos, plazos y costes de Tinkilabs.',
};

export default function EnviosPage() {
  return (
    <LegalLayout title="Política de Envíos" updated="27 de mayo de 2026">
      <Section title="1. Zonas de envío">
        <p>Actualmente realizamos envíos a:</p>
        <ul className="list-disc pl-5">
          <li>España peninsular</li>
          <li>Islas Baleares</li>
          <li>Islas Canarias</li>
          <li>Ceuta y Melilla</li>
          <li>Unión Europea (países seleccionados)</li>
        </ul>
        <p>Estamos trabajando para ampliar nuestra cobertura internacional. Si tu país no aparece en la lista, escríbenos a <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a> y te informaremos.</p>
      </Section>

      <Section title="2. Plazos de entrega">
        <ul className="list-disc pl-5">
          <li><strong>España peninsular:</strong> 3-5 días laborables</li>
          <li><strong>Baleares:</strong> 4-6 días laborables</li>
          <li><strong>Canarias, Ceuta y Melilla:</strong> 5-7 días laborables</li>
          <li><strong>Unión Europea:</strong> 7-12 días laborables</li>
        </ul>
        <p>Las suscripciones se envían durante la primera semana de cada mes. Recibirás un email de confirmación con el seguimiento cuando tu caja salga de nuestro almacén.</p>
      </Section>

      <Section title="3. Costes de envío">
        <ul className="list-disc pl-5">
          <li><strong>España peninsular:</strong> 3.95€ (gratis en suscripciones)</li>
          <li><strong>Baleares:</strong> 5.95€</li>
          <li><strong>Canarias, Ceuta y Melilla:</strong> 8.95€</li>
          <li><strong>Unión Europea:</strong> desde 9.95€</li>
        </ul>
        <p>Los gastos de envío se muestran durante el proceso de compra antes de realizar el pago. Para pedidos a Canarias, Ceuta y Melilla, pueden aplicarse aranceles e impuestos de importación que corren a cargo del destinatario.</p>
      </Section>

      <Section title="4. Seguimiento del pedido">
        <p>Todos los envíos incluyen número de seguimiento. Recibirás un email con el enlace de seguimiento en cuanto tu pedido salga de nuestro almacén. También puedes consultar el estado de tu pedido desde tu área de cliente.</p>
      </Section>

      <Section title="5. Envíos internacionales">
        <p>Para envíos fuera de la Unión Europea, el destinatario es responsable de los derechos de aduana, impuestos de importación y cualquier otra tasa aplicable en el país de destino. Estos costes no están incluidos en el precio de compra ni en los gastos de envío.</p>
      </Section>

      <Section title="6. Problemas con el envío">
        <p>Si tu pedido no llega en el plazo estimado, llega dañado o no coincide con lo solicitado, contacta con nosotros en <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a> en un plazo máximo de 7 días desde la recepción (o desde la fecha prevista de entrega) y lo solucionaremos.</p>
      </Section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {children}
      </div>
    </section>
  );
}
