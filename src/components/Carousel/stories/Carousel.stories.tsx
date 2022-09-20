import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Carousel } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Carousel } from '${reactDSImportPath}'
// Import types
import { CarouselProps } from '${reactDSImportPath}/lib/Carousel'
\`\`\``;

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    componentSubtitle: 'A carousel component',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const title = 'Title';

const images = [
  {
    title: 'Nature Image1',
    url: 'https://images.unsplash.com/photo-1610047803562-7260ebe516cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Nature Image2',
    url: 'https://images.unsplash.com/photo-1610047803124-64ddfad66909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=651&q=80',
  },
  {
    title: 'Nature Image3',
    url: 'https://images.unsplash.com/photo-1609952048180-7b35ea6b083b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Nature Image4',
    url: 'https://images.unsplash.com/photo-1608241175281-722a1c6111be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    title: 'Nature Image5',
    url: 'https://images.unsplash.com/photo-1523288863878-c79329df9b88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1386&q=80',
  },
];

export const Basic: Story = () => {
  const slideStyle: React.CSSProperties = {
    width: '300px',
    height: '100%',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: 'var(--color-B100)',
    borderRadius: '20px',
  };

  return (
    <div>
      <Carousel title={title} gradient>
        {Array.from(new Array(5)).map((_, key) => (
          <div key={key} style={slideStyle}>
            {key + 1}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const WithGradient: Story = () => {
  const slideStyle: React.CSSProperties = {
    width: '300px',
    height: '100%',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: 'var(--color-D06)',
    borderRadius: '20px',
  };

  return (
    <div>
      <Carousel title={title} gradient>
        {Array.from(new Array(5)).map((_, key) => (
          <div key={key} style={slideStyle}>
            {key + 1}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export const WithImages: Story = () => {
  const slideStyle: React.CSSProperties = {
    width: '300px',
    height: '100%',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: 'var(--color-B100)',
    borderRadius: '20px',
  };

  return (
    <div>
      <Carousel title={title} gradient>
        {images.map(({ url, title }, index) => (
          <img src={url} key={index} alt={title} style={slideStyle} />
        ))}
      </Carousel>
    </div>
  );
};
