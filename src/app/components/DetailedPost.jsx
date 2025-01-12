'use client'
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, BookOpen } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reviews } from "./Reviews"
import { RelatedBooks } from "./Related"
import { useParams } from 'next/navigation';
import book from '../../../public/home/books.jpg';


const MOCK_BOOK = {
  id: '1',
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  description: 'A story of decadence and excess...',
  longDescription: `The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. 
    Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person 
    narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's 
    obsession to reunite with his former lover, Daisy Buchanan.`,
  coverImage: book,
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  tags: ['Classic', 'Fiction', 'Literature'],
  rating: 4.5,
  price: 19.99,
  pages: 180,
  language: 'English',
  publisher: 'Scribner',
  publishedDate: '1925-04-10',
  isbn: '978-0743273565'
}

export default function BookDetails() {

  const { id } = useParams();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
       
        <div className="space-y-4">
          <div className="mx-auto">
            <Image
              src={MOCK_BOOK.coverImage}
              alt={MOCK_BOOK.title}
             
              className=" rounded-lg mx-auto"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MOCK_BOOK.images.map((image, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={image}
                  alt={`${MOCK_BOOK.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{MOCK_BOOK.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {MOCK_BOOK.author}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(MOCK_BOOK.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted-foreground'
                      }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({MOCK_BOOK.rating})</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {MOCK_BOOK.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <p className="text-muted-foreground">{MOCK_BOOK.longDescription}</p>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                  <div>
                    <p className="text-sm font-medium">Pages</p>
                    <p className="text-sm text-muted-foreground">{MOCK_BOOK.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{MOCK_BOOK.language}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Publisher</p>
                    <p className="text-sm text-muted-foreground">{MOCK_BOOK.publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Published Date</p>
                    <p className="text-sm text-muted-foreground">{MOCK_BOOK.publishedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">ISBN</p>
                    <p className="text-sm text-muted-foreground">{MOCK_BOOK.isbn}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Reviews bookId={id} />
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-6 items-start">
            <Button size="lg" className="">
              Add to Cart - ${MOCK_BOOK.price}
            </Button>
           
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>
        <RelatedBooks currentBookId={id} />
      </section>
    </main>
  )
}

