import React from 'react';
import Provider from '@theme-original/Layout/Provider';
import PineAssistant from '../../../components/PineAssistant';

export default function LayoutProvider({children}) {
  return <Provider>{children}<PineAssistant/></Provider>;
}
