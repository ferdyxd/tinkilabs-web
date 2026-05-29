CREATE TYPE "public"."estado_envio" AS ENUM('pendiente', 'en_transito', 'entregado', 'devuelto');--> statement-breakpoint
ALTER TABLE "envios" ALTER COLUMN "estado" SET DEFAULT 'pendiente'::"public"."estado_envio";--> statement-breakpoint
ALTER TABLE "envios" ALTER COLUMN "estado" SET DATA TYPE "public"."estado_envio" USING "estado"::"public"."estado_envio";--> statement-breakpoint
ALTER TABLE "envios" ALTER COLUMN "estado" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_envios_pedido" ON "envios" USING btree ("pedido_id");--> statement-breakpoint
CREATE INDEX "idx_envios_suscripcion" ON "envios" USING btree ("suscripcion_id");--> statement-breakpoint
CREATE INDEX "idx_gift_fecha_estado" ON "gift_certificates" USING btree ("fecha_envio","estado");--> statement-breakpoint
CREATE INDEX "idx_gift_email_dest" ON "gift_certificates" USING btree ("email_destinatario");--> statement-breakpoint
CREATE INDEX "idx_items_pedido" ON "pedido_items" USING btree ("pedido_id");--> statement-breakpoint
CREATE INDEX "idx_items_producto" ON "pedido_items" USING btree ("producto_id");--> statement-breakpoint
CREATE INDEX "idx_pedidos_usuario" ON "pedidos" USING btree ("usuario_id");--> statement-breakpoint
CREATE INDEX "idx_pedidos_estado" ON "pedidos" USING btree ("estado");--> statement-breakpoint
CREATE INDEX "idx_sesiones_usuario" ON "sesiones" USING btree ("usuario_id");--> statement-breakpoint
CREATE INDEX "idx_sesiones_expira" ON "sesiones" USING btree ("expira_en");--> statement-breakpoint
CREATE INDEX "idx_susc_usuario" ON "suscripciones" USING btree ("usuario_id");--> statement-breakpoint
CREATE INDEX "idx_susc_estado" ON "suscripciones" USING btree ("estado");--> statement-breakpoint
CREATE INDEX "idx_susc_renovacion" ON "suscripciones" USING btree ("proxima_renovacion");