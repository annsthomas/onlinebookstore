import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

// Mock data - replace with actual API call
const MOCK_REVIEWS = [
    {
        id: '1',
        user: {
            name: 'Alice Johnson',
            avatar: '/placeholder.svg'
        },
        rating: 5,
        date: '2023-12-01',
        content: 'A masterpiece of literature that continues to captivate readers...'
    },
    // Add more mock reviews...
]

export function Reviews({ bookId }) {
    return (
        <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                                <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{review.user.name}</h3>
                                    <time className="text-sm text-muted-foreground">{review.date}</time>
                                </div>
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating
                                                    ? 'fill-primary text-primary'
                                                    : 'fill-muted text-muted-foreground'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{review.content}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

