import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Tinkilabs',
  description: 'Cómo tratamos tus datos personales en Tinkilabs.',
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad" updated="27 de mayo de 2026">
      <Section title="1. Responsable del tratamiento">
        <p>Tinkilabs, con domicilio en España y correo electrónico <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a>, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>
      </Section>

      <Section title="2. Datos que recogemos">
        <p>Recogemos los siguientes datos personales:</p>
        <ul className="list-disc pl-5">
          <li>Nombre y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Dirección postal de envío</li>
          <li>Datos de facturación (gestionados por Stripe, no almacenados por Tinkilabs)</li>
          <li>Datos de navegación (cookies analíticas)</li>
        </ul>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Tus datos personales serán tratados con las siguientes finalidades:</p>
        <ul className="list-disc pl-5">
          <li>Gestionar tu cuenta de usuario y tu suscripción</li>
          <li>Enviarte las cajas contratadas a tu domicilio</li>
          <li>Enviarte comunicaciones relacionadas con tu pedido</li>
          <li>Enviarte nuestra newsletter (solo si has dado consentimiento explícito)</li>
          <li>Mejorar la web mediante análisis estadísticos anónimos</li>
        </ul>
      </Section>

      <Section title="4. Base legal">
        <p>La base legal para el tratamiento de tus datos es la ejecución del contrato de compraventa o suscripción, el consentimiento explícito para fines comerciales, y el interés legítimo para la mejora del servicio.</p>
      </Section>

      <Section title="5. Conservación de los datos">
        <p>Los datos personales se conservarán mientras dure la relación contractual y, una vez finalizada, durante los plazos legales de prescripción de obligaciones (generalmente 5 años para fines fiscales y mercantiles). Los datos tratados con fines comerciales se conservarán hasta que retires tu consentimiento.</p>
      </Section>

      <Section title="6. Cesión a terceros">
        <p>Tus datos pueden ser comunicados a:</p>
        <ul className="list-disc pl-5">
          <li>Stripe — pasarela de pago (datos de facturación)</li>
          <li>Brevo — envío de emails transaccionales y marketing</li>
          <li>Empresas de mensajería — entrega de pedidos</li>
          <li>Vercel — hosting de la web</li>
        </ul>
        <p>Todos ellos cumplen con el RGPD y tienen sus propios acuerdos de tratamiento de datos.</p>
      </Section>

      <Section title="7. Derechos del interesado">
        <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos escribiendo a <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a>. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>
      </Section>

      <Section title="8. Cookies">
        <p>Utilizamos cookies técnicas necesarias para el funcionamiento de la web y cookies analíticas (con tu consentimiento) para entender cómo se usa el sitio y mejorarlo. Puedes configurar tus preferencias de cookies desde el banner que aparece al visitar la web.</p>
      </Section>

      <Section title="9. Seguridad">
        <p>Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la pérdida, la alteración o la destrucción.</p>
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
