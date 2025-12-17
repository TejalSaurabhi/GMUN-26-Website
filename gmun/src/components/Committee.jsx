import { useParams } from 'react-router-dom';
import UNSC from './UNSC';
import UNHRC from './UNHRC';
import './committee.css'; 
import AIPPM from './AIPPM';
import DISEC from './DISEC';
import IP from './IP';
import WB from './World Bank';
import UNCSW from './UNCSW';

const Committee = () => {
  const { id } = useParams();

  const renderCommittee = () => {
    switch (id) {
      case '1':
        return <UNSC mode="Offline" />;
      case '2':
        return <UNHRC mode="Offline"/>;
      case '3':
        return <AIPPM mode="Offline"/>;
      case '4':
          return <DISEC mode="Offline"/>;
      case '5':
        return <IP mode="Offline"/>;
      case '6':
        return <WB mode="Offline"/>;
      case '7':
        return <UNCSW mode="Online"/>;
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