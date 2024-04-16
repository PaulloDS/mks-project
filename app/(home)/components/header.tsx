"use client"

import "../styles/header.scss"
// Header.js
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Defina os tipos de CartItem e Props
interface CartItem {
    id: number;
    name: string;
    photo: string;
    price: number;
    quantity: number;
}

interface Props {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Header: React.FC<Props> = ({ cartItems, setCartItems }) => {
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
        setCartItems(updatedItems); // Atualiza a lista de itens do carrinho
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        const updatedItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCartItems(updatedItems); // Atualiza a lista de itens do carrinho
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
                        <Image src="/Vector.png" alt="Car Icon" width={19} height={18} />
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
                                        <Image src={item.photo} alt="" width={0} height={0} sizes="100vw" style={{ width: '20%', height: 'auto' }} />
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

                        <div style={{ position: 'absolute', bottom: 0 }}>
                            Total:
                            {/* Exibir o total dos itens do carrinho */}
                            <div className="final-buy">
                                <p>Finalizar compra</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;





