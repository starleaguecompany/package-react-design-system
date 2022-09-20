import * as React from 'react';

import { DialogProps } from './types/Dialog.types';
import Header from './src/Header';
import Footer from './src/Footer';
import Content from './src/Content';
import DialogRoot from './src/Dialog';

interface CompoundedComponent extends React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLElement>> {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
}

const Dialog = DialogRoot as CompoundedComponent;

Dialog.Header = Header;
Dialog.Footer = Footer;
Dialog.Content = Content;

export { Dialog, DialogProps };
