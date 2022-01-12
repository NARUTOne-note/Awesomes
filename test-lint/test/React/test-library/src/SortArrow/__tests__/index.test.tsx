import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortArrow from '../index';

describe('test sort-arrow', () => {
  test('default test', () => {
    const fn = jest.fn();
    const Demo = ({ onChange }: any) => {
      const [v, setV] = useState(0);
      const handleChange = (index: number) => {
        setV(index);
        onChange && onChange(index);
      };
      return <SortArrow
        lText="l-text"
        rText="r-text"
        activeIndex={v}
        onChange={handleChange}
      />;
    };
    const { getByText, baseElement } = render(<Demo onChange={fn}/>);

    const sortArrow = baseElement.getElementsByClassName('sort-arrow');
    const iconSpan = baseElement.getElementsByClassName('i-span');
    const ltext = getByText('l-text');
    const rtext = getByText('r-text');
    expect(iconSpan.length).toBe(2);
    expect(iconSpan[0]).toHaveClass('active');
    expect(iconSpan[1]).not.toHaveClass('active');
    expect(ltext).toHaveClass('sort-arrow-title-l');
    expect(rtext).toHaveClass('sort-arrow-title-r');

    fireEvent.click(sortArrow[0]);
    expect(iconSpan[0]).not.toHaveClass('active');
    expect(iconSpan[1]).toHaveClass('active');
    expect(fn).toBeCalledWith(1);

    fireEvent.click(sortArrow[0]);
    expect(iconSpan[0]).toHaveClass('active');
    expect(iconSpan[1]).not.toHaveClass('active');
    expect(fn).toBeCalledWith(0);
  });

  test('mode change test', () => {
    const { baseElement, rerender } = render(<SortArrow mode="expand"/>);
    const sortArrow = baseElement.getElementsByClassName('sort-arrow');
    const iconSpan = baseElement.getElementsByClassName('i-span');
    expect(iconSpan.length).toBe(1);
    expect(iconSpan[0]).not.toHaveClass('expand-icon-down');

    fireEvent.click(sortArrow[0]);
    expect(iconSpan[0]).toHaveClass('expand-icon-down');

    rerender(<SortArrow mode="switch" activeIndex={0} icon={['0', '1']}/>);
    expect(iconSpan[0]).toHaveStyle({
      transform: 'rotate(0)',
    });
    expect(iconSpan[0].textContent).toBe('0');
    fireEvent.click(sortArrow[0]);
    expect(iconSpan[0]).toHaveStyle({
      transform: 'rotate(360deg)',
    });
    expect(iconSpan[0].textContent).toBe('1');
  });
});
