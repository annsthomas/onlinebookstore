import Link from 'next/link'

export default function CommentedPosts({ userId }) {
  // This would typically come from your database or API
  const commentedPosts = [
    { id: '1', title: 'Interesting Discussion', url: '/profile/11' },
    { id: '2', title: 'Hot Topic', url: '/profile/12' },
    { id: '3', title: 'Controversial Opinion', url: '/profile/13' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-2">
      <h2 className="text-xl font-semibold mb-4">Commented Posts</h2>
      <ul className="space-y-2">
        {commentedPosts.map((post) => (
          <li key={post.id}>
            <Link href={post.url} className="hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

