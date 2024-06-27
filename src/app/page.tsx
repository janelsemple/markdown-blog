import React from 'react';
import PostList from './components/PostList';
import { fetchAllPostInfo } from '../lib/graphql-service';
import SearchBar from './components/SearchBar';

const Home = async () => {
    const posts = await fetchAllPostInfo();

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
            <div className="flex justify-center mb-4">
                <SearchBar query='' />
            </div>
            <PostList posts={posts} highlighted={''} />
        </div>
    );
};

export default Home;
