import { hasCookie, getCookie, setCookie } from 'cookies-next';


export function getCookieCart():{[id:string]:number} {
    if( hasCookie('cart') ){
        const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' )

        return cookieCart
    }
    return {}
}


export function addProductToCart (id:string) {
    const cookieCart = getCookieCart()
    if ( cookieCart[id] ) {
        cookieCart[id]++
    } else {
        cookieCart[id] = 1
    } 

    setCookie('cart', JSON.stringify(cookieCart))
}


export function removeProductFromCart (id:string) {
    const cookieCart = getCookieCart()
    delete cookieCart[id]
    setCookie('cart', JSON.stringify(cookieCart))
}

export function removeSingleProductFromCart (id:string) {
    const cookieCart = getCookieCart()
    if ( cookieCart[id] > 1 ) {
        cookieCart[id]--
    } 
    else delete cookieCart[id]
    setCookie('cart', JSON.stringify(cookieCart))
}
