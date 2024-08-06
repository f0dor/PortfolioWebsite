interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Time Measuring Device for Sports Activities',
    description: `This time measuring device uses an ESP32-C3 microcontroller and HC-SR04-P ultrasonic sensors to detect objects, 
    starting and stopping a timer at two different stations. BLE communication ensures synchronization between stations, making it ideal for accurately timing events like running.`,
    imgSrc: '/static/images/startline.jpg',
    href: '/blog/time-measuring-device',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
