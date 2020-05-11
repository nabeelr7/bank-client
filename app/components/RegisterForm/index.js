/**
 *
 * RegisterForm
 *
 */

import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Select, Form } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCurrenciesAction,
  changeInputAction,
  selectCurrencyAction,
  changeCheckboxAction,
  registerAction,
  checkEmailAction,
} from '../../containers/RegisterPage/actions';

import {
  StyledSteps,
  StyledStep,
  StyledFormWrapper,
  StyledForm,
  StyledFormItem,
  StyledFormActionsWrapper,
  StyledInformation,
  StyledButton,
} from './RegisterForm.style';
import makeSelectRegisterPage from '../../containers/RegisterPage/selectors';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const FirstName = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [isFirstName, setIsFirstName] = useState(false);

  useEffect(() => {
    setIsFirstName(true);
  }, [registerPage.firstName]);

  return (
    <StyledFormItem
      label="First name"
      name="firstName"
      rules={[
        {
          required: isFirstName,
          message: 'First name is required.',
        },
      ]}
    >
      <Input
        onChange={(event) => dispatch(changeInputAction(event.target))}
        name="firstName"
        value={registerPage.firstName}
        placeholder="Enter first name"
      />
    </StyledFormItem>
  );
};

const LastName = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  return (
    <StyledFormItem
      label="Last name"
      name="lastName"
      rules={[
        {
          required: true,
          message: 'Last name is required.',
        },
      ]}
    >
      <Input
        onChange={(event) => dispatch(changeInputAction(event.target))}
        name="lastName"
        value={registerPage.lastName}
        placeholder="Enter last name"
      />
    </StyledFormItem>
  );
};

const Password = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  // const asyncValidator = (rule, value, callback) => {
  //   if (value && value.length < 5) {
  //     callback('Password must have a minimum of 6 characters.');
  //   }
  // };

  return (
    <StyledFormItem
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Password is required.' }]}
    >
      <Input.Password
        onChange={(event) => dispatch(changeInputAction(event.target))}
        name="password"
        value={registerPage.password}
        placeholder="Enter password"
      />
    </StyledFormItem>
  );
};

const Currency = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  return (
    <StyledFormItem
      label="Currency"
      name="currency"
      rules={[{ required: true, message: 'Currency is required.' }]}
    >
      <Select
        loading={registerPage.isLoading}
        onClick={() =>
          registerPage.currencies.length === 0 &&
          dispatch(getCurrenciesAction())
        }
        onSelect={(currency) => dispatch(selectCurrencyAction(currency))}
        placeholder="Select currency"
      >
        {registerPage.currencies.length &&
          registerPage.currencies.map((currency) => (
            <Select.Option key={currency.uuid} value={currency.uuid}>
              {currency.name}
            </Select.Option>
          ))}

        {/* <Cascader options={registerPage.currencies} /> */}
      </Select>
    </StyledFormItem>
  );
};

const EmailAddress = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  return (
    <>
      <StyledFormItem
        label="E-Mail address"
        name="email"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'E-Mail address must be valid.',
          },
          {
            required: true,
            message: 'E-Mail address is required.',
          },
          {
            asyncValidator: (_, value) =>
              new Promise((resolve, reject) => {
                dispatch(checkEmailAction(value, reject, resolve));
              }),
          },
        ]}
      >
        <Input
          onChange={(event) => dispatch(changeInputAction(event.target))}
          name="email"
          value={registerPage.email}
          placeholder="Enter e-mail address"
        />
      </StyledFormItem>

      <StyledFormItem
        tail="true"
        name="confirm-personal-data"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox
          onChange={(event) =>
            dispatch(changeCheckboxAction(event.target.checked))
          }
        >
          You must agree to the processing of your personal data.
        </Checkbox>
      </StyledFormItem>

      <StyledInformation>
        Registration does not require confirmation by the email.
      </StyledInformation>
    </>
  );
};

const steps = [
  {
    title: 'First name',
    content: <FirstName />,
  },
  {
    title: 'Last name',
    content: <LastName />,
  },
  {
    title: 'Password',
    content: <Password />,
  },
  {
    title: 'Currency',
    content: <Currency />,
  },
  {
    title: 'E-Mail Address',
    content: <EmailAddress />,
  },
];

const stateSelector = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function RegisterForm() {
  const [current, setCurrent] = useState(0);
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.validateFields([
      'firstName',
      'lastName',
      'password',
      'currency',
      'email',
      'confirm-personal-data',
    ]);
  }, []);

  const onCheck = async () => {
    try {
      await form.validateFields();

      if (current === steps.length - 1) {
        dispatch(registerAction());
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledSteps current={current}>
        {steps.map((item) => (
          <StyledStep key={item.title} title={item.title} />
        ))}
      </StyledSteps>

      <StyledFormWrapper>
        <StyledForm form={form} layout="vertical" name="register">
          <div>{steps[current].content}</div>
        </StyledForm>

        <StyledFormActionsWrapper>
          {current < steps.length - 1 && (
            <StyledButton
              disabled={registerPage.isLoading}
              type="primary"
              onClick={onCheck}
            >
              Next <RightOutlined />
            </StyledButton>
          )}
          {current === steps.length - 1 && (
            <StyledButton
              disabled={registerPage.isLoading}
              type="primary"
              onClick={onCheck}
            >
              Create an account
            </StyledButton>
          )}
          {current > 0 && (
            <StyledButton
              disabled={registerPage.isLoading}
              type="link"
              back="true"
              onClick={() => setCurrent(current - 1)}
            >
              <LeftOutlined /> Back
            </StyledButton>
          )}
        </StyledFormActionsWrapper>
      </StyledFormWrapper>
    </>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
