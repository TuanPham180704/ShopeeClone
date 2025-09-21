import { Helmet } from 'react-helmet-async'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/hooks/useQueryConfig'

/**
 * index 0 : Có 5 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 1 : Có 4 cái màu vàng tương ứng từ indexStart 0 - 3 đều màu vàng
 * index 2 : Có 3 cái màu vàng tương ứng từ indexStart 0 - 2 đều màu vàng
 * index 3 : Có 2 cái màu vàng tương ứng từ indexStart 0 - 1 đều màu vàng
 * index 4 : Có 1 cái màu vàng tương ứng từ indexStart 0  đều màu vàng
 */
interface Props {
  queryConfig: QueryConfig
}

export default function RatingStart({ queryConfig }: Props) {
  const numberRateStart = 5
  const navigate = useNavigate()
  const handleFilterStart = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <ul className='my-3'>
      <Helmet>
        <title>RatingStart | Shoppe</title>
        <meta name='description' content='RatingStart' />
      </Helmet>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <div
              className='flex cursor-pointer items-center text-sm'
              onClick={() => handleFilterStart(numberRateStart - index)}
              aria-hidden='true'
              tabIndex={0}
            >
              {Array(5)
                .fill(0)
                .map((_, indexStart) => {
                  const gradId = `starGrad-${indexStart}`
                  if (indexStart < 5 - index) {
                    return (
                      <svg key={indexStart} viewBox='0 0 24 24' className='mr-1 h-4 w-4' aria-hidden>
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
                  }
                  return (
                    <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={indexStart}>
                      <defs>
                        <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                          <stop offset='0%' stopColor='#FFD211' />
                          <stop offset='100%' stopColor='#FFAD27' />
                        </linearGradient>
                      </defs>
                      <path
                        fill='none'
                        fillRule='evenodd'
                        stroke='url(#star__hollow)'
                        strokeWidth={2}
                        d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                      />
                    </svg>
                  )
                })}
              {index !== 0 && <span className='ml-1'>Trở lên</span>}
            </div>
          </li>
        ))}
    </ul>
  )
}
