import Image from 'next/image'
import Head from 'next/head'
import { PostWidget, PostCard, Categories } from '../components';
import { getPosts } from '@/services';
import FeaturedPosts from '@/sections/FeaturedPosts';


export default function Home({ posts }) {
  return (
    <main>
      <div className="container mx-auto px-10 mb-8 bg-gray-300">
        <Head>
          <title>देसी मैनेजर</title>
          <link rel="icon" href="/favicon.ico" />

        </Head>
        {/* <FeaturedPosts /> */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8 '>
              <PostWidget />
              <Categories />


            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
