import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Aviso Legal — Tinkilabs',
  description: 'Aviso legal y condiciones de uso del sitio web de Tinkilabs.',
};

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso Legal" updated="27 de mayo de 2026">
      <Section title="1. Datos identificativos">
        <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:</p>
        <ul className="list-disc pl-5">
          <li><strong>Titular:</strong> Tinkilabs</li>
          <li><strong>Email:</strong> <a href="mailto:hola@tinkilabs.com" className="text-[var(--color-primary)] underline">hola@tinkilabs.com</a></li>
          <li><strong>Sitio web:</strong> tinkilabs.com</li>
        </ul>
      </Section>

      <Section title="2. Condiciones de acceso y uso">
        <p>El acceso a este sitio web es gratuito y no requiere registro previo, salvo para la contratación de productos y servicios. El usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral, el orden público y lo dispuesto en el presente Aviso Legal.</p>
        <p>Queda prohibido el uso del sitio web con fines ilícitos, lesivos o que puedan causar daño a Tinkilabs o a terceros.</p>
      </Section>

      <Section title="3. Propiedad intelectual e industrial">
        <p>Todos los contenidos del sitio web (marcas, logotipos, textos, imágenes, vídeos, diseños, código fuente y demás elementos) son propiedad de Tinkilabs o de terceros que han autorizado su uso. Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación sin autorización expresa del titular.</p>
      </Section>

      <Section title="4. Exclusión de responsabilidad">
        <p>Tinkilabs no se hace responsable de:</p>
        <ul className="list-disc pl-5">
          <li>Los daños o perjuicios derivados del uso de la información contenida en el sitio web</li>
          <li>La interrupción del servicio o fallos técnicos del sitio web</li>
          <li>La presencia de virus o elementos maliciosos en el sitio web</li>
          <li>Los contenidos de sitios web de terceros a los que se pueda acceder mediante enlaces</li>
        </ul>
      </Section>

      <Section title="5. Enlaces">
        <p>El sitio web puede contener enlaces a sitios web de terceros. Tinkilabs no ejerce control sobre dichos sitios ni se responsabiliza de su contenido. La inclusión de enlaces no implica la aprobación de los contenidos de dichos sitios por parte de Tinkilabs.</p>
      </Section>

      <Section title="6. Modificaciones">
        <p>Tinkilabs se reserva el derecho a modificar el presente Aviso Legal en cualquier momento para adaptarlo a cambios legislativos o del sitio web. Se recomienda consultar periódicamente esta página.</p>
      </Section>

      <Section title="7. Legislación y jurisdicción">
        <p>Este Aviso Legal se rige por la legislación española. Para la resolución de conflictos derivados del acceso o uso de este sitio web, el usuario y Tinkilabs se someten a los juzgados y tribunales del domicilio del consumidor.</p>
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
