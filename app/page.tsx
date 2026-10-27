import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Vehicles from '@/components/Vehicles';
import Services from '@/components/Services';
import TyreRail from '@/components/TyreRail';
import Alloys from '@/components/Alloys';
import Why from '@/components/Why';
import Alignment from '@/components/Alignment';
import SizeDecoder from '@/components/SizeDecoder';
import Street from '@/components/Street';
import ShopFloor from '@/components/ShopFloor';
import Reviews from '@/components/Reviews';
import Visit from '@/components/Visit';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import SmoothScroll from '@/components/SmoothScroll';
import RevealObserver from '@/components/RevealObserver';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Vehicles />
        <Services />
        <TyreRail />
        <Alloys />
        <Why />
        <Alignment />
        <Street />
        <SizeDecoder />
        <ShopFloor />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
      <SmoothScroll />
      <RevealObserver />
      <Motion />
    </>
  );
}
