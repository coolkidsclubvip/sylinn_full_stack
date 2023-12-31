
import * as styles from "../styles/NotFound.css";
import { futuraTitle } from "../styles/fonts/fonts.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <Helmet>
        <title>404 error page</title>
      </Helmet>
      <p className={` ${futuraTitle} ${styles.Text404}`}>
        404 "Page Not Found"
      </p>
      <Link to={"/"}>
        <Button className={styles.button404}>GO BACK</Button>
      </Link>
    </div>
  );
}

export default NotFound;
