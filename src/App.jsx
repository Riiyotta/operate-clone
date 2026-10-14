/*
 * Page skeleton — CLONE_SPEC.md §1.
 *
 * Wrapper contract for the product demo (<HomeUi />, owned by the demo agent):
 *   <section class="relative mt-[51px] lg:mt-[53px] font-muoto max-lg:pb-7 lg:home-rule-l lg:pl-[34px] lg:pr-[46px]">
 *     rule caps (top-left / top-right, lg)
 *     <div class="relative h-[713px] md:h-[711px] lg:h-[768px]">                         height box
 *       <div class="relative mx-auto size-full max-w-[1168px] rounded-2xl md:rounded-xl   FRAME (positioned)
 *                   border md:border-gray-400 bg-[#FCFCFC] shadow… lg:p-6">
 *         mobile SVG outline / md+ top+bottom 12px binder caps
 *         <div class="flex size-full flex-col rounded-2xl bg-[#F7F7F7] md:rounded-xl       APP WINDOW (static)
 *                     lg:rounded-md lg:border lg:border-gray-200">
 *           <HomeUi />   ← render the demo's children here (sentinel, grid, floating panel,
 *                          cursor layer, chapter control). Absolute children resolve
 *                          against FRAME, as in the original DOM.
 * See src/components/shell/DemoFrame.jsx.
 */
import HomeBackground from './components/HomeBackground.jsx'
import NavSheet from './components/NavSheet.jsx'
import Hero from './components/Hero.jsx'
import HomeUi from './components/HomeUi.jsx'
import OpsSteps from './components/OpsSteps.jsx'
import Manifesto from './components/Manifesto.jsx'
import FooterSheet from './components/FooterSheet.jsx'
import VideoLightbox from './components/VideoLightbox.jsx'
import DemoFrame from './components/shell/DemoFrame.jsx'
import PanelHoles from './components/shell/PanelHoles.jsx'

export default function App() {
  return (
    <>
      <main className="relative grid min-h-svh overflow-hidden bg-waitlist-deep-green [&>*]:col-start-1">
        <HomeBackground />
        <div data-sign-up-page="" className="relative mx-auto w-full max-w-[1474px] overflow-hidden px-3 [font-feature-settings:'liga'_off] lg:px-[38px]">
          {/* binder rails */}
          <div className="absolute left-3 top-0 hidden h-full w-3 border border-stone-800 bg-waitlist-paper lg:block" />
          <div className="absolute right-3 top-0 hidden h-full w-3 border border-stone-800 bg-waitlist-paper lg:block" />

          <div className="relative flex flex-col gap-y-9 pb-[calc(var(--home-intro-distance)*1.75)] pt-[60px] lg:gap-y-11 lg:pt-11">
            <div aria-hidden="true" className="h-[calc(var(--home-intro-distance)-6rem)] lg:h-[calc(var(--home-intro-distance)-5.5rem)]" />

            <NavSheet />

            {/* main sheet */}
            <div className="relative isolate border px-[17px] pb-8 pt-12 max-md:home-outline md:border-stone-800 lg:px-[74px] lg:pt-[97px]">
              <PanelHoles variant="panel" bgClassName="bg-waitlist-paper" />
              <Hero />
              <DemoFrame>
                <HomeUi />
              </DemoFrame>
              <OpsSteps />
              <Manifesto />
            </div>

            <FooterSheet />
          </div>
        </div>
      </main>
      <VideoLightbox />
    </>
  )
}
