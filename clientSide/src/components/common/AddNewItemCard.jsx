import * as styles from "../../styles/components/AddNewCard.css";
import { Link } from "react-router-dom";
import * as fonts from "../../styles/fonts/fonts.css";
import admin from "/images/admin_logo.png";

function AddNewItemCard({ setShowAddNewPanel }) {
  return (
    <div className="col-md-4 col-sm-6 col-12 ">
      <div className={styles.NAItem}>
        <Link to={""}>
          <div
            className={styles.NAItemImage}
            onClick={() => {
              setShowAddNewPanel(true);
            }}
          >
            <img src={admin} alt={"admin"} />
          </div>
        </Link>
        <div className={`${styles.NAItemText} bg-info`}>

          <p className={fonts.normalText}>
            <b>Admin:</b><br/> make sure you have name, title, description,image
            and specs PDF file ready
          </p>

          <Link>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setShowAddNewPanel(true);
              }}
            >
              Add New Item
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddNewItemCard;
