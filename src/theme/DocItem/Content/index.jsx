import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocActions from '@site/src/components/DocActions';

export default function DocContent(props) {
  const {metadata} = useDoc();
  return <><DocActions key={metadata.permalink}/><Content {...props}/></>;
}
