import React from 'react';
import Form from './../ui/forms/Form';
import Input from './../ui/forms/Input';
import AuthHeader from './AuthHeader';
import Button from './../ui/Button';

const Login = () => {
  return (
    <main className="flex min-h-screen p-16">
      <div className="w-1/2 px-16 border border-gray-200 rounded-3xl">
        <p>Section 1</p>
      </div>
      <div className="w-1/2 px-16">
        <div className="flex flex-col h-full">
          <AuthHeader
            title="Login Now"
            description="Please enter your information below in order to login to your
            account."
          />
          <Form className="relative h-full">
            <Input label="Email Address" name="emailAddress" />
            <Input label="Password" name="password" action="Forgot Password?" />
            <div className="absolute bottom-0 inset-x-0">
              <div className="mb-6">
                <Button type="submit">Login</Button>
              </div>
              <Button>Sign Up</Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
