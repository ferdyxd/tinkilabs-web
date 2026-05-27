import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Email inválido' },
      { status: 400 }
    );
  }

  const brevoKey = process.env.BREVO_API_KEY;

  // Si no hay Brevo configurado, guardar en log (dev local)
  if (!brevoKey) {
    console.log(
      JSON.stringify({
        event: 'waitlist_signup',
        email,
        timestamp: new Date().toISOString(),
        source: 'landing_page',
      })
    );
    return NextResponse.json({
      success: true,
      message: 'Email registrado (modo dev)',
    });
  }

  // Producción: Brevo API
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoKey,
        'accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [3], // Lista de espera Tinkilabs
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Brevo error:', err);
      return NextResponse.json(
        { error: 'Error al registrar. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    console.log(
      JSON.stringify({
        event: 'waitlist_signup',
        email,
        timestamp: new Date().toISOString(),
        source: 'landing_page',
        provider: 'brevo',
      })
    );

    return NextResponse.json({
      success: true,
      message: '¡Bienvenido a bordo! Te avisaremos en cuanto lancemos.',
    });
  } catch (err) {
    console.error('Brevo error:', err);
    return NextResponse.json(
      { error: 'Error de conexión. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
