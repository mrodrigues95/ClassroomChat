import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form, { FormValues } from '../ui/forms/Form';
import Input from '../ui/forms/Input';
import Header from './components/Header';
import Button from '../ui/Button';
import { MailIcon, LockIcon, IdentityIcon } from '../../shared/assets/icons';
import Carousel from './components/Carousel';
import { Messaging } from '../../shared/assets/illustrations';
import { AuthContext } from '../../shared/hooks/useAuth';
import Spinner from './../ui/Spinner';
import { RegistrationError } from '../../shared/constants/validation';

type ApiRegistrationErrors = {
  Name?: string[];
  Email?: string[];
  Password?: string[];
};

const Register = () => {
  const navigateTo = useNavigate();
  const { register } = useContext(AuthContext)!;
  const [isRegistering, setIsRegistering] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiRegistrationErrors>({});

  const handleOnSubmit = async (values: FormValues) => {
    setIsRegistering(true);

    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigateTo('/home');
    } catch (e) {
      setApiErrors(e.response.data.errors);
      setIsRegistering(false);
    }
  };

  return (
    <main className="flex min-h-screen xl:p-16">
      <div className="hidden xl:block xl:w-1/2 p-10 border border-gray-300 rounded-3xl">
        <Carousel
          caption="Message Your Classmates"
          description="Classroom Chat makes it easy to stay updated on the latest classroom information."
        >
          <Messaging className="w-8/12 mx-auto" />
        </Carousel>
      </div>
      <div className="w-full xl:w-1/2 p-4 md:p-10 xl:pr-0">
        <div className="flex flex-col h-full">
          <Header
            title="Sign Up Now"
            description="Please provide us with this information in order to create your account."
          />
          <Form className="relative h-full" onSubmit={handleOnSubmit}>
            <Input
              label="Name"
              name="name"
              placeholder="Enter name"
              validation={{ required: true }}
              error={
                apiErrors?.Name ? RegistrationError.INVALID_NAME : undefined
              }
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <IdentityIcon
                  className="h-8 w-8 text-black"
                  aria-hidden={true}
                />
              </span>
            </Input>
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter email"
              validation={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              error={
                apiErrors?.Email ? RegistrationError.INVALID_EMAIL : undefined
              }
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <MailIcon className="h-8 w-8 text-black" aria-hidden={true} />
              </span>
            </Input>
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter password"
              validation={{ required: true }}
              error={
                apiErrors?.Password
                  ? RegistrationError.INVALID_PASSWORD
                  : undefined
              }
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockIcon className="h-8 w-8 text-black" aria-hidden={true} />
              </span>
            </Input>
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              validation={{ required: true }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockIcon className="h-8 w-8 text-black" aria-hidden={true} />
              </span>
            </Input>
            <div className="absolute bottom-0 inset-x-0">
              <Button type="submit" disabled={isRegistering}>
                {isRegistering ? (
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
      </div>
    </main>
  );
};

export default Register;
