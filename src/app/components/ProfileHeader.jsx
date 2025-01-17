import Image from 'next/image'

export default function ProfileHeader({ user }) {

   


    return (
        <div className="flex flex-col items-center md:flex-row md:items-start">
            {/* <Image
                src={user.profilePicture}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full"
            /> */}
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user.fullname}</h1>
                <p className="mt-2 text-gray-600 "> role : {user.role}</p>
            </div>
        </div>
    )
}

