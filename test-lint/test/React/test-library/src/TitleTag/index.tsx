import React from 'react';
import classnames from 'classnames';
import './style/index.less';

export enum modeEnum {
  Title = 'title',
  Tag = 'tag',
  Bar = 'bar',
}
export interface TitleTagProps {
  className?: string;
  mode?: modeEnum;
  color?: string;
  extra?: React.ReactNode;
}

const TitleTag: React.FC<TitleTagProps> = React.memo((props) => {
  const { className, children, mode, color, extra, ...others } = props;
  const prefixCls = 'title-tag';
  let style: React.CSSProperties | undefined;
  if (color) {
    style =
      mode === modeEnum.Tag
        ? {
            backgroundColor: color,
          } as React.CSSProperties
        : {
            borderColor: color,
          } as React.CSSProperties;
  }

  return (
    <h3 className={classnames(prefixCls, 'clear-float', className)} {...others}>
      <span className={`${prefixCls}-${mode || 'title'}`} style={style}>
        {children}
      </span>
      {extra ? <div className={`right ${prefixCls}-extra`}>{extra}</div> : null}
    </h3>
  );
});

export default TitleTag;
