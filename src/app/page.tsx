"use client";

import { useCallback, useState } from "react";
import About from "@/components/site/about";
import Contact from "@/components/site/contact";
import Cursor from "@/components/site/cursor";
import Header from "@/components/site/header";
import Hero from "@/components/site/hero";
import Journey from "@/components/site/journey";
import Preloader from "@/components/site/preloader";
import Showcase from "@/components/site/showcase";
import SmoothScroll from "@/components/site/smooth-scroll";
import Toolbox from "@/components/site/toolbox";
import Work from "@/components/site/work";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <div className="grain">
        <Preloader onDone={onDone} />
        <Cursor />
        <Header />
        <main>
          <Hero ready={ready} />
          <Showcase />
          <Work />
          <About />
          <Toolbox />
          <Journey />
        </main>
        <Contact />
      </div>
    </SmoothScroll>
  );
}
