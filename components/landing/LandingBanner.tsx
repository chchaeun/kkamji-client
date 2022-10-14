import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Link from "next/link";

const bannerContents = [
  {
    image: "image/kkamji-banner-1.png",
    link: "/introduce",
  },
  {
    image: "image/kkamji-banner-2.png",
    link: "",
  },
  {
    image: "image/kkamji-banner-3.png",
    link: "",
  },
];
function LandingBanner() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
    >
      {bannerContents.map((bannerContent, index) => (
        <SwiperSlide key={index} className="cursor-pointer">
          <Link href={bannerContent.link}>
            <img src={bannerContent.image} className="object-cover h-full" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LandingBanner;
