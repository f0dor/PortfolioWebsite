/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */


import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import { fetchEntries } from '../../../../lib/contentful'
import { Entry } from 'contentful'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
  const entries = await fetchEntries()
  const postsContentful = entries
    .filter((entry: Entry<any>) => entry.fields.mdxSource)
    .map((entry: Entry<any>) => entry.fields)
    .sort((a: any, b: any) => {
      return new Date(b.date).getDate() - new Date(a.date).getDate()
    })
  const pageNumber = parseInt(params.page as string)
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsContentful.length / POSTS_PER_PAGE),
  }
  const postings: {
    path: string
    date: string
    title: string
    summary: string
    tags: string[]
  }[] = []
  postsContentful.map((post) => {
    const posting = {
      path: (post.link as string)?.slice(1),
      date: post.date as string,
      title: post.title as string,
      summary: post.description as string,
      tags: post.tags as string[],
    }
    postings.push(posting)
  })
  const initialDisplayPosts = postings
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(
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
