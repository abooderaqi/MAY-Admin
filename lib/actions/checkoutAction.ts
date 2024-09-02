import Stripe from "stripe"

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
})

export const checkOut = async (values: any) => {
  try {
    const { cartItems, customer } = values
    if (!cartItems || !customer) {
      throw new Error("Not enough data to checkout")
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["JO", "SA", "AE"] },
      shipping_options: [
        {
          shipping_rate: "shr_1Pt4rlP6cgEkjsFRWzTBJS1T",
        },
        { shipping_rate: "shr_1Pt4qnP6cgEkjsFRQ18fvfTy" },
      ],
      line_items: cartItems.map((cartItems: any) => ({
        priceData: {
          currency: "USD",
          product_data: {
            name: cartItems.item.title,
            metadata: {
              productId: cartItems.item.id,
              ...(cartItems.size && { size: cartItems.size }),
              ...(cartItems.color && { color: cartItems.color }),
            },
            unite_amount: cartItems.item.price * 100,
          },
          quantity: cartItems.quantity,
        },
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    })
    return session
  } catch (err) {
    console.log(err)
    throw err
  }
}
