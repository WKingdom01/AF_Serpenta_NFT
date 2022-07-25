import dynamic from 'next/dynamic';

import { gsap } from 'gsap';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slider = dynamic(() => import('react-slick'));

const BlockGrid = ({ reverse }) => {
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
    cssEase: 'linear',
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: reverse,
    responsive: [
      {
        breakpoint: 1027,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="block-grid component component--no-padding">
      <Slider {...settings}>
        {imgs.map((image, j) => {
          return (
            <div className="slide" key={`image--${j}`}>
              <div className="block-grid__image image" key={j}>
                <div className="block-grid__container">
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

export default BlockGrid;
