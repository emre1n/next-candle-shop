import React from 'react';

function Hero() {
  return (
    <div className="hero min-h-screen hero-background">
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            Awaken Your Emotions with Unique Candles
          </h1>
          <p className="mb-5">
            Embrace the Warm Glow of Uniquely Crafted Memories
          </p>
          <button className="btn btn-primary">Make your candle</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
