import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Uploader } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Uploader } from '${reactDSImportPath}'
// Import types
import { UploaderProps } from '${reactDSImportPath}/lib/Uploader'
\`\`\``;

export default {
  title: 'Components/Uploader',
  component: Uploader,
  subcomponents: {
    Item: Uploader.Item,
  },
  parameters: {
    componentSubtitle: 'Upload file',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFilesUpload = React.useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  return (
    <React.Fragment>
      <Uploader
        title="Документы для кредита"
        description="Здесь можно указать подробное описание"
        onFilesUpload={handleFilesUpload}
        multiple
      >
        {files.map((file, index) => (
          <Uploader.Item
            key={index}
            file={file}
            progressPercent={index === 0 ? 100 : undefined}
            errorMessage={index === 2 ? 'Файл не загружен, выберите файл до 10 Мб' : ''}
          />
        ))}
      </Uploader>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
