import "./Benefits.css";

const benefits = [
  {
    id: 1,
    text: "Meet talented and diverse students from across the country",
  },
  {
    id: 2,
    text: "Take on roles of diplomats and represent various nations in both ONLINE and OFFLINE mode",
  },
  {
    id: 3,
    text: "Research the assigned country, understand its policies, and articulate its position on the agenda",
  },
  {
    id: 4,
    text: "Interact, share perspectives and form lasting connections with students from varied backgrounds",
  },
];

const Benefits = () => {
  return (
    <div className="benefits-wrapper">
      <h2 className="benefits-heading">What GMUN 2026 has to Offer</h2>

      <div className="benefits-container">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="benefit">
            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
