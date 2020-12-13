import React from 'react';
import { ExampleStoryWrapper } from './ExampleStoryWrapper';

export default {
  title: 'Feature Flag/Example',
  component: ExampleStoryWrapper,
};

const Template = (args) => <ExampleStoryWrapper {...args} />;

export const Example = (args) => <ExampleStoryWrapper {...args} />;
