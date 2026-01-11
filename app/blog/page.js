'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"

const API_URL = "https://btr.braventra.in";

export default function BlogList() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAllBlogs, setShowAllBlogs] = useState(false)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [categories, setCategories] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch blogs from API
    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await fetch(`${API_URL}/api/blogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            
            if (data.success && data.data) {
                // Sort by publish_date descending (newest first)
                const sortedBlogs = data.data.sort((a, b) => 
                    new Date(b.publish_date) - new Date(a.publish_date)
                )
                
                setBlogs(sortedBlogs)
                
                // Get 3 most recent blogs for sidebar
                setRecentBlogs(sortedBlogs.slice(0, 3))
                
                // Extract unique tags for categories
                const allTags = sortedBlogs.flatMap(blog => 
                    blog.tags ? blog.tags.split(',').map(tag => tag.trim()) : []
                )
                const uniqueTags = [...new Set(allTags.filter(tag => tag))]
                
                // Create categories with counts
                const categoryCounts = {}
                sortedBlogs.forEach(blog => {
                    if (blog.tags) {
                        blog.tags.split(',').forEach(tag => {
                            const trimmedTag = tag.trim()
                            if (trimmedTag) {
                                categoryCounts[trimmedTag] = (categoryCounts[trimmedTag] || 0) + 1
                            }
                        })
                    }
                })
                
                const categoryList = Object.keys(categoryCounts).map(tag => ({
                    name: tag,
                    count: categoryCounts[tag]
                })).slice(0, 6) // Limit to 6 categories
                
                setCategories(categoryList)
            } else {
                setBlogs([])
                setRecentBlogs([])
                setCategories([])
            }
        } catch (err) {
            console.error('Error fetching blogs:', err)
            setError('Failed to load blogs. Please try again later.')
            setBlogs([])
            setRecentBlogs([])
            setCategories([])
        } finally {
            setLoading(false)
        }
    }

    // Extract slug from title
    const getSlug = (title) => {
        if (!title) return ''
        return title.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 50)
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        } catch (error) {
            return dateString
        }
    }

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog => 
        searchTerm === '' || 
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Get blogs to display
    const getDisplayBlogs = () => {
        return showAllBlogs ? filteredBlogs : filteredBlogs.slice(0, 6)
    }

    const displayBlogs = getDisplayBlogs()

    if (loading) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog">
                <section className="blog-list pt-space pb-space">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-12 col-lg-8">
                                <div className="blog-post-details">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="single-blog-post cmn-border p-xxl-7 p-xl-6 p-lg-4 p-3 mb-xxl-7 mb-xl-7 mb-lg-6 mb-5">
                                            <div className="placeholder-glow">
                                                <div className="placeholder col-12" style={{height: '300px'}}></div>
                                                <div className="placeholder col-10 mt-4" style={{height: '20px'}}></div>
                                                <div className="placeholder col-8 mt-2" style={{height: '15px'}}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="blog-right-bar mt-lg-0 mt-4">
                                    <div className="placeholder-glow">
                                        <div className="placeholder col-12 mb-4" style={{height: '200px'}}></div>
                                        <div className="placeholder col-12 mb-4" style={{height: '300px'}}></div>
                                        <div className="placeholder col-12" style={{height: '200px'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    if (error) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog">
                <section className="blog-list pt-space pb-space">
                    <div className="container">
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
        )
    }

    return (
        <Layout 
            headerStyle={2} 
            footerStyle={3} 
            breadcrumbTitle="Blog"
            breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' }
            ]}
        >
            <section className="blog-list pt-space pb-space">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 col-lg-8">
                            <div className="blog-post-details">
                                {displayBlogs.length > 0 ? (
                                    displayBlogs.map((blog, index) => (
                                        <div key={blog.id} className="single-blog-post cmn-border p-xxl-7 p-xl-6 p-lg-4 p-3 mb-xxl-7 mb-xl-7 mb-lg-6 mb-5" 
                                            data-aos="fade-up" data-aos-duration={1400} data-aos-delay={index * 100}>
                                            {blog.banner_image && (
                                                <div className="post-featured-thumb w-100 mb-xxl-7 mb-xl-6 mb-5" data-aos="zoom-in" data-aos-duration={1400}>
                                                    <img 
                                                        src={`${API_URL}${blog.banner_image}`} 
                                                        alt={blog.title || 'Blog Image'} 
                                                        className="w-100"
                                                        style={{ height: '300px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="post-content">
                                                <div className="post-marry d-flex align-items-center gap-xxl-8 gap-xl-6 gap-4 gap-3 mb-xxl-6 mb-xl-5 mb-sm-4 mb-3" data-aos="fade-left" data-aos-duration={1500}>
                                                    <span>
                                                        Written by: <span className="tag-clr">{blog.author || 'Admin'}</span>
                                                    </span>
                                                    <i className="fas fa-circle white" />
                                                    <span className="tag-clr">
                                                        {formatDate(blog.publish_date)}
                                                    </span>
                                                </div>
                                                
                                                <h5 className="white mb-xxl-8 mb-xl-7 mb-sm-6 mb-5" data-aos="fade-left" data-aos-duration={1600}>
                                                    {blog.title || 'Untitled Blog'}
                                                </h5>
                                                
                                                <p className="pra-clr mb-xxl-10 mb-xl-8 mb-sm-7 mb-6" data-aos="fade-left" data-aos-duration={1550}>
                                                    {blog.short_description || blog.title || 'No description available.'}
                                                </p>
                                                
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <Link href={`/blog/${blog.id}`} className="blog-singelbtn d-center whitebg" data-aos="zoom-in" data-aos-duration={1400}>
                                                        <i className="fas fa-arrow-right" />
                                                    </Link>
                                                    
                                                    <button className="shapre-btn d-flex align-items-center gap-2 cmn-border py-xxl-3 py-2 px-xxl-6 px-4 pra-clr" 
                                                        data-aos="zoom-in-right" data-aos-duration={1600}
                                                        onClick={() => {
                                                            if (navigator.share) {
                                                                navigator.share({
                                                                    title: blog.title,
                                                                    text: blog.short_description,
                                                                    url: window.location.origin + `/blog/${blog.id}`
                                                                })
                                                            } else {
                                                                // Fallback: Copy to clipboard
                                                                navigator.clipboard.writeText(window.location.origin + `/blog/${blog.id}`)
                                                                alert('Link copied to clipboard!')
                                                            }
                                                        }}>
                                                        Share
                                                        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.5471 14.7982C14.493 14.7982 13.5433 15.2534 12.8842 15.9775L6.95572 12.3057C7.11849 11.8896 7.20194 11.4467 7.20176 11C7.20197 10.5532 7.11852 10.1103 6.95572 9.69429L12.8842 6.02232C13.5434 6.74642 14.493 7.20181 15.5471 7.20181C17.5327 7.20181 19.1481 5.58644 19.1481 3.60082C19.1481 1.61519 17.5327 0 15.5471 0C13.5615 0 11.9461 1.61536 11.9461 3.60099C11.9461 4.04774 12.0295 4.49056 12.1922 4.90663L6.26384 8.57848C5.6047 7.85437 4.65505 7.39899 3.60099 7.39899C1.61536 7.39899 0 9.01453 0 11C0 12.9856 1.61536 14.601 3.60099 14.601C4.65501 14.601 5.60475 14.1458 6.26384 13.4215L12.1922 17.0933C12.0295 17.5094 11.9461 17.9523 11.9461 18.3991C11.9461 20.3846 13.5615 22 15.5471 22C17.5327 22 19.1481 20.3846 19.1481 18.3992C19.1481 16.4135 17.5327 14.7982 15.5471 14.7982ZM13.2592 3.60099C13.2592 2.33943 14.2856 1.31308 15.5471 1.31308C16.8086 1.31308 17.835 2.33943 17.835 3.60099C17.835 4.86255 16.8087 5.8889 15.5471 5.8889C14.2855 5.8889 13.2592 4.86251 13.2592 3.60099ZM3.60099 13.2879C2.33926 13.2879 1.31291 12.2615 1.31291 11C1.31291 9.73846 2.33926 8.71207 3.60099 8.71207C4.86255 8.71207 5.88873 9.73846 5.88873 11C5.88873 12.2615 4.86251 13.2879 3.60099 13.2879ZM13.2592 18.399C13.2592 17.1375 14.2856 16.1111 15.5471 16.1111C16.8086 16.1111 17.835 17.1375 17.835 18.399C17.835 19.6605 16.8087 20.6869 15.5471 20.6869C14.2855 20.6869 13.2592 19.6605 13.2592 18.399V18.399Z" fill="#E3FF04" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <p className="white-clr">No blogs found.</p>
                                        {searchTerm && (
                                            <button 
                                                onClick={() => setSearchTerm('')}
                                                className="radius-btn d-inline-flex radius100 py-2 px-5 theme-border theme-clr gap-3 mt-3"
                                            >
                                                Clear Search
                                            </button>
                                        )}
                                    </div>
                                )}
                                
                                {/* Show All Blogs Button */}
                                {filteredBlogs.length > 6 && (
                                    <div className="text-center mt-5">
                                        <button 
                                            onClick={() => setShowAllBlogs(!showAllBlogs)}
                                            className="radius-btn d-inline-flex radius100 py-xxl-2 py-2 px-xxl-5 px-5 theme-border theme-clr gap-xxl-4 gap-3"
                                        >
                                            {showAllBlogs ? 'Show Less Blogs' : 'Show All Blogs'}
                                            <span className={`rot60 d-inline-block transition-all ${showAllBlogs ? 'rotate-180' : ''}`}>
                                                <i className={`fas fa-chevron-${showAllBlogs ? 'up' : 'down'} theme-clr`} />
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="col-12 col-lg-4">
                            <div className="blog-right-bar mt-lg-0 mt-4">
                                {/* Search Widget */}
                                <div className="box mb-xxl-10 mb-xl-8 mb-7">
                                    <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                        <h6>Search</h6>
                                    </div>
                                    <div className="search-widget" data-aos="zoom-in" data-aos-duration={1400}>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <input 
                                                type="text" 
                                                placeholder="Search here..." 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button type="submit"><i className="fas fa-search" /></button>
                                        </form>
                                    </div>
                                </div>
                                
                                {/* Categories Widget */}
                                {categories.length > 0 && (
                                    <div className="box mb-xxl-10 mb-xl-8 mb-7">
                                        <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                            <h6>Categories</h6>
                                        </div>
                                        <div className="category" data-aos="fade-down" data-aos-duration={1600}>
                                            <ul className="d-grid gap-xxl-3 gap-3">
                                                {categories.map((category, index) => (
                                                    <li key={index} data-aos="fade-down" data-aos-duration={1200 + (index * 100)}>
                                                        <button 
                                                            onClick={() => setSearchTerm(category.name)}
                                                            className="d-flex justify-content-between align-items-center w-100 bg-transparent border-0 text-start p-0"
                                                            style={{ color: '#fff', cursor: 'pointer' }}
                                                        >
                                                            <span>{category.name}</span>
                                                            <span className="tag-clr">({category.count})</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Recent Posts Widget */}
                                {recentBlogs.length > 0 && (
                                    <div className="box mb-xxl-10 mb-xl-8 mb-7">
                                        <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                            <h6>Recent Posts</h6>
                                        </div>
                                        <div className="recent-postwrap">
                                            {recentBlogs.map((blog, index) => (
                                                <div key={blog.id} className="recent-items d-flex align-items-center gap-xxl-5 gap-xl-4 gap-lg-3 gap-2 mb-3" 
                                                    data-aos="fade-down" data-aos-duration={1200 + (index * 200)}>
                                                    {blog.banner_image && (
                                                        <div className="recent-thumb" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                                            <img 
                                                                src={`${API_URL}${blog.banner_image}`} 
                                                                alt={blog.title || 'Recent Post'}
                                                                className="w-100 h-100"
                                                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="recent-content">
                                                        <span className="pra-clr d-block mb-1 fs14">
                                                            {formatDate(blog.publish_date)}
                                                        </span>
                                                        <Link href={`/blog/${blog.id}`} className="htheme">
                                                            {blog.title?.substring(0, 50) || 'Recent Post'}...
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Tags Widget */}
                                {categories.length > 0 && (
                                    <div className="box">
                                        <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                            <h6>Tags</h6>
                                        </div>
                                        <div className="tagwrap d-flex flex-wrap gap-xl-6 gap-lg-4 gap-md-3 gap-2">
                                            {categories.slice(0, 9).map((category, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSearchTerm(category.name)}
                                                    className="tag-btn bg-transparent border-0 p-0"
                                                    style={{ color: '#fff', cursor: 'pointer' }}
                                                    data-aos="fade-up" data-aos-duration={1400} data-aos-delay={index * 50}
                                                >
                                                    {category.name.toLowerCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .tag-btn {
                    color: #fff;
                    transition: all 0.3s ease;
                }
                .tag-btn:hover {
                    color: #e3ff04 !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .rotate-180 {
                    transform: rotate(180deg);
                }
                .recent-thumb {
                    min-width: 80px;
                    max-width: 80px;
                }
                .recent-content .htheme {
                    font-size: 14px;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </Layout>
    )
}