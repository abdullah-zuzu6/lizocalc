'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
      aria-label={label || 'Go back'}
      title={label || 'Go back'}
    >
    
      <ArrowLeft className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}
