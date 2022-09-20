import { FieldProps } from '../../../types/Field.types';

export type TextareaProps = FieldProps<HTMLTextAreaElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /** The property allows resizing textarea */
    resizable?: boolean;
  };
