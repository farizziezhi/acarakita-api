import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud-fog px-6 py-16 text-deep-cognac">
      <div className="w-full">
        <AuthForm mode="sign-in" />
        <p className="mt-6 text-center text-muted-stone">
          New to AcaraKita? <Link className="text-deep-cognac underline" href="/sign-up">Create an account</Link>
        </p>
      </div>
    </main>
  )
}
