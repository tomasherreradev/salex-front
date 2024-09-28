import type { Car } from "../types";
import CarImageExample from '../assets/images/jpg/cadillac-example-image.jpg';
import HeroSection from "../components/HeroSection";
import IncomingAuctionsAd from "../components/IncomingAuctionsAd";
import SuccessStories from "../components/SuccessStories";
import IncomingAuctions from "../components/IncomingAuctions";
import AuctionProcess from "../components/AuctionProcess";
import CompleteFooter from "../components/CompleteFooter";

const Home = () => {

  const cars: Car[] = [
    {
      id: 1,
      final_price: 7000,
      foto: CarImageExample,
      year: 2020,
      marca: 'Cadillac',
      modelo: 'Escalade ESV',
      placa: '432555'
    },
    {
      id: 2,
      final_price: 15000,
      foto: CarImageExample,
      year: 2018,
      marca: 'BMW',
      modelo: 'X5',
      placa: '432555'
    },
    {
      id: 3,
      final_price: 22000,
      foto: CarImageExample,
      year: 2022,
      marca: 'Audi',
      modelo: 'Q7',
      placa: '432555'
    },
    {
      id: 4,
      final_price: 12000,
      foto: CarImageExample,
      year: 2019,
      marca: 'Mercedes-Benz',
      modelo: 'GLC',
      placa: '432555'
    }
  ]

  return (
      <>
        <HeroSection/>
        <IncomingAuctionsAd/>
        <SuccessStories cars={cars.slice(0, 3)}/>
        <IncomingAuctions/>
        <AuctionProcess/>
        <CompleteFooter/>
      </>
  );
};

export default Home;
