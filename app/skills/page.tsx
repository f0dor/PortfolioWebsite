import React from 'react'

const Page: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Page</h1>
      <section>
        <h2>About Us</h2>
        <p>This is a basic page created using TypeScript and React.</p>
      </section>
      <section>
        <h2>Services</h2>
        <ul>
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>UI/UX Design</li>
        </ul>
      </section>
    </div>
  )
}

export default Page
