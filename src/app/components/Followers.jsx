import { Button } from '@/components/ui/button'

export default function Followers({ userId }) {
  // This would typically come from your database or API
  const followers = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ]
  const following = [
    { id: '4', name: 'David' },
    { id: '5', name: 'Eve' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border-2 shadow">
      <h2 className="text-xl font-semibold mb-4">Followers</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Followers ({followers.length})</h3>
          <ul className="mt-2 space-y-2">
            {followers.map((follower) => (
              <li key={follower.id}>{follower.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium">Following ({following.length})</h3>
          <ul className="mt-2 space-y-2">
            {following.map((follow) => (
              <li key={follow.id}>{follow.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

