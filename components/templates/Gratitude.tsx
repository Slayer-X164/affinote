"use client"


import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"


import {
  FaHeart,
  FaRegStar,
  FaQuoteLeft,
  FaGift,
  FaCheckCircle,
} from "react-icons/fa"
interface MemoryItem {
  image: string
  title: string
  description: string
}
type JustUsData = {
  partnerName?: string
  openingLine?: string

  reason_1?: string
  reason_2?: string
  reason_3?: string
  reason_4?: string

  image_1?: string
  title_1?: string
  description_1?: string

  image_2?: string
  title_2?: string
  description_2?: string

  galleryImage_1?: string
  galleryImage_2?: string
  galleryImage_3?: string

  longMessage?: string

  promise_1?: string
  promise_2?: string
  promise_3?: string

  endingLine?: string
  senderName?: string
}

interface Props {
  data: JustUsData
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

export default function Gratitude({
  partnerName = "My Cutie",
  openingLine = "Every moment with you feels like a dream come true. made this page to remind you how much you mean to me.",

    reason_1 = "Your smile brightens my darkest days.",
    reason_2 = "You understand me like no one else.",
    reason_3 = "Your kindness inspires me to be better.",
    reason_4 = "I love how we can be silly together.",



  image_1 = "https://i.pinimg.com/736x/f2/02/2b/f2022bdeee508e2a8b9eaa3bac73991f.jpg",
  title_1 = "Our First Date",
  description_1 = "The day we met at the park and talked for hours.",


  image_2 = "https://i.pinimg.com/736x/45/67/4c/45674cc163d8747e1f2e4c8b6a2cf41a.jpg",
  title_2 = "Beach Getaway",
  description_2 = "That weekend we spent by the ocean, just us two.",


  galleryImage_1 = "https://i.pinimg.com/736x/d8/73/ad/d873addd0c29df856656b986e4558573.jpg",
  galleryImage_2 = "https://i.pinimg.com/736x/5a/82/72/5a82720b2a3865d86ef26b1af57be4c9.jpg",
  galleryImage_3 = "https://i.pinimg.com/736x/da/32/06/da320624dab8195bc0339d9b159c5af9.jpg",

  longMessage = "I never thought I could find someone who truly gets me until I met you. You are my best friend, my confidant, and the love of my life. I cherish every moment we spend together and look forward to a future filled with more memories and love.",

    promise_1 = "I promise to always support your dreams.",
    promise_2 = "I promise to be there through thick and thin.",
    promise_3 = "I promise to make you laugh every day.",

  endingLine = "Thank you for being you, and for loving me.",
  senderName = "Hubby",
}: JustUsData) {
  const loveReasons = [
    reason_1,
    reason_2,
    reason_3,
    reason_4,
  ]
  const galleryImages = [galleryImage_1, galleryImage_2, galleryImage_3]
  const promises = [promise_1, promise_2, promise_3]

  function shootConfettiFromClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    // get click position inside the viewport (0 → 1)
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 35,
      origin: { x, y },
      colors: ["#ff4d6d", "#ff758f", "#ff8fa3", "#c77dff", "#7b2cbf"],
    })
  }

  const [filledCards, setFilledCards] = useState<boolean[]>(
    Array(loveReasons.length).fill(false)
  )
  function toggleCard(index: number, e: React.MouseEvent<HTMLDivElement>) {
  setFilledCards(prev => {
    const newArr = [...prev]
    newArr[index] = !newArr[index]
    return newArr
  })

  shootConfettiFromClick(e)
}


  function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayedText, setDisplayedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
      const startDelay = setTimeout(() => {
        let i = 0
        const interval = setInterval(() => {
          setDisplayedText(text.slice(0, i + 1))
          i++
          if (i === text.length) {
            clearInterval(interval)
            setIsComplete(true)
          }
        }, 35) // typing speed

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(startDelay)
    }, [text, delay])

    // blinking cursor
    useEffect(() => {
      if (isComplete) return

      const cursor = setInterval(() => {
        setShowCursor((v) => !v)
      }, 500)
      return () => clearInterval(cursor)
    }, [isComplete])

    return (
      <span>
        {displayedText}
        <span className="ml-1">{showCursor && !isComplete ? "|" : " "}</span>
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100 text-gray-800 overflow-hidden">

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 1 }}>
          <FaHeart className="text-blue-500 text-5xl mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">
            Hey {partnerName}
          </h1>
          <p className="text-xl max-w-xl">
            <Typewriter text={openingLine} delay={800} />
          </p>

        </motion.div>
      </section>

      {/* LOVE REASONS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Why you mean so much to me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {loveReasons.map((reason, i) => {
            const isFilled = filledCards[i]

            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 flex gap-4 cursor-pointer"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ ease: "backInOut" }}
                onClick={(e) => toggleCard(i, e)}
                animate={
                  isFilled
                    ? { scale: 1.05, backgroundColor: "#eff6ff" }
                    : { scale: 1, backgroundColor: "#ffffff" }
                }
              >
                <motion.div
                  animate={isFilled ? { scale: 1.2 } : { scale: 1, rotate: 0 }}
                  transition={{ ease: "backInOut" }}
                >
                  {isFilled ? (
                    <FaHeart className="text-blue-400 text-2xl mt-1" />
                  ) : (
                    <FaRegStar className="text-blue-400 text-2xl mt-1" />
                  )}
                </motion.div>

                <p>{reason}</p>
              </motion.div>
            )
          })}
        </div>

      </section>

      {/* MEMORY TIMELINE */}
      <section className="py-24 bg-blue-50 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Our Memories</h2>

        <div className="space-y-16 max-w-4xl mx-auto">

          <motion.div

            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0 * 0.2, type: "spring", bounce: 0.6 }}
          >
            <img
              src={image_1}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-3">{title_1}</h3>
              <p className="text-gray-600">{description_1}</p>
            </div>
          </motion.div>
          <motion.div

            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 1 * 0.2, type: "spring", bounce: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-3">{title_2}</h3>
              <p className="text-gray-600">{description_2}</p>
            </div>
            <img
              src={image_2}
              className="rounded-2xl shadow-lg "
            />
          </motion.div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our little gallery
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Some moments I never want to forget
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              className="rounded-2xl shadow-md"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </section>

      {/* LONG MESSAGE */}
      <section className="py-24 bg-blue-50 px-6 text-center">
        <FaQuoteLeft className="text-4xl mx-auto text-blue-400 mb-6" />
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          {longMessage}
        </p>
      </section>

      {/* PROMISES */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          My promises to you
        </h2>

        <div className="space-y-6 ">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-xl p-5 flex gap-4 items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.2 }}
            >

              <FaCheckCircle className="text-blue-400 text-2xl flex-shrink-0" />
              <p className="mt-1">{p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <FaHeart className="text-blue-500 text-5xl mx-auto mb-6" />
          <h2 className="text-3xl mb-6">{endingLine}</h2>
          <p className="text-xl font-semibold">
            — Your's, {senderName}
          </p>
        </motion.div>
      </section>
    </div>
  )
}
