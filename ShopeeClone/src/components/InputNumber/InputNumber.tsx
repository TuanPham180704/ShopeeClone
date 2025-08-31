import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  
}

export default function InputNumber({
  className,
  errorMessage,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  onChange,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  ...rest
}: Props) {
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    if((/^\d+$/.test(value) || value === '') && onChange){
      onChange(e)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput}  {...rest} onChange={handleChange}/>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
