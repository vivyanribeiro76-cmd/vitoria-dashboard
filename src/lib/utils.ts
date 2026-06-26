import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(milliseconds: number | null): string {
  if (!milliseconds) return '0s'
  
  const totalSeconds = Math.round(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${totalSeconds}s`
}

export function formatPhoneNumber(phone: string | null): string {
  if (!phone || typeof phone !== 'string') return '-'
  
  const cleaned = phone.replace(/\D/g, '')
  
  // Telefone com código do país (55) + DDD (2 dígitos) + número (9 dígitos) = 13 dígitos
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    const ddd = cleaned.slice(2, 4)
    const firstPart = cleaned.slice(4, 9)
    const secondPart = cleaned.slice(9)
    return `+55 (${ddd}) ${firstPart}-${secondPart}`
  }
  
  // Telefone brasileiro sem código do país (11 dígitos)
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}
