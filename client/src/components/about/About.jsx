import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'

const About = () => {
  const selectedUser = useSelector(selectUser)
  return (
    <div className='about-container'>
      <div className="image"></div>
      <div className="content">
        <h1 className=''>
          Welcome to TravelBlog
        </h1>
        <p>
          At TravelBlog, we're passionate about exploration, discovery, and sharing our adventures with fellow wanderers. Whether you're a seasoned globetrotter or an armchair traveler dreaming of far-off destinations, our blog is your passport to the world.
        </p>
        <h4>Our Story</h4>
        <p>
          Founded by Pranjal Gain, a seasoned traveler with a thirst for adventure, TravelBlog was born out of a desire to inspire others to embark on their own journeys of discovery. What started as a personal travel journal has blossomed into a vibrant community of like-minded explorers, all united by a love for travel and a curiosity about the world.
        </p>
        <h4>What We Do</h4>
        <p>
          Through vivid storytelling, stunning photography, and insightful travel tips, we strive to bring the beauty and wonder of travel to life. From remote villages tucked away in the mountains to bustling metropolises teeming with life, we share our firsthand experiences, hidden gems, and insider secrets to help you plan your next unforgettable adventure.

        </p>
        <h4>Meet Our Team</h4>
        <p>
          Our team of passionate writers, photographers, and travel enthusiasts hail from all corners of the globe, each bringing their unique perspectives and expertise to the table. From solo backpackers to luxury travelers, digital nomads to family adventurers, we've got you covered no matter what kind of traveler you are.

        </p>
        <h4>Join Our Journey</h4>
        <p>
          So whether you're seeking inspiration for your next trip, practical travel advice, or simply a good story to whisk you away to distant lands, you've come to the right place. Join us as we explore the world one destination at a time, and let the adventure begin!

        </p>
      </div>
    </div>
  )
}

export default About
