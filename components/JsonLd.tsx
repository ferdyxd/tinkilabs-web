export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tinkilabs',
    url: 'https://tinkilabs.com',
    logo: 'https://tinkilabs.com/images/logo.png',
    description: 'Cajas de experimentos STEM por suscripción mensual para niños de 3 a 14 años.',
    email: 'hola@tinkilabs.com',
    foundingDate: '2026',
    founder: { '@type': 'Person', name: 'Alby' },
    sameAs: [
      'https://www.instagram.com/tinkilabs',
      'https://www.tiktok.com/@tinkilabs',
      'https://www.youtube.com/@tinkilabs',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ data }: { data: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
