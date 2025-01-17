'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Book from '../../../public/home/books.jpg';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import GlobalApi from '../utils/GlobalApi';

const BooksContent = () => {
    const { toast } = useToast()
    const [token, settoken] = useState('true');
    const [userdata, setuserdata] = useState([]);
    const [books, setbooks] = useState([]);




    const searchParams = useSearchParams();
    const [title, setTitle] = useState(null);
    const [types, settype] = useState('');


    const GetBooks = async (type) => {

        try {


            let response = null;



            if (type === "New") {
                response = await GlobalApi.GetBooks();
            }
            else {
                response = await GlobalApi.GetBookByType(type);
            }

            setbooks(response);

        } catch (error) {
            console.log('error', error);


        }
    }


    const HandleOrder = async (price, bookid, bookname) => {
        if (!token) {
            toast({
                title: `Login to Buy "${bookname.toUpperCase()} `,
                description: `${bookname.toUpperCase()}" is waiting for you 👉👈 `,

            })
            return;
        }


        try {


            const userData = JSON.parse(userdata);

            const response = await GlobalApi.CreateOrder(bookid, userData._id, price);



            if (response.status === 500 || response.status === 400) {



                toast({
                    title: 'Error Creating Order',
                    description: "Error",
                });

            }

            if (response.status === 200) {
                toast({
                    title: `Added "${bookname.toUpperCase()}" to your cart `,
                    description: "Great Choice 👉👈",
                });
            }


        } catch (error) {
            console.log('error', error);

        }



    }


    const HandleWishList = async (bookid, bookname) => {
        if (!token) {
            toast({
                title: `Login to Bookmark "${bookname.toUpperCase()} `,
                description: `${bookname.toUpperCase()}" is waiting for you 👉👈 `,

            })
            return;
        }
        try {
            const userData = JSON.parse(userdata);

            const response = await GlobalApi.AddToWishList(bookid, userData._id)

    
                toast({
                    title: `Bookmarked "${bookname.toUpperCase()} `,
                    description: "Great Choice 👉👈",
                });
            

        } catch (error) {
            console.log(error);
            toast({
                title: 'Error while Bookmark ',
                description: "Error",
            });



        }
    }

    useEffect(() => {
        const titleParam = searchParams.get('title');
        setTitle(titleParam);
        const typeParams = searchParams.get('type');


        GetBooks(typeParams)


    }, [searchParams]);

    useEffect(() => {

        settoken(localStorage.getItem('XLogined'));

        setuserdata(localStorage.getItem('XLogined'));




    }, [settoken])



    return (
        <section className="container mx-auto px-6 py-12">
            <div className="mb-8">
                <h3 className="text-2xl font-serif text-center">{title || "Books"}</h3>
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {books.map((book, index) => (
                    <div key={index} className="space-y-3 border-2 px-8 py-5 rounded-xl cursor-pointer">
                        <div className="relative aspect-[3/4] bg-gray-100">
                            <Image
                                src={Book}
                                alt="Book"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-gray-600">{book.price}</p>
                        <div className="flex items-center space-x-2 ">
                            <button className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700"
                                onClick={() => HandleOrder(book.price, book._id, book.title)}>
                                Add To Cart
                            </button>
                            <button className="p-2 border border-gray-200 hover:border-gray-900"
                                onClick={() => HandleWishList(book._id, book.title)}  >
                                <Heart className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Books = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <BooksContent />
    </Suspense>
);

export default Books;
