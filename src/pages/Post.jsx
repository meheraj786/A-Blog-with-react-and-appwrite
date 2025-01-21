import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { CardPlacehoderSkeleton } from './CardPlacehoderSkeleton';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <section className="p-8">
                <div className="mx-auto max-w-screen-md">
                    <CardPlacehoderSkeleton />
                </div>
            </section>
        );
    }

    return post ? (
        <section className="p-8">
            <div className="mx-auto max-w-screen-md overflow-hidden"> {/* Added overflow-hidden class */}
                <div className="relative mb-4 h-[28rem] w-full rounded-xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="h-full w-full rounded-xl object-cover object-center"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <Typography variant="small" className="font-medium !text-gray-500">
                    #blog #post
                </Typography>
                <Typography variant="h2" color="blue-gray" className="my-4  font-black text-4xl !leading-snug">
                    {post.title}
                </Typography>
                <Typography className="font-normal dark:text-gray-400 break-words"> {/* Added break-words class */}
                    {parse(post.content)}
                </Typography>
            </div>
        </section>
    ) : null;
}
