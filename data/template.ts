export const Templates = [
  {
    id: "envolope-letter",
    title: "Birthday Envolope Letter",
    description:
      "Celebrate birthdays with warmth and timeless charm using this beautifully designed vintage-style birthday letter template. Featuring soft floral patterns, layered paper textures, and delicate handwritten accents, this template evokes a nostalgic",
    price: 49,
    st_price: 129,
    previewImg: "/previewImg/envLetter.png",
    fields: [
      { name: "person_name", type: "text" },
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
    price: 49,
    st_price: 199,
    previewImg: "/previewImg/flowerSurp.png",
    fields: [
      { name: "start_message", type: "text" },
      { name: "end_message", type: "text" },
    ],
  },
  {
    id: "apology-for-gf",
    title: "Apology For GF",
    description:
      "a small fun interactive Apology Template for your angry girlfriend",
    price: 79,
    st_price: 249,
    previewImg: "/previewImg/ApologyForGf.png",
    fields: [
      { name: "from_name", type: "text" },
      { name: "sorry_message", type: "text" },
      { name: "end_message", type: "text" }
    ],
  },
  {
    id: "apology-for-bf-gf",
    title: "Apology For BF/GF",
    description:
      "a message like cute template for you angry loved one , make them happy",
    price: 79,
    st_price: 249,
    previewImg: "/previewImg/ApologyForBFGF.png",
    fields: [
      { name: "from_name", type: "text" },
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
    price: 59,
    st_price: 199,
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
    price: 49,
    st_price: 229,
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
