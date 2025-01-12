'use client'
import { useState } from 'react';
import { Heart, MessageCircle, UserPlus, BookOpen, Star } from 'lucide-react';
import Image from 'next/image';
import books from '../../../public/home/user.svg'

const ActivityItem = ({ activity }) => {
    const getIcon = () => {
        switch (activity.type) {
            case 'like':
                return <Heart className="w-4 h-4 text-red-500" />;
            case 'comment':
                return <MessageCircle className="w-4 h-4 text-blue-500" />;
            case 'follow':
                return <UserPlus className="w-4 h-4 text-green-500" />;
            case 'reading':
                return <BookOpen className="w-4 h-4 text-purple-500" />;
            case 'review':
                return <Star className="w-4 h-4 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className=" flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-shrink-0">
                <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    width={29}
                    height={29}
                    className="rounded-full"
                />
            </div>
            <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-900 font-semibold">
                    <span className="font-semibold">{activity.user.name}</span>{' '}
                    {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            <div className="flex-shrink-0">{getIcon()}</div>
        </div>
    );
};

export default function RecentActivity() {
    const [activities] = useState([
        {
            id: 1,
            type: 'like',
            user: {
                name: 'Alice Johnson',
                avatar: books,
            },
            action: 'liked your review of "The Great Gatsby"',
            time: '5 minutes ago',
        },
        {
            id: 2,
            type: 'comment',
            user: {
                name: 'Bob Smith',
                avatar: books,
            },
            action: 'commented on your post about "1984"',
            time: '2 hours ago',
        },
        {
            id: 3,
            type: 'follow',
            user: {
                name: 'Charlie Brown',
                avatar: books,
            },
            action: 'started following you',
            time: '1 day ago',
        },
        {
            id: 4,
            type: 'reading',
            user: {
                name: 'Diana Prince',
                avatar: books,
            },
            action: 'is currently reading "Dune"',
            time: '3 days ago',
        },
        {
            id: 5,
            type: 'review',
            user: {
                name: 'Ethan Hunt',
                avatar: books,
            },
            action: 'gave 5 stars to "The Hitchhiker\'s Guide to the Galaxy"',
            time: '1 week ago',
        },
    ]);

    return (
        <div className="bg-white border-2 shadow rounded-lg overflow-hidden mx-6 my-44">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg text-gray-900 font-semibold">Recent Picks for You</h2>
            </div>
            <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200 cursor-pointer">
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            <ActivityItem activity={activity} />
                        </li>
                    ))}
                </ul>
            </div>
         
        </div>
    );
}

