/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent, CoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { fetchEntries } from '../../../lib/contentful'
import { Entry } from 'contentful'

import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'


const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const entries = await fetchEntries()
  const posts = entries.filter((entry: Entry<any>) => entry.fields.mdxSource)
    .map((entry: Entry<any>) => entry.fields)
    .sort((a: any, b: any) => {
      return (new Date(b.date).getDate() - new Date(a.date).getDate())
    })
  const slug = decodeURI(params.slug.join('/'))

  const postContentfulIndex = posts.findIndex((p) => p.link === "/blog/" + slug)
  if (postContentfulIndex === -1) {
    return notFound()
  }
  const prevContentful = { path: (posts[postContentfulIndex + 1]?.link as string)?.slice(1) as string, title: posts[postContentfulIndex + 1]?.title as string }
  const nextContentful = { path: (posts[postContentfulIndex - 1]?.link as string)?.slice(1) as string, title: posts[postContentfulIndex - 1]?.title as string }
  const postFromSlug = posts.find((p) => p.link === "/blog/" + slug) ?? { mdxSource: '' }
  const authorContentful = postFromSlug.author

  //this can be added to replace the default author, for now it is hard coded
  const authors = entries.filter((entry: Entry<any>) => entry.fields.name)
  const authorThisPost = authors.find((author: Entry<any>) => author.fields.name === authorContentful)


  const authorList = ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })

  let code
  const value = postFromSlug.mdxSource
  if (typeof value === 'string') {
    code = String(await compile(value, { outputFormat: 'function-body', remarkPlugins: [remarkGfm] }))
  }

  const { default: MDXContent } = await run(code, {...runtime, baseUrl: import.meta.url})

  const Layout = layouts[defaultLayout]
  return (
    <>
      <Layout path={postFromSlug.link?.toString()?.slice(1) as string}
        date={postFromSlug.date?.toString() as string}
        title={postFromSlug.title?.toString() as string}
        tags={postFromSlug.tags as string[]}
        authorDetails={authorDetails}
        next={nextContentful}
        prev={prevContentful}>
        <MDXContent components={components} />
      </Layout>
    </>
  )
}
