'use client'

import React, { useState, useRef, useEffect, use } from 'react';
import { User, Heart, ShoppingCart, X, LogOut } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import books from '../../../public/home/book.png'

// Mock data for search results
const mockBooks = [
    { id: 1, title: "A Tale of Two Cities", author: "Charles Dickens", price: "MMK: 16,100" },
    { id: 2, title: "Animal Farm", author: "George Orwell", price: "MMK: 5,900" },
    { id: 3, title: "Black House", author: "Stephen King", price: "MMK: 18,150" },
    { id: 4, title: "Below Zero", author: "Ali Hazelwood", price: "MMK: 5,500" },
    { id: 5, title: "Hooked", author: "Nir Eyal", price: "MMK: 7,500" },
];

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);

    const [token, settoken] = useState('true');

    useEffect(() => {
        // const token=localStorage.getItem('token')
        settoken(localStorage.getItem('logintoken'))
        console.log('token', token);



    }, [settoken])
    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filtered = mockBooks.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // You can add your search submission logic here
        console.log('Search submitted:', searchQuery);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b ">
            <div className="container mx-auto px-6 py-4 text-black">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-sm font-serif cursor-pointer">
                            <Image src={books} alt="books" className='w-16 max-md:w-8' />
                            BookCube
                        </h1>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <div className="relative" ref={searchRef}>
                            {/* <form onSubmit={handleSearchSubmit} className="flex items-center">
                                {isSearchOpen && (
                                    <input
                                        type="text"
                                        placeholder="Search books..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:border-black"
                                        autoFocus
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className="flex items-center space-x-1 ml-2"
                                >
                                    {isSearchOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <>
                                            <Search className="h-5 w-5" />
                                            <span className="hidden lg:inline">Search</span>
                                        </>
                                    )}
                                </button>
                            </form> */}

                            {/* Search Results Dropdown */}
                            {/* {isSearchOpen && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 mt-2 w-96 bg-white border rounded-md shadow-lg">
                                    <ul className="py-2">
                                        {searchResults.map((book) => (
                                            <li
                                                key={book.id}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <div className="font-medium">{book.title}</div>
                                                <div className="text-sm text-gray-600">
                                                    {book.author} - {book.price}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}
                        </div>
                        <Link href={token ? '/profile' : '/auth'}>
                            <button className="flex items-center space-x-1">
                                <User className="h-5 w-5" />
                                <span className="hidden lg:inline">
                                    Account
                                </span>
                            </button>
                        </Link>
                        <Link href="/wishlist">
                            <button className="flex items-center space-x-1">
                                <Heart className="h-5 w-5" />
                                <span className="hidden lg:inline">Wishlist</span>
                            </button>
                        </Link>
                        <Link href="/cart">
                            <button className="flex items-center space-x-1">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="hidden lg:inline">Cart</span>
                            </button>
                        </Link>

                        <button className="flex items-center space-x-1" onClick={() => {
                            localStorage.removeItem('logintoken')
                        }}>
                            <LogOut className="h-5 w-5" />
                            <span className="hidden lg:inline">Logout</span>
                        </button>

                    </div>
                    {/* Mobile Search */}
                    <div className="flex md:hidden items-center space-x-4">
                        <div className="relative" ref={searchRef}>

                        </div>
                        <Link href={token ? '/profile' : '/auth'}> <User className="h-5 w-5" /></Link>
                        <Link href="/cart">   <ShoppingCart className="h-5 w-5" />  </Link>
                        <button className="flex items-center space-x-1" onClick={() => {
                            localStorage.removeItem('logintoken')
                        }}>
                            <LogOut className="h-5 w-5" />
                            <span className="hidden lg:inline">Logout</span>
                        </button>

                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;
