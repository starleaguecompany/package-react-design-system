import * as React from 'react';
import { Omit } from '@starleaguecompany/package-react-utils';

export interface UploaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** The uploader description */
  description?: string;
  /** The drag and drop zone description */
  dragZoneDescription?: string;
  /** The uploader button caption */
  buttonCaption?: string;
  /** Specify a function that will be called when a drag event fired */
  onDragOver?: (event: React.DragEvent) => void;
  /** Specify a function that will be called when a cursor in drag zone */
  onDragEnter?: (event: React.DragEvent) => void;
  /** Specify a function that will be called when a cursor left the drag zone */
  onDragLeave?: (event: React.DragEvent) => void;
  /** Specify a function that will be called when a user drop a file */
  onDrop?: (event: React.DragEvent) => void;
  /** Specify a function that will be called when file uploads */
  onFilesUpload?: (files: File[]) => void;
}

export interface UploaderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The File to be displayed */
  file: File;
  /** An error message */
  errorMessage?: string;
  /** The percent of file uploading progress */
  progressPercent?: number;
  /** Specify a function that will be called when file is removed */
  onRemove?: (file: File) => void;
}
