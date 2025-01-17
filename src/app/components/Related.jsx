import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import book from '../../../public/home/books.jpg';

const MOCK_RELATED = [
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: book,
    tags: ['Classic', 'Fiction']
  },
]

export function RelatedBooks({ currentBookId }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_RELATED.map((book) => (
        // <Link key={book.id} href={`/search/details/${book.id}`}>
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-[2/3] relative mb-4">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="font-semibold mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <div className="flex flex-wrap gap-1">
                {book.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        // </Link>
      ))}
    </div>
  )
}

