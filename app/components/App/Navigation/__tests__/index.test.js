import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'locales';
import Navigation from '../index';

describe('<Navigation />', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Navigation />
      </IntlProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
