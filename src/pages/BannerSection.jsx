import React, {useState, useEffect} from 'react';
import BannerAnimation from '../components/Animation/BannerAnimation'; 
import authService from '../appwrite/auth';// Import the new component

export function BannerSection() {
  const [user, setUser] = useState("");

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const userMethod = () => {
    if (user) {
      return user.name;
    } else {
      return "Guest, Please signup or login to read our post";
    }
  }

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

  return (
    <div className="banner-section h-[25rem]  text-white relative rounded-xl overflow-hidden">
      <BannerAnimation />
      <div className="banner-content absolute w-[80%] bottom-5 left-[50%] translate-x-[-50%] rounded-xl shadow-lg py-4 ">
        <h1 className='text-lg'>Welcome <span className='font-bold'>{userMethod()}</span> <br /> to Our Blog</h1>
        <p className='text-sm'>Your amazing content goes here.</p>
        <p className='text-xs'>{currentDate}</p>
      </div>
    </div>
  );
}