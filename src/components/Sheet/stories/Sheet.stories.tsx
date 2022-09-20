import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { useBoolean } from '@starleaguecompany/package-react-utils';

import { Button } from '../../Button';

import { Sheet } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Sheet } from '${reactDSImportPath}'
// Import types
import { SheetProps } from '${reactDSImportPath}/lib/Sheet'
\`\`\``;

export default {
  title: 'Components/Sheet',
  component: Sheet,
  subcomponents: {
    Header: Sheet.Header,
    Content: Sheet.Content,
    Footer: Sheet.Footer,
  },
  parameters: {
    componentSubtitle: '',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [visible, setVisible] = useBoolean(false);
  const footer = React.useMemo(() => {
    return (
      <Button variant="primary" color="blue" onClick={setVisible.off}>
        Ясно
      </Button>
    );
  }, [visible]);

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Sheet</Button>
      <Sheet visible={visible} onClose={setVisible.off}>
        <Sheet.Header title="Заголовок" />
        <Sheet.Content>Очень длинный текст, может быть в две или даже три строки</Sheet.Content>
        <Sheet.Footer>{footer}</Sheet.Footer>
      </Sheet>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Fullscreen: Story = () => {
  const [visible, setVisible] = useBoolean(false);
  const footer = React.useMemo(() => {
    return (
      <Button variant="primary" color="blue" onClick={setVisible.off}>
        Ясно
      </Button>
    );
  }, [visible]);

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Sheet</Button>
      <Sheet visible={visible} closable fullscreen onClose={setVisible.off}>
        <Sheet.Header title="Заголовок" />
        <Sheet.Content>Очень длинный текст, может быть в две или даже три строки</Sheet.Content>
        <Sheet.Footer>{footer}</Sheet.Footer>
      </Sheet>
    </React.Fragment>
  );
};

export const Closable: Story = () => {
  const [visible, setVisible] = useBoolean(false);
  const footer = React.useMemo(() => {
    return (
      <Button variant="primary" color="blue" onClick={setVisible.off}>
        Ясно
      </Button>
    );
  }, [visible]);

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Sheet</Button>
      <Sheet visible={visible} closable onClose={setVisible.off}>
        <Sheet.Header title="Заголовок" />
        <Sheet.Content>Очень длинный текст, может быть в две или даже три строки</Sheet.Content>
        <Sheet.Footer>{footer}</Sheet.Footer>
      </Sheet>
    </React.Fragment>
  );
};
