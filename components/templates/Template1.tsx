import React from "react";

export interface TimelineItem {
  img: string;
  text: string;
}

export interface BirthdayTimelineProps {
  title?: string;
  message?: string;
  buttonText?: string;
  sectionTitle?: string;
  timelineImages?: TimelineItem[][];
}

const BirthdayTimeline: React.FC<BirthdayTimelineProps> = ({
  title = "Hey Cutie",
  message = "Happy birthday my babygirl...",
  buttonText = "check",
  sectionTitle = "check out our memories together",
  timelineImages = [
          [
            {
              img: "https://placehold.co/400x400/pink/white?text=Image+1",
              text: "Our first meeting",
            },
            {
              img: "https://placehold.co/400x400/pink/white?text=Image+2",
              text: "Cute kurti day",
            },
            {
              img: "https://placehold.co/400x400/pink/white?text=Image+3",
              text: "Garlic bread moment",
            },
          ]
        ],
}) => {
  return (
    <div className="w-full min-h-screen font-sans text-gray-900 bg-pink-50">

      {/* MAIN SECTION */}
      <div
        id="main1"
        className="w-full h-auto flex items-center justify-center px-6 py-20 bg-gradient-to-b from-pink-200 to-pink-100"
      >
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-700">
            {title}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            {message}
          </p>

          <div className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold text-pink-800">{sectionTitle}</h2>
            <a
              href="#memories"
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 transition"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <div id="memories" className="w-full py-20 px-4 bg-white">
        {timelineImages.map((group, idx) => (
          <div
            key={idx}
            className="flex flex-wrap gap-6 justify-center "
          >
            {group.map((item, index) => (
              <div
                key={index}
                className="bg-pink-100 shadow-md p-4 rounded-xl w-64 hover:scale-[1.02] transition"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={item.img}
                    className="w-full h-48 object-cover rounded-lg"
                    alt={`img-${index}`}
                  />
                  <p className="mt-3 text-center text-gray-800 font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* GO TO TOP */}
      <div className="w-full py-10 bg-pink-50 text-center">
        <a
          href="#main1"
          className="px-5 py-2 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
        >
          go to top
        </a>
      </div>
    </div>
  );
};

export default BirthdayTimeline;
