'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useParams, useRouter } from 'next/navigation'

const API_URL = "https://btr.braventra.in";

export default function BlogDetails() {
    const { id } = useParams()
    const router = useRouter()
    const [blog, setBlog] = useState(null)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch blog details and recent blogs
    useEffect(() => {
        if (id) {
            fetchBlogDetails()
        }
    }, [id])

    const fetchBlogDetails = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Fetch current blog
            const blogResponse = await fetch(`${API_URL}/api/blogs/${id}`)
            const blogData = await blogResponse.json()
            
            if (blogData.success && blogData.data) {
                setBlog(blogData.data)
                
                // Fetch recent blogs for sidebar
                const recentResponse = await fetch(`${API_URL}/api/blogs`)
                const recentData = await recentResponse.json()
                
                if (recentData.success && recentData.data) {
                    // Get 3 most recent blogs excluding current one
                    const recent = recentData.data
                        .filter(b => b.id !== blogData.data.id)
                        .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
                        .slice(0, 3)
                    
                    setRecentBlogs(recent)
                }
            } else {
                setError('Blog not found')
            }
        } catch (err) {
            console.error('Error fetching blog details:', err)
            setError('Failed to load blog details. Please try again later.')
        } finally {
            setLoading(false)
        }
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

    // Parse tags
    const parseTags = (tagsString) => {
        if (!tagsString) return []
        return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    if (loading) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Loading...">
                <section className="blog-details pt-space pb-space">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-12 col-lg-8">
                                <div className="placeholder-glow">
                                    <div className="placeholder col-12" style={{height: '400px'}}></div>
                                    <div className="placeholder col-10 mt-4" style={{height: '40px'}}></div>
                                    <div className="placeholder col-8 mt-3" style={{height: '20px'}}></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
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

    if (error || !blog) {
        return (
            <Layout headerStyle={2} footerStyle={3} breadcrumbTitle="Blog Not Found">
                <section className="blog-details pt-space pb-space">
                    <div className="container">
                        <div className="text-center py-5">
                            <h3 className="white-clr mb-4">{error || 'Blog not found'}</h3>
                            <Link href="/blog" className="radius-btn cmn-border radius100 py-2 px-5 theme-clr">
                                Back to Blogs
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    const tags = parseTags(blog.tags)

    return (
        <Layout 
            headerStyle={2} 
            footerStyle={3} 
            breadcrumbTitle={blog.title || 'Blog Details'}
            breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: blog.title || 'Details', href: `/blog/${id}` }
            ]}
        >
            <section className="blog-details pt-space pb-space">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 col-lg-8">
                            <div className="blog-post-details mb-xxl-10 mb-xl-8 mb-lg-7 mb-6">
                                <div className="single-blog-post">
                                    {blog.banner_image && (
                                        <div className="post-featured-thumb w-100 mb-xxl-30 mb-xl-6 mb-5" data-aos="zoom-in" data-aos-duration={1400}>
                                            <img 
                                                src={`${API_URL}${blog.banner_image}`} 
                                                alt={blog.title || 'Blog Image'} 
                                                className="w-100"
                                                style={{ height: '400px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="post-content">
                                        <div className="post-marry d-flex align-items-center gap-xxl-8 gap-xl-6 gap-4 gap-3 mb-xxl-5 mb-xl-4 mb-lg-3 mb-3" data-aos="fade-left" data-aos-duration={1500}>
                                            <span>
                                                Written by: <span className="tag-clr">{blog.author || 'Admin'}</span>
                                            </span>
                                            <i className="fas fa-circle white" />
                                            <span className="tag-clr">
                                                {formatDate(blog.publish_date)}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-xxl-13 mb-xl-10 mb-lg-8 mb-7">
                                            <h5 className="white mb-xxl-5 mb-3" data-aos="fade-left" data-aos-duration={1600}>
                                                {blog.title || 'Untitled Blog'}
                                            </h5>
                                            
                                            <div className="pra-clr mb-xxl-5 mb-3" 
                                                data-aos="fade-left" data-aos-duration={1550}
                                                dangerouslySetInnerHTML={{ __html: blog.full_content || blog.short_description || 'No content available.' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tags and Share */}
                            {tags.length > 0 && (
                                <div className="tag-share d-sm-flex d-grid align-items-center justify-content-sm-between justify-content-center mb-xxl-8 mb-xl-7 mb-5 gap-3" data-aos="zoom-in" data-aos-duration={1400}>
                                    <div className="tag d-flex justify-content-sm-start justify-content-center align-items-center gap-xxl-4 gap-3">
                                        Tags:
                                        <ul className="taglist d-flex align-items-center gap-xxl-3 gap-xl-2 gap-1">
                                            {tags.map((tag, index) => (
                                                <li key={index}>
                                                    <Link href={`/blog?search=${encodeURIComponent(tag)}`} className="tag-clr">
                                                        {tag}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="d-flex align-items-center justify-content-sm-start justify-content-center gap-xxl-4 gap-3">
                                        Share:
                                        <ul className="common-social d-flex align-items-center gap-2">
                                            <li data-aos="zoom-in-right" data-aos-duration={1400}>
                                                <button 
                                                    onClick={() => {
                                                        const url = window.location.href
                                                        const text = blog.title
                                                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank')
                                                    }}
                                                    className="d-center bg-transparent border-0"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <svg width={10} height={16} viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8" clipPath="url(#clip0_6308_2802)">
                                                            <path d="M8.72266 9L9.16703 6.10437H6.38859V4.22531C6.38859 3.43313 6.77672 2.66094 8.02109 2.66094H9.28422V0.195625C9.28422 0.195625 8.13797 0 7.04203 0C4.75391 0 3.25828 1.38688 3.25828 3.8975V6.10437H0.714844V9H3.25828V16H6.38859V9H8.72266Z" fill="white" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_6308_2802">
                                                                <rect width={10} height={16} fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </li>
                                            <li data-aos="zoom-in-right" data-aos-duration={1600}>
                                                <button 
                                                    onClick={() => {
                                                        const url = window.location.href
                                                        const text = blog.title
                                                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
                                                    }}
                                                    className="d-center bg-transparent border-0"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.3553 4.74149C14.3655 4.88362 14.3655 5.02577 14.3655 5.1679C14.3655 9.5029 11.066 14.4978 5.03553 14.4978C3.17766 14.4978 1.45178 13.9597 0 13.0258C0.263969 13.0562 0.51775 13.0664 0.791875 13.0664C2.32484 13.0664 3.73603 12.5486 4.86294 11.6654C3.42131 11.6349 2.21319 10.6907 1.79694 9.39124C2 9.42168 2.20303 9.44199 2.41625 9.44199C2.71066 9.44199 3.00509 9.40137 3.27919 9.33034C1.77666 9.02574 0.649719 7.70596 0.649719 6.11205V6.07146C1.08625 6.31512 1.59391 6.4674 2.13194 6.48768C1.24869 5.89884 0.670031 4.89377 0.670031 3.75671C0.670031 3.14759 0.832437 2.58921 1.11672 2.1019C2.73094 4.09174 5.15734 5.39121 7.87812 5.53337C7.82737 5.28971 7.79691 5.03593 7.79691 4.78212C7.79691 2.97499 9.25884 1.50293 11.0761 1.50293C12.0202 1.50293 12.873 1.89887 13.472 2.53846C14.2131 2.39634 14.9238 2.12221 15.5532 1.74659C15.3096 2.50802 14.7918 3.14762 14.1116 3.55368C14.7715 3.48265 15.4111 3.29987 15.9999 3.04609C15.5533 3.6958 14.9949 4.27446 14.3553 4.74149V4.74149Z" fill="white" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            
                            {/* Navigation */}
                            <div className="nextprevius-text d-flex align-items-center justify-content-between mb-xxl-6 mb-xl-5 mb-4">
                                <Link href="/blog" className="d-flex align-items-center gap-3" data-aos="zoom-in-left" data-aos-duration={1500}>
                                    <i className="fas fa-arrow-left" />
                                    <span className="dd-clr">
                                        Back to Blogs
                                    </span>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Sidebar */}
                        <div className="col-12 col-lg-4">
                            <div className="blog-right-bar mt-lg-0 mt-4">
                                {/* Recent Posts */}
                                {recentBlogs.length > 0 && (
                                    <div className="box mb-xxl-10 mb-xl-8 mb-7">
                                        <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                            <h6>Recent Posts</h6>
                                        </div>
                                        <div className="recent-postwrap">
                                            {recentBlogs.map((recentBlog, index) => (
                                                <div key={recentBlog.id} className="recent-items d-flex align-items-center gap-xxl-5 gap-xl-4 gap-lg-3 gap-2 mb-3" 
                                                    data-aos="fade-down" data-aos-duration={1200 + (index * 200)}>
                                                    {recentBlog.banner_image && (
                                                        <div className="recent-thumb" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                                            <img 
                                                                src={`${API_URL}${recentBlog.banner_image}`} 
                                                                alt={recentBlog.title || 'Recent Post'}
                                                                className="w-100 h-100"
                                                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="recent-content">
                                                        <span className="pra-clr d-block mb-1 fs14">
                                                            {formatDate(recentBlog.publish_date)}
                                                        </span>
                                                        <Link href={`/blog/${recentBlog.id}`} className="htheme">
                                                            {recentBlog.title?.substring(0, 50) || 'Recent Post'}...
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Tags */}
                                {tags.length > 0 && (
                                    <div className="box">
                                        <div className="wid-title" data-aos="fade-left" data-aos-duration={1600}>
                                            <h6>Tags</h6>
                                        </div>
                                        <div className="tagwrap d-flex flex-wrap gap-xl-6 gap-lg-4 gap-md-3 gap-2">
                                            {tags.map((tag, index) => (
                                                <Link 
                                                    key={index}
                                                    href={`/blog?search=${encodeURIComponent(tag)}`}
                                                    className="tag-link"
                                                    data-aos="fade-up" data-aos-duration={1400} data-aos-delay={index * 50}
                                                >
                                                    {tag.toLowerCase()}
                                                </Link>
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
                .tag-link {
                    color: #fff;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .tag-link:hover {
                    color: #e3ff04 !important;
                }
                .pra-clr {
                    line-height: 1.8;
                }
                .pra-clr h1, .pra-clr h2, .pra-clr h3, .pra-clr h4, .pra-clr h5, .pra-clr h6 {
                    color: #fff;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }
                .pra-clr p {
                    margin-bottom: 1.5rem;
                }
                .pra-clr ul, .pra-clr ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .pra-clr li {
                    margin-bottom: 0.5rem;
                }
                .pra-clr img {
                    max-width: 100%;
                    height: auto;
                    margin: 1.5rem 0;
                    border-radius: 8px;
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