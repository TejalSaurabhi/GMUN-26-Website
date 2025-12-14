import { motion } from "framer-motion";
import "./styles.css";

const ReviewsData = [
  {
    id: 0,
    name: "Participant A",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "GMUN was an incredible experience that broadened my horizons.",
  },
  {
    id: 1,
    name: "Participant B",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "The debates were engaging and the organization was top-notch.",
  },
  {
    id: 2,
    name: "Participant C",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "I made lifelong friends and learned so much about diplomacy.",
  },
  {
    id: 3,
    name: "Participant D",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "I made lifelong friends and learned so much about diplomacy.",
  },
  {
    id: 4,
    name: "Participant E",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "I made lifelong friends and learned so much about diplomacy.",
  },
  {
    id: 5,
    name: "Participant F",
    avatar: "./home-reviews/placeholder-avatar.png",
    review: "I made lifelong friends and learned so much about diplomacy.",
  },
];

const Reviews = () => {
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
        <h1 className="reviews-heading">What Participants Think About GMUN</h1>

        {/* Reviews Grid */}
        <div className="reviews-container-row">
          <div className="reviews-track">
            {ReviewsData.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-writer">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="avatar"
                  />
                  <h3 className="name">{review.name}</h3>
                </div>
                <div className="review-text">
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
            {ReviewsData.map((review) => (
              <div key={review.id + "-dup"} className="review-card">
                <div className="review-writer">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="avatar"
                  />
                  <h3 className="name">{review.name}</h3>
                </div>
                <div className="review-text">
                  <p>{review.review}</p>
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
