import {Fragment} from 'react'
import Header from "../components/Layout/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from '../components/Products/Products';
import CampainSingle from '../components/Campain-Single/CampainSingle';
import Policy from '../components/Layout/Policy/Policy';
import Footer from '../components/Layout/Footer/Footer';

const ShopPage = () => {
  return (
    <Fragment>
      <Header/>
      <Categories/>
      <Products title="Featured Products" />
      <CampainSingle/>
      <Products title="New Arrivals" />
      <Policy/>
      <Footer/>
    </Fragment>
  )
}

export default ShopPage
