"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  width = 100,
  height = 100,
  className = "",
  fallbackSrc = "/placeholder.svg?height=100&width=100",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
