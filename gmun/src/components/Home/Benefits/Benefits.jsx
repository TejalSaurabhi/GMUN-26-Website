import "./Benefits.css";

const benefits = [
  {
    id: 1,
    title: "Beginner friendly",
    text: [
      "No prior MUN experience needed",
      "Introducing online committees",
      "Supportive Executive Board that mentors and guides you",
    ],
  },
  {
    id: 2,
    title: "Proven Prestige",
    text: [
      "4th Edition",
      "200+ delegates in GMUN 2025",
      "From colleges across India",
    ],
  },
  {
    id: 3,
    title: "Skills to Gain",
    text: ["Public speaking", "Negotiation", "Leadership"],
  },
  {
    id: 4,
    title: "Beyond the Committee",
    text: ["Socials & networking", "Culture night", "Unforgettable experience"],
  },
];

const Benefits = () => {
  return (
    <div className="benefits-wrapper">
      <h2 className="benefits-heading">What GMUN 2026 has to Offer</h2>

      <div className="benefits-container">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="benefit">
            <h2 className="benefit-title">{benefit.title}</h2>

            <ul className="benefit-list">
              {benefit.text.map((point, index) => (
                <li key={index} className="benefit-item">
                  <span className="bullet"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
