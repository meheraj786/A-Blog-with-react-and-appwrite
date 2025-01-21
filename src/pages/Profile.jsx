import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { CardPlacehoderSkeleton } from './CardPlacehoderSkeleton';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
// import ProfileHeader from '../../public'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUserInfo();
        setUser(currentUser);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      const response = await service.uploadProfilePicture(file);
      console.log('File uploaded successfully:', response);
      // Update user profile with the new picture URL if needed
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  if (!user) {
    return <CardPlacehoderSkeleton/>;
  }

  return (
    <section className="container mx-auto px-8 py-10">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        <CardHeader shadow={false} className="h-60 !rounded-lg object-cover ">
          <img
            src="../../public/ProfileHeader.jpg"
            alt="dark"
            className="w-full h-full lg:w-full object-cover object-center"
            
          />
        </CardHeader>
        <CardBody>
          <div className="flex p-5 lg:gap-0  gap-6 flex-wrap justify-center items-center">
            <div className="flex items-center gap-3">
              
              <div className=''>
                <Typography color="blue-gray" variant="h1" className='text-2xl dark:text-black mb-4 font-bold'>
                  {user.name}
                </Typography>
                <Typography variant="small" className="font-normal text-gray-600">
                  {user.email}
                </Typography>
              </div>
            </div>
            
          </div>
          <Typography variant="small" className="font-normal text-gray-600 mt-6">
            
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
};

export default Profile;
