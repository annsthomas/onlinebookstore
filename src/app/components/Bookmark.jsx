import Link from 'next/link'

export default function Bookmarks({ userId }) {
  // This would typically come from your database or API
  const bookmarks = [
    { id: '1', title: 'Interesting Article', url: '/profile/1' },
    { id: '2', title: 'Cool Project', url: '/profile/12' },
    { id: '3', title: 'Useful Resource', url: '/profile/13' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-2">
      <h2 className="text-xl font-semibold mb-4">Bookmarks</h2>
      <ul className="space-y-2">
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <Link href={bookmark.url} className="hover:underline">
              {bookmark.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

