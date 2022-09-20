import * as React from 'react';

import { AccordionProps } from './types/Accordion.types';
import AccordionRoot from './src/Accordion';
import AccordionItem from './src/AccordionItem';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLElement>> {
  Item: typeof AccordionItem;
}

const Accordion = AccordionRoot as CompoundedComponent;
Accordion.Item = AccordionItem;

export { Accordion, AccordionProps };
