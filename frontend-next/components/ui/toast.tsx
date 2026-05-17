type ToastProps = {
  message: string
  tone?: 'success' | 'error' | 'neutral'
}

const tones = {
  success: 'border-pressed-cacao text-deep-cognac',
  error: 'border-fire-opal text-fire-opal',
  neutral: 'border-muted-stone text-deep-cognac',
}

export function Toast({ message, tone = 'neutral' }: ToastProps) {
  return <p className={`rounded-xl border bg-parchment-white px-4 py-3 text-[14px] ${tones[tone]}`}>{message}</p>
}
