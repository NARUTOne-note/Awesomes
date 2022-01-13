import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './style/index.less';

export interface SpanEditProps {
  className?: string;
  useGlobal?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  renderEdit?: (toggle: any) => React.ReactNode
}

const SpanEdit: React.FC<SpanEditProps> = (props) => {
  const prefixCls = 'span-edit';
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const blur = () => {
      props.useGlobal && setEdit(false);
    };
    document.addEventListener('click', blur, true);
    return () => {
      document.removeEventListener('click', blur, true);
    };
  }, [props.useGlobal]);

  function toggle(e: any) {
    e.preventDefault();
    if (props.disabled) return;
    setEdit((ed) => !ed);
  }

  if (edit && !props.disabled) {
    return (
      <span className={`${prefixCls}-edit`}>
        {props.renderEdit ? props.renderEdit(toggle) : <Input style={{ minWidth: 100 }} value={props.value} onChange={props.onChange} onBlur={toggle}/>}
        {!props.useGlobal && <CheckOutlined className={`${prefixCls}-save`} onClick={toggle}/>}
      </span>
    );
  }

  return (
    <span className={`${prefixCls} ${props.className || ''}`} onClick={toggle}>
      {props.children}
    </span>
  );
};

SpanEdit.defaultProps = {
  useGlobal: false,
};

export default SpanEdit;
