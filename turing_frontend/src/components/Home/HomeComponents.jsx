import React from 'react';
import BannerCarousel from '../carousel/BannerCarousel';
import HomeProductContainer from '../../containers/HomeProducts';

const Home = () => (
  <section>
    <BannerCarousel />
    <HomeProductContainer />
  </section>
);

export default Home;
