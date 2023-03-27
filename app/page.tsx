import React from 'react'
import {SunIcon, BoltIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import { SessionProvider } from "../components/SessionProvider";
import NextAuth, { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function HomePage() {
    const session = await getServerSession(authOptions);
        return (
            <div className="text-white flex flex-col items-center justify-center h-screen select-none px-5">
                <h1 className="text-5xl font-bold mb-20">Welcome, {session!.user?.name}</h1>

                <div className='flex flex-row space-x-2 text-center'>
                <div>
                    <div>
                        <div className='flex flex-col items-center justify-center mb-5'>
                            {/* Sun Icon */}
                            <SunIcon className="h-8 w-8 "/>
                            <h2>Examples</h2>
                        </div>

                        <div className='space-y-2'>
                            <p className='infoText'>"Explain Something to me"</p>
                            <p className='infoText'>"What is the difference between a dog and a cat?"</p>
                            <p className='infoText'>"What is the color of the sun?</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div className='flex flex-col items-center justify-center mb-5'>
                            {/* Sun Icon */}
                            <BoltIcon className="h-8 w-8 "/>
                            <h2>Capability</h2>
                        </div>

                        <div className='space-y-2'>
                            <p className='infoText'>"Explain Something to me"</p>
                            <p className='infoText'>"What is the difference between a dog and a cat?"</p>
                            <p className='infoText'>"What is the color of the sun?</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div className='flex flex-col items-center justify-center mb-5'>
                            {/* Sun Icon */}
                            <ExclamationTriangleIcon className="h-8 w-8 "/>
                            <h2>Limitations</h2>
                        </div>

                        <div className='space-y-2'>
                            <p className='infoText'>"Explain Something to me"</p>
                            <p className='infoText'>"What is the difference between a dog and a cat?"</p>
                            <p className='infoText'>"What is the color of the sun?</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

export default HomePage;