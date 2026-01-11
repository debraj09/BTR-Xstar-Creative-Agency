'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useParams, useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const API_URL = "https://btr.braventra.in";

export default function ServiceDetailsPage() {
    const { slug } = useParams()
    const router = useRouter()
    const [service, setService] = useState(null)
    const [allServices, setAllServices] = useState([])
    const [pricingPlans, setPricingPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [pricingLoading, setPricingLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showAllServices, setShowAllServices] = useState(false)

    // Fetch service details and all services
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                
                // Fetch all services first
                const servicesResponse = await fetch(`${API_URL}/api/services`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!servicesResponse.ok) {
                    throw new Error(`HTTP error! status: ${servicesResponse.status}`)
                }

                const servicesData = await servicesResponse.json()
                
                if (servicesData.status === 200 && servicesData.data) {
                    const activeServices = servicesData.data.filter(s => s.is_active === 1 || s.is_active === true)
                    setAllServices(activeServices)
                    
                    // Find the current service by slug
                    const currentService = activeServices.find(s => s.slug === slug)
                    
                    if (currentService) {
                        setService(currentService)
                    } else {
                        setError('Service not found')
                    }
                } else {
                    setError('Failed to load services')
                }
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('Failed to load service details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchData()
        }
    }, [slug])

    // Fetch pricing plans
    useEffect(() => {
        const fetchPricingPlans = async () => {
            try {
                setPricingLoading(true)
                const response = await fetch(`${API_URL}/api/pricing`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.status === 200 && data.data) {
                        setPricingPlans(data.data)
                    }
                }
            } catch (err) {
                console.error('Error fetching pricing plans:', err)
            } finally {
                setPricingLoading(false)
            }
        }

        fetchPricingPlans()
    }, [])

    // Swiper options
    const swiperOptions = {
        modules: [Autoplay, Pagination, Navigation],
        spaceBetween: 0,
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
            1199: { slidesPerView: 1 },
            991: { slidesPerView: 1 },
            767: { slidesPerView: 1 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
        },
    }

    // Get current service index for navigation
    const getCurrentIndex = () => {
        if (!service || allServices.length === 0) return -1
        return allServices.findIndex(s => s.id === service.id)
    }

    // Navigate to next service
    const goToNextService = () => {
        const currentIndex = getCurrentIndex()
        if (currentIndex < allServices.length - 1) {
            const nextService = allServices[currentIndex + 1]
            router.push(`/service/${nextService.slug}`)
        }
    }

    // Navigate to previous service
    const goToPrevService = () => {
        const currentIndex = getCurrentIndex()
        if (currentIndex > 0) {
            const prevService = allServices[currentIndex - 1]
            router.push(`/service/${prevService.slug}`)
        }
    }

    const toggleShowAllServices = () => {
        setShowAllServices(!showAllServices)
    }

    // Dynamic Pricing Section Component
    const PricingTableSection = () => {
        if (pricingLoading) {
            return (
                <div style={{width:'100%'}} className="pricing-table-section mt-xxl-10 mt-xl-8 mt-6">
                    <div className="container-fluid px-0">
                        <div className="text-center mb-xxl-6 mb-xl-5 mb-4">
                            <h3 className="white-clr mb-xxl-3 mb-2">
                                Our Pricing Plans
                            </h3>
                            <p className="pra-clr">
                                Loading pricing plans...
                            </p>
                        </div>
                        <div className="row g-0 justify-content-center">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="col-lg-4">
                                    <div className="pricing-card h-100 placeholder-glow">
                                        <div className="pricing-header p-xxl-5 p-xl-4 p-4 text-center">
                                            <div className="placeholder col-8 mb-3" style={{height: '20px'}}></div>
                                            <div className="placeholder col-6 mb-3" style={{height: '30px'}}></div>
                                            <div className="placeholder col-4" style={{height: '40px'}}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }

        if (pricingPlans.length === 0) {
            return null
        }

        return (
            <div className="pricing-table-section mt-xxl-10 mt-xl-8 mt-6">
                <div className="container-fluid px-0">
                    <div className="text-center mb-xxl-6 mb-xl-5 mb-4">
                        <h3 className="white-clr mb-xxl-3 mb-2">
                            Our Pricing Plans
                        </h3>
                        <p className="pra-clr">
                            Choose the right plan for your needs
                        </p>
                    </div>

                    <div className="row g-0 justify-content-center">
                        {pricingPlans.map((plan, index) => (
                            <div key={plan.id} className="col-lg-4">
                                <div className={`pricing-card h-100 ${plan.is_featured ? 'featured-plan' : ''}`}>
                                    <div className="pricing-header p-xxl-5 p-xl-4 p-4 text-center">
                                        <span className="plan-category d-block mb-xxl-3 mb-2 pra-clr">
                                            {plan.category}
                                        </span>
                                        <h4 className="plan-name white-clr mb-xxl-3 mb-2">
                                            {plan.plan_name}
                                        </h4>
                                        <div className="price-amount mb-xxl-4 mb-3">
                                            <span className="theme-clr h2">${plan.price}</span>
                                        </div>
                                        {plan.is_featured && (
                                            <span className="featured-badge">Popular</span>
                                        )}
                                    </div>
                                    
                                    <div className="pricing-body p-xxl-5 p-xl-4 p-4">
                                        <ul className="features-list">
                                            {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                                                <li key={idx} className="pra-clr mb-xxl-3 mb-2">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="pricing-footer p-xxl-5 p-xl-4 p-4 text-center">
                                        <Link 
                                            href="/contact" 
                                            className={`radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 gap-xxl-3 gap-2 w-100 justify-content-center ${plan.is_featured ? 'theme-bg white-clr' : 'theme-border theme-clr'}`}
                                        >
                                            GET QUOTE
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-xxl-6 mt-xl-5 mt-4">
                        <p className="pra-clr">
                            Need a custom plan? <Link href="/contact" className="theme-clr text-decoration-underline">Contact us</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Loading...">
                <section className="Service-details pt-space pb-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="placeholder-glow">
                                    <div className="placeholder col-12" style={{height: '300px'}}></div>
                                    <div className="placeholder col-10 mt-4" style={{height: '40px'}}></div>
                                    <div className="placeholder col-8 mt-3" style={{height: '20px'}}></div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="placeholder-glow">
                                    <div className="placeholder col-12" style={{height: '300px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    if (error || !service) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Service Not Found">
                <section className="Service-details pt-space pb-space">
                    <div className="container">
                        <div className="text-center py-5">
                            <h3 className="white-clr mb-4">{error || 'Service not found'}</h3>
                            <Link href="/service" className="radius-btn cmn-border radius100 py-2 px-5 theme-clr">
                                Back to Services
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout 
            headerStyle={2} 
            footerStyle={3} 
            breadcrumbTitle={service.name}
            breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/service' },
                { label: service.name, href: `/service/${service.slug}` }
            ]}
        >
            <section className="Service-details pt-space pb-space">
                <div className="container">
                    <div className="row">
                        {/* Main Content - Left Side */}
                        <div className="col-lg-8">
                            {/* Banner Image - Large */}
                            {service.image_url && (
                                <div className="service-banner mb-5" data-aos="zoom-in" data-aos-duration={1500}>
                                    <img 
                                        src={`${API_URL}${service.image_url}`} 
                                        alt={service.name} 
                                        className="w-100 rounded-3"
                                        style={{ 
                                            height: '350px',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className="service-details-header bb-border pb-xxl-9 pb-xl-7 pb-6">
                                <h3 className="white-clr mb-xxl-9 mb-xl-7 mb-lg-6 mb-4" data-aos="zoom-in-left" data-aos-duration={1600}>
                                    {service.name}
                                </h3>
                                
                                {/* Service Categories/Tags */}
                                {service.category && (
                                    <div className="d-flex flex-wrap align-items-center gap-xxl-5 gap-xl-3 gap-2" data-aos="zoom-in-left" data-aos-duration={1800}>
                                        <span className="radius-btn cmn-border radius100 py-xxl-2 py-2 px-xxl-4 px-3 theme-clr">
                                            {service.category}
                                        </span>
                                        {service.tags && service.tags.split(',').map((tag, index) => (
                                            <span key={index} className="radius-btn cmn-border radius100 py-xxl-2 py-2 px-xxl-4 px-3 theme-clr">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Service Overview */}
                            <div className="case-study-detials-inner mt-xxl-10 mt-xl-7 mt-6">
                                <h4 className="mb-xxl-7 mb-4 white-clr">
                                    Service Overview
                                </h4>
                                <div className="d-flex flex-md-nowrap flex-wrap justify-content-between gap-xxl-15 gap-xl-10 gap-lg-7 gap-sm-5 gap-3 mb-xxl-9 mb-xl-8 mb-lg-7 mb-4">
                                    <p className="pra-clr challenge-pra1">
                                        {service.service_description_text || service.description || 'No description available.'}
                                    </p>
                                    {service.additional_info && (
                                        <p className="pra-clr">
                                            {service.additional_info}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Thumbnail Image - Smaller */}
                                {service.image_url && (
                                    <div className="service-thumbnail mb-5" data-aos="fade-up" data-aos-duration={1500}>
                                        <img 
                                            src={`${API_URL}${service.image_url}`} 
                                            alt={service.name} 
                                            className="w-100 rounded-3"
                                            style={{ 
                                                height: '200px',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </div>
                                )}
                                
                                {/* Scope of Work or Benefits */}
                                {service.scope_content && (
                                    <div className="finul-result">
                                        <h4 className="mb-xxl-3 mb-2 white-clr">
                                            Scope of Work
                                        </h4>
                                        <div className="d-md-flex flex-grid align-items-center gap-xxl-20 gap-xl-10 gap-lg-7 gap-md-6 gap-10">
                                            <div className="fiial-result-list mb-md-0 mb-4">
                                                {service.scope_content.split('\n').map((item, index) => (
                                                    item.trim() && (
                                                        <ul key={index}>
                                                            <li>{item.trim()}</li>
                                                        </ul>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Benefits Section */}
                                {service.benefits && (
                                    <div className="finul-result mt-6">
                                        <h4 className="mb-xxl-3 mb-2 white-clr">
                                            Benefits
                                        </h4>
                                        <div className="d-md-flex flex-grid align-items-center gap-xxl-20 gap-xl-10 gap-lg-7 gap-md-6 gap-10">
                                            <div className="fiial-result-list mb-md-0 mb-4">
                                                {service.benefits.split('\n').map((benefit, index) => (
                                                    benefit.trim() && (
                                                        <ul key={index}>
                                                            <li>{benefit.trim()}</li>
                                                        </ul>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Service Gallery */}
                            {(service.gallery_images || service.image_url) && (
                                <div className="swiper study-slidewrap py-xxl-15 py-xl-10 py-9">
                                    <Swiper {...swiperOptions} className="swiper-wrapper">
                                        {/* Main image */}
                                        {service.image_url && (
                                            <SwiperSlide>
                                                <div className="study-thumb-slide w-100">
                                                    <img 
                                                        src={`${API_URL}${service.image_url}`} 
                                                        alt={service.name} 
                                                        className="w-100 rounded-3"
                                                        style={{ height: '300px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )}
                                        
                                        {/* Gallery images */}
                                        {service.gallery_images && JSON.parse(service.gallery_images).map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="study-thumb-slide w-100">
                                                    <img 
                                                        src={`${API_URL}${img}`} 
                                                        alt={`${service.name} ${index + 1}`} 
                                                        className="w-100 rounded-3"
                                                        style={{ height: '300px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}
                            
                            {/* Dynamic Pricing Table Section - Added here */}
                            <PricingTableSection />
                            
                            {/* Navigation between services */}
                            <div className="slider-button d-flex align-items-center justify-content-between py-xxl-6 py-xl-5 py-4">
                                <div className="d-flex align-items-center gap-xxl-5 gap-3 gap-2">
                                    <button 
                                        className="cmn-prev cmn-border d-center" 
                                        onClick={goToPrevService}
                                        disabled={getCurrentIndex() <= 0}
                                    >
                                        <i className="fas fa-chevron-left" />
                                    </button>
                                    <span className="fw-bold white-clr previus-text text-capitalize">
                                        Previous
                                    </span>
                                </div>
                                <h3 className="project-storke">
                                    Services
                                </h3>
                                <div className="d-flex align-items-center gap-xxl-5 gap-3 gap-2">
                                    <span className="fw-bold white-clr previus-text text-capitalize">
                                        Next
                                    </span>
                                    <button 
                                        className="cmn-next cmn-border d-center" 
                                        onClick={goToNextService}
                                        disabled={getCurrentIndex() >= allServices.length - 1}
                                    >
                                        <i className="fas fa-chevron-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Sidebar - Right Side */}
                        <div className="col-lg-4">
                            <div className="service-sidebar ps-xxl-6 ps-xl-5 ps-lg-4">
                                {/* Services Box - Renamed to Other Services */}
                                <div className="services-box cmn-border p-xxl-6 p-xl-5 p-4 mb-xxl-10 mb-xl-8 mb-6">
                                    <h4 className="white-clr mb-xxl-6 mb-xl-5 mb-4">
                                        Other Services
                                    </h4>
                                    <div className="services-list">
                                        {allServices
                                            .filter(s => s.id !== service.id) // Exclude current service
                                            .slice(0, showAllServices ? allServices.length : 5) // Show 5 initially
                                            .map((serv) => (
                                            <div 
                                                key={serv.id} 
                                                className="service-item py-xxl-4 py-xl-3 py-3"
                                            >
                                                <Link 
                                                    href={`/service/${serv.slug}`}
                                                    className="d-flex align-items-center justify-content-between white-clr whitehover"
                                                >
                                                    <span className="service-title">
                                                        {serv.name}
                                                    </span>
                                                    <span className="rot60 d-inline-block">
                                                        <i className="fas fa-arrow-up white-clr" />
                                                    </span>
                                                </Link>
                                            </div>
                                        ))}
                                        
                                        {/* Show All Services Toggle - Slide down design */}
                                        {allServices.filter(s => s.id !== service.id).length > 5 && (
                                            <div className="show-all-services mt-3 pt-3 bt-border">
                                                <button 
                                                    onClick={toggleShowAllServices}
                                                    className="radius-btn d-inline-flex radius100 py-2 px-4 theme-border theme-clr gap-2 w-100 justify-content-center bg-transparent"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {showAllServices ? 'Show Less' : 'Show All Services'}
                                                    <span className={`rot60 d-inline-block transition-all ${showAllServices ? 'rotate-180' : ''}`}>
                                                        <i className={`fas fa-chevron-${showAllServices ? 'up' : 'down'} theme-clr`} />
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Contact CTA */}
                                    <div className="contact-cta mt-xxl-8 mt-xl-7 mt-6 pt-xxl-6 pt-xl-5 pt-4 bt-border">
                                        <h5 className="white-clr mb-xxl-4 mb-3">
                                            Need Help?
                                        </h5>
                                        <p className="pra-clr mb-xxl-5 mb-4">
                                            Contact us for more information about this service
                                        </p>
                                        <Link 
                                            href="/contact" 
                                            className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 theme-bg white-clr gap-xxl-3 gap-2"
                                        >
                                            Contact Us
                                            <span className="rot60 d-inline-block">
                                                <i className="fas fa-arrow-up white-clr" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Pricing Information */}
                                {service.price_starting_from && (
                                    <div className="pricing-box cmn-border p-xxl-6 p-xl-5 p-4">
                                        <h5 className="white-clr mb-xxl-3 mb-2">
                                            Pricing
                                        </h5>
                                        <div className="price-amount mb-xxl-4 mb-3">
                                            <span className="theme-clr h2">₹{service.price_starting_from}</span>
                                            <span className="pra-clr">+ GST</span>
                                        </div>
                                        <p className="pra-clr small">
                                            Starting price for basic package
                                        </p>
                                        <Link 
                                            href="/contact" 
                                            className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 theme-border theme-clr gap-xxl-3 gap-2 w-100 justify-content-center mt-4"
                                        >
                                            Get Quote
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Styles */}
            <style jsx>{`
                .service-sidebar {
                    position: sticky;
                    top: 100px;
                }
                .services-box {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 12px;
                }
                .service-item {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                .service-item:last-child {
                    border-bottom: none;
                }
                .service-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding-left: 10px;
                }
                .service-item:hover .service-title {
                    color: #e3ff04;
                }
                .service-title {
                    font-weight: 500;
                    transition: color 0.3s ease;
                }
                .pricing-box {
                    background: rgba(227, 255, 4, 0.05);
                    border-radius: 12px;
                }
                .contact-cta {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .price-amount {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                }
                .btn-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .cmn-prev:disabled, .cmn-next:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                .show-all-services {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .bt-border {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .rotate-180 {
                    transform: rotate(180deg);
                }
                .service-banner img {
                    border: 2px solid rgba(227, 255, 4, 0.1);
                }
                .service-thumbnail img {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Pricing Table Styles */
                .pricing-table-section {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 80px 0;
                    background: rgba(255, 255, 255, 0.01);
                }
                .pricing-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }
                .pricing-card:hover {
                    border-color: rgba(227, 255, 4, 0.3);
                    background: rgba(227, 255, 4, 0.03);
                }
                .pricing-card.featured-plan {
                    border: 2px solid #e3ff04;
                    background: rgba(227, 255, 4, 0.05);
                    transform: scale(1.02);
                    position: relative;
                    z-index: 1;
                }
                .pricing-header {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px 30px;
                }
                .pricing-body {
                    flex: 1;
                    padding: 40px 30px;
                }
                .pricing-footer {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px 30px;
                }
                .features-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .features-list li {
                    position: relative;
                    padding-left: 25px;
                }
                .features-list li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #e3ff04;
                    font-weight: bold;
                }
                .plan-category {
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .featured-badge {
                    display: inline-block;
                    background: #e3ff04;
                    color: #000;
                    padding: 6px 15px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-top: 10px;
                    text-transform: uppercase;
                }
                @media (max-width: 991px) {
                    .pricing-card {
                        margin-bottom: 30px;
                    }
                    .pricing-card.featured-plan {
                        transform: none;
                    }
                    .pricing-table-section {
                        padding: 60px 0;
                    }
                }
            `}</style>
        </Layout>
    )
}