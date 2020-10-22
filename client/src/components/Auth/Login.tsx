import React from 'react';
import Form from './../ui/forms/Form';
import Input from './../ui/forms/Input';
import Header from './Header';
import Button from './../ui/Button';
import { Chevron, Mail, Lock } from '../../shared/icons';

const Login = () => {
  return (
    <main className="flex min-h-screen p-16">
      <div className="hidden lg:block lg:w-1/2 px-16 border border-gray-300 rounded-3xl">
        <p>Section 1</p>
      </div>
      <div className="w-full lg:w-1/2 px-16">
        <div className="flex flex-col h-full">
          <Header
            title="Login Now"
            description="Please enter your information below in order to login to your
            account."
          />
          <Form className="relative h-full">
            <Input
              label="Email Address"
              name="email_address"
              placeholder="Enter email"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <Mail className="h-8 w-8 text-black" />
              </span>
            </Input>
            <Input
              label="Password"
              name="password"
              action="Forgot Password?"
              placeholder="Enter password"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <Lock className="h-8 w-8 text-black" />
              </span>
            </Input>
            <div className="absolute bottom-0 inset-x-0">
              <div className="mb-6">
                <Button type="submit">
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                    <Chevron className="h-5 w-5 transform rotate-180" />
                  </span>
                  Login
                </Button>
              </div>
              <Button variant="primary">
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <Chevron className="h-5 w-5 transform rotate-180" />
                </span>
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
