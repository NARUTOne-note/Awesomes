import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import SpanEdit from '../index';

describe('test span-edit', () => {
  test('default test', () => {
    const fn = jest.fn();
    const Demo = ({ onChange }: any) => {
      const [v, setV] = useState('hello');
      const handleChange = (e: any) => {
        setV(e.target.value);
        onChange && onChange(e.target.value);
      };

      return <SpanEdit value={v} onChange={handleChange}>
        <span className="span-edit-child">{v}</span>
      </SpanEdit>;
    };
    const { baseElement } = render(<Demo onChange={fn}/>);

    // 通过data-testid的方式来获取元素
    const spanEdit = baseElement.getElementsByClassName('span-edit');
    const elChild = baseElement.getElementsByClassName('span-edit-child');
    const el = baseElement.getElementsByClassName('span-edit-edit');
    expect(elChild.length).toBe(1);
    expect(el.length).toBe(0);

    // 模拟事件
    fireEvent.click(spanEdit[0]);
    const input = baseElement.getElementsByTagName('input');
    const saveIcon = baseElement.getElementsByClassName('span-edit-save');
    expect(elChild.length).toBe(0);
    expect(el.length).toBe(1);
    expect(saveIcon.length).toBe(1);
    fireEvent.change(input[0], { target: { value: 'hello test' } });
    expect(fn).toBeCalledWith('hello test');

    // 保存
    fireEvent.click(saveIcon[0]);
    const elChild1 = baseElement.getElementsByClassName('span-edit-child');
    const el1 = baseElement.getElementsByClassName('span-edit-edit');
    expect(elChild1.length).toBe(1);
    expect(el1.length).toBe(0);
    expect(elChild1[0].textContent).toBe('hello test');
  });

  test('disabled test', () => {
    const { baseElement } = render(<SpanEdit disabled>hello</SpanEdit>);
    const spanEdit = baseElement.getElementsByClassName('span-edit');
    const el = baseElement.getElementsByClassName('span-edit-edit');
    fireEvent.click(spanEdit[0]);
    expect(el.length).toBe(0);
  });

  test('useGlobal test', () => {
    const { baseElement } = render(<SpanEdit useGlobal>hello</SpanEdit>);
    const spanEdit = baseElement.getElementsByClassName('span-edit');
    let el = baseElement.getElementsByClassName('span-edit-edit');
    fireEvent.click(spanEdit[0]);
    const saveIcon = baseElement.getElementsByClassName('span-edit-save');
    expect(el.length).toBe(1);
    expect(saveIcon.length).toBe(0);

    fireEvent.click(baseElement);
    el = baseElement.getElementsByClassName('span-edit-edit');
    expect(el.length).toBe(0);
  });

  test('custom redner test', () => {
    const fn = jest.fn();
    const Demo = ({ onChange }: any) => {
      const [v, setV] = useState('1');
      const handleChange = (e: any) => {
        setV(e.target.value);
        onChange && onChange(e.target.value);
      };

      return <SpanEdit renderEdit={
        () => <select className="custom-select" value={v} onChange={handleChange}>
          <option value="1">是</option>
          <option value="2">否</option>
        </select>
      }>
        <span className="span-edit-child">{v === '1' ? '是' : '否'}</span>
      </SpanEdit>;
    };
    const { baseElement } = render(<Demo onChange={fn}/>);

    // 通过data-testid的方式来获取元素
    const spanEdit = baseElement.getElementsByClassName('span-edit');
    let elChild = baseElement.getElementsByClassName('span-edit-child');
    let el = baseElement.getElementsByClassName('span-edit-edit');
    expect(elChild.length).toBe(1);
    expect(el.length).toBe(0);
    expect(elChild[0].textContent).toBe('是');

    // 模拟事件
    fireEvent.click(spanEdit[0]);
    let select = baseElement.getElementsByClassName('custom-select');
    const saveIcon = baseElement.getElementsByClassName('span-edit-save');
    elChild = baseElement.getElementsByClassName('span-edit-child');
    el = baseElement.getElementsByClassName('span-edit-edit');
    expect(elChild.length).toBe(0);
    expect(el.length).toBe(1);
    expect(saveIcon.length).toBe(1);
    fireEvent.change(select[0], { target: { value: '2' } });
    expect(fn).toBeCalledWith('2');

    // 保存
    fireEvent.click(saveIcon[0]);
    elChild = baseElement.getElementsByClassName('span-edit-child');
    el = baseElement.getElementsByClassName('span-edit-edit');
    select = baseElement.getElementsByClassName('custom-select');
    expect(elChild.length).toBe(1);
    expect(el.length).toBe(0);
    expect(select.length).toBe(0);
    expect(elChild[0].textContent).toBe('否');
  });
});
