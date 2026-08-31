import { describe, expect, it } from 'vitest';
import { assertPreG1SyntheticLead } from './pre-g1-data-policy.js';

const validLead = {
  dataProvenance: 'synthetic',
  firstName: 'Synthetic-An',
  lastName: 'Synthetic-Nguyen',
  email: 'synthetic.an@example.test',
  phone: '+000000000001'
};

describe('DEC-020 pre-G1 lead ingestion policy', () => {
  it('accepts explicitly synthetic input using reserved identifiers', () => {
    expect(() => assertPreG1SyntheticLead(validLead)).not.toThrow();
  });

  it('rejects missing provenance and non-synthetic names', () => {
    expect(() => assertPreG1SyntheticLead({
      firstName: validLead.firstName,
      lastName: validLead.lastName,
      email: validLead.email,
      phone: validLead.phone
    })).toThrow('dataProvenance');
    expect(() => assertPreG1SyntheticLead({ ...validLead, firstName: 'An' })).toThrow('Synthetic-');
  });

  it('rejects routable contact identifiers', () => {
    expect(() => assertPreG1SyntheticLead({ ...validLead, email: 'person@school.vn' })).toThrow('IANA-reserved');
    expect(() => assertPreG1SyntheticLead({ ...validLead, phone: '+84901234567' })).toThrow('+000');
  });
});
