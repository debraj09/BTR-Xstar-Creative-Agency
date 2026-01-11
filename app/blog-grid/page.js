'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"

const API_URL = "https://btr.braventra.in/api/blogs"

export default function BlogGrid() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [apiStatus, setApiStatus] = useState('checking')

    // Test API connection
    const testAPI = async () => {
        try {
            setApiStatus('testing')
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            console.log('API Response Status:', response.status)
            console.log('API Response Headers:', response.headers)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            console.log('API Response Data:', data)
            
            if (data.success) {
                setBlogs(data.data)
                setError(null)
                setApiStatus('success')
            } else {
                throw new Error(data.message || 'Failed to fetch blogs')
            }
        } catch (err) {
            console.error('API Error:', err)
            setError(err.message)
            setApiStatus('error')
            setBlogs([])
        } finally {
            setLoading(false)
        }
    }

    // Fetch blogs from API
    useEffect(() => {
        testAPI()
    }, [])

    // Format date to readable format
    const formatDate = (dateString) => {
        if (!dateString) return "RECENT"
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }).toUpperCase()
        } catch (err) {
            return "RECENT"
        }
    }

    // Extract first tag for display
    const getFirstTag = (tagsString) => {
        if (!tagsString || tagsString.trim() === '') return "BLOG"
        const tags = tagsString.split(',').map(tag => tag.trim())
        return tags[0] || "BLOG"
    }

    // Get fallback image based on index
    const getFallbackImage = (index) => {
        const images = [
            "/assets/img/blog/mblog1.png",
            "/assets/img/blog/mblog2.png",
            "/assets/img/blog/mblog3.png",
            "/assets/img/blog/mblog4.png",
            "/assets/img/blog/mblog5.png",
            "/assets/img/blog/mblog6.png"
        ]
        return images[index % images.length]
    }

    // Debug function to check API
    const debugAPI = () => {
        console.log('=== API Debug Information ===')
        console.log('API URL:', API_URL)
        console.log('Current State:', { loading, error, apiStatus, blogsCount: blogs.length })
        console.log('Environment:', process.env.NODE_ENV)
        testAPI()
    }

    // Render loading state
    if (loading && apiStatus === 'checking') {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog Grid">
                <section className="blog-grid pt-space pb-space" style={{ backgroundColor: '#000000', minHeight: '60vh' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border" style={{ color: '#E60000', width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-white mt-3">Connecting to blog server...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    // API error state - show debug info
    if (apiStatus === 'error') {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog Grid - API Error">
                <section className="blog-grid pt-space pb-space" style={{ backgroundColor: '#000000', minHeight: '60vh' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="alert" role="alert" style={{ 
                                    backgroundColor: 'rgba(230, 0, 0, 0.1)', 
                                    border: '1px solid #E60000',
                                    color: '#fff',
                                    padding: '1.5rem',
                                    borderRadius: '8px'
                                }}>
                                    <h4 style={{ color: '#E60000', marginBottom: '1rem' }}>API Connection Error</h4>
                                    <p><strong>Error:</strong> {error}</p>
                                    <p><strong>API Endpoint:</strong> {API_URL}</p>
                                    <p><strong>Status:</strong> Cannot connect to blog API</p>
                                    
                                    <div className="mt-4">
                                        <h5 style={{ color: '#E60000', fontSize: '1rem', marginBottom: '1rem' }}>Possible Solutions:</h5>
                                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                                            <li>Check if the backend server is running</li>
                                            <li>Verify the API endpoint URL is correct</li>
                                            <li>Check CORS settings on the backend</li>
                                            <li>Look at browser console for more details</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-3 mt-4">
                                        <button 
                                            className="btn"
                                            style={{ 
                                                color: '#E60000', 
                                                borderColor: '#E60000',
                                                backgroundColor: 'transparent',
                                                padding: '0.5rem 1.5rem',
                                                borderRadius: '50px',
                                                border: '1px solid #E60000'
                                            }}
                                            onClick={debugAPI}
                                        >
                                            Debug API Connection
                                        </button>
                                        <button 
                                            className="btn"
                                            style={{ 
                                                color: '#E60000', 
                                                borderColor: '#E60000',
                                                backgroundColor: 'transparent',
                                                padding: '0.5rem 1.5rem',
                                                borderRadius: '50px',
                                                border: '1px solid #E60000'
                                            }}
                                            onClick={() => window.location.reload()}
                                        >
                                            Retry Connection
                                        </button>
                                    </div>
                                    
                                    {/* Fallback: Show placeholder blogs if API fails */}
                                    <div className="mt-5">
                                        <button 
                                            className="btn"
                                            style={{ 
                                                color: '#fff', 
                                                backgroundColor: '#E60000',
                                                padding: '0.5rem 1.5rem',
                                                borderRadius: '50px',
                                                border: '1px solid #E60000'
                                            }}
                                            onClick={() => {
                                                setApiStatus('success')
                                                setLoading(false)
                                                // Load demo data
                                                const demoBlogs = [
                                                    {
                                                        id: 1,
                                                        title: "Transforming Challenges into Opportunities",
                                                        short_description: "Learn how to turn business challenges into growth opportunities with our digital marketing strategies.",
                                                        banner_image: "/assets/img/blog/mblog1.png",
                                                        publish_date: new Date().toISOString().split('T')[0],
                                                        tags: "Marketing,Strategy",
                                                        author: "BTR Team"
                                                    },
                                                    {
                                                        id: 2,
                                                        title: "Design Inspiration: Where to Find Creative Ideas",
                                                        short_description: "Discover the best sources for design inspiration and creative thinking in the digital age.",
                                                        banner_image: "/assets/img/blog/mblog2.png",
                                                        publish_date: new Date().toISOString().split('T')[0],
                                                        tags: "Design,Creativity",
                                                        author: "BTR Team"
                                                    },
                                                    {
                                                        id: 3,
                                                        title: "Creating New Working Models in the Digital Era",
                                                        short_description: "Explore innovative working models and digital transformation strategies for modern businesses.",
                                                        banner_image: "/assets/img/blog/mblog3.png",
                                                        publish_date: new Date().toISOString().split('T')[0],
                                                        tags: "Digital,Transformation",
                                                        author: "BTR Team"
                                                    }
                                                ]
                                                setBlogs(demoBlogs)
                                            }}
                                        >
                                            Show Demo Blogs Instead
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    // No blogs found (but API is working)
    if (blogs.length === 0 && !loading) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog Grid">
                <section className="blog-grid pt-space pb-space" style={{ backgroundColor: '#000000', minHeight: '60vh' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <div className="no-blogs-message" style={{ padding: '60px 20px' }}>
                                    <i className="fas fa-newspaper fa-3x mb-4" style={{ color: '#E60000' }}></i>
                                    <h3 className="text-white mb-3">No Blog Posts Available</h3>
                                    <p className="text-white mb-4" style={{ opacity: '0.8' }}>
                                        There are no blog posts in the database yet.
                                    </p>
                                    <p className="text-white mb-4" style={{ opacity: '0.8', fontSize: '0.9rem' }}>
                                        API Status: <span style={{ color: '#00ff00' }}>Connected ✓</span>
                                    </p>
                                    <button 
                                        className="btn"
                                        style={{ 
                                            color: '#fff', 
                                            backgroundColor: '#E60000',
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '50px',
                                            border: '1px solid #E60000',
                                            marginTop: '1rem'
                                        }}
                                        onClick={debugAPI}
                                    >
                                        Refresh Blog List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog Grid">
            <section className="blog-grid pt-space pb-space" style={{ backgroundColor: '#000000' }}>
                <div className="container">
                    {/* Debug info bar (only in development) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mb-4 p-3" style={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                            border: '1px solid #E60000',
                            borderRadius: '8px'
                        }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-white" style={{ fontSize: '0.85rem' }}>
                                    <strong>API Status:</strong> {apiStatus === 'success' ? 'Connected ✓' : 'Error ✗'} | 
                                    <strong> Blogs:</strong> {blogs.length}
                                </span>
                                <button 
                                    onClick={debugAPI}
                                    style={{ 
                                        color: '#E60000', 
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Debug
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="row g-xxl-7 g-xl-6 g-6">
                        {blogs.map((blog, index) => (
                            <div key={blog.id || index} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="blog-widget-item">
                                    <div className="thumb w-100 overflow-hidden mb-xxl-7 mb-xl-6 mb-4">
                                        <img 
                                            src={blog.banner_image || getFallbackImage(index)} 
                                            alt={blog.title || "Blog Image"} 
                                            className="w-100 overflow-hidden" 
                                            style={{ 
                                                height: '250px', 
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = getFallbackImage(index)
                                            }}
                                        />
                                    </div>
                                    <div className="blog-cont">
                                        <div className="d-flex align-items-center gap-xxl-5 gap-xl-4 gap-3 mb-xxl-5 mb-xl-4 mb-3">
                                            <Link 
                                                href={`/blog-details/${blog.id || index}`} 
                                                className="radius-btn border-white radius100 py-xxl-1 py-1 px-xxl-4 px-3 text-white gap-xxl-4 gap-3 style-2"
                                                style={{ 
                                                    borderColor: '#E60000', 
                                                    color: '#E60000',
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}
                                            >
                                                {getFirstTag(blog.tags)}
                                                <span className="rot60 d-inline-block">
                                                    <i className="fas fa-arrow-up" style={{ color: '#E60000' }} />
                                                </span>
                                            </Link>
                                            <span className="bspan-clr" style={{ 
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '0.85rem'
                                            }}>
                                                {formatDate(blog.publish_date)}
                                            </span>
                                        </div>
                                        <h5 style={{ marginBottom: '0.5rem' }}>
                                            <Link 
                                                href={`/blog-details/${blog.id || index}`} 
                                                className="text-white"
                                                style={{ 
                                                    textDecoration: 'none',
                                                    fontSize: '1.25rem',
                                                    fontWeight: '600',
                                                    lineHeight: '1.4'
                                                }}
                                            >
                                                {blog.title || 'Untitled Blog Post'}
                                            </Link>
                                        </h5>
                                        {blog.short_description && (
                                            <p className="mt-3" style={{ 
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                marginBottom: '1rem'
                                            }}>
                                                {blog.short_description.length > 120 
                                                    ? `${blog.short_description.substring(0, 120)}...` 
                                                    : blog.short_description}
                                            </p>
                                        )}
                                        {blog.author && (
                                            <div className="d-flex align-items-center mt-3">
                                                <span style={{ 
                                                    color: 'rgba(255, 255, 255, 0.7)', 
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    <i className="fas fa-user" style={{ color: '#E60000', fontSize: '0.8rem' }}></i>
                                                    By: {blog.author}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Add hover effects and styles */}
                <style jsx global>{`
                    .blog-grid {
                        background-color: #000000 !important;
                    }
                    .blog-widget-item {
                        transition: transform 0.3s ease;
                    }
                    .blog-widget-item:hover {
                        transform: translateY(-10px);
                    }
                    .blog-widget-item:hover .thumb img {
                        transform: scale(1.05);
                    }
                    .blog-widget-item:hover h5 a {
                        color: #E60000 !important;
                        transition: color 0.3s ease;
                    }
                    .thumb {
                        position: relative;
                        overflow: hidden;
                        border-radius: 8px;
                    }
                    .thumb::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        z-index: 1;
                        border-radius: 8px;
                    }
                    .blog-widget-item:hover .thumb::before {
                        opacity: 1;
                    }
                    .rot60 {
                        transform: rotate(60deg);
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .bspan-clr {
                        white-space: nowrap;
                    }
                    .no-blogs-message i {
                        margin-bottom: 1.5rem;
                    }
                `}</style>
            </section>
        </Layout>
    )
}