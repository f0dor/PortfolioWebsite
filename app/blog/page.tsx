import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { fetchEntries } from '../../lib/contentful'
import { Entry } from 'contentful'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const entries = await fetchEntries()
  const postsContentful = entries.filter((entry: Entry<any>) => entry.fields.mdxSource)
    .map((entry: Entry<any>) => entry.fields)
    .sort((a: any, b: any) => {
      return (new Date(b.date).getDate() - new Date(a.date).getDate())
    })
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsContentful.length / POSTS_PER_PAGE),
  }
  const postings: {
    path: string;
    date: string;
    title: string;
    summary: string;
    tags: string[];
  }[] = [];
  postsContentful.map((post) => {
    let posting = {
      path: post.link as string,
      date: post.date as string,
      title: post.title as string,
      summary: post.description as string,
      tags: post.tags as string[],
    }
    postings.push(posting)
  })
  const initialDisplayPosts = postings.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  return (
    <ListLayout
      posts={postings}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
