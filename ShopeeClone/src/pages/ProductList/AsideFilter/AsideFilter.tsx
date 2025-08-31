import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/pages/ProductList/ProductList'
import type { Category } from 'src/types/category.type'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig

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
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='đ đến'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const gradId = `starGrad-${index}`
                return (
                  <svg key={index} viewBox='0 0 24 24' className='mr-1 h-4 w-4' aria-hidden>
                    <defs>
                      <linearGradient id={gradId} x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset='0' stopColor='#ffca11' />
                        <stop offset='1' stopColor='#ffad27' />
                      </linearGradient>
                    </defs>
                    {/* ngôi sao 5 cánh chuẩn 24x24, không cần transform */}
                    <path
                      d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      fill={`url(#${gradId})`}
                      stroke='#ffa727'
                      strokeWidth='1'
                      strokeLinejoin='round'
                    />
                  </svg>
                )
              })}
            <span className='ml-1'>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const gradId = `starGrad-${index}`
                return (
                  <svg key={index} viewBox='0 0 24 24' className='mr-1 h-4 w-4' aria-hidden>
                    <defs>
                      <linearGradient id={gradId} x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset='0' stopColor='#ffca11' />
                        <stop offset='1' stopColor='#ffad27' />
                      </linearGradient>
                    </defs>
                    {/* ngôi sao 5 cánh chuẩn 24x24, không cần transform */}
                    <path
                      d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      fill={`url(#${gradId})`}
                      stroke='#ffa727'
                      strokeWidth='1'
                      strokeLinejoin='round'
                    />
                  </svg>
                )
              })}
            <span className='ml-1'>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const gradId = `starGrad-${index}`
                return (
                  <svg key={index} viewBox='0 0 24 24' className='mr-1 h-4 w-4' aria-hidden>
                    <defs>
                      <linearGradient id={gradId} x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset='0' stopColor='#ffca11' />
                        <stop offset='1' stopColor='#ffad27' />
                      </linearGradient>
                    </defs>
                    {/* ngôi sao 5 cánh chuẩn 24x24, không cần transform */}
                    <path
                      d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      fill={`url(#${gradId})`}
                      stroke='#ffa727'
                      strokeWidth='1'
                      strokeLinejoin='round'
                    />
                  </svg>
                )
              })}
            <span className='ml-1'>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
        Xóa Tất Cả
      </Button>
    </div>
  )
}
