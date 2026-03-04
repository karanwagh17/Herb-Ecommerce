
import image1 from "../assets/wellhub1.avif";
import image2 from "../assets/wellhub2.avif";
import image3 from "../assets/wellhub3.avif";
import image4 from "../assets/wellhub4.avif";
import image5 from "../assets/wellhub5.avif";
import image6 from "../assets/wellhub6.avif";
import rewords from "../assets/Rewards_iHerb.webp"



import "../css/WellnessHub.css";

const wellnessItems = [
  {
    img:image1 , 
    title: "The Hidden Dangers Of Sunscreen: What’s Really In",
  },
  {
    img:image2,
    title: "The Best Vitamins and Supplements for Healthy",
  },
  {
    img: image3,
    title: "Zinc And IBS: A Missing Link In Women’s Gut And Mental",
  },
  {
    bg: true,
    title: "WELLNESS HUB",
  },
  {
    img: image4,
    title: "Natural Ways To Heal Wounds Faster",
  },
  {
    img: image5,
    title: "What Are Adaptogens And Why Should You Take Them?",
  },
  {
    img: image6,
    title: "5 Science-Approved Habits For Better Sleep",
  },
];

const WellnessHub = () => {
  return (
    <div className="wellness-wrapper">
      <div className="wellness-scroll">
        {wellnessItems.map((item, index) =>
          item.bg ? (
            <div className="wellness-card bg-card" key={index}>
              <span>{item.title}</span>
            </div>
          ) : (
            <div className="wellness-card" key={index}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          )
        )}
      </div>

   <div className="promo-banner m-auto">
      {/* <img src={rewords} alt="HERB Rewards Logo" className="promo-logo-img" /> */}
      <span className="promo-message">
        Get free products, insider access, and exclusive offers!
      </span>
    </div>

    </div>
  );
};

export default WellnessHub;
