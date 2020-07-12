/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { intlShape, injectIntl } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import Header from 'components/Header';
import Subheader from 'components/Subheader';
import RegisterForm from 'components/RegisterForm';
import RedirectToggle from 'components/RedirectToggle';
import Footer from 'components/Footer';
import Information from 'components/Information';
import { routes } from 'utils';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ConstantCookie from '../../components/ConstantCookie';

const key = 'registerPage';
function RegisterPage({ intl }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.registration)}</title>
        <meta
          name="description"
          content={intl.formatMessage(messages.description)}
        />
      </Helmet>

      <Header />
      <Subheader pageTitle={routes.register.name} />

      <Information />

      <RegisterForm />

      <RedirectToggle />
      <Footer />

      <ConstantCookie />
    </>
  );
}

RegisterPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RegisterPage);
