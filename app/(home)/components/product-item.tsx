/* eslint-disable react/jsx-key */
"use client"

import "../styles/product-item.scss"
import React, { useState } from 'react';
import Image from 'next/image';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Header from './header';

const queryClient = new QueryClient();

const ProductItem = () => {
    const [cartItems, setCartItems] = useState([]); // Estado para armazenar os itens do carrinho

    const addToCart = (product) => {
      const updatedProduct = {
          ...product,
          quantity: 1 // Definindo a quantidade inicial como 1 ao adicionar o produto ao carrinho
      };
      setCartItems([...cartItems, updatedProduct]); // Adiciona o produto ao carrinho
  };

    return (
        <div>
            <Header cartItems={cartItems} setCartItems={setCartItems} /> {/* Passa a lista de itens do carrinho e a função setCartItems como propriedades para o cabeçalho */}
            <QueryClientProvider client={queryClient}>
                <Example addToCart={addToCart} />
            </QueryClientProvider>
        </div>
    );
}

function Example({ addToCart }) {
    const { isFetching, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC').then((res) =>
                res.json(),
            ),
    });

    if (isFetching) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className="content-products-all">
            <div className="products">
                {data?.products.map(product => (
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
                            <button onClick={() => addToCart(product)}> {/* Adiciona o produto ao carrinho ao clicar */}
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



