import { ButtonHTMLAttributes } from 'react'

export const Button = ({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition ${className}`}
    />
  )
}