export const Templates = [
  {
    id: "birthday-timeline",
    title: "Birthday Timeline",
    description: "A cute animated timeline to surprise your partner.",
    price: 1,
    previewImg:
      "/previewImg/temp1.png",
    fields: [
      { name: "title", type: "text" },
      { name: "message", type: "textarea" },
      { name: "sectionTitle", type: "text" },
      { name: "buttonText", type: "text" },
      { name: "timelineImages", type: "images", count: 3 },
    ],
  },

  {
    id:"envolope-letter",
    title:"Birthday Envolope Letter",
    description:"Celebrate birthdays with warmth and timeless charm using this beautifully designed vintage-style birthday letter template. Featuring soft floral patterns, layered paper textures, and delicate handwritten accents, this template evokes a nostalgic",
    price:1,
    previewImg:"/previewImg/envLetter.png",
    fields: [
      { name: "name", type: "text" },
      { name: "paragraph_1", type: "textarea" },
      { name: "paragraph_2", type: "textarea" },
      { name: "signature", type: "text" },
    ],
  }
];
