export const MostUsedTemplates = [
{
    id: "flower-surprise",
    title: "Flower Surprise",
    description:
      "A cute X & O (Tic-Tac-Toe) template with a sweet surprise at the end",
    price: 69,
    st_price: 99,
     isFree:false,
    previewImg: "https://ik.imagekit.io/3znfse3pj/previewImg/flowerSurp.png?updatedAt=1770318113959",
    fields: [
      {
        name: "start_message",
        type: "text",
        placeholder: "example: Open when u miss me !",
      },
      {
        name: "end_message",
        type: "textarea",
        placeholder:
          "example: Because you make every day as bright as a blooming flower.I miss you...",
      },
    ],
  },
  {
  id: "gratitude-page",
  title: "Gratitude Page",
  description:
    "A all-occasion Gratitude page with memories, gallery, promises and a heartfelt message.",
  price: 29,
  st_price: 59,
  isFree:false,
  previewImg: "https://ik.imagekit.io/3znfse3pj/previewImg/gratitude.png",
  fields: [
    { name: "receiverName", type: "text", placeholder: "example: My Cutie" },
    { name: "openingLine", type: "textarea", placeholder: "example: Every moment with you feels like a dream..." },

    // LOVE REASONS
    // { name: "reason_1", type: "text", placeholder: "example: Your smile brightens my darkest days" },
    // { name: "reason_2", type: "text", placeholder: "example: You understand me like no one else" },
    // { name: "reason_3", type: "text", placeholder: "example: Your kindness inspires me to be better" },
    // { name: "reason_4", type: "text", placeholder: "example: I love how we can be silly together" },


    // MEMORIES (2)
    { name: "image_1", type: "image" },
    { name: "title_1", type: "text", placeholder: "example: Our First Date" },
    { name: "description_1", type: "text", placeholder: "example: The day we met at the park..." },

    { name: "image_2", type: "image" },
    { name: "title_2", type: "text", placeholder: "example: Beach Getaway" },
    { name: "description_2", type: "text", placeholder: "example: That weekend we spent by the ocean..." },
    // LONG MESSAGE
    { name: "longMessage", type: "textarea", placeholder: "Write your heartfelt message..." },

    // GALLERY (3)
    { name: "galleryImage_1", type: "image" },
    { name: "galleryImage_2", type: "image" },
    { name: "galleryImage_3", type: "image" },


    // PROMISES
    { name: "promise_1", type: "text", placeholder: "example: I promise to always support your dreams" },
    { name: "promise_2", type: "text", placeholder: "example: I promise to be there through thick and thin" },
    { name: "promise_3", type: "text", placeholder: "example: I promise to make you laugh every day" },

    // ENDING
    { name: "endingLine", type: "text", placeholder: "example: Thank you for being you, and for loving me." },
    { name: "senderName", type: "text", placeholder: "example: Hubby" },
  ],
},
 {
    id: "apology-for-gf",
    title: "Apology For GF/BF 2.0",
    description:
      "a small fun interactive Apology Template for your angry girlfriend",
    price: 79,
  st_price: 149,
   isFree:false,
    previewImg: "https://ik.imagekit.io/3znfse3pj/previewImg/ApologyForGf.png?updatedAt=1770318113956",
    fields: [
      { name: "from_name", type: "text", placeholder: "example: Raj" },
      {
        name: "sorry_message",
        type: "textarea",
        placeholder:
          "example: I’m really sorry, okay? I messed up and I know I hurt you. That was not cool of me at all...",
      },
      {
        name: "end_message",
        type: "text",
        placeholder: "example: Got this Bouquet and a Cat for you baby❤️...",
      },
    ],
  },


];