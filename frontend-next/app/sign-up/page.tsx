import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud-fog px-6 py-16 text-deep-cognac">
      <div className="w-full">
        <AuthForm mode="sign-up" />
        <p className="mt-6 text-center text-muted-stone">
          Already have an account? <Link className="text-deep-cognac underline" href="/sign-in">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
