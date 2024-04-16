"use client";

import "../styles/product-item.scss";
import React, { useState } from 'react';
import Image from 'next/image';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Header from './header';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'

const queryClient = new QueryClient();

interface Product {
    id: string;
    name: string;
    photo: string;
    price: number;
}

interface CartItem {
    id: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
}

const LoadingProduct = () => (
    <div className="product-item">
        <div className="image">
            <Skeleton width={100} height={100} />
        </div>
        <div className="info-item">
            <div className="values">
                <Skeleton width={150} height={20} />
            </div>
            <div className="description">
                <Skeleton count={2} />
            </div>
        </div>
        <div className="buy">
            <Skeleton width={80} height={0} />
        </div>
    </div>
);

const ProductItem = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            const updatedItems = cartItems.map(item => {
                if (item.id === existingItem.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItems(updatedItems);
        } else {
            const newCartItem: CartItem = {
                id: product.id,
                name: product.name,
                photo: product.photo,
                price: product.price,
                quantity: 1
            };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    return (
        <div>
            <Header cartItems={cartItems} setCartItems={setCartItems} />
            <QueryClientProvider client={queryClient}>
                <Example addToCart={addToCart} />
            </QueryClientProvider>
        </div>
    );
}

function Example({ addToCart }: { addToCart: (product: Product) => void }) {
    const { isFetching, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC').then((res) =>
                res.json(),
            ),
    });

    if (isFetching) {
        const skeletonArray = Array.from({ length: data?.products.length || 8 }, (_, index) => index);
        return (
            <div className="content-products-all">
                <div className="products">
                    {skeletonArray.map((_, index) => (
                        <LoadingProduct key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className="content-products-all">
            <div className="products">
                {data?.products.map((product: Product) => (
                    <div className="product-item" key={product.id}>
                        <div className="image">
                            <Image src={product.photo} alt="" width={0} height={0} sizes="100vw" style={{ width: '60%', height: 'auto' }}/>
                        </div>
                        <div className="info-item">
                            <div className="values">
                                <p className="name">{product.name}</p>
                                <p className="price">R${Number(product.price).toFixed(0)}</p>
                            </div>
                            <div className="description">
                                <p>Redesigned from scratch and completely revised.</p>
                            </div>
                        </div>
                        <div className="buy">
                            <button onClick={() => addToCart(product)}>
                                <Image src="/shopping-bag.png" alt="" width={12} height={13.5}/>
                                <p>COMPRAR</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductItem;



