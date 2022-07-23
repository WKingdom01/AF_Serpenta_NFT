import React from "react";
import Image from "next/image";

import {swiperItems} from '/data/swiperItems'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import styles from "/styles/mint.module.scss";

const SwiperDragon = () => {
	return (
		<Swiper
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }}
        >
           {swiperItems.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className={styles.imgSlide}>
                        <Image src={item.src} alt={item.alt} />
                    </div>
                </SwiperSlide>
                ))} 
        </Swiper>
	);
};

export default SwiperDragon;
