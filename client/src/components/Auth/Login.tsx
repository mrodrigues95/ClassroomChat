import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, { FormValues } from './../ui/forms/Form';
import Input from './../ui/forms/Input';
import Header from './components/Header';
import Button from './../ui/Button';
import Carousel from './components/Carousel';
import { ChevronIcon, MailIcon, LockIcon } from '../../shared/assets/icons';
import { Collaboration } from '../../shared/assets/illustrations';
import { AuthContext } from '../../shared/hooks/useAuth';
import { LoginError } from '../../shared/constants/validation';
import Spinner from '../ui/Spinner';

const Login = () => {
  const navigateTo = useNavigate();
  const { login } = useContext(AuthContext)!;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [onLoginFailed, setOnLoginFailed] = useState(false);

  const handleOnSubmit = async (values: FormValues) => {
    setIsLoggingIn(true);
    setOnLoginFailed(false);

    try {
      await login(values.email, values.password);
      navigateTo('/home');
    } catch (e) {
      setIsLoggingIn(false);
      setOnLoginFailed(true);
    }
  };

  return (
    <main className="flex min-h-screen xl:p-16">
      <div className="hidden xl:block xl:w-1/2 p-10 border border-gray-300 rounded-3xl">
        <Carousel
          caption="Connect With Classmates"
          description="You can easily connect with classmates using our messaging platform."
        >
          <Collaboration className="w-8/12 mx-auto" />
        </Carousel>
      </div>
      <div className="w-full xl:w-1/2 p-4 md:p-10 xl:pr-0">
        <div className="flex flex-col h-full">
          <Header
            title="Login Now"
            description="Please enter your information below in order to login to your
            account."
          />
          <Form className="relative h-full" onSubmit={handleOnSubmit}>
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter email"
              validation={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              error={onLoginFailed ? LoginError.INVALID_LOGIN : undefined}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <MailIcon className="h-8 w-8 text-black" aria-hidden={true} />
              </span>
            </Input>
            <Input
              type="password"
              label="Password"
              altLabel="Forgot Password?"
              name="password"
              placeholder="Enter password"
              validation={{ required: true }}
              error={onLoginFailed ? LoginError.INVALID_LOGIN : undefined}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockIcon className="h-8 w-8 text-black" aria-hidden={true} />
              </span>
            </Input>
            <div className="absolute bottom-0 inset-x-0">
              <div className="mb-2 sm:mb-6">
                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <Spinner>Logging in...</Spinner>
                  ) : (
                    <>
                      <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                        <ChevronIcon className="h-5 w-5 transform rotate-180" />
                      </span>
                      Login
                    </>
                  )}
                </Button>
              </div>
              <Link
                to="/auth/register"
                className="relative inline-flex items-center justify-center w-full p-4 rounded-2xl font-bold focus:outline-none transition duration-150 ease-in-out
                  border border-gray-300 bg-white text-black hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:border-gray-500"
              >
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ChevronIcon
                    className="h-5 w-5 transform rotate-180"
                    aria-hidden={true}
                  />
                </span>
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
