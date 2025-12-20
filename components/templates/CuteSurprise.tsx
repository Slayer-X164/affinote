"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, Flower2 } from "lucide-react";

type Phase = "envelope" | "game" | "gift" | "flower";
type SquareValue = "X" | "O" | null;

interface WinInfo {
  winner: "X" | "O";
  line: number[];
}

const CuteSurprise: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Cols
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a] as "X" | "O", line: [a, b, c] };
      }
    }
    return null;
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
    } else {
      setTimeout(() => makeComputerMove(newBoard), 400);
    }
  };

  const makeComputerMove = (currentBoard: SquareValue[]): void => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (emptyIndices.length > 0 && !calculateWinner(currentBoard)) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
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

  // --- REWIRED LINE LOGIC ---
  const getLineStyles = () => {
    if (winningLine.length === 0) return { base: {}, rotate: 0 };
    const [a, , c] = winningLine;

    // 1. Horizontal Lines
    if (Math.floor(a / 3) === Math.floor(c / 3)) {
      const row = Math.floor(a / 3);
      const tops = ["16.6%", "50%", "83.3%"];
      return {
        base: { top: tops[row], left: "5%", width: "90%", height: "6px" },
        rotate: 0,
      };
    }

    // 2. Vertical Lines
    if (a % 3 === c % 3) {
      const col = a % 3;
      const lefts = ["16.6%", "50%", "83.3%"];
      return {
        base: { left: lefts[col], top: "5%", width: "6px", height: "90%" },
        rotate: 0,
      };
    }

    // 3. Diagonal: Top-Left to Bottom-Right (\)
    if (winningLine.includes(0) && winningLine.includes(8)) {
      return {
        base: {
          top: "50%",
          left: "50%",
          width: "135%",
          height: "6px",
          x: "-50%",
          y: "-50%",
        },
        rotate: 45,
      };
    }

    // 4. Diagonal: Top-Right to Bottom-Left (/)
    if (winningLine.includes(2) && winningLine.includes(6)) {
      return {
        base: {
          top: "50%",
          left: "50%",
          width: "135%",
          height: "6px",
          x: "-50%",
          y: "-50%",
        },
        rotate: -45,
      };
    }

    return { base: {}, rotate: 0 };
  };

  return (
    <div className="fixed inset-0 bg-rose-50 flex items-center justify-center overflow-hidden p-4 font-sans selection:bg-rose-200">
      <AnimatePresence mode="wait">
        {/* PHASE 1: ENVELOPE */}
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
            <div className="relative w-90 h-60 bg-white rounded-b-2xl shadow-2xl flex items-center justify-center border-2 border-rose-100 overflow-hidden">
              <div
                className="absolute inset-0 bg-rose-300"
                style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)" }}
              ></div>
              <p className="z-10 text-rose-500 font-semibold text-center  transition-transform px-4 pt-24">
                Open when you <br /> miss me <br /> ❤️
              </p>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: GAME */}
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
            <h2 className="text-2xl font-bold text-rose-600 mb-6 drop-shadow-sm">
              Win for a surprise! ✨
            </h2>
            {/* GRID CONTAINER: Remove 'overflow-hidden' so diagonals can reach the corners */}
            <div className="grid grid-cols-3 gap-3 bg-rose-200 p-3 rounded-2xl relative shadow-xl">
              {board.map((square, i) => (
                <button
                  key={i}
                  onClick={() => handleSquareClick(i)}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl flex items-center justify-center text-4xl font-black text-rose-500 hover:bg-rose-50 transition-colors shadow-sm relative z-10"
                >
                  {square === "X" && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      X
                    </motion.span>
                  )}
                  {square === "O" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-sky-300"
                    >
                      O
                    </motion.span>
                  )}
                </button>
              ))}

              {/* STRIKE-THROUGH LINE */}
              {winner && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: 1,
                    rotate: getLineStyles().rotate, // Pass rotation here
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bg-rose-500 rounded-full z-20 pointer-events-none"
                  style={{
                    ...getLineStyles().base,
                    transformOrigin: "center", // Ensures it rotates from the middle
                  }}
                />
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 3: GIFT */}
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
              animate={{
                y: [0, -20, 0],
                rotate: [0, -8, 8, -8, 8, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Gift
                size={140}
                className="text-rose-500 drop-shadow-xl"
                fill="currentColor"
                fillOpacity={0.15}
              />
            </motion.div>
            <p className="mt-8 text-rose-600 font-black animate-bounce text-2xl tracking-wide">
              TAP ME! 🎁
            </p>
          </motion.div>
        )}

        {/* PHASE 4: FLOWER */}
        {phase === "flower" && (
          <motion.div
            key="flower"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1.2, rotate: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <Flower2
                size={160}
                className="text-rose-500 mb-6 drop-shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-serif text-rose-800 italic">
                For You!
              </h1>
              <p className="text-rose-600 text-lg font-medium leading-relaxed">
                Because you make every day as bright as a blooming flower.{" "}
                <br />I miss you more than words can say! ❤️
              </p>

              <div className="flex justify-center gap-4 pt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.4,
                    }}
                  >
                    <Heart className="text-rose-400 fill-rose-400" size={28} />
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
