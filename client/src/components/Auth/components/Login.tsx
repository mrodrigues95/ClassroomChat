import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, { FormValues } from './../../ui/forms/Form';
import FormInput from '../../ui/forms/FormInput';
import AuthHeader from './../components/AuthHeader';
import Button from './../../ui/Button';
import Carousel from './../components/Carousel';
import { ChevronIcon, MailIcon, LockIcon } from '../../../shared/assets/icons';
import { CollaborationIllustration } from '../../../shared/assets/illustrations';
import { AuthContext } from '../../../shared/hooks/auth/useAuth';
import { LoginError } from '../../ui/forms/constants/validation';
import Spinner from '../../ui/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [onLoginFailed, setOnLoginFailed] = useState(false);

  const handleOnSubmit = async (values: FormValues) => {
    setWaitingForResponse(true);
    setOnLoginFailed(false);

    try {
      await login(values.email, values.password);
      navigate('/home');
    } catch (e) {
      setWaitingForResponse(false);
      setOnLoginFailed(true);
    }
  };

  return (
    <main className="flex flex-1 w-full xl:p-10">
      <section className="hidden xl:block xl:w-1/2 p-10 border border-gray-300 rounded-3xl">
        <Carousel
          caption="Connect With Classmates"
          description="You can easily connect with classmates using our messaging platform."
        >
          <CollaborationIllustration className="w-8/12 mx-auto" />
        </Carousel>
      </section>
      <section className="w-full xl:w-1/2 p-3 md:p-10 xl:pr-0">
        <div className="flex flex-col h-full">
          <AuthHeader
            title="Login Now"
            description="Please enter your information below in order to login to your
            account."
          />
          <Form className="relative h-full" onSubmit={handleOnSubmit}>
            <FormInput
              label="Email Address"
              name="email"
              placeholder="Enter email"
              validation={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              error={onLoginFailed ? LoginError.INVALID_LOGIN : undefined}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <MailIcon className="h-8 w-8 text-black" />
              </span>
            </FormInput>
            <FormInput
              type="password"
              label="Password"
              altLabel="Forgot Password?"
              name="password"
              placeholder="Enter password"
              validation={{ required: true }}
              error={onLoginFailed ? LoginError.INVALID_LOGIN : undefined}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockIcon className="h-8 w-8 text-black" />
              </span>
            </FormInput>
            <div className="absolute bottom-0 inset-x-0">
              <div className="mb-2 sm:mb-6">
                <Button
                  className="font-bold rounded-xl md:text-xl"
                  type="submit"
                  disabled={waitingForResponse}
                  fullWidth
                  style={{ padding: '1rem' }}
                >
                  {waitingForResponse ? (
                    <Spinner className="h-5 w-5 mr-2 text-white">
                      Logging in...
                    </Spinner>
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
                className="relative inline-flex items-center justify-center w-full p-4 rounded-xl font-bold focus:outline-none transition duration-150 ease-in-out
                  border border-gray-300 bg-white text-black hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:border-gray-500 md:text-xl"
              >
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ChevronIcon className="h-5 w-5 transform rotate-180" />
                </span>
                Register
              </Link>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Login;
