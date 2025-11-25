"use client"
import TemplateCard from './TemplateCard'

const TemplateSection = () => {
  return (
    <div  className=' w-full flex justify-center items-center'>
        <div  className='max-w-6xl w-full py-20 lg:flex-row flex-col gap-10 flex items-center justify-between'>
             <TemplateCard
        title="Birthday Timeline"
        description="A cute animated timeline to surprise your partner with your favorite memories."
        img="/images/temp1.png"
        price={49}
        onClick={() => console.log("Go to /template/1")}
      />
       <TemplateCard
        title="Birthday Timeline"
        description="A cute animated timeline to surprise your partner with your favorite memories."
        img="https://placehold.co/400x300/pink/white?text=Template+Preview"
        price={49}
        onClick={() => console.log("Go to /template/1")}
      />
       <TemplateCard
        title="Birthday Timeline"
        description="A cute animated timeline to surprise your partner with your favorite memories."
        img="https://placehold.co/400x300/pink/white?text=Template+Preview"
        price={49}
        onClick={() => console.log("Go to /template/1")}
      />

        </div>
    </div>
  )
}

export default TemplateSection