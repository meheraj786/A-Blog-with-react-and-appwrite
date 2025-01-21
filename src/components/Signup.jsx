import React, { useState } from 'react';
import { Card, Button, Typography, Checkbox, Alert } from "@material-tailwind/react";
import authService from '../appwrite/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <Card color="transparent" shadow={false} className="mx-auto w-full max-w-lg p-10">
        <div className="mb-2 flex justify-center translate-x-[-17%]">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Sign up to create account
        </Typography>
        <Typography variant="body1" color="gray" className="text-center mb-4">
          Already have an account?&nbsp;
          <RouterLink to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Log in
          </RouterLink>
        </Typography>
        {error && <Typography variant="body2" color="error" className="text-center mb-4">{error}</Typography>}
        <form onSubmit={handleSubmit(create)} className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 mx-auto">
          <div className='mb-6 w-full flex flex-col gap-6 items-center'>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="w-full p-3"
              {...register("name", { required: true })}
            />
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
                className="w-full relative p-3"
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
          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-normal">
                I agree to the
                <a href="#" className="font-medium transition-colors hover:text-gray-900">&nbsp;Terms and Conditions</a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Button type="submit" className="mt-6 p-3 bg-black" fullWidth disabled={!isChecked}>
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <RouterLink to="/login" className="font-medium text-gray-900">
              Log in
            </RouterLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Signup;