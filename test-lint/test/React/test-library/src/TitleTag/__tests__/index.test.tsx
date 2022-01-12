import React from 'react';
import { render } from '@testing-library/react';
import TitleTag, { modeEnum } from '../index';

describe('test title-tag', () => {
  test('default test', () => {
    const { getByText, rerender, baseElement } = render(<TitleTag className="test-class" color="#e4393c">标题</TitleTag>);

    const modeSpan = getByText('标题');
    const h3Span = baseElement.getElementsByClassName('title-tag');
    const extras = baseElement.getElementsByClassName('title-tag-extra');

    expect(extras.length).toBe(0);
    expect(modeSpan).toHaveClass('title-tag-title');
    expect(h3Span[0]).toHaveClass('test-class');
    expect(modeSpan).toHaveStyle({
      'border-color': '#e4393c',
    });

    rerender(<TitleTag mode={modeEnum.Tag} color="#14fa87">标题</TitleTag>);

    expect(modeSpan).toHaveClass('title-tag-tag');
    expect(modeSpan).toHaveStyle({
      'background-color': '#14fa87',
    });
  });

  test('test extra', () => {
    const { getByText } = render(<TitleTag extra="extra-text">标题</TitleTag>);
    const extraSpan = getByText('extra-text');
    expect(extraSpan).toHaveClass('title-tag-extra');
  });
});
