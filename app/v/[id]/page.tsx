"use client"
import { useParams } from "next/navigation"
export default function View() {
    const params = useParams()
    const id = params.id
    return (
        <h1 className="text-3xl text-center pt-10 text-blue-600">https://affinote/v/{id}</h1>
    )
}