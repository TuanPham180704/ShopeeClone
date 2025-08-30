export default function ProductRate({ rating }: { rating: number }) {
  const handleWidth = (order: number) => {
    if (order <= rating) return '100%'
    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    }
    return '0%'
  }

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='relative' style={{ width: 15, height: 15 }}>
          {/* Sao nền */}
          <svg viewBox='0 0 15 15' width={15} height={15} className='text-gray-300' fill='currentColor'>
            <polygon points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4' />
          </svg>

          {/* Sao vàng */}
          <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
            <svg viewBox='0 0 15 15' width={15} height={15} className='text-yellow-400' fill='currentColor'>
              <polygon points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4' />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
