import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <Helmet>
        <title>NotFound | Shoppe</title>
        <meta name='description' content='NotFound' />
      </Helmet>
      <div className='w-full max-w-md space-y-8 text-center'>
        <div className='mb-8'>
          <h2 className='mt-6 text-6xl font-extrabold text-gray-900 dark:text-gray-100'>404</h2>
          <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>Page not found</p>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Sorry, we couldn't find this person you're looking for.
          </p>
        </div>
        <div className='mt-8'>
          <Link
            to='/'
            className='inline-flex items-center rounded-md border border-transparent bg-orange px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <svg className='-ml-1 mr-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12h18m-9-9l9 9-9 9' />
            </svg>
            Go back home
          </Link>
        </div>
      </div>
      <div className='mt-16 w-full max-w-2xl'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center' aria-hidden='true'>
            <div className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-gray-100 px-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400'>
              If you think this is a mistake, please contact support
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
