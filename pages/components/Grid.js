import dynamic from 'next/dynamic'

import { gsap } from 'gsap';
import { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slider = dynamic(() => import("react-slick"));

const Grid = () => {
    const imgs = ['/01.png', '/02.png', '/03.png', '/04.png', '/05.png', '/06.png', '/07.png', '/08.png', '/09.png', '/10.png', '/11.png', '/12.png', '/13.png', '/14.png', '/15.png']
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
        responsive: [
            {
                breakpoint: 1027,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 2560,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }

        ]

    };
    useEffect(() => {
        function createImage(image) {
            var frontCard = image.querySelector(".image__front"),
                backCard = image.querySelector(".image__back"),
                tl2 = new gsap.timeline({
                    paused: true, onComplete() {
                        var frontCard = image.querySelector(".image__front img");
                        frontCard.src = imgs[Math.floor(Math.random() * imgs.length)];

                        //  setTimeout(()=> image.animation.reverse(), 2000)
                        image.reverse = true;

                    },
                    onReverseComplete() {

                        var backCard = image.querySelector(".image__back img");
                        backCard.src = imgs[Math.floor(Math.random() * imgs.length)];
                        //  setTimeout(()=> image.animation.play(), 2000)
                        image.reverse = false;
                    }

                });

            tl2
                .to(frontCard, 1, { rotationY: 180 })
                .to(backCard, 1, { rotationY: 0 }, 0)
                .to(image, .5, { z: 50 }, 0)
                .to(image, .5, { z: 0 }, .5)

            image.animation = tl2;

        }

        function rotateImages() {
            var images = document.querySelectorAll(".image-grid__image");
            var image = images[Math.floor(Math.random() * imgs.length)]
            if (image.reverse) {
                image.animation.reverse()

            } else {
                image.animation.play()
            }


        }

        function rotateImage() {

            var image = document.querySelector('.main-image')

            if (image.reverse) {
                image.animation.reverse()
            } else {
                image.animation.play()
            }


        }

        function desktop() {
            const tl = new gsap.timeline()
            // tl.fromTo('.main-image', 1, {y: -1000}, {y:0, ease: "Bounce.easeOut"} )
            // tl.to('.main-image', 1, {opacity:0, scale: 0}, "+=1")
            tl.to('.image-grid', 1, { opacity: 1 }, "-=1")
            var images = document.querySelectorAll(".image-grid__image");

            images.forEach(image => {

                createImage(image)


            });

            setInterval(rotateImages, 3000);

            // document.querySelectorAll(".image-grid__image").addEventListener('mouseover', elOver)
            // elOut);



        }

        function mobile() {
            createImage(document.querySelector('.main-image'))
            setInterval(rotateImage, 3000);
        }


    })
    return (
        <section className="image-grid component component--no-padding">
            <Slider {...settings}>
                {imgs.map((image, j) => {

                    return <div className="slide" key={`image--${j}`}>
                        <div className="image-grid__image image" key={j}>
                            <div className="image__front">
                                <img

                                    alt="dragon"
                                    src={image}
                                />
                            </div>
                        </div>
                    </div>
                })}
            </Slider>

        </section>
    )
}

export default Grid