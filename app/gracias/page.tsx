import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '¡Gracias! — Tinkilabs',
  description: 'Tu suscripción está activada. Bienvenido a Tinkilabs.',
};

export default function GraciasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-tinki-light pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Emoji grande */}
          <div className="text-7xl mb-8">🚀</div>

          {/* Título */}
          <h1 className="text-4xl font-black text-tinki-dark mb-4">
            ¡Bienvenido a Tinkilabs!
          </h1>
          <p className="text-lg text-tinki-dark/50 mb-12 leading-relaxed">
            Tu primera caja sale el día <strong className="text-tinki-dark">5 del mes que viene</strong>.
            Te hemos enviado un email con todos los detalles.
          </p>

          {/* ¿Qué pasa ahora? */}
          <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 mb-8 text-left">
            <h2 className="font-black text-tinki-dark mb-4">¿Qué pasa ahora?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-tinki-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-tinki-orange font-black text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-tinki-dark text-sm">Preparamos tu caja</h3>
                  <p className="text-tinki-dark/40 text-sm">
                    Empaquetamos todas las piezas, el manual ilustrado y los materiales. Todo listo en 2-3 días.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-tinki-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-tinki-orange font-black text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-tinki-dark text-sm">La enviamos</h3>
                  <p className="text-tinki-dark/40 text-sm">
                    Envío gratis a toda España peninsular. Llega en 2-3 días hábiles. Recibirás un email con el seguimiento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-tinki-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-tinki-orange font-black text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-tinki-dark text-sm">¡A construir!</h3>
                  <p className="text-tinki-dark/40 text-sm">
                    El peque abre la caja, sigue el manual paso a paso, y monta una máquina que funciona de verdad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ rápida */}
          <div className="bg-white rounded-2xl border border-tinki-dark/5 p-6 mb-8 text-left">
            <h2 className="font-black text-tinki-dark mb-3">¿Dudas?</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-bold text-tinki-dark">¿Puedo cancelar cuando quiera?</dt>
                <dd className="text-tinki-dark/40">Sí. Sin permanencia. Un clic y listo.</dd>
              </div>
              <div>
                <dt className="font-bold text-tinki-dark">¿Y si la caja no le gusta al peque?</dt>
                <dd className="text-tinki-dark/40">Tienes 30 días para devolverla. Pero no creemos que haga falta :)</dd>
              </div>
              <div>
                <dt className="font-bold text-tinki-dark">¿Falta una pieza?</dt>
                <dd className="text-tinki-dark/40">Te enviamos el repuesto gratis en 48h. Sin preguntas.</dd>
              </div>
            </dl>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="px-8 py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Ver todos los productos
            </Link>
            <Link
              href="/ayuda"
              className="px-8 py-4 border-2 border-tinki-dark/10 text-tinki-dark/60 font-bold rounded-xl hover:border-tinki-orange hover:text-tinki-orange transition-colors"
            >
              Centro de ayuda
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
