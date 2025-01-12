'use client'

import { useEffect, useState } from 'react'
import { Box, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([
        { id: 1, title: "Book Title 1", status: "Available", price: "$10" },
        { id: 2, title: "Book Title 2", status: "Out of Stock", price: "$15" },
        { id: 3, title: "Book Title 3", status: "Out of Stock", price: "$20" },
    ])

    const handleRemoveItem = (id) => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }
     const [token, settoken] = useState('true');
    
        useEffect(()=>{
            // const token=localStorage.getItem('token')
            settoken(localStorage.getItem('logintoken'))
            console.log('token',token);
            
        
            
        },[settoken])

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-serif mb-8">My Wishlist</h1>

            {/* Responsive Table */}
            <div className="w-full overflow-x-auto mb-8">
                {wishlistItems.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3">Book Title</th>
                                <th className="text-left px-6 py-3">Status</th>
                                <th className="text-left px-6 py-3">Price</th>
                                <th className="text-left px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistItems.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-6 py-4 text-left">{item.title}</td>
                                    <td className="px-6 py-4 text-left">{item.status}</td>
                                    <td className="px-6 py-4 text-left">{item.price}</td>
                                    <td className="px-6 py-4 text-left">
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Empty State
                    <div className="text-center py-16">
                        <div className="flex justify-center mb-4">
                            <Box className="h-16 w-16 text-gray-400" />
                        </div>
                      {
                        token?  <p className="text-gray-600">Wishlist is empty!</p>:  <p className="text-gray-600">Login to fill your Wishlist!</p>
                      }
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                    href="/"
                    className="flex border-b-4 py-2 border-dotted  items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>

              {
                token ?   <button
                className="w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={wishlistItems.length === 0}
                onClick={() => console.log('Add all to cart')}
            >
                <ShoppingCart className="h-4 w-4" />
                Add All To Cart
            </button>: nullr
              }
            </div>
        </div>
    )
}
