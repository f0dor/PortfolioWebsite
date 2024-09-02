/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import React from 'react'

const skills = [
  { name: 'C/C++', level: 'Intermediate' },
  { name: 'OpenGL', level: 'Begginer' },
  { name: 'Unreal Engine', level: 'Beginner' },
  { name: 'PyTorch', level: 'Intermediate' },
  { name: 'ESP-IDF', level: 'Intermediate' },
  { name: 'FreeRTOS', level: 'Intermediate' },
  { name: 'JavaScript', level: 'Intermediate' },
  { name: 'TypeScript', level: 'Intermediate' },
  { name: 'React', level: 'Intermediate' },
  { name: 'Next.js', level: 'Intermediate' },
  { name: 'TailwindCSS', level: 'Intermediate' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Python', level: 'Intermediate' },
]

export default function Skills() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Skills
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {skills.map((skill) => (
              <div key={skill.name} className="p-4 md:w-1/3">
                <div className="h-full overflow-hidden rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{skill.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
