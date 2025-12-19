import { motion } from "framer-motion";
import "./styles.css";
import { useState } from "react";
import { Star } from "lucide-react";

const ReviewsData = [
  {
    id: 0,
    name: "Jinansh Dalal, UNSC",
    rating: 5,
    review:
      "Representing Afghanistan in UNSC as a first-time GMUN participant was incredible. The EB explained everything clearly, making the experience enriching. The recognition from international bodies made it even more special.",
  },
  {
    id: 1,
    name: "Sarthak Yadav, UNHRC",
    rating: 5,
    review:
      "One of the best MUNs I've attended! The committee was supportive and created a great space for collaboration. I had an amazing experience and can't wait for the next edition.",
  },
  {
    id: 2,
    name: "Manav Sanghavi, DISEC",
    rating: 4,
    review:
      "My first MUN at GMUN was truly memorable. The agendas were meaningful, and the exposure I gained throughout the event significantly contributed to my personal development.",
  },
  {
    id: 3,
    name: "Pragya Mandal, G20",
    rating: 5,
    review:
      "GMUN sharpened my public speaking and diplomacy skills. The debates were engaging, and the team was extremely supportive. Highly recommend it for anyone looking to grow.",
  },
  {
    id: 4,
    name: "Pratham Sharma, Lok Sabha",
    rating: 5,
    review:
      "Being part of the Lok Sabha at GMUN was incredibly welcoming. The EB guided us throughout, helping beginners grow into confident delegates while learning real geopolitical insights.",
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < rating ? "star-filled" : "star-empty"}
          fill={index < rating ? "#d4af37" : "transparent"}
          stroke={index < rating ? "#d4af37" : "rgba(212, 175, 55, 0.4)"}
        />
      ))}
    </div>
  );
};

const Reviews = () => {
  const [isHover, setIsHover] = useState(-1);

  return (
    <motion.section
      className="reviews-section"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <div className="reviews-wrapper">
        {/* Heading */}
        <h1 className="reviews-heading">Voices from GMUN</h1>
        <p className="reviews-subheading">
          Insights shared by delegates across committees and editions
        </p>

        {/* Reviews Grid */}
        <div className="reviews-container-row">
          <div className="reviews-track">
            {ReviewsData.map((review) => (
              <div
                key={review.id}
                className={`review-card`}
                onMouseEnter={() => setIsHover(review.id)}
                onMouseDownCapture={() => {
                  isHover !== -1 ? setIsHover(-1) : setIsHover(review.id);
                }}
                onMouseLeave={() => setIsHover(-1)}
              >
                <StarRating rating={review.rating} />
                <div className="review-writer">
                  <h3 className="name">{review.name}</h3>
                </div>
                <div
                  className={`${
                    isHover === review.id
                      ? "overflow-y-scroll"
                      : "overflow-hidden"
                  } review-text`}
                >
                  <p className={isHover !== review.id && "multiline-ellipsis"}>
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
            {ReviewsData.map((review) => (
              <div
                key={review.id + "-dup"}
                className={`review-card`}
                onMouseEnter={() => setIsHover(review.id)}
                onMouseDownCapture={() => {
                  isHover !== -1 ? setIsHover(-1) : setIsHover(review.id);
                }}
                onMouseLeave={() => setIsHover(-1)}
              >
                <StarRating rating={review.rating} />
                <div className="review-writer">
                  <h3 className="name">{review.name}</h3>
                </div>
                <div
                  className={`${
                    isHover === review.id
                      ? "overflow-y-scroll"
                      : "overflow-hidden"
                  } review-text`}
                >
                  <p className={isHover !== review.id && "multiline-ellipsis"}>
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Reviews;
