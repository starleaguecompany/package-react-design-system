import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Row, Col } from '..';
import { ColProps } from '../types/Col.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Grid } from '${reactDSImportPath}'
// Import types
import { GridProps } from '${reactDSImportPath}/lib/Grid'
\`\`\``;

export default {
  title: 'Components/Grid',
  subcomponents: {
    Row,
    Col,
  },
  parameters: {
    componentSubtitle: 'Grids System. Divided the design area into 12 sections',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const rows = new Array(12).fill('col');

const ColContent = (props: { span: number }) => {
  const { span } = props;

  return (
    <div style={{ background: 'var(--color-D06)', textAlign: 'center', height: '60px', lineHeight: '60px' }}>
      col-{span}
    </div>
  );
};

export const Basic: Story = () => (
  <React.Fragment>
    <Row gutter={[20, 20]}>
      {rows.map((_i, col) => {
        return (
          <Col key={col} span={1}>
            <ColContent span={1} />
          </Col>
        );
      })}
    </Row>

    <Row gutter={[20, 20]}>
      <Col span={3}>
        <ColContent span={3} />
      </Col>
      <Col span={3}>
        <ColContent span={3} />
      </Col>
      <Col span={3}>
        <ColContent span={3} />
      </Col>
      <Col span={3}>
        <ColContent span={3} />
      </Col>
    </Row>

    <Row gutter={[20, 20]}>
      <Col span={4}>
        <ColContent span={4} />
      </Col>
      <Col span={4}>
        <ColContent span={4} />
      </Col>
      <Col span={4}>
        <ColContent span={4} />
      </Col>
    </Row>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const WithBreakPoints: Story = () => {
  const breakpoints = React.useMemo<ColProps['breakpoints']>(() => ({ mobile: { span: 12 }, tablet: { span: 6 } }), []);

  return (
    <React.Fragment>
      <Row gutter={[20, 20]}>
        <Col span={4} breakpoints={breakpoints}>
          <ColContent span={4} />
        </Col>
        <Col span={4} breakpoints={breakpoints}>
          <ColContent span={4} />
        </Col>
        <Col span={4} breakpoints={breakpoints}>
          <ColContent span={4} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
