import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes with conditional logic, de-duplicating conflicts.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Map a design-token accent name to its raw neon hex value.
export const accentHex = {
  cyan: '#22D3EE',
  blue: '#3B82F6',
  violet: '#A855F7',
  emerald: '#34D399',
  pink: '#F472B6',
}

export function getAccent(name) {
  return accentHex[name] ?? accentHex.cyan
}
