"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, Flower2, RotateCcw } from "lucide-react";
import Confetti from "react-confetti";
import Flowers from "../ui/CuteFlowerSurprise/Flowers";
import { playfairDisplay } from "@/app/layout";

type Phase = "envelope" | "game" | "gift" | "flower";
type SquareValue = "X" | "O" | null;

interface WinInfo {
  winner: "X" | "O";
  line: number[];
}
type surprisePropsType = {
  text?:string
}
const CuteSurprise = ({
  text = `Because you make every day as bright as a blooming flower.
        I miss you more than words can say!`
}:surprisePropsType) => {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  // Window size for Confetti
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  };

  // --- TIC TAC TOE LOGIC ---
  const calculateWinner = (squares: SquareValue[]): WinInfo | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as "X" | "O", line: [a, b, c] };
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
  };

  const handleSquareClick = (i: number): void => {
    if (winner || board[i] || phase !== "game") return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);

    const winInfo = calculateWinner(newBoard);
    if (winInfo && winInfo.winner === "X") {
      setWinner("X");
      setWinningLine(winInfo.line);
      setTimeout(() => setPhase("gift"), 1500);
    } else if (newBoard.includes(null)) {
      setTimeout(() => makeComputerMove(newBoard), 400);
    }
  };

  const makeComputerMove = (currentBoard: SquareValue[]): void => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (emptyIndices.length > 0 && !calculateWinner(currentBoard)) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const newBoard = [...currentBoard];
      newBoard[randomIndex] = "O";
      setBoard(newBoard);
      const winInfo = calculateWinner(newBoard);
      if (winInfo) {
        setWinner(winInfo.winner);
        setWinningLine(winInfo.line);
      }
    }
  };

  const isDraw = !winner && board.every((square) => square !== null);

  const getLineStyles = () => {
    if (winningLine.length === 0) return { base: {}, rotate: 0 };
    const [a, , c] = winningLine;
    if (Math.floor(a / 3) === Math.floor(c / 3)) {
      const tops = ["16.6%", "50%", "83.3%"];
      return { base: { top: tops[Math.floor(a / 3)], left: "5%", width: "90%", height: "6px" }, rotate: 0 };
    }
    if (a % 3 === c % 3) {
      const lefts = ["16.6%", "50%", "83.3%"];
      return { base: { left: lefts[a % 3], top: "5%", width: "6px", height: "90%" }, rotate: 0 };
    }
    if (winningLine.includes(0) && winningLine.includes(8)) {
      return { base: { top: "50%", left: "50%", width: "135%", height: "6px", x: "-50%", y: "-50%" }, rotate: 45 };
    }
    return { base: { top: "50%", left: "50%", width: "135%", height: "6px", x: "-50%", y: "-50%" }, rotate: -45 };
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center overflow-hidden p-4 font-sans selection:bg-blue-200">

      {/* CONFETTI ONLY ON THE LAST PHASE */}
      {phase === "flower" && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.15}
          colors={[
            "#f472b6", // Pink 400
            "#fb923c", // Soft Peach
            "#60a5fa", // Blue 400
            "#93c5fd", // Blue 300
            "#ffffff", // White
            "#fce7f3", // Pink 50
            "#3b82f6"  // Blue 500
          ]}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === "envelope" && (
          <motion.div
            key="envelope"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            onClick={() => setPhase("game")}
            className="cursor-pointer group flex flex-col items-center gap-4"
          >
            <div className="relative w-80 h-52 bg-white rounded-b-2xl shadow-2xl shadow-blue-800/30 flex items-center justify-center border-2 border-blue-100 overflow-hidden">
              <div className="absolute inset-0 bg-blue-300" style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)" }}></div>
              <p className="z-10 text-blue-400 font-semibold text-center px-4 pt-20">
                Open when you miss me !
              </p>
            </div>
          </motion.div>
        )}

        {phase === "game" && (
          <motion.div
            key="game"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6 drop-shadow-sm">
              {winner === "O" ? "Oh no! its okay 🥺" : isDraw ? "It's a draw! 😮" : "Win for a surprise! ✨"}
            </h2>

            <div className="grid grid-cols-3 gap-3 bg-blue-200 p-3 rounded-2xl relative shadow-xl">
              {board.map((square, i) => (
                <button
                  key={i}
                  onClick={() => handleSquareClick(i)}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl flex items-center justify-center text-4xl font-black text-blue-500 hover:bg-blue-50 transition-colors shadow-sm relative z-10"
                >
                  {square === "X" && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>X</motion.span>}
                  {square === "O" && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sky-300">O</motion.span>}
                </button>
              ))}

              {winner && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1, rotate: getLineStyles().rotate }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bg-blue-500 rounded-full z-20 pointer-events-none"
                  style={{ ...getLineStyles().base, transformOrigin: "center" }}
                />
              )}
            </div>

            <AnimatePresence>
              {(winner === "O" || isDraw) && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={resetGame}
                  className="mt-8 flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95"
                >
                  <RotateCcw size={20} />
                  Try Again
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "gift" && (
          <motion.div
            key="gift"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setPhase("flower")}
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, -8, 8, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Gift size={140} className="text-blue-500 drop-shadow-xl" fill="currentColor" fillOpacity={0.15} />
            </motion.div>
            <p className="mt-8 text-blue-600 font-black animate-bounce text-2xl tracking-wide">TAP TO OPEN!</p>
          </motion.div>
        )}

        {phase === "flower" && (
  <motion.div
    key="flower"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={springTransition}
    className="flex min-h-screen flex-col items-center text-center max-w-sm justify-center"
  >
    {/* 1. The Flower Container (Now sits at the top) */}
    <div className="w-full h-auto relative top-12 flex items-end justify-center mt-20 md:mt-44">
       <Flowers />
    </div>

    {/* 2. The Text Content (Now sits directly under the flowers) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-4 relative z-20"
    >
      <h1 className={`text-4xl font-sans  font-bold text-blue-400`}>For You!</h1>
      <p className="font-semibold text-blue-950 text-lg  ">
        {text}
      </p>

      {/* Heart Icons */}
      <div className="flex justify-center gap-4 pt-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
          >
            <Heart className="text-blue-600 fill-blue-400" size={28} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
)}
      </AnimatePresence>
    </div>
  );
};

export default CuteSurprise;