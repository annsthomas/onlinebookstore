'use client'
import ProfileHeader from '@/app/components/ProfileHeader'
import PersonalInfo from '@/app/components/PersonalInfo'
import Followers from '@/app/components/Followers'
import Posts from '@/app/components/Posts'
import Bookmarks from '@/app/components/Bookmark'
import CommentedPosts from '@/app/components/CommentedPosts'
import user from '../../../public/home/user.svg'
import { useEffect, useState } from 'react'
import GlobalApi from '../utils/GlobalApi'


export default function ProfilePage() {


    const [userdata, setuserdata] = useState('');

    const [user, setuser] = useState('')
    const [wishlistItems, setWishlistItems] = useState([])


    const GetWishlist = async () => {

        try {


            const Userdata = JSON.parse(userdata);



            const response = await GlobalApi.GetWishList(Userdata._id);


            setWishlistItems(response.data);
            console.log('response',response.data);
            


        } catch (error) {

            console.log('error', error);

        }
    }
    const GetUser = async () => {
        try {
            const userData = JSON.parse(userdata);
            const response = await GlobalApi.GetUser(userData._id);
            setuser(response)


        } catch (error) {
            console.log('error', error);


        }
    }


    useEffect(() => {

        const user = localStorage.getItem('XLogined');

        setuserdata(user);
        GetUser();
        GetWishlist();
    }, [userdata])


    return (
        <div className="container mx-auto px-6 py-8">
            <ProfileHeader user={user} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <PersonalInfo user={user} />
                    {/* <Posts userId={user.id} /> */}
                    {
                        user.role === "sellers" ? <Posts userId={user.id} /> : null
                    }

                    <>
                        <Bookmarks wishlistItems={wishlistItems} />
                        {/* <CommentedPosts userId={user.id} /> */}
                    </>

                </div>
                <div className="space-y-8">
                    <Followers userId={user.id} />
                </div>
            </div>
        </div>
    )
}

