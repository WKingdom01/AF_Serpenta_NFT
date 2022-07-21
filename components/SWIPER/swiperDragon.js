import React from "react";
import Image from "next/image";

import Img1 from "../../static/01.png";
import Img2 from "../../static/02.png";
import Img3 from "../../static/03.png";
import Img4 from "../../static/04.png";
import Img5 from "../../static/05.png";
import Img6 from "../../static/06.png";
import Img7 from "../../static/07.png";
import Img8 from "../../static/08.png";
import Img9 from "../../static/09.png";
import Img10 from "../../static/10.png";
import Img11 from "../../static/11.png";
import Img12 from "../../static/12.png";
import Img13 from "../../static/13.png";
import Img14 from "../../static/14.png";
import Img15 from "../../static/15.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import styles from "../../styles/mint.module.scss";

const SWIPERDRAGON = () => {
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
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img1} alt="Img1" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img2} alt="Img2" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img3} alt="Img3" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img4} alt="Img4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img5} alt="Img5" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img6} alt="Img6" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img7} alt="Img7" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img8} alt="Img8" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img9} alt="Img9" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img10} alt="Img10" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img11} alt="Img11" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img12} alt="Img12" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img13} alt="Img13" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img14} alt="Img14" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.imgSlide}>
                    <Image src={Img15} alt="Img15" />
                </div>
            </SwiperSlide>
        </Swiper>
	);
};

export default SWIPERDRAGON;
