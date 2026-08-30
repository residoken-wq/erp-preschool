import type { ApplicationStatus } from '@sop-os/contracts';
import { StateMachine, type TransitionMap } from './state-machine.js';

const applicationTransitions: TransitionMap<ApplicationStatus> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['DOCUMENT_REVIEW', 'INCOMPLETE'],
  DOCUMENT_REVIEW: ['INCOMPLETE', 'VERIFIED'],
  INCOMPLETE: ['DOCUMENT_REVIEW'],
  VERIFIED: ['ASSESSMENT_PENDING', 'DECISION_PENDING'],
  ASSESSMENT_PENDING: ['ASSESSED'],
  ASSESSED: ['DECISION_PENDING'],
  DECISION_PENDING: ['OFFERED', 'WAITLISTED', 'REJECTED'],
  OFFERED: [],
  WAITLISTED: ['DECISION_PENDING', 'REJECTED'],
  REJECTED: []
};

export const applicationStateMachine = new StateMachine(applicationTransitions);
