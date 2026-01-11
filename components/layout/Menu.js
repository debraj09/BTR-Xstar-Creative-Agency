'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Menu() {
    const pathname = usePathname()
    const [isAccordion, setIsAccordion] = useState(0)
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAllServices, setShowAllServices] = useState(false)

    // Fetch services for the dropdown
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://btr.braventra.in/api/services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.status === 200 && data.data) {
                        // Filter only active services and take first 5
                        const activeServices = data.data.filter(
                            service => service.is_active === 1 || service.is_active === true
                        )
                        setServices(activeServices.slice(0, 5)) // Only first 5
                    }
                }
            } catch (error) {
                console.error('Error fetching services:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchServices()
    }, [])

    const handleAccordion = (key) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }

    const toggleShowAllServices = () => {
        setShowAllServices(!showAllServices)
    }

    // Check if path is a service detail page
    const isServiceDetailPage = pathname?.startsWith('/service/') && pathname !== '/service'

    return (
        <>
            <ul className="custom-nav d-lg-flex d-grid gap-xxl-10 gap-xl-8 gap-lg-5 gap-md-2 gap-2 pt-lg-0 pt-5">
                <li className="menu-item position-relative">
                    <Link href="/" className="fw_500 ps-5 white-clr">
                        HOME
                    </Link>
                </li>
                
                <li className="menu-item position-relative">
                    <Link href="/about" className="fw_500 ps-5 white-clr">
                        About Us
                    </Link>
                </li>
                
                <li className="menu-item position-relative">
                    <button 
                        className="position-relative ps-5 fw_500 white-clr cus-z1" 
                        onClick={() => handleAccordion(3)}
                    >
                        Portfolio
                    </button>
                    <ul className="sub-menu px-lg-4 py-xxl-3 py-2" style={{ display: `${isAccordion == 3 ? "block" : "none"}` }}>
                        <li className="menu-link py-1">
                            <Link href="/study-grid" className="fw_500 white-clr">Case Study</Link>
                        </li>
                        <li className="menu-link py-1">
                            <Link href="/study-details" className="fw_500 white-clr">Case Study Details</Link>
                        </li>
                    </ul>
                </li>
                
                {/* Updated Blog Menu - Only Blog List */}
                <li className="menu-item position-relative">
                    <Link href="/blog" className="fw_500 ps-5 white-clr">
                        Blog
                    </Link>
                </li>
                
                <li className="menu-item position-relative">
                    <button 
                        className={`position-relative ps-5 fw_500 white-clr cus-z1 ${isServiceDetailPage ? 'active' : ''}`}
                        onClick={() => handleAccordion(5)}
                    >
                        Services
                    </button>
                    <ul className="sub-menu px-lg-4 py-xxl-3 py-2" style={{ 
                        display: `${isAccordion == 5 ? "block" : "none"}`,
                        minWidth: '250px'
                    }}>
                        {/* Main Services Link */}
                        <li className="menu-link py-1">
                            <Link href="/service" className="fw_500 white-clr d-flex align-items-center justify-content-between">
                                <span>All Services</span>
                                <span className="rot60 d-inline-block">
                                    <i className="fas fa-arrow-up" style={{ fontSize: '12px' }} />
                                </span>
                            </Link>
                        </li>
                        
                        {/* Divider */}
                        <li className="divider py-1">
                            <hr style={{ 
                                borderColor: 'rgba(255,255,255,0.1)', 
                                margin: '8px 0'
                            }} />
                        </li>
                        
                        {/* Popular Services Section */}
                        <li className="menu-section py-1">
                            <span className="fw_500 theme-clr" style={{ fontSize: '0.85rem' }}>
                                POPULAR SERVICES
                            </span>
                        </li>
                        
                        {/* Dynamic Services from API - Only first 5 */}
                        {loading ? (
                            <li className="menu-link py-1">
                                <span className="fw_500 white-clr" style={{ opacity: 0.7 }}>
                                    Loading services...
                                </span>
                            </li>
                        ) : services.length > 0 ? (
                            <>
                                {services.slice(0, showAllServices ? services.length : 5).map((service) => (
                                    <li key={service.id} className="menu-link py-1">
                                        <Link 
                                            href={`/service/${service.slug}`}
                                            className={`fw_500 white-clr d-flex align-items-center justify-content-between ${pathname === `/service/${service.slug}` ? 'active-service' : ''}`}
                                        >
                                            <span>{service.name}</span>
                                            <span className="rot60 d-inline-block">
                                                <i className="fas fa-arrow-up" style={{ fontSize: '10px' }} />
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                
                                {/* Show All Services Toggle Button */}
                                {services.length > 5 && (
                                    <li className="menu-link py-1">
                                        <button 
                                            onClick={toggleShowAllServices}
                                            className="fw_500 theme-clr d-flex align-items-center justify-content-between w-100 bg-transparent border-0 text-start"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span>{showAllServices ? 'Show Less' : 'Show All Services'}</span>
                                            <span className={`d-inline-block transition-all ${showAllServices ? 'rotate-180' : ''}`}>
                                                <i className={`fas fa-chevron-${showAllServices ? 'up' : 'down'} theme-clr`} style={{ fontSize: '12px' }} />
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </>
                        ) : (
                            <li className="menu-link py-1">
                                <span className="fw_500 white-clr" style={{ opacity: 0.7 }}>
                                    No services available
                                </span>
                            </li>
                        )}
                    </ul>
                </li>
                
                <li className="menu-item position-relative">
                    <Link href="/contact" className="fw_500 ps-5 white-clr">
                        Contact Us
                    </Link>
                </li>
            </ul>

            <style jsx>{`
                .custom-nav .menu-item button.active {
                    color: #e3ff04 !important;
                }
                .sub-menu {
                    background: rgba(0, 0, 0, 0.95);
                    border: 1px solid rgba(227, 255, 4, 0.2);
                    border-radius: 8px;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    max-height: 400px;
                    overflow-y: auto;
                }
                .menu-link a, .menu-link button {
                    transition: all 0.3s ease;
                    padding: 4px 8px;
                    border-radius: 4px;
                    display: block;
                    width: 100%;
                }
                .menu-link a:hover, .menu-link button:hover {
                    background: rgba(227, 255, 4, 0.1);
                    color: #e3ff04 !important;
                    padding-left: 12px;
                }
                .menu-link a.active-service {
                    background: rgba(227, 255, 4, 0.15);
                    color: #e3ff04 !important;
                    font-weight: 600;
                }
                .menu-section {
                    padding: 4px 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .divider hr {
                    border-width: 1px;
                }
                .rot60 i {
                    transition: transform 0.3s ease;
                }
                .menu-link a:hover .rot60 i {
                    transform: rotate(90deg);
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .rotate-180 {
                    transform: rotate(180deg);
                }
            `}</style>
        </>
    )
}