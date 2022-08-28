import { Condition } from './Condition.types';
import { VarChanges } from './VarChangeges.type';

export type Transition = {
  priority?: number;
  maxTransitions: number;
  //логическое условие
  // condition: Condition;

  target: number;
  text: string;

  // varChanges: VarChanges[];

  /*  isAvaible(): boolean;
  isVisible(): boolean; */
};
