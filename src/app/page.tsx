import { getLabs, getFaq, getResults, getNav } from '@/content'
import { ScrollDepth } from '@/components/ScrollDepth'
import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { WhoWeWorkWith } from '@/components/sections/WhoWeWorkWith'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { WhyDifferent } from '@/components/sections/WhyDifferent'
import { Results } from '@/components/sections/Results'
import { Snapshot } from '@/components/sections/Snapshot'
import { Founder } from '@/components/sections/Founder'
import { Team } from '@/components/sections/Team'
import { OpportunityLab } from '@/components/sections/OpportunityLab'
import { Faq } from '@/components/sections/Faq'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { Footer } from '@/components/sections/Footer'

export default function LandingPage() {
  const nav = getNav()

  return (
    <>
      <Nav links={nav} />
      <main id="main">
        <Hero />
        <About />
        <WhatWeDo labs={getLabs()} />
        <WhoWeWorkWith />
        <HowItWorks />
        <WhyDifferent />
        <Results results={getResults()} />
        <Snapshot />
        <Founder />
        <Team />
        <OpportunityLab />
        <Faq items={getFaq()} />
        <ClosingCta />
      </main>
      <Footer links={nav} />
      <ScrollDepth />
    </>
  )
}
