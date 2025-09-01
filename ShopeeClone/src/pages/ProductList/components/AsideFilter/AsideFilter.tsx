import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/pages/ProductList/ProductList'
import RatingStart from 'src/pages/ProductList/components/RatingStart'
import type { Category } from 'src/types/category.type'
import type { NoUndefinedField } from 'src/types/utils.type'
import { schema, type Schema } from 'src/utils/rules'
import { ObjectSchema } from 'yup'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,

    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    // resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
    resolver: yupResolver<FormData, any, FormData>(priceSchema as ObjectSchema<FormData>)
  })
 
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      {/* Tiêu đề */}
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current' fillRule='evenodd' stroke='none' strokeWidth={1}>
          <g transform='translate(-373 -208)'>
            <g transform='translate(155 191)'>
              <g transform='translate(218 17)'>
                <path d='m0 2h2v2h-2zm4 0h7.1519633v2h-7.1519633z' />
                <path d='m0 6h2v2h-2zm4 0h7.1519633v2h-7.1519633z' />
                <path d='m0 10h2v2h-2zm4 0h7.1519633v2h-7.1519633z' />
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>

      {/* Divider */}
      <div className='my-4 h-[1px] bg-gray-300' />

      {/* Danh mục */}

      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoản giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    {...field}
                    placeholder='đ Từ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_max')
                    }}
                    classNameError='hiden'
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ Đến'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_min')
                    }}
                    classNameError='hiden'
                  />
                )
              }}
            />
            <div className='my-4 h-[1px] bg-gray-300' />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStart queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAll}
        className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'
      >
        Xóa Tất Cả
      </Button>
    </div>
  )
}
