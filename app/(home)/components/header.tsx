/* eslint-disable react/jsx-key */
"use client";

import "../styles/header.scss";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
    id: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
}

const Header = ({ cartItems, setCartItems }: { cartItems: CartItem[], setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>> }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleIncreaseQuantity = (item: CartItem) => {
        const updatedItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartItems(updatedItems);
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        const updatedItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCartItems(updatedItems);
    };

    const handleAddToCart = (product: CartItem) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            handleIncreaseQuantity(existingItem);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <header>
            <div className="content-header">
                <div className="logo">
                    <h1>MKS</h1>
                    <span>Sistemas</span>
                </div>

                <div className="car">
                    <button onClick={toggleMenu}>
                        <Image src="/Vector.png" alt="Car Icon" width={19} height={18}/>
                        <div className="quantity-items">
                            <span>{cartItems.length}</span>
                        </div>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="menu-lateral"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ ease: 'easeOut', duration: 0.3 }}
                        style={{ position: 'fixed', top: 0, right: 0 }}
                    >
                        <div className="close-btn">
                            <h2>Carrinho <br /> de compras</h2>
                            <button onClick={toggleMenu}>
                                <Image src="/Close_cart.png" alt="" height={38} width={38} />
                            </button>
                        </div>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <div className="product-info">
                                        <Image src={item.photo} alt="" width={0} height={0} sizes="100vw" style={{ width: '20%', height: 'auto' }}/>
                                        <p className="item-name">{item.name}</p>
                                        <div className="price-and-qty">
                                            <span>Qtd:</span>
                                            <div className="qty">
                                                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                                <div className="divider"></div>
                                                <p>{item.quantity}</p>
                                                <div className="divider"></div>
                                                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                            </div>
                                        </div>
                                        <p className="item-price">R${(Number(item.price) * item.quantity).toFixed(0)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="total-buy">
                            <div className="total-price">
                                <p>Total:</p>
                                <span>R${calculateTotalPrice().toFixed(2)}</span>
                            </div>
                            <button className="final-buy">
                                <p>Finalizar compra</p>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;





