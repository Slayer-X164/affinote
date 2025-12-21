"use client";

import React, { useEffect, useState } from 'react';
import './Flowers.css';

const Flowers: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Delay the animation start to ensure CSS is fully parsed by the browser
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent SSR rendering of the heavy animation divs to avoid mismatch
 // Change this line:
if (!mounted) return <div className="flower-container" style={{ background: 'transparent' }} />;

  const FlowerLeafs = () => (
    <>
      <div className="flower__leaf flower__leaf--1"></div>
      <div className="flower__leaf flower__leaf--2"></div>
      <div className="flower__leaf flower__leaf--3"></div>
      <div className="flower__leaf flower__leaf--4"></div>
      <div className="flower__white-circle"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
      ))}
    </>
  );

  return (
    <div className={`flower-container ${!isAnimating ? 'not-loaded' : ''}`}>
      <div className="night"></div>
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <FlowerLeafs />
          </div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <FlowerLeafs />
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <FlowerLeafs />
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Background Grass and Growing Elements */}
        <div className="grow-ans" style={{ '--d': '1.2s' } as any}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        {[1, 2].map((n) => (
          <div key={n} className="growing-grass">
            <div className={`flower__grass flower__grass--${n}`}>
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
              ))}
              <div className="flower__grass__overlay"></div>
            </div>
          </div>
        ))}

        <div className="grow-ans" style={{ '--d': '2.8s' } as any}>
          <div className="flower__g-front">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}>
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flowers;