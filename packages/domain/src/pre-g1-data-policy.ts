const RESERVED_EMAIL_DOMAINS = new Set(['example.test', 'example.invalid', 'example.com', 'example.net', 'example.org']);

export class PreG1DataPolicyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PreG1DataPolicyError';
  }
}

export type PreG1LeadInput = {
  dataProvenance?: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phone?: string | null;
};

export function assertPreG1SyntheticLead(input: PreG1LeadInput): void {
  if (input.dataProvenance !== 'synthetic') {
    throw new PreG1DataPolicyError('dataProvenance must be synthetic before Gate G1');
  }
  for (const [field, value] of [['firstName', input.firstName], ['lastName', input.lastName]] as const) {
    if (!value?.trim().toLowerCase().startsWith('synthetic-')) {
      throw new PreG1DataPolicyError(`${field} must use the Synthetic- prefix before Gate G1`);
    }
  }
  if (input.email) {
    const domain = input.email.split('@').at(-1)?.toLowerCase();
    if (!domain || !RESERVED_EMAIL_DOMAINS.has(domain)) {
      throw new PreG1DataPolicyError('email must use an IANA-reserved example domain before Gate G1');
    }
  }
  if (input.phone && !/^\+000\d{6,15}$/.test(input.phone)) {
    throw new PreG1DataPolicyError('phone must use the non-routable synthetic +000 range before Gate G1');
  }
}
