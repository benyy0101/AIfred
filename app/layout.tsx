import "../styles/globals.css"
import SideBar from "../components/SideBar";
import Login from "../components/Login";
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import  ClientProvider  from "../components/ClientProvider";
import { Suspense } from "react";

export default async function RootLayout({children}: {children: React.ReactNode;}) {
    const session = await getServerSession(authOptions)
    return (
        <html>
            
            <head>
                
            </head>

            <body>
                <SessionProvider session={session}>
                    {!session ? (
                        <Login/>
                    ):
                    (
                        <div className="flex bg-[#343541]">
                        {/*Sidebar*/}
                        <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem] rounded-r-lg shadow-2xl">
                            <SideBar />
                        </div>

                        {/*ClientProvider - Notification */}
                        <ClientProvider/>

                        <div className="relative  flex-1">{children}</div>
                    </div>
                    )}
                </SessionProvider>
            </body>
        </html>
    );
}
