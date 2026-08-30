import type { SopVersionStatus } from '@sop-os/contracts';
import { StateMachine, type TransitionMap } from './state-machine.js';

const sopTransitions: TransitionMap<SopVersionStatus> = {
  DRAFT: ['IN_REVIEW', 'ARCHIVED'],
  IN_REVIEW: ['REVISION_REQUIRED', 'APPROVED'],
  REVISION_REQUIRED: ['DRAFT', 'IN_REVIEW', 'ARCHIVED'],
  APPROVED: ['SCHEDULED', 'EFFECTIVE', 'ARCHIVED'],
  SCHEDULED: ['EFFECTIVE', 'ARCHIVED'],
  EFFECTIVE: ['SUPERSEDED'],
  SUPERSEDED: ['ARCHIVED'],
  ARCHIVED: []
};

export const sopStateMachine = new StateMachine(sopTransitions);

