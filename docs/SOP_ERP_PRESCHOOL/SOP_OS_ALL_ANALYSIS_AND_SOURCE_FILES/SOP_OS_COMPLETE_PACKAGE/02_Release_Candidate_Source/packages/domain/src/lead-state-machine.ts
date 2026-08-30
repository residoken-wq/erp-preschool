import type { LeadStatus } from '@sop-os/contracts';
import { StateMachine, type TransitionMap } from './state-machine.js';

const leadTransitions: TransitionMap<LeadStatus> = {
  NEW: ['ASSIGNED', 'DUPLICATE', 'DISQUALIFIED', 'ARCHIVED'],
  ASSIGNED: ['CONTACTED', 'DUPLICATE', 'DISQUALIFIED', 'LOST'],
  CONTACTED: ['QUALIFIED', 'NURTURING', 'DISQUALIFIED', 'LOST'],
  QUALIFIED: ['CONVERTED', 'NURTURING', 'LOST'],
  NURTURING: ['CONTACTED', 'QUALIFIED', 'LOST', 'ARCHIVED'],
  CONVERTED: ['ARCHIVED'],
  DISQUALIFIED: ['ARCHIVED'],
  LOST: ['CONTACTED', 'ARCHIVED'],
  DUPLICATE: ['ARCHIVED'],
  ARCHIVED: []
};

export const leadStateMachine = new StateMachine(leadTransitions);

