import * as styles from "../styles/HomePage.css";
import HomepageCarousel from "../components/common/HomepageCarousel";
import ProductsGrid from "../components/common/ProductsGrid";
import OnSale from "../components/common/OnSale";
import Banner1 from "../components/common/Banner1";
import Banner2 from "../components/common/Banner2";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <HomepageCarousel />
      <ProductsGrid />
      <Banner1 />
      <OnSale />
      <Banner2 />
    </div>
  );
}

export default HomePage;
