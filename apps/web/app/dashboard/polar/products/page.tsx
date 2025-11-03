'use client';

import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/polar/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <Card key={product.id}>
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{product.description}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}
