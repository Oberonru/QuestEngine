import { Condition } from './Condition.types';

export type VarChanges = {
  condition: Condition;
  assign: {
    percent: number;
    value: number;
    formula: string;
    delta: number;
  };
};
