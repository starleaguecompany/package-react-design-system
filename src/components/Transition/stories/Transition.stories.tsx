import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { useBoolean } from '@starleaguecompany/package-react-utils';

import { Text } from '../../Typography';
import { Button } from '../../Button';

import { Fade, ScaleFade, SlideFade, Collapse } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Transition } from '${reactDSImportPath}/lib/Transition'

const { Fade } = Transition
\`\`\``;

export default {
  title: 'Components/Transition',
  subcomponents: {
    Fade,
    ScaleFade,
    SlideFade,
    Collapse,
  },
  parameters: {
    componentSubtitle:
      'Design System exports four components Fade, ScaleFade, SlideFade, and Collapse to provide simple transitions.',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const content = (
  <div style={{ maxWidth: 600 }}>
    <Text className="h-mb-20">
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
    <Text className="h-mb-20">
      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
    </Text>
    <Text>
      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
      esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
    </Text>
  </div>
);

export const FadeTransition: Story = () => {
  const [visible, setVisible] = useBoolean(false);

  return (
    <React.Fragment>
      <Button onClick={setVisible.toggle}>{visible ? 'Hide' : 'Show'}</Button>
      <Fade visible={visible} unmountOnExit>
        {content}
      </Fade>
    </React.Fragment>
  );
};
FadeTransition.parameters = {
  docs: {
    storyDescription: 'Fade transition',
  },
};

export const ScaleFadeTransition: Story = () => {
  const [visible, setVisible] = useBoolean(false);

  return (
    <React.Fragment>
      <Button onClick={setVisible.toggle}>{visible ? 'Hide' : 'Show'}</Button>
      <ScaleFade visible={visible} unmountOnExit>
        {content}
      </ScaleFade>
    </React.Fragment>
  );
};
ScaleFadeTransition.parameters = {
  docs: {
    storyDescription: 'Scale Fade transition',
  },
};

export const SlideFadeTransition: Story = () => {
  const [visible, setVisible] = useBoolean(false);

  return (
    <React.Fragment>
      <Button onClick={setVisible.toggle}>{visible ? 'Hide' : 'Show'}</Button>
      <SlideFade visible={visible} unmountOnExit>
        {content}
      </SlideFade>
    </React.Fragment>
  );
};
SlideFadeTransition.parameters = {
  docs: {
    storyDescription: 'Slide Fade transition',
  },
};

export const CollapseTransition: Story = () => {
  const [visible, setVisible] = useBoolean(false);

  return (
    <React.Fragment>
      <Button onClick={setVisible.toggle}>{visible ? 'Hide' : 'Show'}</Button>
      <Collapse visible={visible} unmountOnExit>
        {content}
      </Collapse>
    </React.Fragment>
  );
};
CollapseTransition.parameters = {
  docs: {
    storyDescription: 'Collapse transition',
  },
};
