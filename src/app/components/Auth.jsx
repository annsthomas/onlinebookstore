'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function AuthPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('login')
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        role: 'buyer'
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'register') {
            setActiveTab('register')
        }
    }, [searchParams])

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            // Add your login API call here
            localStorage.setItem('logintoken', "true");
            router.push('/')
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        const newErrors = {}

        if (!registerData.fullName) newErrors.fullName = 'Full name is required'
        if (!registerData.email) newErrors.email = 'Email is required'
        if (!registerData.username) newErrors.username = 'Username is required'
        if (!registerData.phone) newErrors.phone = 'Phone is required'
        if (!registerData.password) newErrors.password = 'Password is required'
        if (registerData.password !== registerData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        if (!registerData.address) newErrors.address = 'Address is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            // Add your registration API call here
            console.log('Register data:', registerData)
            localStorage.setItem('  ', "true");
            router.push('/')
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-serif mb-8">My Account</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Login Form */}
                <div className={`space-y-6 max-md:border-none border-r-2 pr-10 ${activeTab === 'register' ? 'hidden md:block' : ''}`}>
                    <h2 className="text-2xl font-medium">Login</h2>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="loginEmail"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="johndoe@gmail.com"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="loginPassword"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <button type="button" className="text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            Login
                        </button>

                        <div className="text-center md:hidden">
                            <span className="text-sm text-gray-600">Don't have an account?</span>
                            <button
                                type="button"
                                onClick={() => setActiveTab('register')}
                                className="ml-2 text-sm text-gray-900 font-medium hover:underline"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                {/* Register Form */}
                <div className={`space-y-6 pr-12 ${activeTab === 'login' ? 'hidden md:block' : ''}`}>
                    <h2 className="text-2xl font-medium">Register</h2>
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="John Doe"
                                value={registerData.fullName}
                                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="registerEmail"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="johndoe@gmail.com"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.username ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="johndoe"
                                value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="+95950123456"
                                value={registerData.phone}
                                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                value={registerData.role}
                                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                            >
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>




                        {
                            registerData.role === "buyer" ?
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        rows={3}
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none resize-none focus:ring-primary focus:border-primary ${errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="No (27), 11 M, Hledan, Yangon"
                                        value={registerData.address}
                                        onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                                    )}
                                </div> : null
                        }

                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            Register
                        </button>

                        <div className="text-center md:hidden">
                            <span className="text-sm text-gray-600">Already have an account?</span>
                            <button
                                type="button"
                                onClick={() => setActiveTab('login')}
                                className="ml-2 text-sm text-gray-900 font-medium hover:underline"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

