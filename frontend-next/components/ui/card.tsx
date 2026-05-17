import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-cloud-fog bg-parchment-white p-5 soft-shadow ${className}`} {...props} />
}

export function Panel({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={`rounded-[20px] border border-cloud-fog bg-parchment-white p-5 ${className}`} {...props} />
}
