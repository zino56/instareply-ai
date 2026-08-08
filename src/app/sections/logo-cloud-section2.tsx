import { motion } from "framer-motion";

const beforeItems = [
  "Copy-pasting the same reply 417 times.",
  "Losing hot leads in endless DMs.",
  "Missed sales while you sleep.",
  "Every comment, follow, DM, buries you deeper.",
];

const afterItems = [
  "Smart replies handle FAQs instantly.",
  "Organized, tagged leads.",
  "Sales going off 24/7.",
  "Every interaction is a chance to convert.",
];

function CheckBox({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[4px] ${
        dark ? "bg-black text-[#FFF100]" : "bg-black text-white"
      }`}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Before / After comparison section. */
export default function LogoCloudSection2() {
  return (
    <section className="block bg-black py-24 max-lg:py-14" id="integrations">
      <div className="mx-auto max-w-300 px-8 max-md:px-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Before */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="flex flex-col rounded-[24px] bg-[#F1F3F0] p-8 max-md:p-6"
          >
            <p className="text-center text-sm font-bold text-black">Before Conveero:</p>
            <h3 className="mt-3 text-center [font-family:'Bricolage_Grotesque',_Poppins,_Inter,_system-ui,_sans-serif] text-[42px] max-md:text-[32px] font-extrabold leading-[1.05] tracking-[-1.6px] text-black">
              All work
              <br />
              and no play
            </h3>

            <motion.ul
              className="mt-12 max-md:mt-8 flex flex-col"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {beforeItems.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-center justify-between gap-4 border-b border-black/10 py-3.5"
                >
                  <span className="text-[13px] font-medium uppercase tracking-[0.04em] text-black/80">
                    {item}
                  </span>
                  <CheckBox />
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href="/signup"
              data-component="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-[#FF00FF]"
            >
              Get started
            </motion.a>
          </motion.article>

          {/* After */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="flex flex-col rounded-[24px] bg-[#FFF100] p-8 max-md:p-6"
          >
            <p className="text-center text-sm font-bold text-black">After Conveero:</p>
            <h3 className="mt-3 text-center [font-family:'Bricolage_Grotesque',_Poppins,_Inter,_system-ui,_sans-serif] text-[42px] max-md:text-[32px] font-extrabold leading-[1.05] tracking-[-1.6px] text-black">
              Less grind and
              <br />
              more pay
            </h3>

            <motion.ul
              className="mt-12 max-md:mt-8 flex flex-col"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {afterItems.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-center justify-between gap-4 border-b border-black/15 py-3.5"
                >
                  <span className="text-[13px] font-medium uppercase tracking-[0.04em] text-black">
                    {item}
                  </span>
                  <CheckBox dark />
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href="/signup"
              data-component="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-xs font-bold uppercase tracking-[0.12em] text-[#FFF100] transition-colors duration-200 hover:bg-[#FF00FF] hover:text-white"
            >
              Get started
            </motion.a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
