import { Widget } from '@/components'
import { Product, products } from '@/products/data/products'
import { ItemCard } from '@/shopping-cart'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Mi carrito',
  description: 'Mi Carrito - Next.js',
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: {
  [key: string]: number
}): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id)
    if (product) {
      productsInCart.push({
        product,
        quantity: cart[id],
      })
    }
  }

  return productsInCart
}

export default function CartPage() {
  const cookiesStore = cookies()
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}')
  const products = getProductsInCart(cart)

  const totalToPay = products.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="w-full flex flex-col gap-2 sm:w-8/12">
          <h1 className="text-2xl">Mi lista</h1>
          <hr className="mb-2 " />
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="w-full flex flex-col gap-2 sm:w-4/12">
          <h1 className="text-2xl">Resumen</h1>
          <hr className="mb-2 " />
          <Widget
            title="Total"
            subtitle={`Impuestos de 15% ($${totalToPay * 0.15})`}
          >
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                $ {(totalToPay * 1.15).toFixed(2)}
              </h3>
              {/* <div className="flex items-end gap-1 text-green-500">
              <svg
                className="w-3"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                  fill="currentColor"
                />
              </svg>
              <span>2%</span>
            </div> */}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  )
}
