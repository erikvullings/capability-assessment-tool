import { Answer } from './answer';

export interface IQuestionnaire {
  /** Optional title of the section */
  title?: string;
  /** Optional description, in markdown */
  description?: string;
  sections: ISection[];
  timestamp: number;
  answers: Record<string, Answer>;
}

export interface ISection {
  /** Optional title of the section */
  title?: string;
  /** Optional description, in markdown */
  description?: string;
  /** Background questions, will be only asked once, and are required */
  background?: boolean;
  /** List of questions */
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  label: string;
  show?: string | string[];
  /** Optional description, in markdown */
  description?: string;
  type: string;
  options?: IOption[];
  min?: number;
  max?: number;
  ratings?: RatingLabel;
  disabled?: boolean | string;
}

/** Provide an optional label for the ratings */
export type RatingLabel = { [key: string]: string };

export interface IOption {
  id: string;
  label: string;
  selected?: IQuestion;
}
