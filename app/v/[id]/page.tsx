export default function View({ params }: { params: { id: string } }) {
    const {id} =params
    return (
        <h1 className="text-3xl text-center pt-10 text-blue-600">https://affinote/v/{id}</h1>
    )
}