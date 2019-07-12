import * as React from 'react';
import {tuple} from '@/utils/TS/type';
import './index.scss';

const DocLineTypes = tuple('text', 'warn', 'error');
export type DocLineType = (typeof DocLineTypes)[number];

export interface DocLineProps {
  type?: DocLineType;
  children?: React.ReactNode;
}

function DocLine (props: DocLineProps):JSX.Element {
  const {type, children} = props;
  const classNames = `doc-line doc-${type || 'text'}`;
  return (
    <div className={classNames}>{children}</div>
  );
}

export default DocLine;