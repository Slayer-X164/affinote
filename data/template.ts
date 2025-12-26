export const Templates = [
  {
    id: "envolope-letter",
    title: "Birthday Envolope Letter",
    description:
      "Celebrate birthdays with warmth and timeless charm using this beautifully designed vintage-style birthday letter template. Featuring soft floral patterns, layered paper textures, and delicate handwritten accents, this template evokes a nostalgic",
    price: 1,
    st_price: 30,
    previewImg: "/previewImg/envLetter.png",
    fields: [
      { name: "name", type: "text" },
      { name: "paragraph_1", type: "textarea" },
      { name: "paragraph_2", type: "textarea" },
      { name: "signature", type: "text" },
    ],
  },
  {
    id: "flower-surprise",
    title: "Flower Surpirse",
    description:
      "A cute X & O (Tic-Tac-Toe) template with a sweet surprise at the end",
    price: 1,
    st_price: 120,
    previewImg: "/previewImg/flowerSurp.png",
    fields: [{ name: "text", type: "text" }],
  },
  {
    id: "Apology-for-gf",
    title: "Apology For GF",
    description:
      "a small fun interactive Apology Template for your angry girlfriend",
    price: 1,
    st_price: 68,
    previewImg: "/previewImg/ApologyForGf.png",
    fields: [{ name: "from", type: "text" }],
  },
  {
    id: "Apology-for-bf-gf",
    title: "Apology For BF/GF",
    description:
      "a message like cute template for you angry loved one , make them happy",
    price: 1,
    st_price: 45,
    previewImg: "/previewImg/ApologyForBFGF.png",
    fields: [
      { name: "name", type: "text" },
      { name: "left_text_1", type: "text" },
      { name: "right_text_1", type: "text" },
      { name: "right_text_2", type: "text" },
      { name: "sorry_message", type: "textarea" },
      { name: "final_message", type: "text" },
    ],
  },
  {
    id: "memory-timeline",
    title: "Memory Timeline",
    description:
      "A nostalgic memory timeline with photos and notes for your loved one",
    price: 1,
    st_price: 99,
    previewImg: "/previewImg/memoTime.png",
    fields: [
      { name: "title_1", type: "text" },

      { name: "photo_1", type: "image" },
      { name: "photo_2", type: "image" },

      { name: "title_2", type: "text" },

      { name: "photo_3", type: "image" },
      { name: "photo_4", type: "image" },
      { name: "photo_5", type: "image" },

      { name: "end_message", type: "textarea" },
    ],
  },
  {
    id: "appreciation-for-friend",
    title: "Appreciation for a Friend",
    description:
      "A heartfelt appreciation page with memories, photos, and a meaningful message for your best friend.",
    price: 1,
    st_price: 79,
    previewImg: "/previewImg/appreciationFriend.png",
    fields: [
      { name: "photo_text_1", type: "text" },
      { name: "photo_1", type: "image" },

      { name: "photo_text_2", type: "text" },
      { name: "photo_2", type: "image" },

      { name: "photo_text_3", type: "text" },
      { name: "photo_3", type: "image" },

      { name: "end_message", type: "textarea" },
    ],
  },
];
