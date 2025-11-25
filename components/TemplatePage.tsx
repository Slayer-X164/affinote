
import BirthdayTimeline from "./templates/Template1";


const TemplatePage = () => {
  return (
    <BirthdayTimeline
      title="Hey Cutie"
      message="Happy birthday my babygirl..."
      sectionTitle="check out our memories together"
      buttonText="check"
      timeline={[
        [
          { img: "https://placehold.co/400x400/pink/white?text=Image+1", text: "Our first meeting" },
          { img: "https://placehold.co/400x400/pink/white?text=Image+2", text: "Cute kurti day" },
          { img: "https://placehold.co/400x400/pink/white?text=Image+3", text: "Garlic bread moment" },
        ],
        [
          { img: "https://placehold.co/400x400/pink/white?text=Image+4", text: "Shivjayanti together" },
          { img: "https://placehold.co/400x400/pink/white?text=Image+5", text: "Cute girl x chashmish boy" },
          { img: "https://placehold.co/400x400/pink/white?text=Image+6", text: "Bike ride date" },
        ],
        [
          { img: "https://placehold.co/400x400/pink/white?text=Image+7", text: "Exploring SoBo" },
          { img: "https://placehold.co/400x400/pink/white?text=Image+8", text: "Always holding hands" },
        ],
      ]}
    />
  );
};

export default TemplatePage;
