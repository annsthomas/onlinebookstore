'use client'

import { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import book from '../../../public/home/books.jpg'
import GlobalApi from "../utils/GlobalApi"

const MOCK_RESULTS = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of decadence and excess...',
        coverImage: book,
        tags: ['Classic', 'Fiction', 'Literature'],
        rating: 4.5
    },
    {
        id: '2',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of decadence and excess...',
        coverImage: book,
        tags: ['Classic', 'Fiction', 'Literature'],
        rating: 4.5
    },
    {
        id: '3',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of decadence and excess...',
        coverImage: book,
        tags: ['Classic', 'Fiction', 'Literature'],
        rating: 4.5
    }, {
        id: '4',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of decadence and excess...',
        coverImage: book,
        tags: ['Classic', 'Fiction', 'Literature'],
        rating: 4.5
    }, {
        id: '5',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of decadence and excess...',
        coverImage: book,
        tags: ['Classic', 'Fiction', 'Literature'],
        rating: 4.5
    },
]


export default function SearchPage() {
    const [query, setQuery] = useState('')

    const [results, setResults] = useState(MOCK_RESULTS) // For demo, replace with API results

    // Update results based on the query (for demo, we're just using MOCK_RESULTS)
    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    const GetBooks = async () => {

        const respose = await GlobalApi.GetBooks();
        setnewarrival(respose)


    }


    useEffect(() => {
        if (query) {
            // For demo purposes, filter the mock data based on the query
            const filteredResults = MOCK_RESULTS.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.description.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filteredResults)
        } else {
            setResults(MOCK_RESULTS) // Reset results when query is cleared
        }
    }, [query])

    return (
        <div className="container mx-auto px-12 sm:px-12 lg:px-32 py-8">
            {/* Search Form */}
            <form className="flex gap-2 mb-8 flex-col justify-center items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Search books by title, author, or keyword..."
                        value={query}
                        onChange={handleSearchChange}
                        className="pl-10"
                    />
                </div>

            </form>

            {/* Display Results */}
            {query && results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((book) => (
                        <Card key={book.id} className="flex flex-col justify-center">
                            <CardContent className="p-4">
                                <div className=" mb-4 flex justify-center items-center">
                                    <Image
                                        src={book.coverImage}
                                        alt={book.title}

                                        className="w-48 rounded-md"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                                <p className="text-sm line-clamp-3 mb-4">{book.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {book.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 mt-auto">
                                <Link href={`/browse/${book.id}`} className="w-full">
                                    <Button className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : query && results.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                    No results found for "{query}"
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-8">
                    Enter a search term to find books
                </div>
            )}
        </div>
    )
}
