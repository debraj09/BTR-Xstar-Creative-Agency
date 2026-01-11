"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import VideoPopup from "../elements/VideoPopup";
// Slider imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Hero1() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "https://btr.braventra.in";

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${API_URL}/api/banners`);
                const result = await response.json();
                if (result.status === 200) {
                    setBanners(result.data);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    if (loading) return null;

    return (
        <>
            <section className="hero-section position-relative" style={{ overflow: 'hidden' ,marginTop:90}}>
                {banners.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect="fade"
                        speed={2000}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true }}
                        className="hero-slider"
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <div 
                                    className="hero-inner-wrapper" 
                                    style={{ 
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${API_URL}${banner.image_url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        minHeight: '100vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '80px'
                                    }}
                                >
                                    <div className="container">
                                        <div className="row g-5">
                                            <div className="hero-v1-content position-relative">
                                                <div className="d-flex align-items-sm-center align-items-end justify-content-between">
                                                    <h1 className="white-clr text-uppercase" style={{ fontWeight: 'bold' }}>
                                                        <span className="d-block" data-aos="zoom-in-left">
                                                            {banner.title}
                                                        </span>
                                                    </h1>
                                                    <VideoPopup style={1} />
                                                </div>

                                                <div className="mt-5" data-aos="fade-up">
                                                    <Link 
                                                        href="/contact" 
                                                        className="d-inline-flex align-items-center gap-3 touch-btn cmn-btn"
                                                        style={{ 
                                                            backgroundColor: '#e60000', 
                                                            color: '#000', 
                                                            fontWeight: 'bold',
                                                            border: 'none',
                                                            padding: '16px 32px',
                                                            borderRadius: '50px'
                                                        }}
                                                    >
                                                        <span className="rot60">
                                                            <i className="fas fa-arrow-up" style={{ color: '#000' }} />
                                                        </span>
                                                        LEARN MORE
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : null}

                {/* Fixed Stats Section - Kept as per your instruction */}
                {/* <div className="hero-expriencebox d-flex align-items-center" style={{ border: 'none', boxShadow: 'none' }}>
                    <div className="expri-content d-flex align-items-center gap-xxl-11 gap-xl-9 gap-lg-7 gap-6">
                        <div className="expri-cont-item">
                            <h6 className="white-clr mb-2">
                                12+
                            </h6>
                            <span className="yer spantext-clr">
                                years of experience
                            </span>
                        </div>
                        <div className="expri-cont-item">
                            <h6 className="white-clr mb-2">
                                25K+
                            </h6>
                            <span className="yer spantext-clr">
                                completed projects
                            </span>
                        </div>
                    </div>
                </div> */}
            </section>
        </>
    );
}