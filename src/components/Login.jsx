import React, { useState } from 'react';
import { Card, Button, Typography, Checkbox, Alert } from "@material-tailwind/react";
import authService from '../appwrite/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className="mx-auto w-full max-w-lg p-10">
        <div className="mb-2 flex justify-center translate-x-[-17%]">
          <span className="w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Log in to your account
        </Typography>
        <Typography variant="body1" color="gray" className="text-center mb-4">
          Don't have an account?&nbsp;
          <RouterLink to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign up
          </RouterLink>
        </Typography>
        {error && <Typography variant="body2" color="error" className="text-center mb-4">{error}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 mx-auto">
          <div className='mb-6 w-full flex flex-col gap-6 items-center'>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="w-full p-3"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                },
              })}
            />
            <div className="relative w-full">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                className="w-full p-3"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className="absolute top-10 right-1 "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="mt-6 p-3 bg-black" fullWidth>
            Log in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <RouterLink to="/signup" className="font-medium text-gray-900">
              Sign up
            </RouterLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;