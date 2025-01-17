import Link from 'next/link'

export default function Bookmarks({ wishlistItems }) {


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-2">
      <h2 className="text-xl font-semibold mb-4">Bookmarks</h2>
      <ul className="space-y-2">
        {wishlistItems.map((bookmark) => (
          <li key={bookmark._id}>
            <Link href={`/profile/${bookmark.book._id}`} className="hover:underline">
              {bookmark.book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

