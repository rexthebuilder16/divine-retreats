
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Star, Scroll } from 'lucide-react';
import clsx from 'clsx';

// Constants & Assets
const ASSETS = {
  texture: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103848/bg-texture.jpg",
  heroPortal: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103856/hero-portal.jpg",
  logoWhite: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103857/logo-white.png",
  logoColor: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103862/logo-color.png",
  places: {
    shirdi: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767105336/place-shirdi.jpg",
    shani: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767105339/place-shani.jpg",
    dattatreya: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767105303/place-dattatreya.jpg",
    brahmagiri: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767105328/place-brahmagiri.jpg",
    trimbakeshwar: "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767105306/place-trimbakeshwar.jpg"
  },
  brochure: [
    "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103870/4d2b7fdb-4363-4e67-bfca-16e8bf332ba7.png",
    "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103842/4f74f8aa-a321-4132-abdc-a00ce15378da.png",
    "https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767103860/5132a9e1-4c66-4a71-a5cc-085e894dcf97.png"
  ]
};



const FadeInUp = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string, id?: string }) => {
  return (
    <section id={id} className={clsx("relative py-24 px-6 md:px-12 max-w-7xl mx-auto", className)}>
      {children}
    </section>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax for Hero
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden text-ink font-body selection:bg-gold/30 selection:text-ink">
      {/* Texture Overlays */}
      <div className="fixed inset-0 z-[-1] opacity-90 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url(${ASSETS.texture})`, backgroundSize: 'cover' }} />
      <div className="fixed inset-0 z-[-1] opacity-[0.04] pointer-events-none mix-blend-multiply bg-[#5d4037]"></div>
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_120%)] mix-blend-multiply" />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[1000]" style={{ scaleX }} />

      {/* Header / Nav */}
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start pointer-events-none">
        {/* Logo Container */}
        <div className="relative group pointer-events-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1512] via-[#2c241b] to-transparent opacity-90 w-[120%] h-full z-0 clip-path-slant-right" />
          <div className="bg-[#1a1512] pl-10 pr-28 py-8 clip-path-slant-right flex items-center gap-6 shadow-2xl relative z-10 transition-all duration-500 hover:pr-32">

            {/* Logo Image - Increased Size */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={ASSETS.logoWhite} alt="Divine Downloads Logo" className="h-20 w-auto opacity-100 drop-shadow-md" />
            </motion.div>

            {/* Logo Text - Added as requested */}
            <div className="flex flex-col">
              <span className="font-heading text-2xl tracking-[0.15em] text-paper font-bold leading-none mb-1">DIVINE</span>
              <span className="font-heading text-2xl tracking-[0.15em] text-gold font-bold leading-none">DOWNLOADS</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-12 pr-16 pt-8 font-heading tracking-widest uppercase text-sm font-bold mr-4">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-32 -z-10 pointer-events-none" />
          {['Activation', 'Portals', 'Join'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase() === 'join' ? 'register' : item.toLowerCase() === 'activation' ? 'concept' : 'locations'}`}
              className="text-paper/90 hover:text-gold transition-colors relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full opacity-80" />
            </a>
          ))}

          <motion.a
            href="#register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md rounded-sm"
          >
            Reserve Spot
          </motion.a>
        </nav>
      </header>

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-[-1] scale-105">
          <img src={ASSETS.heroPortal} className="w-full h-full object-cover opacity-80 mix-blend-multiply filter sepia-[0.3] contrast-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </motion.div>

        {/* Hero Content Card - Added for Readability */}
        <div className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-paper/80 backdrop-blur-xl border border-white/40 shadow-2xl p-8 md:p-14 text-center rounded-sm relative overflow-hidden"
          >
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold opacity-50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold opacity-50" />

            <div className="inline-block mb-6 px-4 py-1 border border-ink/30 rounded-full text-xs uppercase tracking-[0.3em] font-bold">
              Jan 20 - 24, 2026 • Shirdi, India
            </div>

            <h1 className="font-heading text-5xl md:text-7xl leading-[0.9] text-ink mb-6 drop-shadow-sm">
              Sacred Soul <br />
              <span className="font-script text-gold text-6xl md:text-8xl relative block mt-2">Journey Retreat</span>
            </h1>

            <p className="text-xl md:text-2xl font-body text-ink-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Divine Downloads & <span className="font-bold text-ink border-b-2 border-gold/40">Automatic Writing Activation</span> through India's living power portals.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#register" className="bg-ink text-gold px-8 py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-gold hover:text-white transition-all duration-300 shadow-lg group">
                Begin Activation <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs uppercase tracking-widest opacity-60">Only 12 Seats Available</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Sticky CTA - Appears after Hero */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [500, 700], [0, 1]), pointerEvents: useTransform(scrollY, (y) => y > 500 ? 'auto' : 'none') }}
        className="fixed bottom-8 right-8 z-[900]"
      >
        <a href="#register" className="block bg-gold text-ink font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform border-2 border-white/20">
          Join The Circle
        </a>
      </motion.div>

      {/* PROBLEM / AGITATION SECTION (Funnel Step 1) */}
      <Section className="py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-8">Do you feel the call?</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/50 p-8 border border-ink/5 rounded-lg shadow-sm">
              <p className="text-lg italic text-ink-light mb-4">"I feel stuck at a crossroads..."</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-40">The Block</p>
            </div>
            <div className="bg-white/50 p-8 border border-ink/5 rounded-lg shadow-sm">
              <p className="text-lg italic text-ink-light mb-4">"I need clear signs and guidance..."</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-40">The Desire</p>
            </div>
          </div>
          <p className="mt-10 text-xl leading-relaxed text-ink/80">
            You are not here by accident. Your soul is asking for a reset. Shirdi is the doorway to that clarity.
          </p>
        </div>
      </Section>

      {/* Concept Section */}
      <Section className="grid md:grid-cols-2 gap-20 items-center overflow-visible" id="concept">
        <div className="relative perspective-1000">
          <motion.div
            initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
            whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="relative z-10 border-[12px] border-white shadow-2xl"
          >
            <img src={ASSETS.brochure[0]} className="w-full grayscale-[0.2]" alt="Writing Hand" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 border-2 border-gold transform translate-x-6 translate-y-6 -z-10 opacity-60"
          />
        </div>
        <div>
          <FadeInUp>
            <span className="text-gold uppercase tracking-[0.25em] text-sm font-bold border-b-2 border-gold inline-block mb-6 pb-1">About The Retreat</span>
            <h2 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">Guided Spiritual Journey</h2>
            <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-ink/90">
              <p>
                This is not just a retreat. It is a guided spiritual journey through living power portals of India, where divine consciousness is still active, responsive, and transformational.
              </p>
              <p>
                Across sacred temples and ancient energy fields, you will be guided into <strong className="font-bold text-ink">Automatic Writing & Divine Downloads</strong>, learning to receive clear guidance, messages, insights, and soul wisdom directly from higher realms.
              </p>
              <div className="bg-paper-dark/20 p-6 border-l-4 border-gold italic mt-6">
                "Each place holds a unique frequency — and together they create a powerful initiation into clarity, healing, and alignment."
              </div>
            </div>
          </FadeInUp>
        </div>
      </Section>

      {/* The Call */}
      <div className="py-32 bg-paper-dark/30 border-y border-ink/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <FadeInUp>
            <Star className="w-12 h-12 text-gold mx-auto mb-8 animate-pulse" />
            <h2 className="font-heading text-5xl md:text-7xl mb-8">Why Here? Why Now?</h2>
            <p className="text-2xl leading-relaxed font-heading text-ink/80">
              You have been asking for answers. The answers are not "out there." They are waiting to download <em>through</em> you.
            </p>
            <div className="h-px w-24 bg-gold mx-auto my-8" />
            <p className="text-xl font-bold uppercase tracking-widest text-ink">
              Shirdi is not just a destination. It is a doorway.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Locations Grid */}
      <div id="locations" className="py-32 relative">
        <div className="text-center mb-24">
          <FadeInUp>
            <span className="text-gold uppercase tracking-[0.25em] text-sm font-bold">The Sacred Path</span>
            <h2 className="font-heading text-7xl mt-4">5 Power Portals</h2>
          </FadeInUp>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-[minmax(350px,auto)]">
          <PlaceCard
            img={ASSETS.places.shirdi}
            title="Shirdi"
            sub="Grace • Healing • Miracles"
            desc="The living presence of Sai Baba. A vortex of grace where prayers are answered instantly. Faith & Surrender."
            num="01"
            className="lg:col-span-6"
            delay={0}
          />
          <PlaceCard
            img={ASSETS.places.shani}
            title="Shani Shingnapur"
            sub="Release • Discipline • Protection"
            desc="The temple of Karmic Alignment. The village with no doors. Powerful center for releasing karmic blocks and finding stability."
            num="02"
            className="lg:col-span-6 lg:translate-y-24"
            delay={0.2}
          />
          <PlaceCard
            img={ASSETS.places.dattatreya}
            title="Dattatreya"
            sub="Wisdom • Guidance • Liberation"
            desc="The field of the Adi Guru. Unified field of the Trinity. Ultimate space for higher wisdom and higher knowledge."
            num="03"
            className="lg:col-span-4"
            delay={0.1}
          />
          <PlaceCard
            img={ASSETS.places.brahmagiri}
            title="Brahmagiri"
            sub="Awakening • Truth Descent"
            desc="The birthplace of the sacred Godavari River. Timeline Healing and deep inner awakening."
            num="04"
            className="lg:col-span-4 lg:translate-y-16"
            delay={0.3}
          />
          <PlaceCard
            img={ASSETS.places.trimbakeshwar}
            title="Trimbakeshwar"
            sub="Karmic Release • Moksha"
            desc="Jyotirlinga of Lord Shiva. Ancestral Clearing and the seat of Moksha Energy."
            num="05"
            className="lg:col-span-4 lg:translate-y-32"
            delay={0.5}
          />
        </div>
      </div>

      {/* Workshop Details & Benefits (STACKED CLEAN DESIGN) */}
      <Section className="my-32">
        <div className="mb-24 text-center">
          <h2 className="font-heading text-6xl mb-4">The Experience</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Who is this for */}
          <div className="bg-white p-10 shadow-xl border border-gold/10 hover:border-gold/30 transition-colors duration-300 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-paper-dark rounded-full flex items-center justify-center mb-6 text-2xl group-hover:bg-gold group-hover:text-white transition-colors">🧘‍♀️</div>
            <h3 className="font-heading text-2xl mb-6">Who This Is For</h3>
            <ul className="space-y-4 text-left w-full">
              {["Spiritual seekers & healers", "Those feeling stuck or confused", "Seeking divine clarity", "Ready to deepen intuition", "Called to sacred places"].map((item, i) => (
                <li key={i} className="flex gap-3 text-ink-light text-sm bg-paper/50 p-2 rounded-md">
                  <span className="text-gold font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What You Get */}
          <div className="bg-ink text-paper p-10 shadow-2xl scale-105 border-2 border-gold relative flex flex-col items-center text-center">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-2xl">⚡</div>
            <h3 className="font-heading text-3xl mb-6 text-gold">The Activation</h3>
            <p className="mb-6 opacity-80 text-sm">You will be personally guided to:</p>
            <ul className="space-y-4 text-left w-full">
              {[
                "Receive divine messages",
                "Decode signs & symbols",
                "Connect with Higher Self",
                "Gain life purpose clarity",
                "Activate guidance channels"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center border-b border-white/10 pb-2 last:border-0">
                  <Star className="w-4 h-4 text-gold shrink-0" />
                  <p className="text-lg font-heading">{item}</p>
                </div>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="bg-white p-10 shadow-xl border border-gold/10 hover:border-gold/30 transition-colors duration-300 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-paper-dark rounded-full flex items-center justify-center mb-6 text-2xl group-hover:bg-gold group-hover:text-white transition-colors">🕊️</div>
            <h3 className="font-heading text-2xl mb-6">Highlights</h3>
            <ul className="space-y-4 text-left w-full">
              {["Sacred Temple Darshans", "Daily Energy Work", "Karma Clearing Rituals", "Small Group Container", "Ancestral Healing"].map((item, i) => (
                <li key={i} className="flex gap-3 text-ink-light text-sm bg-paper/50 p-2 rounded-md">
                  <span className="text-gold font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Footer / CTA (Refined 'Bigger Box' & Dual CTAs) */}
      <footer id="register" className="bg-[#1a1512] text-paper min-h-screen relative overflow-hidden flex flex-col justify-center">
        {/* Full Background Image: Sacred Tree */}
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/cms-strapi-backend-files/image/upload/f_auto,q_auto/v1767108254/sacred-tree-circle-meditation.jpg" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1512] via-[#1a1512]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#1a1512]/90"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 z-10"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 py-20 w-full">
          <Scroll className="w-20 h-20 text-gold mx-auto mb-10 opacity-80" />
          <h2 className="font-heading text-5xl md:text-8xl mb-6 drop-shadow-2xl">Join The Circle</h2>
          <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-3xl mx-auto font-body">
            This invitation is for 12 souls only. Secure your place in the living portal.
          </p>

          {/* Pricing Card - Floating Glass */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1512]/60 backdrop-blur-xl border border-gold/20 p-8 md:p-14 text-center rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-3xl mx-auto mb-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gold text-ink font-bold px-6 py-2 text-xs uppercase shadow-lg">Limited Spots</div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-end">
              <div className="text-center opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-xs uppercase tracking-widest mb-1 line-through text-white/50">Full Package</p>
                <div className="text-3xl md:text-4xl font-heading text-white/50 line-through decoration-red-500/50">$1200</div>
              </div>
              <div className="text-center transform md:scale-110">
                <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2 animate-pulse">Early Bird Offer</p>
                <div className="text-7xl md:text-9xl font-heading text-gold text-glow leading-none">$950</div>
                <p className="text-red-400 font-bold mt-4 uppercase tracking-[0.2em] text-[10px] border border-red-400/30 px-3 py-1 rounded-full inline-block bg-black/20">Ends Jan 7, 2026</p>
              </div>
            </div>

            <p className="text-white/40 italic mt-8 text-sm border-t border-white/5 pt-6">
              Inclusive of airport pickup/drop in Mumbai, all meals, stays, and entry permits.
            </p>
          </motion.div>

          {/* Dual CTA Buttons */}
          <div className="w-full max-w-4xl mx-auto">
            <p className="text-2xl font-heading text-paper/90 drop-shadow-md mb-8">
              Connect with us to Apply
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-12">
              <a href="https://wa.me/918928539254?text=SAI%20-%20Reviewing%20Brochure" className="group relative flex-1 bg-gradient-to-r from-gold via-[#eac575] to-gold text-ink uppercase tracking-[0.15em] font-bold py-5 px-8 hover:shadow-[0_0_30px_rgba(212,160,77,0.6)] transition-all duration-300 rounded-sm overflow-hidden text-center md:max-w-sm ml-auto">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>💬</span> Text Divya
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              <a href="https://wa.me/971564404204?text=SAI%20-%20Reviewing%20Brochure" className="group relative flex-1 border border-gold text-gold hover:bg-gold hover:text-ink uppercase tracking-[0.15em] font-bold py-5 px-8 hover:shadow-[0_0_30px_rgba(212,160,77,0.4)] transition-all duration-300 rounded-sm overflow-hidden text-center md:max-w-sm mr-auto bg-black/40 backdrop-blur-sm">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>💬</span> Text Tanu
                </span>
              </a>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-xs md:text-sm text-paper/40 font-heading tracking-wider">
              <div className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" /> Divya</span>
                <span className="opacity-70">+91 89285 39254</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" /> Tanu</span>
                <span className="opacity-70">+971 56 4404204</span>
              </div>
            </div>
          </div>

          <div className="mt-24 opacity-30 hover:opacity-100 transition-opacity duration-700">
            <img src={ASSETS.logoColor} className="h-16 md:h-20 grayscale hover:grayscale-0 transition-all mx-auto" alt="Footer Logo" />
            <p className="mt-4 text-[10px] tracking-[0.3em]">© 2025 Divine Downloads</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const PlaceCard = ({ img, title, sub, desc, num, className, delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -15, transition: { duration: 0.3 } }}
      className={clsx("bg-white p-3 shadow-xl hover:shadow-2xl transition-shadow duration-500 group", className)}
    >
      <div className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img src={img} className="w-full h-full object-cover filter sepia-[0.3] contrast-125 group-hover:scale-110 group-hover:sepia-0 transition-transform duration-1000 ease-out" />
        <div className="absolute top-0 right-0 bg-gold text-white font-heading text-2xl w-14 h-14 flex items-center justify-center z-20 shadow-lg">{num}</div>
      </div>
      <div className="p-8 relative">
        <div className="absolute -top-8 left-8 bg-paper px-4 py-2 text-gold uppercase text-xs tracking-[0.2em] font-bold border border-gold/20 shadow-sm z-20">
          {sub}
        </div>
        <h3 className="font-heading text-4xl mb-4 text-ink">{title}</h3>
        <p className="text-ink-light leading-relaxed text-lg font-body">{desc}</p>
      </div>
    </motion.div>
  );
};

export default App;
