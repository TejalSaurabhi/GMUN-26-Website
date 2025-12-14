import React from 'react';
import './Sponsors.css';
import bhumun from "./bhumun.png";
import vhere from "./sponsor1.webp";
import iQuanta from "./iQuanta.png";
import finnacle from "./finnacle.jpg";
import shantitrip from "./shantitrip.png";
import unstopng from "./unstopng.png";
import VisionIAS2 from "./VisionIAS2.webp";
import nomura from "./nomura.png";
import spykar from "./Spykar.jpg";
import IDP from "./IDP.jpg";
import farmley from "./Farmley.png";
import Seed from "./Seed.jpg";
import EMT from "./EMT.png";
import LION from "./LION.png";
import CLASSMATE from "./CLASSMATE.jpg";
import TITLE from "./TITLE.jpg";

const currentSponsors = [
  {
    id: 1,
    name: 'Adda52',
    logo: `${TITLE}`,
    description: 'Title Gaming Partner',
  },
  {
    id: 2,
    name: 'IDP Education',
    logo: `${IDP}`,
    description: 'Overseas Education Partner',
    url: 'https://events.register.idp.com/registration/india/XVZW9OAYLIR',
  },
  {
    id: 3,
    name: 'Spykar',
    logo: `${spykar}`,
    description: 'Style Partner',
  },
  {
    id: 4,
    name: 'Farmley',
    logo: `${farmley}`,
    description: 'Snacking Partner',
  },
  {
    id: 5,
    name: 'Seed',
    logo: `${Seed}`,
    description: 'Event Partner',
  },
  {
    id: 6,
    name: 'Ease My Trip',
    logo: `${EMT}`,
    description: 'Travel Partner',
  },
  {
    id: 7,
    name: 'Lion Insurance Brokers',
    logo: `${LION}`,
    description: 'Insurance Partner',
  },
  {
    id: 8,
    name: 'Classmate ITC Ltd',
    logo: `${CLASSMATE}`,
    description: 'Stationery Partner',
  },
];

const previousSponsors = [
  {
    id: 1,
    name: 'IIT BHU MUN',
    logo: `${bhumun}`,
    description: 'Collaboration',
  },
  {
    id: 2,
    name: 'vehere',
    logo: `${vhere}`,
    description: 'Co-Event Sponsor',
  },
  {
    id: 3,
    name: 'iQuanta',
    logo: `${iQuanta}`,
    description: 'Education Sponsor',
  },
  {
    id: 4,
    name: 'Finnacle Institute',
    logo: `${finnacle}`,
    description: 'Strategic Partner',
  },
  {
    id: 5,
    name: 'ShantiTrip Holidays',
    logo: `${shantitrip}`,
    description: 'Travel Partner',
  },
  {
    id: 6,
    name: 'Unstop',
    logo: `${unstopng}`,
    description: 'Event Sponsor',
  },
  {
    id: 7,
    name: 'VisionIAS',
    logo: `${VisionIAS2}`,
    description: 'Previous Association',
  },
  {
    id: 8,
    name: 'Nomura',
    logo: `${nomura}`,
    description: 'Previous Association',
  },
];

const Sponsor = ({ name, logo, description, url }) => (
  <div className="sponsor">
    {url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt={name} />
      </a>
    ) : (
      <img src={logo} alt={name} />
    )}
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

const Sponsors = () => {
  return (
    <div className="sponsors-page">
      {/* Header */}
      <div className="sponsors-header">
        <p className="sponsors-badge">GMUN 4.0</p>
        <h1 className="sponsors-title">Our Sponsors</h1>
        <p className="sponsors-subtitle">
          We are grateful to our partners who make GMUN possible.
        </p>
      </div>

      {/* Current Sponsors Section */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Current Sponsors</h2>
        <div className="sponsor-list">
          {currentSponsors.map((sponsor) => (
            <Sponsor
              key={sponsor.id}
              name={sponsor.name}
              logo={sponsor.logo}
              description={sponsor.description}
              url={sponsor.url}
            />
          ))}
        </div>
      </div>

      {/* Previous Sponsors Section */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Previous Sponsors</h2>
        <div className="sponsor-list">
          {previousSponsors.map((sponsor) => (
            <Sponsor
              key={sponsor.id}
              name={sponsor.name}
              logo={sponsor.logo}
              description={sponsor.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
