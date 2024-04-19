import "../styles/components/LeftNav.css";
import { Link } from "react-router-dom";

function LeftNav() {
  return (
    <div className="left-nav">

      {/* <div className="icon">
      <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="icon">
      <FontAwesomeIcon icon={faTasks} />
      </div>
      <div className="icon">
      <FontAwesomeIcon icon={faCalendarAlt} />
      </div> */}
      <header>
        <h1><Link to={'/'}>H</Link></h1>
      </header>
      <ul>
          <li key="notes">
            <button>
                <Link to={`/notes`}>N</Link>
            </button>
          </li>
      </ul>
    </div>
  );
}

export default LeftNav;
