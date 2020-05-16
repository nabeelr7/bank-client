import React from 'react';
import { render } from '@testing-library/react';
import 'containers/RegisterPage/tests/__mocks__/matchMedia';
import { Form } from 'antd';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'locales';
import configureStore from 'configureStore';
import Currency from '../index';

describe('<Currency />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a information', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Form>
            <Currency />
          </Form>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
