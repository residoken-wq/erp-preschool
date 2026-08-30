import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
  APP_ORIGIN: z.string().min(1).refine(
    (value) => value.split(',').every((origin) => z.string().url().safeParse(origin.trim()).success),
    'APP_ORIGIN must contain one or more comma-separated absolute URLs'
  ),
  AUTH_MODE: z.enum(['development', 'oidc']).default('development'),
  OIDC_ISSUER: z.preprocess((value) => value === '' ? undefined : value, z.string().url().optional()),
  OIDC_CLIENT_ID: z.preprocess((value) => value === '' ? undefined : value, z.string().min(1).optional()),
  OIDC_CLIENT_SECRET: z.preprocess((value) => value === '' ? undefined : value, z.string().min(1).optional()),
  OUTBOX_POLL_INTERVAL_MS: z.coerce.number().int().min(250).default(2000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info')
});

export type AppEnvironment = z.infer<typeof envSchema>;

export function loadEnvironment(input: NodeJS.ProcessEnv = process.env): AppEnvironment {
  const parsed = envSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid environment: ${z.prettifyError(parsed.error)}`);
  }
  if (parsed.data.AUTH_MODE === 'oidc') {
    if (!parsed.data.OIDC_ISSUER || !parsed.data.OIDC_CLIENT_ID) {
      throw new Error('OIDC_ISSUER and OIDC_CLIENT_ID are required when AUTH_MODE=oidc');
    }
  }
  if (parsed.data.NODE_ENV === 'production' && parsed.data.AUTH_MODE === 'development') {
    throw new Error('AUTH_MODE=development is forbidden when NODE_ENV=production');
  }
  return parsed.data;
}
