import React, { useEffect } from 'react';
import { Button, Form } from 'antd';
import { StyledForm, StyledFormItem } from 'components/Form/Form.style';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsOpenedModal,
  makeSelectCurrency,
} from 'containers/DashboardPage/selectors';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyToggle from 'components/CurrencyToggle';
import {
  createNewBillAction,
  toggleModalAction,
} from 'containers/DashboardPage/actions';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectIsLoading } from 'providers/LoadingProvider/selectors';
import { getRequestName } from 'helpers';
import { CREATE_NEW_BILL_REQUEST } from 'containers/DashboardPage/constants';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { StyledModal } from './Modal.style';
import messages from './messages';

const stateSelector = createStructuredSelector({
  currency: makeSelectCurrency(),
  isOpenedModal: makeSelectIsOpenedModal(),
  isLoading: makeSelectIsLoading(getRequestName(CREATE_NEW_BILL_REQUEST)),
});

function Modal({ intl }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { currency, isOpenedModal, isLoading } = useSelector(stateSelector);

  useEffect(() => {
    form.validateFields(['currency']);
  }, []);

  const toggleModal = () => dispatch(toggleModalAction());
  const createNewBill = () => dispatch(createNewBillAction());

  const checkCurrencySelected = () => {
    if (currency) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error(intl.formatMessage(messages.currencyRequired)),
    );
  };

  const onValidateFields = async () => {
    try {
      await form.validateFields();
      createNewBill();
      toggleModal();
    } catch (error) {
      Error(error);
    }
  };

  return (
    <StyledModal
      title={intl.formatMessage(messages.title)}
      visible={isOpenedModal}
      onOk={onValidateFields}
      onCancel={toggleModal}
      centered
      footer={[
        <Button key="back" onClick={toggleModal}>
          <FormattedMessage {...messages.cancel} />
        </Button>,
        <Button
          key="submit"
          disabled={isLoading}
          type="primary"
          onClick={onValidateFields}
        >
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <FormattedMessage {...messages.create} />
          )}
        </Button>,
      ]}
    >
      <>
        <p>
          <FormattedMessage {...messages.descriptionTop} />
        </p>

        <StyledForm form={form} name="create-new-bill">
          <StyledFormItem
            tailed="true"
            name="currency"
            rules={[{ validator: checkCurrencySelected }]}
          >
            <CurrencyToggle />
          </StyledFormItem>
        </StyledForm>

        <p>
          <FormattedMessage {...messages.descriptionBottom} />
        </p>
      </>
    </StyledModal>
  );
}

Modal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Modal);
