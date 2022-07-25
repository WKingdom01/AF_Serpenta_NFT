import dynamic from 'next/dynamic';

import { gsap } from 'gsap';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slider = dynamic(() => import('react-slick'));

const Grid = ({ alt }) => {
  const imgs = [
    '/dragons/carousel/1.png',
    '/dragons/carousel/3.png',
    '/dragons/carousel/4.png',
    '/dragons/carousel/5.png',
    '/dragons/carousel/7.png',
    '/dragons/carousel/8.png',
    '/dragons/carousel/11.png',
  ];
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    // variableWidth: alt ? true : false,
    cssEase: 'linear',
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1027,
        settings: {
          slidesToShow: alt ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: alt ? 3 : 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {});
  return (
    <section
      className={`image-grid component component--no-padding ${
        alt ? 'image-grid--alt' : ''
      }`}
    >
      <Slider {...settings}>
        {imgs.map((image, j) => {
          return (
            <div className="slide" key={`image--${j}`}>
              <div className="image-grid__image image" key={j}>
                <div className="image__front">
                  <img alt="dragon" src={image} />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Grid;
