/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { fetchEntries } from '../../lib/contentful'
import { Entry } from 'contentful'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const entries = await fetchEntries()
  const posts = entries.filter((entry: Entry<any>) => entry.fields.project).map((entry: Entry<any>) => entry.fields)

  function isImageField(image: any): image is { fields: { file: { url: string } } } {
    return (
      image &&
      typeof image === 'object' &&
      'fields' in image &&
      image.fields &&
      image.fields.file &&
      typeof image.fields.file.url === 'string'
    )
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {posts.map((d, index) => (
              <Card
                key={entries[index].sys.id} // Use a unique identifier from the entry
                title={d.title}
                description={d.description}
                imgSrc={isImageField(d.image) ? `https:${d.image.fields.file.url}` : ''} // Ensure the image URL is correctly formed
                href={d.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
