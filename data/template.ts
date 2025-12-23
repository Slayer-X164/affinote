export const Templates = [
  {
    id: "birthday-timeline",
    title: "Birthday Timeline",
    description: "A cute animated timeline to surprise your partner.",
    price: 1,
    previewImg: "/previewImg/temp1.png",
    fields: [
      { name: "title", type: "text" },
      { name: "message", type: "textarea" },
      { name: "sectionTitle", type: "text" },
      { name: "buttonText", type: "text" },
      { name: "timelineImages", type: "images", count: 3 },
    ],
  },

  {
    id: "envolope-letter",
    title: "Birthday Envolope Letter",
    description:
      "Celebrate birthdays with warmth and timeless charm using this beautifully designed vintage-style birthday letter template. Featuring soft floral patterns, layered paper textures, and delicate handwritten accents, this template evokes a nostalgic",
    price: 1,
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
    previewImg: "/previewImg/flowerSurp.png",
    fields: [
      { name: "text", type: "text" },
    ],
  },
  {
    id: "Apology-for-gf",
    title: "Apology For GF",
    description:
      "a small fun interactive Apology Template for your angry girlfriend",
    price: 1,
    previewImg: "/previewImg/ApologyForGf.png",
    fields: [
      { name: "from", type: "text" },
    ],
  },
  {
    id: "Apology-for-bf-gf",
    title: "Apology For BF/GF",
    description:
      "a message like cute template for you angry loved one , make them happy",
    price: 1,
    previewImg: "/previewImg/ApBfgF.png",
    fields: [
      { name: "name", type: "text" },
      { name: "left_text_1", type: "text" },
      { name: "right_text_1", type: "text" },
      { name: "right_text_2", type: "text" },
      { name: "sorry_message", type: "textarea" },
      { name: "final_message", type: "text" },
    ],
  },

];
