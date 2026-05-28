import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Tinkilabs',
  description: 'Términos y condiciones de uso y contratación de Tinkilabs.',
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y Condiciones" updated="27 de mayo de 2026">
      <Section title="1. Identidad del titular">
        <p>Tinkilabs es una marca operada por su titular, con domicilio en España. Para cualquier consulta puede contactar en <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a>.</p>
      </Section>

      <Section title="2. Objeto">
        <p>Los presentes Términos y Condiciones regulan el acceso y uso del sitio web tinkilabs.com, así como la contratación de los productos y servicios ofrecidos a través del mismo.</p>
        <p>La navegación por el sitio web y/o la compra de cualquier producto implica la aceptación plena y sin reservas de estos Términos y Condiciones.</p>
      </Section>

      <Section title="3. Productos y servicios">
        <p>Tinkilabs ofrece cajas de experimentos STEM mediante suscripción mensual. Cada caja contiene los materiales e instrucciones necesarios para construir un proyecto. Los productos se describen en la página de cada kit, incluyendo la edad recomendada.</p>
        <p>Tinkilabs se reserva el derecho a modificar el contenido de las cajas, los precios y la disponibilidad de los productos sin previo aviso.</p>
      </Section>

      <Section title="4. Precios y pagos">
        <p>Todos los precios se muestran en euros (€) e incluyen el IVA aplicable. Los gastos de envío se calculan durante el proceso de compra y se muestran antes de la confirmación del pedido.</p>
        <p>El pago se realiza a través de Stripe, una pasarela de pago segura. Tinkilabs no almacena datos de tarjetas de crédito. Los pagos recurrentes de suscripción se procesan automáticamente según el plan contratado.</p>
      </Section>

      <Section title="5. Suscripciones y renovación">
        <p>Las suscripciones se renuevan automáticamente al finalizar el período contratado, salvo que el cliente cancele la renovación automática desde su panel de cuenta o contactando con soporte. El cliente puede cancelar su suscripción en cualquier momento, sin penalización, desde su área de cliente.</p>
        <p>Los períodos ya facturados no son reembolsables. Si se cancela una suscripción activa, se seguirán recibiendo las cajas correspondientes al período ya pagado.</p>
      </Section>

      <Section title="6. Envíos">
        <p>Realizamos envíos a toda España (península, Baleares, Canarias, Ceuta y Melilla) y a países seleccionados de la Unión Europea. Los plazos de entrega estimados son de 3 a 7 días laborables para España peninsular. Los gastos de envío y plazos detallados se especifican en nuestra <a href="/envios" className="text-[var(--color-primary)] underline">Política de Envíos</a>.</p>
      </Section>

      <Section title="7. Derecho de desistimiento">
        <p>De acuerdo con la legislación española, el cliente tiene derecho a desistir del contrato en un plazo de 14 días naturales desde la recepción del producto, sin necesidad de justificación. Para ejercer este derecho, el cliente debe notificarlo a <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a>.</p>
        <p>El producto debe devolverse en perfecto estado, sin haber sido abierto ni utilizado. Los gastos de devolución corren a cargo del cliente, salvo que el producto llegara defectuoso o no se correspondiera con lo solicitado.</p>
      </Section>

      <Section title="8. Propiedad intelectual">
        <p>Todos los contenidos del sitio web (textos, imágenes, vídeos, logotipos, diseños, código fuente) son propiedad de Tinkilabs o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.</p>
      </Section>

      <Section title="9. Protección de datos">
        <p>Los datos personales facilitados serán tratados de acuerdo con nuestra <a href="/privacidad" className="text-[var(--color-primary)] underline">Política de Privacidad</a>, cumpliendo con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD).</p>
      </Section>

      <Section title="10. Legislación aplicable">
        <p>Estos Términos y Condiciones se rigen por la legislación española. Para la resolución de cualquier conflicto, las partes se someten a los juzgados y tribunales del domicilio del consumidor.</p>
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
