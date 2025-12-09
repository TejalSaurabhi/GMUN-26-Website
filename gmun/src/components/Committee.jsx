import { useParams } from 'react-router-dom';
import UNSC from './UNSC';
import UNHRC from './UNHRC';
import DISEC from './DISEC'; 
import LokSabha from './LokSabha';
import G20 from './G20';
import './committee.css'; // Ensure styles are consistent across all components

const Committee = () => {
  const { id } = useParams();

  // Function to render the appropriate committee based on the URL parameter
  const renderCommittee = () => {
    switch (id) {
      case '1':
        return <UNSC />;
      case '2':
        return <UNHRC />;
      case '3':
        return <DISEC />;
      case '4':
          return <LokSabha />;
      case '5':
        return <G20 />;
      default:
        return <h1 className="error">Committee Not Found</h1>;
    }
  };

  return (
    <div id="Committee">
    <div className="committee-page">
      {/* Render the committee-specific content */}
      <div className="committee-content-wrapper">{renderCommittee()}</div>
    </div>
  
    </div>
    
  );
};

export default Committee;


