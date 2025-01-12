'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Heart } from 'lucide-react'
import Book from '../../../public/home/book.png'
import Books from '../../../public/home/books.jpg'
import RecentActivity from './RecentActivity';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const LandingPage = () => {
    const { toast } = useToast()

    const [token, settoken] = useState('true');

    useEffect(() => {
        // const token=localStorage.getItem('token')
        settoken(localStorage.getItem('logintoken'))
        console.log('token', token);



    }, [settoken])
    return (
        <>
            <section className="container mx-auto px-6 py-12 md:py-24 ">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[#363636]">
                            Best Place to Find Your Favourite Books.
                        </h2>
                        <p className="text-[#484848] text-lg">
                            Unleash your imagination with our online bookstore! Discover a vast selection of books
                            for all ages and interests, with something for everyone. Shop now and find your next
                            favorite read!
                        </p>
                        <Link href="/browse">
                            <button className="inline-flex mt-3 items-center px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors rounded-lg">
                                Browse
                            </button>
                        </Link>
                    </div>
                    <div className="relative h-[400px] md:h-[600px]">
                        <Image
                            src={Book}
                            fill
                            alt="Books"
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif">New Arrivals</h3>
                    <Link href={{
                        pathname: '/books',
                        query: { title: "Our New Arrivals" }

                    }

                    }
                        passHref>     <button className="text-gray-600 hover:text-black">See All →</button></Link>
                </div>

                <div className="grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {[
                        {
                            title: "A Tale of Two Cities",
                            price: "MMK: 16,100",
                            image: Books
                        },
                        {
                            title: "Animal Farm",
                            price: "MMK: 5,900",
                            image: Books
                        },
                        {
                            title: "Black House",
                            price: "MMK: 18,150",
                            image: Books
                        },
                        {
                            title: "Below Zero",
                            price: "MMK: 5,500",
                            image: Books
                        },
                        {
                            title: "Hooked",
                            price: "MMK: 7,500",
                            image: Books
                        }
                    ].map((book, index) => (
                        <div key={index} className="space-y-3 border-2 px-8 py-5 rounded-xl cursor-pointer">
                            <div className="relative aspect-[3/4] bg-gray-100">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <h4 className="font-medium">{book.title}</h4>
                            <p className="text-gray-600">{book.price}</p>
                            <div className="flex items-center space-x-2 ">
                                <button className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Added "${book.title.toUpperCase()}" to your cart `,
                                            description: "Great Choice 👉👈",

                                        }) :
                                            toast({
                                                title: `Login to Buy "${book.title.toUpperCase()} `,
                                                description: `${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                            })
                                    }}>
                                    Add To Cart
                                </button>
                                <button className="p-2 border border-gray-200 hover:border-gray-900"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Bookmarked "${book.title.toUpperCase()} `,
                                            description: "Great Choice 👉👈",

                                        }) : toast({
                                            title: `Login to Bookmark "${book.title.toUpperCase()}`,
                                            description: `"${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                        })
                                    }}
                                >
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif">Classic
                    </h3>
                    <Link href={{
                        pathname: '/books',
                        query: { title: "Classic" }

                    }

                    }
                        passHref>     <button className="text-gray-600 hover:text-black">See All →</button></Link>                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {[
                        {
                            title: "A Tale of Two Cities",
                            price: "MMK: 16,100",
                            image: Books
                        },
                        {
                            title: "Animal Farm",
                            price: "MMK: 5,900",
                            image: Books
                        },
                        {
                            title: "Black House",
                            price: "MMK: 18,150",
                            image: Books
                        },
                        {
                            title: "Below Zero",
                            price: "MMK: 5,500",
                            image: Books
                        },
                        {
                            title: "Hooked",
                            price: "MMK: 7,500",
                            image: Books
                        }
                    ].map((book, index) => (
                        <div key={index} className="space-y-3 cursor-pointer border-2 px-8 py-5 rounded-xl">
                            <div className="relative aspect-[3/4] bg-gray-100 ">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <h4 className="font-medium">{book.title}</h4>
                            <p className="text-gray-600">{book.price}</p>
                            <div className="flex items-center space-x-2 ">
                                <button className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Added "${book.title.toUpperCase()}" to your cart `,
                                            description: "Great Choice 👉👈",

                                        }) :
                                            toast({
                                                title: `Login to Buy "${book.title.toUpperCase()} `,
                                                description: `${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                            })
                                    }}>
                                    Add To Cart
                                </button>
                                <button className="p-2 border border-gray-200 hover:border-gray-900"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Bookmarked "${book.title.toUpperCase()}"  `,
                                            description: "Great Choice 👉👈",

                                        }) : toast({
                                            title: `Login to Bookmark "${book.title.toUpperCase()}`,
                                            description: `"${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                        })
                                    }}
                                >
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif">Fiction
                    </h3>
                    <Link href={{
                        pathname: '/books',
                        query: { title: "Fiction" }

                    }

                    }
                        passHref>     <button className="text-gray-600 hover:text-black">See All →</button></Link>                </div>

                <div className="grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {[
                        {
                            title: "A Tale of Two Cities",
                            price: "MMK: 16,100",
                            image: Books
                        },
                        {
                            title: "Animal Farm",
                            price: "MMK: 5,900",
                            image: Books
                        },
                        {
                            title: "Black House",
                            price: "MMK: 18,150",
                            image: Books
                        },
                        {
                            title: "Below Zero",
                            price: "MMK: 5,500",
                            image: Books
                        },
                        {
                            title: "Hooked",
                            price: "MMK: 7,500",
                            image: Books
                        }
                    ].map((book, index) => (
                        <div key={index} className=" cursor-pointer space-y-3 border-2 px-8 py-5 rounded-xl ">
                            <div className="relative aspect-[3/4] bg-gray-100">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <h4 className="font-medium">{book.title}</h4>
                            <p className="text-gray-600">{book.price}</p>
                            <div className="flex items-center space-x-2 ">
                                <button className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Added "${book.title.toUpperCase()}" to your cart `,
                                            description: "Great Choice 👉👈",

                                        }) :
                                            toast({
                                                title: `Login to Buy "${book.title.toUpperCase()} `,
                                                description: `${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                            })
                                    }}>
                                    Add To Cart
                                </button>
                                <button className="p-2 border border-gray-200 hover:border-gray-900"
                                    onClick={() => {
                                        token ? toast({
                                            title: `Bookmarked "${book.title.toUpperCase()}"  `,
                                            description: "Great Choice 👉👈",

                                        }) : toast({
                                            title: `Login to Bookmark "${book.title.toUpperCase()}`,
                                            description: `"${book.title.toUpperCase()}" is waiting for you 👉👈 `,

                                        })
                                    }}
                                >
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {
                token ? <RecentActivity /> : null
            }

        </>
    );
}

export default LandingPage;
