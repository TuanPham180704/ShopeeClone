import { useForm, type RegisterOptions } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getrules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getrules(getValues)
  const onSubmit = handleSubmit(
    (data) => {},
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-orange '>
      <div className='container'>
        <div className='grid grid-cols-1  lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                rules={rules.email}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                className='mt-2'
                rules={rules.password}
                errorMessage={errors.password?.message}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Confirm-password'
                className='mt-2'
                rules={rules.confirm_password}
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />

              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng Ký
                </button>
              </div>
              <div className='flex item-center justify-center mt-8'>
                <span className='text-gray-300'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
