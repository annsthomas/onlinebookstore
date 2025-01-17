'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function PersonalInfo({ user }) {
    const [isEditing, setIsEditing] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)

    const handleSave = () => {
        console.log('Saving:', { email, phone })
        setIsEditing(false)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow border-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <Input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            ) : (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.isCurrentUser ? user.phone : '***-***-****'}</p>

                    <Button onClick={() => setIsEditing(true)} className="mt-4">
                        Edit
                    </Button>

                </div>
            )}
        </div>
    )
}

