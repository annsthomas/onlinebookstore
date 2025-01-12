import Link from 'next/link'

export default function Posts({ userId }) {
    
    // This would typically come from your database or API
    const posts = [
        { id: '1', title: 'My First Post', excerpt: 'This is my first post...' },
        { id: '2', title: 'Another Post', excerpt: 'Here\'s another interesting post...' },
        { id: '3', title: 'Latest Thoughts', excerpt: 'I\'ve been thinking about...' },
    ]

    return (
        <div className="bg-white p-6 rounded-xl border-2 shadow">
            <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="border-b pb-4 last:border-b-0">
                        <Link href={`/profile/${post.id}`} className="text-lg font-medium hover:underline">
                            {post.title}
                        </Link>
                        <p className="text-gray-600 mt-1">{post.excerpt}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

