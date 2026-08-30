export class InvalidTransitionError<TState extends string> extends Error {
  constructor(from: TState, to: TState) {
    super(`Transition ${from} -> ${to} is not allowed`);
    this.name = 'InvalidTransitionError';
  }
}

export type TransitionMap<TState extends string> = Readonly<Record<TState, readonly TState[]>>;

export class StateMachine<TState extends string> {
  constructor(private readonly transitions: TransitionMap<TState>) {}

  canTransition(from: TState, to: TState): boolean {
    return this.transitions[from].includes(to);
  }

  transition(from: TState, to: TState): TState {
    if (!this.canTransition(from, to)) throw new InvalidTransitionError(from, to);
    return to;
  }

  allowedFrom(from: TState): readonly TState[] {
    return this.transitions[from];
  }
}

