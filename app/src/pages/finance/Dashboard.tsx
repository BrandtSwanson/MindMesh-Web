import "../../styles/finance/Finance.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const FinanceDashboard = ({}: Props) => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="finance-page">
        <h1 className="finance-title">Finance Center</h1>

        {/* List of notes */}
        <ul className="finance-list">
            <Link to={`/accounts` } className="finance-entry-title">
            <li className="finance-item">
              Accounts
            </li>
            </Link>
            <Link to={`/budget` } className="finance-entry-title">
            <li className="finance-item">
              Budget
            </li>
            </Link>
            <Link to={`/transactions` } className="finance-entry-title">
            <li className="finance-item">
                Transactions
            </li></Link>
        </ul>
        <div className="finance-panels">
            <div className="finance-panel">
                <p>Overall balance</p>
            </div>
            <div className="finance-panel">
                <p>Money left for month</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;
