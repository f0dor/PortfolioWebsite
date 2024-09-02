/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { fetchEntries } from '../lib/contentful'
import { Entry } from 'contentful'

export default async function Page() {
  const entries = await fetchEntries()
  const postsContentful = entries
    .filter((entry: Entry<any>) => entry.fields.mdxSource)
    .map((entry: Entry<any>) => entry.fields)
    .sort((a: any, b: any) => {
      return new Date(b.date).getDate() - new Date(a.date).getDate()
    })
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
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={postings} />
}
