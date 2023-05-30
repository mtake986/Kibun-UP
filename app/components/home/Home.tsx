import React from 'react'
import Event from './Event/Event'
import Quote from './Quote/Quote'

const Home = () => {
  return (
    <div className="container mx-auto max-w-2xl">
      <Quote />
      <Event />
    </div>
  );
}

export default Home