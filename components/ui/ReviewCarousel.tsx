"use client";

const reviewImages = [
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_01.png?updatedAt=1787848986354",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_02.png?updatedAt=1787848986384",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_03.png?updatedAt=1787848986377",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_04.png?updatedAt=1787848986347",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_05.png?updatedAt=1787848986336",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_06.png?updatedAt=1787848986384",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_07.png?updatedAt=1787848986323",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_08.png?updatedAt=1787848986399",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_09.png?updatedAt=1787848986379",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_10.png?updatedAt=1787848986351",
  "https://ik.imagekit.io/3znfse3pj/Reviews/rev_11.png?updatedAt=1787848986352"
];

const ReviewCarousel = () => {
  // Duplicate the array for seamless infinite loop
  const slides = [...reviewImages, ...reviewImages];

  return (
    <section className="w-full pt-10 pb-16 px-3 flex flex-col items-center gap-7 overflow-hidden">
      <div className="flex items-center justify-center flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
        What People Are{" "}
        <span className="text-blue-500 italic font-semibold">Saying</span>
      </h2>
      <p className="text-neutral-500 text-sm md:text-base text-center max-w-md">
        Real screenshots from real people who loved their Affinote pages.
      </p>
      </div>

      <div className="relative w-full max-w-6xl border-x-4 border-blue-600 ">
        {/* Fade edges */}
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-6 md:w-16 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 md:w-16 z-10 bg-gradient-to-l from-white to-transparent" /> */}

        <div className="overflow-hidden">
          <div
            className="flex gap-4 w-max animate-scroll"
          >
            {slides.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-52 w-auto h-60 md:h-80 rounded-xl overflow-hidden shadow-md border border-neutral-100 transition-transform duration-300"
              >
                <img
                  src={src}
                  alt={`Review ${(i % reviewImages.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
