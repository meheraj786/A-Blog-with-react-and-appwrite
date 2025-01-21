import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

function PostCard({ $id, title, $createdAt, featuredImage }) {
  const formattedDate = new Date($createdAt).toLocaleDateString();
  return (
    <Link to={`/post/${$id}`} className="block">
      <Card className="mt-6 dark:bg-[#16161a] w-[80vw] h-[450px] lg:w-full lg:h-[450px] shadow-xl">
        <CardHeader color="blue-gray" className="relative rounded-t-lg h-56">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-full rounded-t-lg w-full object-cover object-center"
          />
          
        </CardHeader>
        <p className='absolute left-0 shadow-lg bg-[rgba(255,255,255,0.65)] dark:bg-gray-700 p-1 rounded-lg'>{formattedDate}</p>
        <CardBody className="p-5">
          <Typography variant="h5" color="blue-gray" className="mb-2 mt-4 font-bold">
            {title}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex flex-col items-start p-5 text-left">
          <Link to={`/post/${$id}`}>
            <Button className="bg-black dark:bg-[#303a69] mb-1 p-3">Read More</Button>
          </Link>
          
        </CardFooter>
      </Card>
    </Link>
  );
}

export default PostCard;