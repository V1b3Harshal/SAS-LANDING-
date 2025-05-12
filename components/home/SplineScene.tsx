"use client"
import dynamic from "next/dynamic"

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SplineScene() {
  return (
    <Spline
      scene="https://prod.spline.design/QHuVgI9TaRI1PeE5/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
    />
  )
}