'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from 'next/navigation'

// API Configuration
const API_URL = "https://btr.braventra.in";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAccordion, setIsAccordion] = useState(null);
    const router = useRouter();

    const handleAccordion = (key) => {
        setIsAccordion(prevState => prevState === key ? null : key);
    }

    // Fetch services from API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${API_URL}/api/services`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.status === 200 && data.data) {
                    // Filter only active services if needed
                    const activeServices = data.data.filter(service => service.is_active === 1 || service.is_active === true);
                    setServices(activeServices);
                    
                    // Set first service as active accordion by default
                    if (activeServices.length > 0) {
                        setIsAccordion(activeServices[0].id);
                    }
                } else {
                    setServices([]);
                }
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to load services. Please try again later.');
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Get service number with leading zero
    const getServiceNumber = (index) => {
        return (index + 1).toString().padStart(2, '0');
    };

    // Truncate description for display
    const truncateDescription = (description, maxLength = 150) => {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    // Handle service click to view details
    const handleServiceClick = (serviceId, serviceSlug) => {
        // You can either navigate to service details page or show more details
        router.push(`/service/${serviceSlug}`);
    };

    if (loading) {
        return (
            <Layout>
                <section className="service-section pt-space pb-space">
                    <div className="container position-relative">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-5 mb-xxl-17 mb-xl-12 mb-lg-10 mb-md-10 mb-sm-10 mb-9">
                            <div className="pricing-title">
                                <div className="radius-btn text-uppercase cmn-border d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 theme-clr gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5">
                                    WHAT WE OFFER
                                </div>
                                <h2 className="stitle">
                                    Most <span className="fw-400">experienced</span> services
                                </h2>
                            </div>
                            <div className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 theme-border theme-clr gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5 style-2">
                                Loading...
                            </div>
                        </div>
                        
                        {/* Loading skeleton */}
                        <div className="row g-xxl-6 g-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="service-tabing-wrap Faqs-section">
                                    <div className="accordion-single py-xxl-9 py-xl-7 py-lg-6 py-5 bt-border">
                                        <div className="header-area">
                                            <div className="accordion-btn justify-content-between d-flex align-items-center text-start d-flex position-relative w-100">
                                                <div className="mtitle-ara">
                                                    <span className="d-inine-flex serial-badge align-items-center gap-4 cmn-border radius100 white-clr">
                                                        {getServiceNumber(index - 1)}
                                                        <span className="rot60 d-inline-block theme-clr">
                                                            <i className="fa-solid fa-arrow-right" />
                                                        </span>
                                                    </span>
                                                    <span className="mtitle d-block mt-6">
                                                        <div className="white-clr placeholder-glow">
                                                            <span className="placeholder col-6"></span>
                                                        </div>
                                                    </span>
                                                    <span className="pras mt-xxl-7 mt-xl-5 mt-4 d-block placeholder-glow">
                                                        <span className="placeholder col-12"></span>
                                                        <span className="placeholder col-8"></span>
                                                    </span>
                                                </div>
                                                <div className="images-remove-area d-lg-flex d-none align-items-center gap-xxl-8 gap-4">
                                                    <div className="placeholder-glow">
                                                        <span className="placeholder col-12"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <section className="service-section pt-space pb-space">
                    <div className="container position-relative">
                        <div className="text-center py-5">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="radius-btn d-inline-flex radius100 py-2 px-5 theme-border theme-clr gap-3 mt-4"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (services.length === 0) {
        return (
            <Layout>
                <section className="service-section pt-space pb-space">
                    <div className="container position-relative">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-5 mb-xxl-17 mb-xl-12 mb-lg-10 mb-md-10 mb-sm-10 mb-9">
                            <div className="pricing-title">
                                <div className="radius-btn text-uppercase cmn-border d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 theme-clr gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5">
                                    WHAT WE OFFER
                                </div>
                                <h2 className="stitle">
                                    Our <span className="fw-400">Services</span>
                                </h2>
                            </div>
                        </div>
                        <div className="text-center py-5">
                            <p className="white-clr">No services available at the moment.</p>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="service-section pt-space pb-space">
                <div className="container position-relative">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-5 mb-xxl-17 mb-xl-12 mb-lg-10 mb-md-10 mb-sm-10 mb-9">
                        <div className="pricing-title">
                            <div className="radius-btn text-uppercase cmn-border d-inline-flex radius100 py-xxl-2 py-2 px-xxl-4 px-4 theme-clr gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5">
                                WHAT WE OFFER
                            </div>
                            <h2 className="stitle">
                                Our <span className="fw-400">Professional</span> Services
                            </h2>
                        </div>
                        <Link href="/service" className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 theme-border theme-clr gap-xxl-4 gap-3 mb-xxl-8 mb-xl-6 mb-5 style-2">
                            View All Services
                            <span className="rot60 d-inline-block">
                                <i className="fas fa-arrow-up theme-clr" />
                            </span>
                        </Link>
                    </div>
                    
                    {/* Service Accordion Section */}
                    <div className="row g-xxl-6 g-4">
                        <div className="service-tabing-wrap Faqs-section">
                            {services.map((service, index) => (
                                <div 
                                    key={service.id} 
                                    className={`accordion-single py-xxl-9 py-xl-7 py-lg-6 py-5 bt-border ${isAccordion === service.id ? "active" : ""}`}
                                >
                                    <div className="header-area" onClick={() => handleAccordion(service.id)}>
                                        <div className="accordion-btn justify-content-between d-flex align-items-center text-start d-flex position-relative w-100">
                                            <div className="mtitle-ara">
                                                <span className="d-inine-flex serial-badge align-items-center gap-4 cmn-border radius100 white-clr">
                                                    {getServiceNumber(index)}
                                                    <span className="rot60 d-inline-block theme-clr">
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </span>
                                                </span>
                                                <span className="mtitle d-block mt-6">
                                                    <Link 
                                                        href={`/service/${service.slug}`} 
                                                        className="white-clr whitehover"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {service.name}
                                                    </Link>
                                                </span>
                                                <span className="pras mt-xxl-7 mt-xl-5 mt-4 d-block">
                                                    {truncateDescription(service.service_description_text || service.description || 'No description available.')}
                                                </span>
                                            </div>
                                            
                                            {/* Expanded content (shown when accordion is active) */}
                                            <div className="images-remove-area d-lg-flex d-none align-items-center gap-xxl-8 gap-4">
                                                {isAccordion === service.id && (
                                                    <>
                                                        {/* Scope content or additional details */}
                                                        {service.scope_content && (
                                                            <div className="modern-content">
                                                                <h6 className="mb-3 theme-clr">Scope of Work:</h6>
                                                                <p className="white-clr small">
                                                                    {service.scope_content.length > 200 
                                                                        ? `${service.scope_content.substring(0, 200)}...` 
                                                                        : service.scope_content}
                                                                </p>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Service Image */}
                                                        {service.image_url && (
                                                            <div className="tab-remove-thumb">
                                                                <img 
                                                                    src={`${API_URL}${service.image_url}`} 
                                                                    alt={service.name}
                                                                    className="img-fluid"
                                                                    style={{ 
                                                                        maxWidth: '200px', 
                                                                        height: 'auto',
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Mobile expanded content */}
                                        {isAccordion === service.id && (
                                            <div className="mobile-expanded-content d-lg-none mt-4">
                                                <div className="row align-items-center">
                                                    {service.scope_content && (
                                                        <div className="col-md-6 mb-4">
                                                            <h6 className="mb-3 theme-clr">Scope of Work:</h6>
                                                            <p className="white-clr small">
                                                                {service.scope_content}
                                                            </p>
                                                        </div>
                                                    )}
                                                    
                                                    {service.image_url && (
                                                        <div className="col-md-6 mb-4">
                                                            <div className="tab-remove-thumb">
                                                                <img 
                                                                    src={`${API_URL}${service.image_url}`} 
                                                                    alt={service.name}
                                                                    className="img-fluid"
                                                                    style={{ 
                                                                        maxWidth: '100%', 
                                                                        height: 'auto',
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="text-center mt-4">
                                                    <Link 
                                                        href={`/service/${service.slug}`}
                                                        className="radius-btn d-inline-flex radius100 py-2 px-5 theme-border theme-clr gap-3"
                                                    >
                                                        View Details
                                                        <span className="rot60 d-inline-block">
                                                            <i className="fas fa-arrow-up theme-clr" />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Additional Call to Action */}
                    <div className="text-center mt-8 pt-8">
                        <p className="white-clr mb-4">Need a custom solution? We can help!</p>
                        <Link 
                            href="/contact" 
                            className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 theme-bg white-clr gap-xxl-4 gap-3"
                        >
                            Get In Touch
                            <span className="rot60 d-inline-block">
                                <i className="fas fa-arrow-up white-clr" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Add CSS for smooth transitions */}
            <style jsx>{`
                .accordion-single {
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .accordion-single.active {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                }
                .accordion-single:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
                .mobile-expanded-content {
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .tab-remove-thumb img {
                    transition: transform 0.3s ease;
                }
                .tab-remove-thumb img:hover {
                    transform: scale(1.05);
                }
                .modern-content {
                    max-width: 400px;
                }
            `}</style>
        </Layout>
    );
}