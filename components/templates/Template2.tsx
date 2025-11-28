import React from "react";

interface LoveLetterProps {
  salutation?: string;
  message?: string;
  signature?: string;
}

const LoveLetter: React.FC<LoveLetterProps> = ({
  salutation = "Dear Love,",
  message = "You mean the world to me. Thank you for making every moment special.",
  signature = "Yours Forever ❤️"
}) => {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-pink-300 to-pink-50 flex justify-center py-16 px-4 text-gray-800">

      <div className="max-w-2xl w-full h-auto bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-pink-200">

        {/* Salutation */}
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-pink-700 mb-6">
          {salutation}
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line mb-10">
          {message}
        </p>

        {/* Divider */}
        <div className="w-20 h-1 bg-pink-300 mx-auto rounded-full mb-10" />

        {/* Signature */}
        <p className="text-right text-xl font-medium text-pink-600">
          {signature}
        </p>
      </div>

    </div>
  );
};

export default LoveLetter;
