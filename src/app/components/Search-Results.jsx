'use client'

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Mock data - replace with actual API call
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of decadence and excess...',
    coverImage: '/placeholder.svg',
    tags: ['Classic', 'Fiction', 'Literature'],
    rating: 4.5
  },
  // Add more mock items...
]

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  if (!query) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Enter a search term to find books
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_RESULTS.map((book) => (
        <Card key={book.id} className="flex flex-col">
          <CardContent className="p-4">
            <div className="aspect-[2/3] relative mb-4">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover rounded-md"
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
            <Link 
              href={`/search/details/${book.id}`}
              className="w-full"
            >
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

