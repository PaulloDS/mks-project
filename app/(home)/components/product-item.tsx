"use client"

import "../styles/product-item.scss"
import Image from "next/image"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ProductItem() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isFetching, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC').then((res) =>
        res.json(),
      ),
  })

  if (isFetching) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="products">
      {data?.products.map(product => (
        <div className="product-item">
          <Image src={product.photo} alt="" width={111} height={138} />
          <div className="info-item">
            <h2 className="name">{product.name}</h2>
            <p className="price">R$ {product.price}</p>
          </div>
          <div className="description">
            <p>{product.description}</p>
          </div>
          <div className="buy">
            <button>
               COMPRAR
            </button>
          </div>
        </div>        
      ))}
    </div>
  )
}