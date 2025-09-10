import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import  { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.contexts'
import DateSelect from 'src/pages/User/components/DateSelect'
import { setProfileToLs } from 'src/utils/auth'
import { userSchema, type UserSchema } from 'src/utils/rules'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import type { ErrorResponseApi } from 'src/types/utils.type'

import InputFile from 'src/components/InputFile'
type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
    // watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema) as any
  })
  // const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const uploadAvatarMutaion = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar as any)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     let avatarName = data.avatar || ''
  //     if (file) {
  //       const form = new FormData()
  //       form.append('image', file)
  //       const uploadRes = await uploadAvatarMutaion.mutateAsync(form as any)
  //       avatarName = uploadRes.data.data
  //       setValue('avatar', avatarName)

  //     }
  //     const payload = {
  //       ...data,
  //       date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString() : undefined,
  //       avatar: avatarName
  //     }
  //     const res = await updateProfileMutation.mutateAsync(payload as any)
  //     setProfile(res.data.data)
  //     setProfileToLs(res.data.data)
  //     setFile(undefined)
  //     refetch()
  //     toast.success((res as { data: { message: string } }).data.message)
  //   } catch (error) {
  //     if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
  //       const formErr = error.response?.data.data
  //       if (formErr) {
  //         Object.keys(formErr).forEach((key) => {
  //           setError(key as keyof FormDataError, {
  //             message: formErr[key as keyof FormDataError],
  //             type: 'Server'
  //           })
  //         })
  //       }
  //     }
  //   }
  // })
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = data.avatar || ''
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form as any)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }

      const payload = {
        ...data,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString() : undefined,
        avatar: avatarName
      }

      const res = await updateProfileMutation.mutateAsync(payload as any)
      setProfile(res.data.data)
      setProfileToLs(res.data.data)

      // Đợi refetch hoàn thành trước khi reset file
      await refetch()
      setFile(undefined)

      toast.success((res as { data: { message: string } }).data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formErr = error.response?.data.data
        if (formErr) {
          Object.keys(formErr).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formErr[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleChange = (file?: File) => {
    setFile(file)
  }
  return (
    <div className='mx-auto max-w-5xl rounded-sm bg-white px-4 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col sm:flex-row sm:items-center'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='name'
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col sm:flex-row sm:items-center'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      placeholder='Số điện thoại'
                      errorMessage={errors.phone?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col sm:flex-row sm:items-center'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='mt-2 flex flex-col sm:flex-row sm:items-center'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='mt-2 flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='mb-6 flex justify-center md:mb-0 md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarURL(profile?.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <InputFile onChange={handleChange} />
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
            </div>
            <div>Định dạng: .JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
