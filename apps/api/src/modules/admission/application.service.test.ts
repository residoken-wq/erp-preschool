import { describe, expect, it } from 'vitest';
import { assertOfferApprovalSeparation } from './application.service.js';

describe('offer approval separation', () => {
  it('blocks the offer author from approving their own offer', () => {
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-a', 'APPROVED'))
      .toThrow('Offer author cannot approve their own offer');
  });

  it('allows a different actor to approve and the author to perform non-approval transitions', () => {
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-b', 'APPROVED')).not.toThrow();
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-a', 'PENDING_APPROVAL')).not.toThrow();
  });
});
