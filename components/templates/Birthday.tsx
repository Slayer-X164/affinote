"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
type BirthdayPropType = {
    name: string
    birthday_message?: string
    memory_image_1?: string
    memory_image_2?: string
    memory_image_3?: string
    wish_1?: string
    wish_2?: string
    wish_3?: string
    wish_4?: string

}
export default function Birthday({
    name="Shruti",
    birthday_message=`Be happy! Today is the day you were brought into this world to be a blessing and inspiration to the people around you You are a wonderful person my babygirl i wish all your goals and dreams do come true , work hard for them , i will always be there for you no matter what , i love you babygirl`,
    memory_image_1=`https://i.pinimg.com/736x/e4/39/d6/e439d6ed14be8223f726c075c06c0a96.jpg`,
    memory_image_2=`https://i.pinimg.com/736x/a4/74/8f/a4748f6181d9ac767f64835b535880e8.jpg`,
    memory_image_3=`https://i.pinimg.com/736x/83/f0/c8/83f0c8ff82db6e11c770e178ada9311f.jpg`,
    wish_1="You make every day brighter 💖",
    wish_2="May all your dreams come true 🌟",
    wish_3="Never stop smiling 😊",
    wish_4="You are truly special 🎀",
}) {
    const [candleLit, setCandleLit] = useState(true);
    const [openCard, setOpenCard] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedWish, setSelectedWish] = useState<string | null>(null);

    const { width, height } = useWindowSize();
    const wishes = [
        wish_1,
        wish_2,
        wish_3,
        wish_4
    ];
    const [hearts, setHearts] = useState<number[]>([]);

    const spawnHeart = () => {
        const id = Date.now();

        setHearts((prev) => [...prev, id]);

        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h !== id));
        }, 2000);
    };

    return (

        <div className="min-h-screen overflow-x-hidden   flex flex-col items-center relative p-4">
            {/* White Grid with Dots Background */}
            <div
                className="absolute inset-0 -z-1"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
      `,
                    backgroundSize: "20px 20px, 20px 20px, 20px 20px",
                    backgroundPosition: "0 0, 0 0, 0 0",
                }}
            />
            {typeof window !== "undefined" && showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={300}
                    gravity={0.25}

                    recycle={false}
                />
            )}
            {/* SECTION 1 — HERO */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full bg-white max-w-2xl  border-4 border-pink-200 rounded-2xl shadow-lg p-6 text-center flex items-center flex-col"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex flex-col items-center">Happy Birthday <span className="inline-block">{name}</span> </h1>
                <p className="text-gray-600 mb-4 max-w-80">I hope all your birthday wishes and dreams come true❤️</p>

                <div className="flex flex-col items-center mt-4">

                    <BirthdayCake candleLit={candleLit} />

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setCandleLit(false);
                            setShowConfetti(true);

                            // stop rendering after animation
                            setTimeout(() => setShowConfetti(false), 5000);
                        }}
                        className="mt-6 bg-radial from-white to-pink-200 text-pink-600 border font-semibold hover:bg-pink-200 cursor-pointer px-6 py-2 rounded-[14px] shadow-lg"
                    >
                        {candleLit ? "Blow Candle 🕯️" : "Candle Blown 🎉"}
                    </motion.button>


                </div>
            </motion.div>

            {/* SECTION 2 — MESSAGE CARD */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-2xl bg-white border-4 border-pink-200 border-dashed rounded-2xl shadow-lg p-6 mt-6"
            >
                <h2 className="text-xl font-semibold mb-3">💌 Birthday Message</h2>

                <motion.div
                    onClick={() => setOpenCard(!openCard)}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer bg-pink-100 rounded-xl p-4"
                >
                    {openCard ? (
                        <p className="text-gray-950">
                            {birthday_message}
                        </p>
                    ) : (
                        <p className="text-center text-pink-600 font-medium">
                            Tap to Read
                        </p>
                    )}
                </motion.div>
            </motion.div>

            {/* SECTION 3 — MEMORY WALL */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-2xl bg-white rounded-2xl border-4 border-pink-200 shadow-lg p-6 mt-6"
            >
                <h2 className="text-xl font-semibold mb-4">📸 Memory Wall</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <motion.div
                        style={{
                            backgroundImage: `url(${memory_image_1})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-200 rounded-xl flex-1 h-60 flex items-center justify-center"
                    >

                    </motion.div>
                    <motion.div
                        style={{
                            backgroundImage: `url(${memory_image_2})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-200 rounded-xl flex-1 h-60 flex items-center justify-center"
                    >

                    </motion.div>
                    <motion.div
                        style={{
                            backgroundImage: `url(${memory_image_3})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-200 rounded-xl flex-1 h-60 flex items-center justify-center"
                    >

                    </motion.div>
                </div>
            </motion.div>



            {/* SECTION 4 — WISH JAR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full max-w-2xl bg-white rounded-2xl border-4 border-pink-200 border-dashed shadow-lg p-6 mt-6"
            >
                <h2 className="text-xl font-semibold mb-4">💌 Birthday Wish Jar</h2>

                <div className="grid grid-cols-2 gap-4">

                    {wishes.map((wish, index) => (
                        <motion.div
                            key={index}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedWish(wish)}
                            className="bg-pink-100 rounded-xl p-4 text-center cursor-pointer shadow-sm"
                        >
                            <div className="text-2xl mb-1">📜</div>
                            <p className="text-sm font-medium">Open Wish</p>
                        </motion.div>
                    ))}
                    <AnimatePresence mode="wait">
                        {selectedWish && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedWish(null)}

                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                            >

                                <motion.div
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.7, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}

                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl"
                                >

                                    <div className="text-3xl mb-3">💌</div>

                                    <p className="text-gray-800 text-xl font-medium mb-5">
                                        {selectedWish}
                                    </p>

                                    <button
                                        onClick={() => setSelectedWish(null)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-1.5 rounded-full text-sm cursor-pointer"
                                    >
                                        Close
                                    </button>

                                </motion.div>

                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>

            {/* SECTION — SEND BIRTHDAY LOVE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="w-full max-w-2xl bg-white rounded-2xl border-4 border-pink-200 shadow-lg p-6 mt-6 text-center"
            >

                <h2 className="text-xl font-semibold mb-2">❤️ Receive Birthday Love</h2>
                <p className="text-gray-600 mb-4">
                    Tap the button to get unlimited love
                </p>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => spawnHeart()}
                    className=" bg-radial from-white to-pink-200 text-pink-600 border font-semibold hover:bg-pink-200 cursor-pointer px-6 py-2 rounded-[14px] shadow-lg"
                >
                    Get Love 💖
                </motion.button>
                <div className="fixed inset-0 pointer-events-none z-50">

                    {hearts.map((id) => (
                        <motion.div
                            key={id}
                            initial={{
                                opacity: 1,
                                y: 0,
                                x: Math.random() * window.innerWidth
                            }}
                            animate={{
                                y: -200,
                                opacity: 0
                            }}
                            transition={{ duration: 2 }}
                            className="absolute bottom-10 text-2xl"
                        >
                            ❤️
                        </motion.div>
                    ))}

                </div>

            </motion.div>





        </div>
    );
}


function BirthdayCake({ candleLit }: any) {
    return (
        <div className="relative flex flex-col items-center">





            {/* Cake Bounce */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mt-1"
            >
                <div className="w-full flex items-center justify-around">
                    <div className="w-2 h-10 bg-blue-100 rounded-sm z-0 relative" >
                        {/* Flame */}
                        {candleLit && (
                            <motion.div
                                className="absolute -top-4 -right-1 z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [-6, 6, -6]
                                }}
                                transition={{
                                    duration: 0.35,
                                    delay: 0.2,
                                    repeat: Infinity
                                }}
                            >
                                <div className="w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[3px]" />
                            </motion.div>
                        )}
                    </div>
                    <div className="w-2 h-10 bg-blue-100 rounded-sm z-0 relative" >
                        {/* Flame */}
                        {candleLit && (
                            <motion.div
                                className="absolute -top-4 -right-1 z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [-6, 6, -6]
                                }}
                                transition={{
                                    duration: 0.35,
                                    repeat: Infinity
                                }}
                            >
                                <div className="w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[3px]" />
                            </motion.div>
                        )}
                    </div>
                    <div className="w-2 h-10 bg-blue-100 rounded-sm z-0 relative" >
                        {/* Flame */}
                        {candleLit && (
                            <motion.div
                                className="absolute -top-4 -right-1 z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [-6, 6, -6]
                                }}
                                transition={{
                                    duration: 0.35,
                                    delay: 0.4,
                                    repeat: Infinity
                                }}
                            >
                                <div className="w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[3px]" />
                            </motion.div>
                        )}
                    </div>
                </div>
                {/* Cake Body */}
                <div className="w-40 md:w-48">
                    {/* Candle */}

                    {/* Top Layer */}
                    <div className="h-6 bg-orange-950 rounded-t-xl" />

                    {/* Middle Layer */}
                    <div className="h-14 bg-orange-400/50" />

                    {/* Bottom Layer */}
                    <div className="h-16 bg-orange-800 rounded-b-xl" />

                </div>
            </motion.div>
        </div>
    );
}
