import React, { useState, useEffect } from 'react'
import { getRecentPosts, getSimilarPosts } from '@/services';
import Link from 'next/link';
import moment from 'moment';


const PostWidget = ({ categories, slug }) => {

    const [relatedPosts, setRelatedPosts] = useState([]);
    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        }
        else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug])

    console.log(relatedPosts)

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mt-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? "संबंधित पोस्ट" : "नवीन पोस्ट"}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className='flex items-center w-full mb-4'>
                    <div className='w-16 flex-none'>
                        <img
                            alt={post.title}
                            height='60px'
                            width='60px'
                            className='align-middle rounded-full'
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <Link href={`/post/${post.slug}`} className="text-md" key={post.title}>{post.title}</Link>
                        <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default PostWidget