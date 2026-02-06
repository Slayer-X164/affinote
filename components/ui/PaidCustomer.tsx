"use client"

import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import CountUp from "react-countup"

export default function PaidCustomer() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/paid-users")
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(150))
  }, [])

  return (
    <div className="text-center text-xs md:text-sm flex items-center justify-center font-semibold mb-5">
      <div className="rounded-full px-3 py-1 bg-yellow-300/20 flex items-center gap-2 border text-yellow-600 border-yellow-600">
        <FaStar />
        <CountUpNumber value={count ?? 200} /> Happy Paid Customers
      </div>
    </div>
  )
}
function CountUpNumber({ value }: { value: number }) {
  return <CountUp end={value} duration={2} />
}