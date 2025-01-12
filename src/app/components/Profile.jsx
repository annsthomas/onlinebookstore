import ProfileHeader from '@/app/components/ProfileHeader'
import PersonalInfo from '@/app/components/PersonalInfo'
import Followers from '@/app/components/Followers'
import Posts from '@/app/components/Posts'
import Bookmarks from '@/app/components/Bookmark'
import CommentedPosts from '@/app/components/CommentedPosts'
import user from '../../../public/home/user.svg'
const getUser = async (id) => {
    // Simulated API call
    if (id === '1') {
        return {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            bio: 'Passionate developer and tech enthusiast',
            profilePicture: user,
            isCurrentUser: true,
        }
    }
    return null
}

export default async function ProfilePage({ params }) {
    const user = await getUser('1')



    return (
        <div className="container mx-auto px-6 py-8">
            <ProfileHeader user={user} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <PersonalInfo user={user} />
                    <Posts userId={user.id} />
                    {user.isCurrentUser && (
                        <>
                            <Bookmarks userId={user.id} />
                            <CommentedPosts userId={user.id} />
                        </>
                    )}
                </div>
                <div className="space-y-8">
                    <Followers userId={user.id} />
                </div>
            </div>
        </div>
    )
}

