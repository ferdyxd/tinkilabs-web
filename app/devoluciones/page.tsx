import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Devoluciones y Reembolsos — Tinkilabs',
  description: 'Política de devoluciones y reembolsos de Tinkilabs.',
};

export default function DevolucionesPage() {
  return (
    <LegalLayout title="Devoluciones y Reembolsos" updated="27 de mayo de 2026">
      <Section title="1. Derecho de desistimiento">
        <p>Como consumidor, tienes derecho a desistir de tu compra en un plazo de <strong>14 días naturales</strong> desde la recepción del producto, sin necesidad de justificar tu decisión y sin penalización alguna.</p>
      </Section>

      <Section title="2. Cómo ejercer el desistimiento">
        <p>Para desistir de tu compra, debes notificárnoslo por escrito a <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a> incluyendo:</p>
        <ul className="list-disc pl-5">
          <li>Tu nombre completo</li>
          <li>Número de pedido</li>
          <li>Producto(s) que deseas devolver</li>
          <li>Tu decisión expresa de desistir de la compra</li>
        </ul>
      </Section>

      <Section title="3. Condiciones de devolución">
        <p>El producto debe devolverse en las mismas condiciones en que fue recibido:</p>
        <ul className="list-disc pl-5">
          <li>Sin abrir, con todos los sellos y precintos originales intactos</li>
          <li>En su embalaje original</li>
          <li>Sin signos de uso o manipulación</li>
        </ul>
        <p>Los kits que hayan sido abiertos no podrán devolverse por razones de higiene y protección, salvo que presenten defectos de fabricación.</p>
      </Section>

      <Section title="4. Gastos de devolución">
        <p>Los gastos de envío de la devolución corren a cargo del cliente, salvo en los siguientes casos:</p>
        <ul className="list-disc pl-5">
          <li>El producto llegó defectuoso o dañado</li>
          <li>El producto recibido no corresponde con el pedido</li>
          <li>Faltan piezas en el kit</li>
        </ul>
        <p>En estos casos, Tinkilabs asume los gastos de devolución y se coordinará contigo para la recogida o envío de un reemplazo.</p>
      </Section>

      <Section title="5. Reembolso">
        <p>Una vez recibida y verificada la devolución, procederemos al reembolso del importe del producto en un plazo máximo de <strong>14 días naturales</strong>. El reembolso se realizará por el mismo medio de pago utilizado en la compra.</p>
        <p>Los gastos de envío originales no se reembolsan, salvo en los casos mencionados en la sección 4.</p>
      </Section>

      <Section title="6. Suscripciones">
        <p>Nuestras suscripciones funcionan de manera distinta según el plan que elijas. El descuento que obtienes en los planes trimestral y anual existe porque adquieres un compromiso de recibir todas las cajas de ese periodo.</p>

        <h3 className="font-semibold mt-4" style={{ color: 'var(--color-text)' }}>Plan Mensual (24,90 €/mes)</h3>
        <ul className="list-disc pl-5">
          <li>Sin compromiso de permanencia.</li>
          <li>Puedes cancelar cuando quieras desde tu cuenta, antes del siguiente cobro.</li>
          <li>Las cajas ya pagadas y recibidas no se reembolsan.</li>
        </ul>

        <h3 className="font-semibold mt-4" style={{ color: 'var(--color-text)' }}>Plan Trimestral (22,90 €/mes — 3 cajas)</h3>
        <ul className="list-disc pl-5">
          <li>Compromiso de <strong>3 meses</strong> (3 cajas).</li>
          <li>Al finalizar el trimestre, puedes cancelar desde tu cuenta o la suscripción se renueva automáticamente.</li>
          <li>Si necesitas cancelar antes de tiempo, contacta con nosotros en <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a> y buscaremos una solución.</li>
          <li>El precio reducido (22,90 €/mes en lugar de 24,90 €) está vinculado al compromiso de 3 meses.</li>
        </ul>

        <h3 className="font-semibold mt-4" style={{ color: 'var(--color-text)' }}>Plan Anual (19,90 €/mes — 12 cajas)</h3>
        <ul className="list-disc pl-5">
          <li>Compromiso de <strong>12 meses</strong> (12 cajas).</li>
          <li>Al finalizar el año, puedes cancelar desde tu cuenta o la suscripción se renueva automáticamente.</li>
          <li>Si necesitas cancelar antes de tiempo, contacta con nosotros en <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a> y buscaremos una solución.</li>
          <li>El precio reducido (19,90 €/mes en lugar de 24,90 €) está vinculado al compromiso de 12 meses.</li>
        </ul>

        <h3 className="font-semibold mt-4" style={{ color: 'var(--color-text)' }}>Caja única (27,00 €)</h3>
        <ul className="list-disc pl-5">
          <li>Sin ningún tipo de compromiso. Es una compra puntual.</li>
          <li>Aplica el derecho de desistimiento de 14 días desde la recepción (ver sección 1).</li>
          <li>Si luego te suscribes a un plan, te bonificamos la diferencia entre el precio de la caja única y el precio del plan elegido en tu primera renovación.</li>
        </ul>
      </Section>

      <Section title="7. Productos defectuosos o piezas faltantes">
        <p>Si tu kit incluye piezas defectuosas, rotas o faltantes, por favor consulta nuestra política de repuestos gratuitos. No es necesario devolver el kit completo: te enviaremos las piezas que necesitas sin coste alguno.</p>
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
