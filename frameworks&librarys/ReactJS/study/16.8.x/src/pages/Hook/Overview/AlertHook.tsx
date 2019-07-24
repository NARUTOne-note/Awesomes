import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import {tuple} from '@/utils/TS/type';

const AlertTypes = tuple('success', 'info', 'error', 'warning');
export type AlertType = (typeof AlertTypes)[number];

export interface AlertHookProps {
  title: string,
  type?: AlertType
}

function useAlertHook(props: AlertHookProps) {
  const [msg, setMsg] = useState('');
  const {title} = props;

  useEffect(() => {
    setMsg(title);
    return () => {
      setMsg('');
    }
  }, [title]);

  return (
    <Alert type={props.type || 'info'} message={msg}></Alert>
  );
}

export default useAlertHook;
