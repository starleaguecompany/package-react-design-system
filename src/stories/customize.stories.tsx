import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Source } from '@storybook/addon-docs'

import { Typography } from '..'

const { Heading } = Typography

export default {
  title: 'Foundations/Customize Theme',
  parameters: {
    componentSubtitle:
      'Design system allows you to customize our design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc (e.g. color pallet for lager theme)',
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta

export const Customize: Story = () => (
  <React.Fragment>
    <Heading level={4}>Design system Theme CSS variables:</Heading>
    <Source
      language="css"
      code={`
--font-open-sans: "Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
--font-aeroport: "Aeroport",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";

--color-L100: #FFF;
--color-background: #FFF;

--color-D100: #171D23;
--color-D80: #002A3A;
--color-D60: #636F7D;
--color-D30: #99A1AB;
--color-D20: #B3BAC3;
--color-D10: #F5F5F5;
--color-D06: #F6F5F4;

--color-G300: #11693F;
--color-G200: #0F9D44;
--color-G100: #0DD149;
--color-G30: #C3F4D3;
--color-G06: #EEFCF2;

--color-B300: #002A3A;
--color-B200: #0685C3;
--color-B100: #00AFFF;
--color-B30: #B6E6FC;
--color-B06: #F0FAFF;

--color-O300: #725122;
--color-O200: #B97311;
--color-O100: #FF9500;
--color-O30: #FFE1B8;
--color-O06: #FFF9F0;

--color-V300: #2C3278;
--color-V200: #3E3DA7;
--color-V100: #5047D7;
--color-V30: #CBC9F3;
--color-V06: #F3F2FC;

--color-R300: #59212D;
--color-R200: #8D1F25;
--color-R100: #C11D1D;
--color-R30: #F4BEBE;
--color-R06: #FDF2F2;
      `}
    />
  </React.Fragment>
)
Customize.storyName = 'Customize Theme'
