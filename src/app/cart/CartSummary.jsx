import React from 'react'

export default function CartSummary() {
    return (
        <section className='max-w-full' id='cartSummary'>
            <div className='max-w-[1320px] mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                    {/* Coupon Section */}
                    <div className="border border-gray-200">
                        <div className="bg-black text-white text-lg font-bold p-3 uppercase tracking-wide">
                            Coupon
                        </div>
                        <div className="p-4">
                            <p className="mb-3 text-gray-700 text-sm">Enter your coupon code if you have one.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Coupon code"
                                    className="border border-gray-300 px-4 py-2"
                                />
                                <button className="bg-black cursor-pointer text-white px-4 py-2 font-semibold hover:bg-[#C09578]  transition">
                                    Apply Coupon
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cart Totals */}
                    <div className="border border-gray-200">
                        <div className="bg-black text-white text-lg font-bold p-3 uppercase tracking-wide">
                            Cart Totals
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="font-semibold">Subtotal</span>
                                <span className="font-semibold">Rs. 5,200</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Discount (-)</span>
                                <span className="font-semibold">Rs. 0</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Rs. 5,200</span>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="bg-black cursor-pointer text-white px-4 py-2 font-semibold hover:bg-[#C09578]  transition">
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
