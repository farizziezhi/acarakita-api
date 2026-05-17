import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'auth'

const variants: Record<Variant, string> = {
  primary: 'bg-burnt-umber text-white hover:bg-deep-cognac',
  secondary: 'border border-muted-stone bg-parchment-white text-deep-cognac hover:bg-cloud-fog',
  tertiary: 'bg-cloud-fog text-deep-cognac hover:bg-[#e7dbcf]',
  auth: 'bg-white text-deep-cognac hover:bg-cloud-fog',
}

const baseClass = 'inline-flex items-center justify-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return <button className={`${baseClass} ${variants[variant]} ${className}`} {...props} />
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  variant?: Variant
}

export function ButtonLink({ className = '', variant = 'primary', href, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${baseClass} ${variants[variant]} ${className}`} href={href} {...props}>
      {children}
    </Link>
  )
}
