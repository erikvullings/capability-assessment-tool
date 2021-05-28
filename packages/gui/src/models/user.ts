import { Answers } from './answer';
import { ILokiObj } from './loki-object';

export interface IUser extends ILokiObj {
  id: string;
  background: Answers;
  questionnaires: Answers[];
}
