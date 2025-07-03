'use client';

import { useState, useEffect } from 'react';

export default function CheckoutLinksPage() {
    const [checkoutLinks, setCheckoutLinks] = useState([]);

    useEffect(() => {
        const fetchCheckoutLinks = async () => {
            const response = await fetch('/api/polar/checkout-links');
            const data = await response.json();
            setCheckoutLinks(data);
        };

        fetchCheckoutLinks();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Checkout Links</h1>
            <ul>
                {checkoutLinks.map((link: any) => (
                    <li key={link.id}>{link.url}</li>
                ))}
            </ul>
        </div>
    );
}
