"use client"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
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
    <div>
      <h1>Produtos:</h1>
      <ul>
        {data?.products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.photo} alt="" height={100} width={100}/>
            <p>Marca: {product.brand}</p>
            <p>Descrição: {product.description}</p>
            <p>Preço: R$ {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}








