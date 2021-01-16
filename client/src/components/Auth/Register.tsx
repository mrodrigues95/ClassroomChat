import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form, { FormValues } from '../ui/forms/Form';
import FormInput from '../ui/forms/FormInput';
import AuthHeader from './components/AuthHeader';
import Button from '../ui/Button';
import { MailIcon, LockIcon, IdentityIcon } from '../../shared/assets/icons';
import Carousel from './components/Carousel';
import { Messaging } from '../../shared/assets/illustrations';
import { AuthContext } from '../../shared/hooks/auth/useAuth';
import Spinner from './../ui/Spinner';
import {
  RegistrationError,
  FormError,
} from '../../shared/constants/validation';

type ApiRegistrationErrors = {
  Name?: string[];
  Email?: string[];
  Password?: string[];
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext)!;
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiRegistrationErrors>({});

  const handleOnSubmit = async (values: FormValues) => {
    setWaitingForResponse(true);

    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate('/home');
    } catch (e) {
      setApiErrors(e.response.data.errors);
      setWaitingForResponse(false);
    }
  };

  return (
    <main className="flex flex-1 w-full">
      <section className="hidden xl:block xl:w-1/2 p-10 border border-gray-300 rounded-3xl">
        <Carousel
          caption="Message Your Classmates"
          description="Classroom Chat makes it easy to stay updated on the latest classroom information."
        >
          <Messaging className="w-8/12 mx-auto" />
        </Carousel>
      </section>
      <section className="w-full xl:w-1/2 p-3 md:p-10 xl:pr-0">
        <div className="flex flex-col h-full">
          <AuthHeader
            title="Sign Up Now"
            description="Please provide us with this information in order to create your account."
          />
          <Form className="relative h-full" onSubmit={handleOnSubmit}>
            <FormInput
              label="Name"
              name="name"
              placeholder="Enter name"
              validation={{ required: true }}
              error={apiErrors.Name ? FormError.FIELD_REQUIRED : undefined}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <IdentityIcon className="h-8 w-8 text-black" />
              </span>
            </FormInput>
            <FormInput
              label="Email Address"
              name="email"
              placeholder="Enter email"
              validation={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              error={
                apiErrors.Email
                  ? apiErrors.Email.includes('Email already exists.')
                    ? RegistrationError.EMAIL_ALREADY_EXISTS
                    : RegistrationError.INVALID_EMAIL
                  : undefined
              }
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <MailIcon className="h-8 w-8 text-black" />
              </span>
            </FormInput>
            <FormInput
              type="password"
              label="Password"
              name="password"
              placeholder="Enter password"
              validation={{ required: true }}
              error={
                apiErrors.Password
                  ? RegistrationError.INVALID_PASSWORD
                  : undefined
              }
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockIcon className="h-8 w-8 text-black" />
              </span>
            </FormInput>
            <div className="absolute bottom-0 inset-x-0">
              <Button className="p-4" type="submit" disabled={waitingForResponse} fullWidth>
                {waitingForResponse ? (
                  <>
                    <Spinner>Creating your account...</Spinner>
                  </>
                ) : (
                  <>Create Account</>
                )}
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Register;
