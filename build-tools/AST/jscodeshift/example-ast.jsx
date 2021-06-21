import * as React from 'react';
import styles from './index.module.scss';
import { Button } from "antd";


const Button = () => {
  return (
    <div>
      <h2>转译后</h2>
      <div>
        <Button type="default">Normal</Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>
        

        <Button type="link" >Normal</Button>
        <Button type="link" >Primary</Button>
        <Button type="link" >Secondary</Button>
        

        <Button type="default" danger>Normal</Button>
      </div>
    </div>
  );
};

export default Button;
