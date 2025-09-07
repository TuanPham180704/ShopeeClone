import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRate from 'src/components/ProductRate'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from 'src/pages/ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase.api'

import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
export default function ProducDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const product = productDetailData?.data.data
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImage = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )
  const queryConfig = { limit: '20', page: '1', catagory: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })
  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  console.log(addToCartMutation)
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  if (!product) return null

  const next = () => {
    if (currentIndexImage[1] < (product as ProductType).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const react = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / react.height)
    const left = offsetX * (1 - naturalWidth / react.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const removeHandleZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({buy_count: buyCount, product_id: product._id as string})
    const purchase = res.data.data
    navigate(path.cart,{
      state: {
        purchaseId : purchase._id
      }
    })
  }
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={removeHandleZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    data-slot='icon'
                    fill='none'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImage.map((img) => {
                  const isActive = img == activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    data-slot='icon'
                    fill='none'
                    stroke-width='1.5'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='h-5 w-5'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5'></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRate
                    rating={product.rating}
                    activeClassname='absolute inset-0 h-full overflow-hidden' // giữ nguyên logic cắt
                    nonActiveClassname='h-4 w-4 fill-current text-gray-300' // chỉnh size/màu ở sao nền
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                <div className='flex items-center'>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  max={product.quantity}
                  value={buyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='hover:bg-orange-5 flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm'
                >
                  <svg
                    data-slot='icon'
                    fill='none'
                    stroke-width='1.5'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    ></path>
                  </svg>
                  Thêm Vào Giỏ Hàng
                </button>
                <button 
                onClick={buyNow}
                className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
