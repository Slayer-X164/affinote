export const Templates = [
  {
    id: "birthday-timeline",
    title: "Birthday Timeline",
    description: "A cute animated timeline to surprise your partner.",
    price: 49,
    previewImg:
      "/images/temp1.png",
    fields: [
      { name: "title", type: "text" },
      { name: "message", type: "textarea" },
      { name: "sectionTitle", type: "text" },
      { name: "buttonText", type: "text" },
      { name: "timelineImages", type: "images", count: 6 },
    ],
  },
  {
    id: "love-letter",
    title: "Love Letter",
    description: "A soft animated letter template with beautiful transitions.",
    price: 39,
    previewImg: "/images/temp2.png",
    fields: [
      { name: "salutation", type: "text" },
      { name: "message", type: "textarea" },
      { name: "signature", type: "text" },
    ],
  },
];
