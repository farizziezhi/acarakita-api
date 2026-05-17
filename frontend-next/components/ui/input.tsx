import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: FieldProps) {
  const inputId = id ?? props.name

  return (
    <label className="grid gap-2 text-[14px] text-deep-cognac" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        className={`rounded-xl border border-muted-stone bg-parchment-white px-4 py-3 text-[15px] text-deep-cognac outline-none transition focus:border-burnt-umber focus:ring-2 focus:ring-burnt-umber/10 ${className}`}
        {...props}
      />
      {error ? <span className="text-[13px] text-fire-opal">{error}</span> : null}
    </label>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className="grid gap-2 text-[14px] text-deep-cognac" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea
        id={textareaId}
        className={`min-h-28 rounded-xl border border-muted-stone bg-parchment-white px-4 py-3 text-[15px] text-deep-cognac outline-none transition focus:border-burnt-umber focus:ring-2 focus:ring-burnt-umber/10 ${className}`}
        {...props}
      />
      {error ? <span className="text-[13px] text-fire-opal">{error}</span> : null}
    </label>
  )
}
