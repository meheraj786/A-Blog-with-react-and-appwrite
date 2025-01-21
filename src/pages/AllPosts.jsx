import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { CardPlacehoderSkeleton } from './CardPlacehoderSkeleton';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className='p-2 w-full lg:w-1/4'>
                                <CardPlacehoderSkeleton />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full lg:w-1/4'>
                            <PostCard className="" {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
