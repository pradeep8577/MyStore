import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {

    const { details } = useSelector(state => state.details)

    return (
        <>
            <Head>
                <title>{details ? details.businessName : "STORE_NAME - MyStore"}</title>
                <link rel="shortcut icon" href={details ? details.logo : "/store.webp"} type="image/x-icon" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </Head>

            <Navbar />
            <Toaster />
            <main className='flex justify-center items-center flex-col'>
                <div className='w-11/12 lg:w-10/12'>
                    {children}
                </div>
            </main>
            <div id="react-modals" />
            <Footer />
        </>
    )
}

export default Layout