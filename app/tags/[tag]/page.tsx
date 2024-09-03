/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { fetchEntries } from '../../../lib/contentful'
import { Entry } from 'contentful'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default async function TagPage({ params }: { params: { tag: string } }) {
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
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = postings.filter(
    (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <ListLayout posts={filteredPosts} title={title} />
}
