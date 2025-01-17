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
import GlobalApi from "../utils/GlobalApi"
import { useEffect, useState } from "react"
import { useToast } from '@/hooks/use-toast';


export default function BookDetails() {
  const { toast } = useToast()

  const { id } = useParams();
  const [token, settoken] = useState('true');

  const [bookid, setbookid] = useState();
  const [userdata, setuserdata] = useState([]);

  const [bookdata, setbookdata] = useState([]);
  const GetBookById = async () => {
    try {



      const response = await GlobalApi.GetBookById(id);


      console.log('r', response);
      setbookdata(response);

    } catch (error) {
      console.log('error', error);


    }
  }

  useEffect(() => {
    GetBookById();
    setuserdata(localStorage.getItem('XLogined'));
    settoken(localStorage.getItem('XLogined'));

    setbookid(id);
  }, [])

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


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">

        <div className="space-y-4">
          <div className="mx-auto">
            <Image
              src={book}
              alt="book"

              className=" rounded-lg mx-auto"
              priority
            />
          </div>
         
        </div>

        {/* Middle Column - Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{bookdata.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {bookdata.authorName}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(bookdata.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted-foreground'
                      }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({bookdata.rating})</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">

              <Badge key={bookdata.type} variant="secondary">{bookdata.type}</Badge>

            </div>
          </div>

          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <p className="text-muted-foreground">{bookdata.description}</p>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                  <div>
                    <p className="text-sm font-medium">Pages</p>
                    <p className="text-sm text-muted-foreground">{bookdata?.details?.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{bookdata?.details?.language}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Publisher</p>
                    <p className="text-sm text-muted-foreground">{bookdata?.authorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Published Date</p>
                    <p className="text-sm text-muted-foreground">{bookdata?.details?.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">ISBN</p>
                    <p className="text-sm text-muted-foreground">{bookdata?.details?.isbn}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Reviews bookId={id} />
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-6 items-start">
            <button size="lg" className="bg-black text-white py-3 px-3 roounded-2xl" onClick={() => HandleOrder(bookdata.price, bookdata._id, bookdata.title)}>
              Add to Cart - ${bookdata.price}
            </button>

          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl bg-black text-white py-3 px-3 font-bold mb-6">Related Books</h2>
        <RelatedBooks currentBookId={id} />
      </section>
    </main>
  )
}

