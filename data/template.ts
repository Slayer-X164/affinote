export const Templates = [
  {
    id: "envolope-letter",
    title: "Birthday Envelope Letter",
    description:
      "Celebrate birthdays with warmth and timeless charm using this beautifully designed vintage-style birthday letter template. Featuring soft floral patterns, layered paper textures, and delicate handwritten accents, this template evokes a nostalgic",
    price: 69,
    st_price: 119,
    previewImg: "/previewImg/envLetter.png",
    fields: [
      { name: "person_name", type: "text", placeholder: "example: Raj" },
      {
        name: "paragraph_1",
        type: "textarea",
        placeholder: `example: Today feels special, not just because it marks another... `,
      },
      {
        name: "paragraph_2",
        type: "textarea",
        placeholder: `example: May this year bring you memories worth keeping, dreams that feel closer than ever... `,
      },
      { name: "signature", type: "text", placeholder: "example: Your Riya" },
    ],
  },
  {
    id: "flower-surprise",
    title: "Flower Surprise",
    description:
      "A cute X & O (Tic-Tac-Toe) template with a sweet surprise at the end",
    price: 69,
    st_price: 119,
    previewImg: "/previewImg/flowerSurp.png",
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
    id: "apology-for-gf",
    title: "Apology For GF/BF 2.0",
    description:
      "a small fun interactive Apology Template for your angry girlfriend",
    price: 99,
    st_price: 149,
    previewImg: "/previewImg/ApologyForGf.png",
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
  {
    id: "apology-for-bf-gf",
    title: "Apology For BF/GF",
    description:
      "a message like cute template for you angry loved one , make them happy",
    price: 99,
    st_price: 149,
    previewImg: "/previewImg/ApologyForBFGF.png",
    fields: [
      { name: "from_name", type: "text", placeholder: "example: Raj❤️" },
      {
        name: "left_text_1",
        type: "text",
        placeholder: "example: Im soo done with you 😠",
      },
      {
        name: "right_text_1",
        type: "text",
        placeholder: "example: im sorry babe i messed up😔",
      },
      {
        name: "right_text_2",
        type: "text",
        placeholder: "example: But i made smth for you",
      },
      {
        name: "sorry_message",
        type: "textarea",
        placeholder:
          "example: I’m really sorry, okay? I messed up and I know I hurt you. That was not cool of me at all...",
      },
      {
        name: "final_message",
        type: "text",
        placeholder: "example: Forgive me baby ily ❤️",
      },
    ],
  },
  {
    id: "memory-timeline",
    title: "Memory Timeline",
    description:
      "A nostalgic memory timeline with photos and notes for your loved one",
    price: 79,
    st_price: 119,
    previewImg: "/previewImg/memoTime.png",
    fields: [
      { name: "title_1", type: "text",placeholder:"example: Our first Date 🥺" },

      { name: "photo_1", type: "image" },
      { name: "photo_2", type: "image" },

      { name: "title_2", type: "text",placeholder:"example: day out at mall 💗" },

      { name: "photo_3", type: "image" },
      { name: "photo_4", type: "image" },
      { name: "photo_5", type: "image" },

      { name: "end_message", type: "textarea",placeholder:"example: Looking back through these photos, I’m reminded that even the..." },
    ],
  },
  {
    id: "appreciation-for-friend",
    title: "Appreciation for a Friend",
    description:
      "A heartfelt appreciation page with memories, photos, and a meaningful message for your best friend.",
    price: 69,
    st_price: 99,
    previewImg: "/previewImg/appreciationFriend.png",
    fields: [
      { name: "photo_text_1", type: "text",placeholder:"example: day at college" },
      { name: "photo_1", type: "image" },

      { name: "photo_text_2", type: "text",placeholder:"example: our cafe hops" },
      { name: "photo_2", type: "image" },

      { name: "photo_text_3", type: "text",placeholder:"example: Random hangout" },
      { name: "photo_3", type: "image" },

      { name: "end_message", type: "textarea",placeholder:"example: I  was just thinking about how much I appreciate having you in..." },
    ],
  },
  {
  id: "birthday",
  title: "Birthday Page",
  description:
    "birthday template with cake animation, memory wall, wish jar, confetti celebration and floating hearts interaction.",
  price: 79,
  st_price: 119,
  previewImg: "/previewImg/birthday.png",
  fields: [
    {
      name: "name",
      type: "text",
      placeholder: "example: Shruti",
    },
    {
      name: "birthday_message",
      type: "textarea",
      placeholder:
        "example: Be happy! Today is the day you were brought into this world to be a blessing and inspiration...",
    },
    {
      name: "memory_image_1",
      type: "image",
      placeholder: "Upload first memory image",
    },
    {
      name: "memory_image_2",
      type: "image",
      placeholder: "Upload second memory image",
    },
    {
      name: "memory_image_3",
      type: "image",
      placeholder: "Upload third memory image",
    },
    {
      name: "wish_1",
      type: "text",
      placeholder: "example: You make every day brighter 💖",
    },
    {
      name: "wish_2",
      type: "text",
      placeholder: "example: May all your dreams come true 🌟",
    },
    {
      name: "wish_3",
      type: "text",
      placeholder: "example: Never stop smiling 😊",
    },
    {
      name: "wish_4",
      type: "text",
      placeholder: "example: You are truly special 🎀",
    },
  ],
},
 {
  id: "valentine_1",
  title: "Valentine's Gift",
  description:
    "Beautiful Valentine Template with multiple gift options to choose from",
  price: 99,
  st_price: 149,
  previewImg: "/previewImg/valentine_1.png",
  fields: [

    {
      name: "your_message",
      type: "textarea",
      placeholder:
        "In your eyes, I have found a home where my soul finally feels at rest. Every moment spent with you is a ...",
    },

  ],
},

];
