import { Condition } from './Condition.types';
import { Transition } from './Transition.types';
import { Var } from './Var.types';

export type Scene = {
  id: number;
  description?: string;
  image?: string;
  type: string;
  transitions: Transition[];
  //condition?: Condition;

  //это мое добавление
  //variables: Var[];
};
