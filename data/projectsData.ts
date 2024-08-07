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
    title: 'Machine Learning for Early Rehospitalization Prediction',
    description: `Colleagues and I participated in an AI4HealthCRO competition, predicting early rehospitalizations using machine learning.
    We employed a classic neural network model, trained on anonymized hospital data, leveraging the PyTorch framework in Python to develop the solution.`,
    imgSrc: '/static/images/aihealth.jpg',
    href: '/blog/rehospitalizations',
  },
  {
    title: 'Real Estate Analytics',
    description: `In a Data Science project, real estate listings were scraped from Njuskalo.hr and analyzed to identify the most and least expensive cities, 
    the areas with the highest number of listings, and key factors influencing prices, such as the number of rooms, bathrooms, floors, and distance from the coast.`,
    imgSrc: '/static/images/realestate.jpg',
    href: '/blog/real-estate-analysis',
  },  
]

export default projectsData
