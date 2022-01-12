import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  VerticalRightOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';
import './style/index.less';

export interface SortArrowProps {
  lText?: React.ReactNode;
  rText?: React.ReactNode;
  mode?: string,
  activeIndex?: Number,
  defaultIndex?: Number,
  onChange?: (index: number) => void,
  icon?: React.ReactNode[];
}

const SortArrow: React.FC<SortArrowProps> = (props) => {
  const { lText, rText, mode, icon } = props;
  const prefixCls = 'sort-arrow';
  const icons = icon || [];
  const [currentActiveIndex, setIndex] = useState(props.defaultIndex);

  useEffect(() => {
    setIndex(props.activeIndex);
  }, [props.activeIndex]);

  const handleChange = () => {
    setIndex(dx => {
      const index = !dx ? 1 : 0;
      props.onChange && props.onChange(index);
      return index;
    });
  };

  let content = (
    <>
      <span className={classnames('i-span', { active: !currentActiveIndex })}>
        {icons[0] || <CaretUpOutlined />}
      </span>
      <span className={classnames('i-span', { active: currentActiveIndex })}>
        {icons[1] || <CaretDownOutlined />}
      </span>
    </>
  );

  if (mode === 'expand') {
    content = (
      <span
        className={classnames('i-span expand-icon active', {
          'expand-icon-down': currentActiveIndex,
        })}
      >
        {icons[0] || <CaretUpOutlined />}
      </span>
    );
  } else if (mode === 'switch') {
    content = (
      <span
        className="i-span active expand-icon"
        style={{
          transform:
            currentActiveIndex === 0 ? 'rotate(0)' : 'rotate(360deg)',
        }}
      >
        {currentActiveIndex === 0
          ? icons[0] || <VerticalRightOutlined />
          : icons[1] || <VerticalLeftOutlined />}
      </span>
    );
  }

  return (
    <div className={prefixCls} onClick={handleChange}>
      {lText ? <span className={`${prefixCls}-title-l`}>{lText}</span> : null}
      <span className={`${prefixCls}-icons`}>{content}</span>
      {rText ? <span className={`${prefixCls}-title-r`}>{rText}</span> : null}
    </div>
  );
};

SortArrow.defaultProps = {
  mode: 'sort', // sort|expand|switch
  defaultIndex: 0,
  icon: [],
};

export default SortArrow;
