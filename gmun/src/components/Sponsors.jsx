import React from 'react';
import './Sponsors.css';

const currentSponsors = [
  { id: 1, name: 'StuCred', logo: '/gallery/sponsors/stucred.png', description: 'Title Partner' },
  { id: 2, name: 'The WallStreet School India', logo: '/gallery/sponsors/LOGO-TWSS.webp', description: 'Education Partner' },
  { id: 3, name: 'IMS', logo: '/gallery/sponsors/IMS.png', description: 'Education Partner' },
  { id: 4, name: 'Learn 4 Exam', logo: '/gallery/sponsors/Learn4exam%20logo.jpeg', description: 'Education Partner' },
  { id: 5, name: 'Camlin Kokuyo', logo: '/gallery/sponsors/CAMLIN.jpg', description: 'Stationery Partner' },
  { id: 6, name: 'Classmate', logo: '/gallery/sponsors/CLASSMATE.webp', description: 'Stationery Partner' },
  { id: 7, name: 'Reynolds', logo: '/gallery/sponsors/RENOLDS.jpg', description: 'Stationery Partner' },
  { id: 8, name: 'Madmix', logo: '/gallery/sponsors/Madmix-Logo.png', description: 'Snacking Partner' },
  { id: 9, name: 'Pabitra Beverages', logo: '/gallery/sponsors/Pabitra%20Logo%205_Crop%201.png', description: 'Beverage Partner' },
  { id: 10, name: 'Cup Ji', logo: '/gallery/sponsors/cup_ji_logo.jpg', description: 'Beverage Partner' },
  { id: 11, name: 'EaseMyTrip', logo: '/gallery/sponsors/EASEMYTRIP.jpg', description: 'Travel Partner' },
  { id: 12, name: 'Paytm Travel', logo: '/gallery/sponsors/PAYTMTRAVEL.jpg', description: 'Travel Partner' },
];


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
  const stuCred = currentSponsors.find(s => s.name === 'StuCred');

  const titlePartners = currentSponsors.filter(s => /title/i.test(s.description) && s.name !== 'StuCred');
  const educationPartners = currentSponsors.filter(s => /education/i.test(s.description));
  const stationeryPartners = currentSponsors.filter(s => /stationery/i.test(s.description));
  const snackAndBeveragePartners = currentSponsors.filter(s => /snack|snacking|beverage|drink/i.test(s.description));
  const travelPartners = currentSponsors.filter(s => /travel/i.test(s.description));

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

      {/* StuCred hero (kept top & centered) */}
      {stuCred && (
        <div className="sponsors-section">
          <div className="stucred-hero">
            <img src={stuCred.logo} alt={stuCred.name} />
            <h2 className="stucred-name">{stuCred.name}</h2>
            <p className="stucred-desc">{stuCred.description}</p>
          </div>
        </div>
      )}

      {/* Current Partners with subheadings */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Current Partners</h2>

        {/* Title Partner (other than StuCred) */}
        {titlePartners.length > 0 && (
          <>
            <h3 className="partner-subheading">Title Partner</h3>
            <div className="sponsor-list">
              {titlePartners.map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}

        {/* Education Partners */}
        {educationPartners.length > 0 && (
          <>
            <h3 className="partner-subheading">Education Partners</h3>
            <div className="sponsor-list">
              {educationPartners.map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}

        {/* Stationery Partners */}
        {stationeryPartners.length > 0 && (
          <>
            <h3 className="partner-subheading">Stationery Partners</h3>
            <div className="sponsor-list">
              {stationeryPartners.map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}

        {/* Snacking and Beverage Partners */}
        {snackAndBeveragePartners.length > 0 && (
          <>
            <h3 className="partner-subheading">Snacking and Beverage Partners</h3>
            <div className="sponsor-list">
              {snackAndBeveragePartners.map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}

        {/* Travel Partners */}
        {travelPartners.length > 0 && (
          <>
            <h3 className="partner-subheading">Travel Partners</h3>
            <div className="sponsor-list">
              {travelPartners.map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}

        {/* Any other current sponsors that didn't match above */}
        {currentSponsors.filter(s => s.name !== 'StuCred' && !titlePartners.includes(s) && !educationPartners.includes(s) && !stationeryPartners.includes(s) && !snackAndBeveragePartners.includes(s) && !travelPartners.includes(s)).length > 0 && (
          <>
            <h3 className="partner-subheading">Other Partners</h3>
            <div className="sponsor-list">
              {currentSponsors.filter(s => s.name !== 'StuCred' && !titlePartners.includes(s) && !educationPartners.includes(s) && !stationeryPartners.includes(s) && !snackAndBeveragePartners.includes(s) && !travelPartners.includes(s)).map(s => (
                <Sponsor key={s.id} {...s} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Previous Sponsors Section */}
      <div className="sponsors-section">
        <h2 className="sponsors-section-title">Previous Partners</h2>
        <div className="sponsor-list previous-sponsor-list">
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
