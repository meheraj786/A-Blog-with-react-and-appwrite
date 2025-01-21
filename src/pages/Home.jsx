import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { BannerSection } from './BannerSection';
import { CardPlacehoderSkeleton } from './CardPlacehoderSkeleton';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                // Sort posts by date in descending order
                const sortedPosts = posts.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                setPosts(sortedPosts);
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <BannerSection />
                    <div className="flex flex-col lg:flex-row flex-wrap">
                        {/* Render multiple skeleton loaders to mimic post card layout */}
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="p-2 lg:w-1/4 w-full">
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
                <BannerSection />
                <div className='flex flex-col lg:flex-row flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 lg:mx-0 lg:w-1/4 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
