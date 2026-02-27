

import Hero from './components/Hero';
import StartProjectForm from './components/StartProjectForm';
import WhatWeDo from './components/WhatWeDo';
import CategoriesPage from './categories/page';
import AISpark from './components/AISpark';
import HireBuilder from './components/HireBuilder';

export default function Home() {
  return (
    <>
      <section className="w-full min-h-[80vh] flex items-center justify-center px-0 md:px-8 py-8 bg-black">
        <div className="flex-1 flex items-center justify-center">
          <Hero />
        </div>
      </section>
      <WhatWeDo />
      <section id="categories">
        <CategoriesPage />
      </section>
      <AISpark />
      <section id="hire">
        <HireBuilder />
      </section>
    </>
  );
}
