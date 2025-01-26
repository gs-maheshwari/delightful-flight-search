import type React from "react"
import type { InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

 const Input = ({ label, ...props } : InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  )
}

export default Input;