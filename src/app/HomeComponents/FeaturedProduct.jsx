import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function FeaturedProduct({ productImagePath, productData, productType, setproductType }) {



    return (
        <>
            <section className='max-w-full my-5' id='featturedProduct'>
                <div className='max-w-[1320px] lg:mx-auto sm:mx-2 mx-2 ' id='featuredProductItems'>
                    <div className='flex justify-center lg:py-6  '>
                        <button className={`capitalize lg:text-xl sm:text-xl text-sm border-2   lg:py-3 lg:px-8 sm:py-3 sm:px-8 px-4 py-3 font-semibold  ${productType == 1 ? ' border-[#C09578] text-[#C09578]' : 'border-gray-200'}  hover:cursor-pointer`} onClick={() => setproductType(1)}>featured</button>
                        <button className={`capitalize lg:text-xl sm:text-xl text-sm border-2   lg:py-3 lg:px-8 sm:py-3 sm:px-8 px-4 py-3 font-semibold  ${productType == 2 ? ' border-[#C09578] text-[#C09578]' : 'border-gray-200'}  hover:cursor-pointer`} onClick={() => setproductType(2)}>new arrivals</button>
                        <button className={`capitalize lg:text-xl sm:text-xl text-sm border-2   lg:py-3 lg:px-8 sm:py-3 sm:px-8 px-4 py-3 font-semibold  ${productType == 3 ? ' border-[#C09578] text-[#C09578]' : 'border-gray-200'}  hover:cursor-pointer`} onClick={() => setproductType(3)}>onsale</button>
                    </div>
                    <div className={`grid lg:grid-cols-4 lg:mx-0 sm:mx-0  mx-3   sm:grid-cols-3 gap-4 my-6 gap-y-6 `}>
                        {
                            productData.map((items, index) => {
                                return (

                                    <ProductItems items={items} productImagePath={productImagePath} key={index} />

                                )
                            })
                        }



                    </div>






                </div>
            </section>

        </>
    )
}

function ProductItems({ items, productImagePath }) {
    let token = useSelector((store) => store.login.token)
    let [color, setColor] = useState(items.productColor[0]._id)
    console.log(items)
    let user = useSelector((store) => store.login.user)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let addToCart = () => {
        if (user) {
            let obj = {
                id: items._id,
                image: items.productImage,
                price: items.productsalePrice,
                qty: 1,
                title: items.productName,
                color
            }

           
            axios.post(
                `${apiBaseUrl}cart/add-to-cart`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    if (res.data.status) {
    
                    }
                    else {
                        alert(res.data.msg)
                    }
                })
        }
        else {
            alert("Please Login")
        }
    }
    return (
        <div className='shadow-lg shadow-gray-300 bg-white '>
            <Link href={`/product-details/${items.slug}`}>
                <figure>
                    <img src={productImagePath + items.productImage} alt="" />
                </figure>
            </Link>
            <div className='text-center '>
                <p className='text-sm py-3'>
                    {items.subSubCategory.subSubcategoryName}

                </p>
                <h2 className='text-[15px] font-semibold hover:text-[#C09578] hover:cursor-pointer'>
                    {items.productName}
                </h2>
                <hr className='w-[80%] mx-auto border-1 h-px border-gray-100 my-2' />
                <p className='py-3'>
                    <span className='line-through text-gray-600 font-semibold text-[14px]'>Rs. {items.productActualPrice}</span>&nbsp;&nbsp;
                    <span className='text-[16px] text-[#C09578] font-bold'>Rs. {items.productsalePrice}</span>
                </p>
                <div className='flex gap-1 justify-center my-5'>
                    <div className=' h-[35px] bg-gray-200 flex justify-center items-center hover:bg-[#C09578] hover:cursor-pointer'>
                        <select onChange={(e) => setColor(e.target.value)}>
                            {

                                items.productColor.map((colors, index) => <option value={colors._id}> {colors.colorName} </option>)


                            }

                        </select>
                    </div>
                    <div>
                        <button onClick={addToCart} className='capitalize border-0 bg-gray-200 text-sm text-gray-700 border-gray-300 h-[35px] px-4 hover:cursor-pointer hover:bg-[#C09578] '>add to cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}