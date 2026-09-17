import { describe, expect, it } from 'vitest';
import { applicationActionForStatus, leadActionForStatus } from './demo-journey-state';

describe('local demo journey state', () => {
  it('exposes only the next valid lead command', () => {
    expect(leadActionForStatus('NEW')).toEqual(['lead.assign', '1. Phân công']);
    expect(leadActionForStatus('QUALIFIED')?.[0]).toBe('lead.application');
    expect(leadActionForStatus('CONVERTED')).toBeUndefined();
  });

  it('maps application states to explicit command actions', () => {
    expect(applicationActionForStatus('DRAFT')?.[0]).toBe('application.submit');
    expect(applicationActionForStatus('ASSESSMENT_PENDING')?.[0]).toBe('application.assess');
    expect(applicationActionForStatus('DECISION_PENDING')).toBeUndefined();
  });
});
