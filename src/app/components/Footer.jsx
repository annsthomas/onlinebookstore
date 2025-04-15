import Link from "next/link"
import books from '../../../public/home/book.png'
import Image from "next/image"
export default function Footer() {
    return (
        <footer className="w-full bg-background py-12 px-4 md:px-6 lg:px-8 border-t-2 text-[#363636]">
            <div className="container mx-auto flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4">
                
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                          <Image src={books} alt="books" className='w-16 max-md:w-8' />
                       BookCube</h2>
                    <p className="text-muted-foreground max-w-md">
                        We are an online bookstore that offers a wide selection of books in various genres, including fiction, non-fiction, biographies, and more.
                    </p>
                    <p className="text-muted-foreground max-w-md">
                        We provide a convenient and enjoyable shopping experience while offering competitive prices and excellent customer service.
                    </p>
                  
                </div>

              

                {/* Contact Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                    <div className="space-y-2">
                        <p className="text-muted-foreground">
                            Email:{" "}
                            <Link href="mailto:info@nextbook.com" className="hover:underline">
                                info@BookCube.com
                            </Link>
                        </p>
                        <p className="text-muted-foreground">
                            Phone:{" "}
                            <Link href="tel:+959-50-960-70" className="hover:underline">
                                +91 222-222
                            </Link>
                        </p>
                        <div className="text-muted-foreground">
                            <p>Address:</p>
                            <p>No (77), 123 Main Street, NYC,</p>
                            <p>New York</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

