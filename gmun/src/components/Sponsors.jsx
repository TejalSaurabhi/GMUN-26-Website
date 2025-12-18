import React from 'react';
import './Sponsors.css';

const currentSponsors = [];


const previousSponsors = [
  {
    id: 1,
    name: 'IIT BHU MUN',
    logo: '/gallery/sponsors/bhumun.webp',
    description: 'Collaboration',
  },
  {
    id: 2,
    name: 'vehere',
    logo: '/gallery/sponsors/sponsor1.webp',
    description: 'Co-Event Partner',
  },
  {
    id: 3,
    name: 'iQuanta',
    logo: '/gallery/sponsors/iQuanta.webp',
    description: 'Education Partner',
  },
  {
    id: 4,
    name: 'Finnacle Institute',
    logo: '/gallery/sponsors/finnacle.webp',
    description: 'Strategic Partner',
  },
  {
    id: 5,
    name: 'ShantiTrip Holidays',
    logo: '/gallery/sponsors/shantitrip.webp',
    description: 'Travel Partner',
  },
  {
    id: 6,
    name: 'Unstop',
    logo: '/gallery/sponsors/unstopng.webp',
    description: 'Event Partner',
  },
  {
    id: 7,
    name: 'VisionIAS',
    logo: '/gallery/sponsors/VisionIAS2.webp',
    description: 'Previous Association',
  },
  {
    id: 8,
    name: 'Nomura',
    logo: '/gallery/sponsors/nomura.webp',
    description: 'Previous Association',
  },
  // Moved recent sponsors to previous section
  {
    id: 10,
    name: 'IDP Education',
    logo: '/gallery/sponsors/IDP.webp',
    description: 'Overseas Education Partner',
    url: 'https://events.register.idp.com/registration/india/XVZW9OAYLIR',
  },
  {
    id: 11,
    name: 'Spykar',
    logo: '/gallery/sponsors/Spykar.webp',
    description: 'Style Partner',
  },
  {
    id: 12,
    name: 'Farmley',
    logo: '/gallery/sponsors/Farmley.webp',
    description: 'Snacking Partner',
  },
  {
    id: 13,
    name: 'Seed',
    logo: '/gallery/sponsors/Seed.webp',
    description: 'Event Partner',
  },
  {
    id: 14,
    name: 'Ease My Trip',
    logo: '/gallery/sponsors/EMT.webp',
    description: 'Travel Partner',
  },
  {
    id: 15,
    name: 'Lion Insurance Brokers',
    logo: '/gallery/sponsors/LION.webp',
    description: 'Insurance Partner',
  },
  {
    id: 16,
    name: 'Classmate ITC Ltd',
    logo: '/gallery/sponsors/CLASSMATE.webp',
    description: 'Stationery Partner',
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
        <h1 className="sponsors-title">Our Partners</h1>
        <p className="sponsors-subtitle">
          We are grateful to our partners who make GMUN possible.
        </p>
      </div>

      {/* Current Sponsors Section */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Current Partners</h2>
        <div className="sponsor-list coming-soon">Coming Soon</div>
      </div>

      {/* Previous Sponsors Section */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Previous Partner</h2>
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
