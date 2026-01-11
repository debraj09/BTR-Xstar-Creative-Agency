'use client'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"

// API Configuration
const API_URL = "https://btr.braventra.in";

export default function HomeServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAccordion, setIsAccordion] = useState(null);

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
                    // Filter only active services and take only first 5 for homepage
                    const activeServices = data.data.filter(service => service.is_active === 1 || service.is_active === true);
                    const limitedServices = activeServices.slice(0, 5); // Only show first 5 on homepage
                    setServices(limitedServices);
                    
                    // Set first service as active accordion by default
                    if (limitedServices.length > 0) {
                        setIsAccordion(limitedServices[0].id);
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

    return (
        <Layout>
            <div className="services-container">
                {loading && <p>Loading services...</p>}
                {error && <p className="error">{error}</p>}
                {services.length > 0 && (
                    <div className="services-list">
                        {services.map((service, index) => (
                            <div key={service.id} className="service-item">
                                {service.image_url && (
                                    <div className="tab-remove-thumb">
                                        <img 
                                            src={`${API_URL}${service.image_url}`} 
                                            alt={service.name}
                                            className="img-fluid"
                                            style={{ 
                                                maxWidth: '200px', 
                                                height: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </div>
                                )}
                                <h3>{getServiceNumber(index)} - {service.name}</h3>
                                <p>{truncateDescription(service.description)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}