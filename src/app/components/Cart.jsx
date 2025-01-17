'use client'

import { useEffect, useState } from 'react'
import { Minus, Plus, X, ArrowLeft, ShoppingCart, EqualApproximatelyIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import book from '../../../public/home/books.jpg'
import { useToast } from '@/hooks/use-toast';
import GlobalApi from '../utils/GlobalApi'


export default function CartPage() {
    const { toast } = useToast()
    const [userdata, setuserdata] = useState([]);

    const [cartItems, setCartItems] = useState([

    ])

    const [orderNotes, setOrderNotes] = useState('')
    const [couponCode, setCouponCode] = useState('')

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        )
    }





    const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : 0;


    const [token, settoken] = useState('true');

    const GetOrderItems = async () => {

        try {


            const Userdata = JSON.parse(userdata);




            const response = await GlobalApi.GetOrderItems(Userdata._id);

            console.log(response);
            setCartItems(response)


        } catch (error) {

            console.log('error', error);

        }
    }



    const removeItem = async (id) => {

        try {
            const response = await GlobalApi.DeleteItem(id);


            GetOrderItems();

        } catch (error) {
            console.log('error', error);

        }
    }


    const CreateCart = async () => {
        try {

            if (!totalPrice) {
                return;
            }


            if(!token)
            {
                toast({
                    title: `Login to Checkout `,
                    description: `Your items are waiting for you 👉👈 `,

                })
    
                return;
            }

            const Userdata = JSON.parse(userdata);

            const response = await GlobalApi.CreateCart(
                "67883f3fdc1e5a8a9af13e88", Userdata._id, couponCode, totalPrice, orderNotes
            )



            toast({
                title: `Checkout Completed `,
                description: "Great Choice 👉👈",

            })

        } catch (error) {
            console.log('error', error);
            toast({
                title: `Some Error Occured `,
                description: `Please try again Later.. `,

            })
    


        }
    }

    useEffect(() => {
        settoken(localStorage.getItem('XLogined'))
        setuserdata(localStorage.getItem('XLogined'));



    }, [token])


    useEffect(() => {
        GetOrderItems();
    }, [token])

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-serif mb-6 sm:mb-8">My Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8 max-md:grid-cols-1">
                <div className="lg:col-span-2">
                    <div className="w-full">
                        {/* Mobile view */}
                        <div className="md:hidden space-y-4">
                            {(Array.isArray(cartItems) ? cartItems : []).map((item) => (
                                <div key={item._id} className="bg-white shadow rounded-lg p-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0 h-20 w-16 relative">
                                            <Image
                                                src={book}
                                                alt="book"
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-sm font-medium text-gray-900">{item.book.title}</h3>
                                            <p className="text-sm text-gray-500">{item.price} $</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-600 hover:text-red-900"
                                            aria-label="Remove item"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Total: {item.price * item.quantity} $
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop view */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full table-auto divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-4 py-2 text-right">
                                            <span className="sr-only">Remove</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(Array.isArray(cartItems) ? cartItems : []).map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-16 w-12 relative">
                                                        <Image
                                                            src={book}
                                                            alt="book"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.book.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.price} $</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.price * item.quantity} $</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    aria-label="Remove item"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {cartItems.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <Link
                                href="/"
                                className="text-primary hover:text-primary/90"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    )}
                </div>

                <div className="space-y-6 mt-8 lg:mt-0">
                    <div>
                        <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-2">
                            Order Notes
                        </label>
                        <textarea
                            id="orderNotes"
                            rows={4}
                            className="w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm resize-none"
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            id="couponCode"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Coupon code will be applied on the checkout
                        </p>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-base font-medium text-gray-900">Total Price :</span>
                            <span className="text-base font-medium text-gray-900">{totalPrice.toFixed(2)} $</span>
                        </div>

                        <button
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0}
                            onClick={() => {
                                CreateCart()
                            }}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Checkout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    href="/"
                    className="inline-flex border-b-4 py-2 border-dotted items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}
