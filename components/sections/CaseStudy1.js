'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"

// API Configuration
const API_URL = "https://btr.braventra.in";

export default function PortfolioSection() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch portfolio items from API
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${API_URL}/api/portfolio`, {
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
                    // Show only first 2 items for the homepage
                    const limitedItems = data.data.slice(0, 2);
                    setPortfolioItems(limitedItems);
                } else {
                    setPortfolioItems([]);
                }
            } catch (err) {
                console.error('Error fetching portfolio items:', err);
                setError('Failed to load portfolio items. Please try again later.');
                setPortfolioItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    // Format category/tags from title or description
    const getCategory = (item, index) => {
        // You can create a categories array or extract from item data
        const categories = ['Creative', 'Branding', 'Design', 'Development', 'Marketing'];
        
        // Use index to cycle through categories or extract from item data
        return categories[index % categories.length] || 'Portfolio';
    };

    // Truncate title for display
    const truncateTitle = (title, maxLength = 60) => {
        if (!title) return 'Untitled Project';
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength) + '...';
    };

    // Loading skeleton
    if (loading) {
        return (
            <section className="case-study-vsesion01 bg2-clr pb-space">
                <div className="container">
                    <div className="row g-xxl-7 g-xl-5 g-4">
                        {[1, 2].map((index) => (
                            <div key={index} className="col-lg-6 col-md-6" data-aos="zoom-in-left" data-aos-duration={1400 + index * 200}>
                                <div className="blog-widget-item bb-border pb-xxl-7 pb-xl-6 pb-4">
                                    <div className="thumb w-100 overflow-hidden mb-xxl-7 mb-xl-6 mb-4 placeholder-glow">
                                        <div className="placeholder" style={{ height: '250px', width: '100%' }}></div>
                                    </div>
                                    <div className="blog-cont">
                                        <div className="d-flex align-items-center gap-xxl-5 gap-xl-4 gap-3 mb-xxl-5 mb-xl-4 mb-3 placeholder-glow">
                                            <div className="radius-btn cmn-border radius100 py-xxl-2 py-2 px-xxl-4 px-3 theme-clr style-2 placeholder">
                                                <span className="placeholder col-4"></span>
                                            </div>
                                        </div>
                                        <h5 className="placeholder-glow">
                                            <div className="white-clr d-flex align-items-center justify-content-between gap-3">
                                                <span className="placeholder col-8"></span>
                                                <span className="rot60 placeholder">
                                                    <i className="fas fa-arrow-up theme-clr" />
                                                </span>
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="case-study-vsesion01 bg2-clr pb-space">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="alert alert-danger d-inline-block" role="alert">
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
        );
    }

    // No portfolio items
    if (portfolioItems.length === 0) {
        return (
            <section className="case-study-vsesion01 bg2-clr pb-space">
                <div className="container">
                    <div className="text-center py-5">
                        <p className="white-clr">No portfolio items available at the moment.</p>
                        <Link href="/portfolio" className="radius-btn d-inline-flex radius100 py-2 px-5 theme-border theme-clr gap-3 mt-4">
                            View Full Portfolio
                            <span className="rot60 d-inline-block">
                                <i className="fas fa-arrow-up theme-clr" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="case-study-vsesion01 bg2-clr pb-space">
            <div className="container">
                <div className="row g-xxl-7 g-xl-5 g-4">
                    {portfolioItems.map((item, index) => (
                        <div 
                            key={item.id} 
                            className="col-lg-6 col-md-6" 
                            data-aos="zoom-in-left" 
                            data-aos-duration={1400 + index * 200}
                        >
                            <div className="blog-widget-item bb-border pb-xxl-7 pb-xl-6 pb-4">
                                {/* Portfolio Thumbnail */}
                                <div className="thumb w-100 overflow-hidden mb-xxl-7 mb-xl-6 mb-4">
                                    {item.thumbnail_url ? (
                                        <img 
                                            src={`${API_URL}${item.thumbnail_url}`} 
                                            alt={item.title || 'Portfolio Image'} 
                                            className="w-100 overflow-hidden"
                                            style={{ 
                                                height: '250px', 
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        />
                                    ) : (
                                        <div className="no-image-placeholder" style={{
                                            height: '250px',
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '8px'
                                        }}>
                                            <i className="fas fa-image fa-3x theme-clr"></i>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="blog-cont">
                                    {/* Category/Tag */}
                                    <div className="d-flex align-items-center gap-xxl-5 gap-xl-4 gap-3 mb-xxl-5 mb-xl-4 mb-3">
                                        <Link 
                                            href={`/portfolio/${item.id}`} 
                                            className="radius-btn cmn-border radius100 py-xxl-2 py-2 px-xxl-4 px-3 theme-clr style-2"
                                        >
                                            {getCategory(item, index)}
                                            <span className="rot60 d-inline-block ml-10">
                                                <i className="fas fa-arrow-up theme-clr" />
                                            </span>
                                        </Link>
                                        
                                        {/* Optional: Project URL if available */}
                                        {item.project_url && (
                                            <Link 
                                                href={item.project_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="radius-btn cmn-border radius100 py-xxl-1 py-1 px-xxl-3 px-2 white-clr style-2"
                                                style={{ fontSize: '12px' }}
                                            >
                                                Live Demo
                                                <span className="rot60 d-inline-block ml-5">
                                                    <i className="fas fa-external-link-alt white-clr" />
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                    
                                    {/* Project Title */}
                                    <h5>
                                        <Link 
                                            href={`/portfolio/${item.id}`} 
                                            className="white-clr d-flex align-items-center justify-content-between gap-3"
                                        >
                                            {truncateTitle(item.title)}
                                            <span className="rot60">
                                                <i className="fas fa-arrow-up theme-clr" />
                                            </span>
                                        </Link>
                                    </h5>
                                    
                                    {/* Optional: Project Description */}
                                    {item.description && (
                                        <p className="pra-clr mt-xxl-4 mt-xl-3 mt-2 mb-0">
                                            {item.description.length > 100 
                                                ? `${item.description.substring(0, 100)}...` 
                                                : item.description}
                                        </p>
                                    )}
                                    
                                    {/* Optional: Logo */}
                                    {item.logo_url && (
                                        <div className="mt-xxl-4 mt-xl-3 mt-2">
                                            <img 
                                                src={`${API_URL}${item.logo_url}`} 
                                                alt={`${item.title} Logo`}
                                                style={{ 
                                                    maxWidth: '80px', 
                                                    maxHeight: '40px',
                                                    filter: 'brightness(0) invert(1)'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View All Portfolio Button if we have items */}
                {portfolioItems.length > 0 && (
                    <div className="text-center mt-xxl-8 mt-xl-7 mt-6">
                        <Link 
                            href="/portfolio" 
                            className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 theme-bg white-clr gap-xxl-4 gap-3"
                        >
                            View Full Portfolio
                            <span className="rot60 d-inline-block">
                                <i className="fas fa-arrow-up white-clr" />
                            </span>
                        </Link>
                    </div>
                )}
            </div>
            
            {/* Custom Styles */}
            <style jsx>{`
                .blog-widget-item {
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                .blog-widget-item:hover {
                    background: rgba(255, 255, 255, 0.02);
                    transform: translateY(-5px);
                }
                .radius-btn.style-2:hover {
                    background: rgba(227, 255, 4, 0.1);
                }
                .radius-btn.theme-bg:hover {
                    background: rgba(227, 255, 4, 0.9);
                }
                .thumb img {
                    transition: transform 0.5s ease;
                }
                .placeholder-glow .placeholder {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .ml-10 {
                    margin-left: 10px;
                }
                .ml-5 {
                    margin-left: 5px;
                }
            `}</style>
        </section>
    );
}