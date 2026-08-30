import { describe, expect, it } from 'vitest';
import { leadStateMachine } from './lead-state-machine.js';
import { sopStateMachine } from './sop-state-machine.js';
import { applicationStateMachine } from './application-state-machine.js';

describe('lead state machine', () => {
  it('allows the normal qualification path', () => {
    expect(leadStateMachine.transition('NEW', 'ASSIGNED')).toBe('ASSIGNED');
    expect(leadStateMachine.transition('ASSIGNED', 'CONTACTED')).toBe('CONTACTED');
    expect(leadStateMachine.transition('CONTACTED', 'QUALIFIED')).toBe('QUALIFIED');
  });

  it('blocks direct NEW to CONVERTED', () => {
    expect(() => leadStateMachine.transition('NEW', 'CONVERTED')).toThrow();
  });
});

describe('SOP version state machine', () => {
  it('does not allow editing an effective version', () => {
    expect(sopStateMachine.allowedFrom('EFFECTIVE')).toEqual(['SUPERSEDED']);
    expect(() => sopStateMachine.transition('EFFECTIVE', 'DRAFT')).toThrow();
  });
});

describe('application state machine', () => {
  it('enforces document review before verification', () => {
    expect(applicationStateMachine.transition('SUBMITTED', 'DOCUMENT_REVIEW')).toBe('DOCUMENT_REVIEW');
    expect(applicationStateMachine.transition('DOCUMENT_REVIEW', 'VERIFIED')).toBe('VERIFIED');
    expect(() => applicationStateMachine.transition('DRAFT', 'VERIFIED')).toThrow();
  });
});
