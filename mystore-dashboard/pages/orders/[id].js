import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OrderItemsTable from '../../components/Table/OrderItemsTable';
// import { GetOrderDetail, UpdateOrderStatus } from '../../services/api'
import toast from 'react-hot-toast';
import { GetOrderDetail } from '../../services/apiClient';

const OrderDetails = () => {

    const router = useRouter()
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [status, setStatus] = useState()

    const { id } = router.query

    const handleDelivery = async () => {

        try {
            const { data } = await UpdateOrderStatus(id, { status })
            toast.success("Updated Succesfully")
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data } = await GetOrderDetail({ id })
                setOrder(data.order)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    return <div className="w-full">
        <Head>
            <title>Order - MyStore</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/logo.svg" />
        </Head>

        <main className="flex flex-col justify-center items-center mt-32 mb-24">

            <div className='w-10/12'>
                {
                    !loading && !error ? <>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1 className='font-bold text-xl mt-4'>Order Number: {order._id}</h1>
                                <h1 className='text-lg text-gray-400'>{moment(order.createdAt).fromNow()}</h1>
                            </div>
                            <div className='flex'>
                                <button className='border-red-800 border-2 bg-red-100 text-red-800 font-bold p-3'>Cancel Order</button>
                            </div>
                        </div>
                        <div className='flex justify-between gap-5'>
                            <div className='w-9/12 mt-5'>
                                <div className='border border-gray-300 p-4'>
                                    {
                                        order.isDelivered ? <h1 className='font-bold text-xl mb-1'></h1> : <h1 className='font-bold text-base px-4 inline-flex leading-5 rounded-full text-yellow-500 bg-yellow-50 p-1'>Unfulfilled</h1>
                                    }

                                    <OrderItemsTable orders={order.orderItems} />

                                    <div className='flex justify-end'>
                                        <button className='border border-black bg-black text-white p-2 px-6 font-bold'>FulFill</button>
                                    </div>
                                </div>

                                <div className='border border-gray-300 p-4 mt-5'>
                                    {
                                        order.isPaid ? <h1 className='font-bold text-xl mb-1'></h1> : <h1 className='font-bold text-base px-4 inline-flex leading-5 rounded-full text-red-500 bg-red-50 p-1'>Unpaid</h1>
                                    }

                                    <div className='flex justify-between items-center px-4 my-3'>
                                        <h1 className='text-xl'>Subtotal <span className='text-sm'>({order.orderItems.length} Items)</span></h1>
                                        <h1 className='text-xl'>₹{order.totalPrice}</h1>
                                    </div>

                                    <div className='flex justify-between items-center px-4 my-3'>
                                        <h1 className='text-xl'>Taxes <span className='text-sm'>	(does not apply)</span></h1>
                                        <h1 className='text-xl'>₹0</h1>
                                    </div>

                                    <div className='flex justify-between items-center px-4 my-3'>
                                        <h1 className='text-xl'>Shipping <span className='text-sm'>(standard)</span></h1>
                                        <h1 className='text-xl'>₹40</h1>
                                    </div>

                                    <div className='flex justify-between items-center px-4 my-3'>
                                        <h1 className='text-xl font-bold'>Total</h1>
                                        <h1 className='text-xl font-bold'>₹{order.totalPrice + 40}</h1>
                                    </div>

                                    <hr />

                                    <div className='flex justify-between items-center px-4 my-3'>
                                        <h1 className='text-xl font-bold'>Amount to be paid</h1>
                                        <h1 className='text-xl font-bold'>₹{order.totalPrice + 40}</h1>
                                    </div>

                                </div>

                                <div className='border border-gray-300 p-4 mt-5'>
                                    <h1 className='font-bold text-xl mb-1 mx-2'>Order History</h1>

                                    <div className='flex'>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full border outline-none p-3 mt-2'>
                                            <option disabled>Choose Order Status</option>
                                            <option>Shipped</option>
                                            <option>Arriving Soon</option>
                                            <option>Payment Received</option>
                                            <option>Order Completed</option>
                                            <option>Delivered</option>
                                        </select>
                                        <button className='border border-black bg-black text-white p-1 mt-2 px-6 font-bold' onClick={handleDelivery}>Set</button>
                                    </div>
                                </div>

                            </div>

                            <div className='w-3/12 mt-5'>
                                <div className='border border-gray-300 p-4'>
                                    <h1 className='font-bold text-xl mb-1'>Customer</h1>
                                    <h1>{order.userId.email}</h1>
                                    <hr className='my-5' />
                                    <h1 className='font-bold text-base uppercase mb-1'>Shipping Address</h1>
                                    <div>
                                        <h1>{order.shippingAddress.landmark}</h1>
                                        <h1>{order.shippingAddress.street}</h1>
                                        <h1>{order.shippingAddress.city}</h1>
                                        <h1>{order.shippingAddress.state}</h1>
                                        <h1>{order.shippingAddress.country}</h1>
                                        <h1>{order.shippingAddress.pincode}</h1>
                                    </div>
                                    <hr className='my-5' />
                                    <h1 className='font-bold text-base uppercase mb-1'>Billing  Address</h1>
                                    <div>
                                        <h1>{order.shippingAddress.landmark}</h1>
                                        <h1>{order.shippingAddress.street}</h1>
                                        <h1>{order.shippingAddress.city}</h1>
                                        <h1>{order.shippingAddress.state}</h1>
                                        <h1>{order.shippingAddress.country}</h1>
                                        <h1>{order.shippingAddress.pincode}</h1>
                                    </div>
                                </div>

                                <div className='p-4 border border-gray-300 mt-5'>
                                    <div className='flex justify-between items-center w-full'>
                                        <h1 className='font-bold text-xl mb-1'>Invoices</h1>
                                        <button className='border border-black bg-black text-white p-1 px-3'>Generate</button>
                                    </div>
                                    <p className='text-gray-400 mt-2'>No invoices to show</p>
                                </div>
                            </div>
                        </div>
                    </> : "No Orders Found..."
                }

            </div>
        </main>
    </div>
};

export default OrderDetails;
