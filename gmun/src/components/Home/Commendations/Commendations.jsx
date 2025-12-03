import "./Commendations.css";

const recommendations = [
  {
    id: 1,
    src: "/team-images/Aditya.jpg",
    alt: "LOR 1",
  },
  {
    id: 2,
    src: "/team-images/Mudit.jpeg",
    alt: "LOR 2",
  },
  {
    id: 3,
    src: "/team-images/Uday.jpeg",
    alt: "LOR 3",
  }
];

const Commendations = () => {
  return ( 
    <div className="commendations-wrapper">
      <p className="commendations-text">An MUN recommended by</p>

      <div className="images-container">
        {recommendations.map((rec) => (
          <div key={rec.id} className="commendation-image">
            <img src={rec.src} alt={rec.alt} />
          </div>
        ))}
      </div>
    </div>
   );
}
 
export default Commendations;