import "./Committees.css";

const CommitteesData = [
  {
    id: 1,
    name: "All India Political Party Meet",
    abrv: "AIPPM",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Online",
  },
  {
    id: 2,
    name: "UN General Assembly",
    abrv: "DISEC",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Offline",
  },
  {
    id: 3,
    name: "UN Human Rights Council",
    abrv: "UNHRC",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Offline",
  },
  {
    id: 4,
    name: "Security Council",
    abrv: "UNSC",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Offline",
  },
  {
    id: 5,
    name: "Commission on the Status of Women",
    abrv: "UNCSW",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Online",
  },
  {
    id: 6,
    name: "International Press",
    abrv: "IP",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Offline",
  },
  {
    id: 7,
    name: "World Bank",
    abrv: "WB",
    about:
      "AIPPM (All India Political Parties Meet) is a unique MUN committee focused on India's domestic politics. Delegates represent real political leaders and debate national issues such as governance, policy reforms, and socio-economic challenges—offering a dynamic, high-intensity simulation of Indian parliamentary politics.",
    mode: "Offline",
  },
];

const Committees = () => {
  return (
    <div className="committees-wrapper">
      <h1>Committees in GMUN 2026</h1>
      
      <div className="committees-track">
        {CommitteesData.map((committee) => (
          <div key={committee.id} className="committee-card">
            <div className="committee-abrv">
              <h2>{committee.abrv}</h2>
            </div>

            <div className="committee-name">
              <p>{committee.name}</p>
            </div>

            <div className="committee-mode">{committee.mode}</div>

            <div className="committee-about">{committee.about}</div>
          </div>
        ))}

        {CommitteesData.map((committee) => (
          <div key={committee.id} className="committee-card">
            <div className="committee-abrv">
              <h2>{committee.abrv}</h2>
            </div>

            <div className="committee-name">
              <p>{committee.name}</p>
            </div>

            <div className="committee-mode">{committee.mode}</div>

            <div className="committee-about">
              <p>{committee.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Committees;
