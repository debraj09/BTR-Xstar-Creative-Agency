'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { Tilt } from 'react-tilt'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 30,
    speed: 1500,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".cmn-prev",
        prevEl: ".cmn-next",
    },

    breakpoints: {
        1199: {
            slidesPerView: 1,
        },
    },
}

const toltOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1.01,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
}
export default function About() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="About Agency">
                <div style={{ backgroundColor: '#000000' }}>
                    <section className="pt-space pb-space">
                        <div className="container">
                            <div className="row g-6 justify-content-between">
                                <div className="col-lg-6 pe-lg-14">
                                    <div className="d-flex gap-xxl-7 gap-xl-5 gap-4 position-relative z-index-1">
                                        <div className="about-small-thumb w-100" data-aos="zoom-in" data-aos-duration={1500}>
                                            <img src="/assets/img/about/btrabout.png" alt="BTR Marketing Agency Team" style={{height:200,width:500}} />
                                        </div>
                                        <div className="about-small-thumb w-100 mt-xxl-10 mt-xl-7 mt-lg-5 mt-3" data-aos="zoom-in" data-aos-duration={1800}>
                                        </div>
                                        <img src="/assets/img/element/darkredbtr.png" alt="arrow" className="about-tumb-arrow" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-samll-content">
                                        <div className="pricing-title">
                                            <div className="radius-btn text-uppercase border-white d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 text-white gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5" 
                                                  style={{borderColor: '#E60000', color: '#E60000'}} 
                                                  data-aos="zoom-in-left" data-aos-duration={1400}>
                                                ABOUT BTR MARKETING
                                            </div>
                                            <h2 className="stitle d-flex align-items-center mb-xxl-8 mb-xl-7 mb-lg-6 mb-5 gap-xxl-7 gap-xl-5 gap-3 text-white" data-aos="zoom-in-left" data-aos-duration={1700}>
                                                <img src="/assets/img/about/darkredbtr.png" alt="arrow" style={{height:120,width:150}} />
                                                Full-Service Digital Marketing Solutions
                                            </h2>
                                            <p className="text-white mb-xxl-8 mb-xl-8 mb-5" data-aos="zoom-in-up" data-aos-duration={1400}>
                                                In today's fast-paced world, it is crucial for businesses to have a strong online presence. BTR Marketing Agency understands the importance of digital marketing and provides top-notch services to help businesses grow and succeed in the digital space.
                                            </p>
                                            <div className="result-progress-wrap" data-aos="zoom-in-up" data-aos-duration={1800}>
                                                <div className="progres-item mb-xxl-6 mb-xl-5 mb-4">
                                                    <div className="d-flex align-items-center justify-content-between mb-xxl-4 mb-3">
                                                        <span className="conssub text-white">
                                                            Digital Marketing Expertise
                                                        </span>
                                                        <span className="cons" style={{color: '#E60000'}}>95%</span>
                                                    </div>
                                                    <div className="progress-solving" style={{backgroundColor: '#333333'}}>
                                                        <div className="progress-bar" style={{width: '95%', backgroundColor: '#E60000'}} />
                                                    </div>
                                                </div>
                                                <div className="progres-item">
                                                    <div className="d-flex align-items-center justify-content-between mb-xxl-4 mb-3">
                                                        <span className="conssub text-white">
                                                            Client Satisfaction
                                                        </span>
                                                        <span className="cons" style={{color: '#E60000'}}>98%</span>
                                                    </div>
                                                    <div className="progress-solving" style={{backgroundColor: '#333333'}}>
                                                        <div className="progress-bar" style={{width: '98%', backgroundColor: '#E60000'}} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Services Section Start */}
                    <section className="pt-space pb-space">
                        <div className="team-staft-slidewrap pb-space">
                            <div className="digital-marketing mb-lg-0 mb-10">
                                <div className="comm">
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex justify-content-center serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            01
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">Search Engine Optimization</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab1.png" alt="SEO Services" />
                                        </span>
                                    </div>
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            02
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">Social Media Marketing</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab2.png" alt="Social Media Marketing" />
                                        </span>
                                    </div>
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            03
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">PPC Advertising</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab3.png" alt="PPC Advertising" />
                                        </span>
                                    </div>
                                </div>
                                <div className="comm">
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex justify-content-center serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            04
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">Content Marketing</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab4.png" alt="Content Marketing" />
                                        </span>
                                    </div>
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            05
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">Web Design & Development</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab1.png" alt="Web Design" />
                                        </span>
                                    </div>
                                    <div className="cmn-textslide d-grid position-relative">
                                        <span className="d-flex serial-badge align-items-center gap-4 border-white radius100 text-white">
                                            06
                                            <span className="rot60 d-inline-block" style={{color: '#E60000'}}>
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </span>
                                        <span className="text-white">Digital Strategy</span>
                                        <span className="digital-thumb">
                                            <img src="/assets/img/service/tab3.png" alt="Digital Strategy" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Who We Are Section */}
                        <div className="container mt-xxl-15 mt-xl-12 mt-lg-10 mt-8">
                            <div className="row g-6 justify-content-between align-items-center">
                                <div className="col-lg-6">
                                    <div className="pricing-title">
                                        <div className="radius-btn text-uppercase border-white d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 text-white gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5" 
                                              style={{borderColor: '#E60000', color: '#E60000'}}>
                                            Who We Are
                                        </div>
                                        <h2 className="stitle mb-xxl-8 mb-xl-6 mb-5 text-white">
                                            BTR Marketing Agency
                                        </h2>
                                        <p className="text-white mb-xxl-8 mb-xl-8 mb-5">
                                            We are a full-service digital marketing agency that specializes in providing comprehensive marketing solutions to businesses of all sizes. Our team of experts has years of experience in the digital marketing industry, and we use that experience to create customized strategies for our clients.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="about-small-thumb w-100" data-aos="zoom-in" data-aos-duration={1500}>
                                        <img src="/assets/img/about/aboutmain.png" alt="BTR Team Collaboration" className="w-100 radius-10" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Why Choose Us Section */}
                            <div className="row g-6 justify-content-between align-items-center mt-xxl-15 mt-xl-12 mt-lg-10 mt-8">
                                <div className="col-lg-5 order-lg-1 order-2">
                                    <div className="about-small-thumb w-100" data-aos="zoom-in" data-aos-duration={1500}>
                                        <img src="/assets/img/about/btraboutlogo.png" alt="BTR Results Focus" className="w-100 radius-10" />
                                    </div>
                                </div>
                                <div className="col-lg-6 order-lg-2 order-1">
                                    <div className="pricing-title">
                                        <div className="radius-btn text-uppercase border-white d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 text-white gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5" 
                                              style={{borderColor: '#E60000', color: '#E60000'}}>
                                            Why Choose Us
                                        </div>
                                        <h2 className="stitle mb-xxl-8 mb-xl-6 mb-5 text-white">
                                            What Sets Us Apart
                                        </h2>
                                        <div className="why-choose-list">
                                            <div className="d-flex align-items-start gap-4 mb-xxl-6 mb-xl-5 mb-4">
                                                <div className="icon-box d-center radius100" style={{backgroundColor: '#333333'}}>
                                                    <i className="fa-solid fa-chart-line" style={{color: '#E60000'}} />
                                                </div>
                                                <div>
                                                    <h5 className="text-white mb-2">Experience</h5>
                                                    <p className="text-white mb-0" style={{opacity: '0.8'}}>Our team has years of experience working with businesses across various industries.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-4 mb-xxl-6 mb-xl-5 mb-4">
                                                <div className="icon-box d-center radius100" style={{backgroundColor: '#333333'}}>
                                                    <i className="fa-solid fa-cogs" style={{color: '#E60000'}} />
                                                </div>
                                                <div>
                                                    <h5 className="text-white mb-2">Customization</h5>
                                                    <p className="text-white mb-0" style={{opacity: '0.8'}}>We create tailored strategies for each client's unique needs and goals.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-4 mb-xxl-6 mb-xl-5 mb-4">
                                                <div className="icon-box d-center radius100" style={{backgroundColor: '#333333'}}>
                                                    <i className="fa-solid fa-eye" style={{color: '#E60000'}} />
                                                </div>
                                                <div>
                                                    <h5 className="text-white mb-2">Transparency</h5>
                                                    <p className="text-white mb-0" style={{opacity: '0.8'}}>Regular reports and updates ensure you're always informed about progress.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-4">
                                                <div className="icon-box d-center radius100" style={{backgroundColor: '#333333'}}>
                                                    <i className="fa-solid fa-trophy" style={{color: '#E60000'}} />
                                                </div>
                                                <div>
                                                    <h5 className="text-white mb-2">Results-Driven</h5>
                                                    <p className="text-white mb-0" style={{opacity: '0.8'}}>We measure success by your success, delivering real, measurable results.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonial Section */}
                    <section className="pt-space pb-space" style={{backgroundColor: '#111111'}}>
                        <div className="container">
                            <div className="row g-md-5 g-6 align-items-end justify-content-between bb-border pb-xxl-15 pb-lg-10 pb-9 mb-xxl-15 mb-lg-10 mb-9" 
                                  style={{borderColor: '#333333'}}>
                                <div className="col-lg-7">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-5">
                                        <div className="pricing-title">
                                            <div className="radius-btn text-uppercase border-white d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 text-white gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5" 
                                                  style={{borderColor: '#E60000', color: '#E60000'}} 
                                                  data-aos="zoom-in-left" data-aos-duration={1500}>
                                                Client Success
                                            </div>
                                            <h2 className="stitle text-white" data-aos="zoom-in" data-aos-duration={1800}>
                                                What Our <span className="fw-400" style={{color: '#E60000'}}>Happy Clients</span> Say
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in-right" data-aos-duration={1600}>
                                    <div className="d-flex justify-content-md-end">
                                        <div className="d-flex align-items-center gap-3">
                                            <ul className="customer-man d-flex align-items-center">
                                                <li>
                                                    <img src="/assets/img/team/avatar1.png" alt="Client 1" />
                                                </li>
                                                <li>
                                                    <img src="/assets/img/team/avatar2.png" alt="Client 2" />
                                                </li>
                                                <li>
                                                    <img src="/assets/img/team/avatar3.png" alt="Client 3" />
                                                </li>
                                                <li>
                                                    <img src="/assets/img/team/avatar4.png" alt="Client 4" />
                                                </li>
                                            </ul>
                                            <div className="review-cont">
                                                <div className="d-flex align-items-center gap-2 mb-xl-2 mb-1">
                                                    <i className="fa-solid fa-star" style={{color: '#E60000'}} />
                                                    <i className="fa-solid fa-star" style={{color: '#E60000'}} />
                                                    <i className="fa-solid fa-star" style={{color: '#E60000'}} />
                                                    <i className="fa-solid fa-star" style={{color: '#E60000'}} />
                                                    <i className="fa-solid fa-star" style={{color: '#E60000'}} />
                                                </div>
                                                <span className="texts text-white">
                                                    95% Client Retention
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center g-xxl-15 g-xl-8 g-lg-6 g-4">
                                <div className="col-lg-4">
                                    <div className="testimonial-thumb-v2 w-100" data-aos="zoom-in" data-aos-duration={1800}>
                                        <img src="/assets/img/testimonial/regulation-arrow.png" alt="Success Arrow" className="w-100 h-100" />
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="swiper testimonial-wrapv2">
                                        <Swiper {...swiperOptions} className="swiper-wrapper">
                                            <SwiperSlide>
                                                <div className="testimonial-item2 p-xxl-15 p-xl-10 p-lg-6 p-sm-5 p-5" 
                                                      style={{backgroundColor: '#111111', border: '1px solid #333333'}}>
                                                    <svg width={60} height={43} viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 25.8H12.8571L4.28564 43H17.1428L25.7143 25.8V0H0V25.8Z" fill="#E60000" />
                                                        <path d="M34.2852 0V25.8H47.1423L38.5708 43H51.4279L59.9994 25.8V0H34.2852Z" fill="#E60000" />
                                                    </svg>
                                                    <p className="mt-xxl-10 mt-xl-8 mt-lg-7 mt-6 mb-xxl-10 mb-xl-8 mb-lg-7 mb-6 text-white" style={{opacity: '0.8'}}>
                                                        "BTR Marketing transformed our online presence completely. Their SEO strategy increased our organic traffic by 300% in just 6 months. The team's expertise and transparency throughout the process were exceptional."
                                                    </p>
                                                    <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center gap-xxl-4 gap-xl-3 gap-3">
                                                            <img src="/assets/img/team/delors.png" alt="Sarah Johnson" className="radius100" />
                                                            <div className="cont">
                                                                <div>
                                                                    <h6 className="mb-2 text-white">
                                                                        Sarah Johnson
                                                                    </h6>
                                                                    <span className="text-white" style={{opacity: '0.8'}}>
                                                                        CEO, Tech Innovations Inc.
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="slider-button d-flex gap-xxl-3 gap-2 align-items-center justify-content-between slider-button-60">
                                                            <button className="border-white d-center" 
                                                                    style={{borderColor: '#E60000', color: '#E60000'}} 
                                                                    tabIndex={0} aria-label="Next slide">
                                                                <i className="fas fa-chevron-left" />
                                                            </button>
                                                            <button className="border-white d-center" 
                                                                    style={{borderColor: '#E60000', color: '#E60000'}} 
                                                                    tabIndex={0} aria-label="Previous slide">
                                                                <i className="fas fa-chevron-right" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="testimonial-item2 p-xxl-15 p-xl-10 p-lg-6 p-sm-5 p-5" 
                                                      style={{backgroundColor: '#111111', border: '1px solid #333333'}}>
                                                    <svg width={60} height={43} viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 25.8H12.8571L4.28564 43H17.1428L25.7143 25.8V0H0V25.8Z" fill="#E60000" />
                                                        <path d="M34.2852 0V25.8H47.1423L38.5708 43H51.4279L59.9994 25.8V0H34.2852Z" fill="#E60000" />
                                                    </svg>
                                                    <p className="mt-xxl-10 mt-xl-8 mt-lg-7 mt-6 mb-xxl-10 mb-xl-8 mb-lg-7 mb-6 text-white" style={{opacity: '0.8'}}>
                                                        "The social media campaign created by BTR Marketing exceeded all our expectations. They not only increased our engagement rates but also drove significant sales conversions. Their customized approach made all the difference."
                                                    </p>
                                                    <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center gap-xxl-4 gap-xl-3 gap-3">
                                                            <img src="/assets/img/team/delors.png" alt="Michael Chen" className="radius100" />
                                                            <div className="cont">
                                                                <div>
                                                                    <h6 className="mb-2 text-white">
                                                                        Michael Chen
                                                                    </h6>
                                                                    <span className="text-white" style={{opacity: '0.8'}}>
                                                                        Marketing Director, Retail Plus
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="slider-button d-flex gap-xxl-3 gap-2 align-items-center justify-content-between slider-button-60">
                                                            <button className="border-white d-center" 
                                                                    style={{borderColor: '#E60000', color: '#E60000'}} 
                                                                    tabIndex={0} aria-label="Next slide">
                                                                <i className="fas fa-chevron-left" />
                                                            </button>
                                                            <button className="border-white d-center" 
                                                                    style={{borderColor: '#E60000', color: '#E60000'}} 
                                                                    tabIndex={0} aria-label="Previous slide">
                                                                <i className="fas fa-chevron-right" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* CTA Section */}
                    <section className="pt-space pb-space">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center">
                                    <div className="pricing-title">
                                        <div className="radius-btn text-uppercase border-white d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 text-white gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5" 
                                              style={{borderColor: '#E60000', color: '#E60000'}}>
                                            Ready to Grow?
                                        </div>
                                        <h2 className="stitle mb-xxl-8 mb-xl-6 mb-5 text-white">
                                            Let's Build Your Digital Success Story Together
                                        </h2>
                                        <p className="text-white mb-xxl-8 mb-xl-8 mb-5" style={{opacity: '0.8'}}>
                                            Contact BTR Marketing Agency today and discover how our customized digital marketing solutions can help your business achieve remarkable growth and measurable results.
                                        </p>
                                        <Link href="/contact" 
                                              className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 gap-xxl-4 gap-3"
                                              style={{backgroundColor: '#E60000', color: '#FFFFFF'}}>
                                            Get Started Today
                                            <span className="rot60 d-inline-block">
                                                <i className="fas fa-arrow-up" style={{color: '#FFFFFF'}} />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}