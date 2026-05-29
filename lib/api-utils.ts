import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export function error400(message: string, zodError?: ZodError): NextResponse<ApiErrorBody> {
  const details = zodError?.issues.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));

  return NextResponse.json(
    {
      error: {
        code: 'VALIDATION_ERROR',
        message,
        ...(details && { details }),
      },
    },
    { status: 400 }
  );
}

export function error401(message = 'No autorizado'): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code: 'UNAUTHORIZED', message } },
    { status: 401 }
  );
}

export function error404(message = 'Recurso no encontrado'): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code: 'NOT_FOUND', message } },
    { status: 404 }
  );
}

export function error409(message: string): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code: 'CONFLICT', message } },
    { status: 409 }
  );
}

export function error410(message: string): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code: 'GONE', message } },
    { status: 410 }
  );
}

export function error500(message = 'Error interno'): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    { error: { code: 'INTERNAL_ERROR', message } },
    { status: 500 }
  );
}
