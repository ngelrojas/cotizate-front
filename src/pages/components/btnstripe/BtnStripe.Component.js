import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Cotizate from './img/cotizate.svg'

const BtnStripe = ({campaingid, symbol, price}) => {
  const priceForStripe = price * 100
  const publishblekey = 'pk_test_UHR44yy7jg7NPjrx6nzz6gHh00lil3jFCj'
  const onToken = token => {
    console.log(token)
    console.log(campaingid)
    alert('payment successfully')
  }
  return (
    <StripeCheckout
      label="Contribuir"
      name="Cotizate"
      billingAddress
      shippingAddress
      image={Cotizate}
      description={`Total a pagar es: ${symbol} ${price}`}
      amount={priceForStripe}
      pangelLabel="contribuir"
      token={onToken}
      stripeKey={publishblekey}
    />
  )
}

export default BtnStripe
