'use client'
import React, { useEffect ,useState} from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react'
import Book from '../../../public/home/books.jpg'
import { useSearchParams } from 'next/navigation';

const Books = ({ req }) => {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(null);

    useEffect(() => {
        const titleParam = searchParams.get('title');
        setTitle(titleParam);
    }, [searchParams]);

    return (
        <>
            <section className="container mx-auto px-6 py-12">
                <div className="mb-8">
                    <h3 className="text-2xl font-serif text-center">{title}</h3>

                </div>

                <div className="grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {[
                        {
                            title: "A Tale of Two Cities",
                            price: "MMK: 16,100",
                            image: Book
                        },
                        {
                            title: "Animal Farm",
                            price: "MMK: 5,900",
                            image: Book
                        },
                        {
                            title: "Black House",
                            price: "MMK: 18,150",
                            image: Book
                        },
                        {
                            title: "Below Zero",
                            price: "MMK: 5,500",
                            image: Book
                        },
                        {
                            title: "Hooked",
                            price: "MMK: 7,500",
                            image: Book
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
                                <button className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700">
                                    Add To Cart
                                </button>
                                <button className="p-2 border border-gray-200 hover:border-gray-900">
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Books;
