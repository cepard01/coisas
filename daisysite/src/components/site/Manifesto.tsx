"use client";

import { motion } from "framer-motion";

/**
 * A short editorial note — gives the project a voice.
 * Not marketing copy. More like a maintainer's README preamble.
 */
export function Manifesto() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
            A note from the maintainer
          </p>

          <div className="mt-6 space-y-5 text-lg sm:text-xl text-foreground leading-relaxed text-pretty font-display">
            <p className="dropcap">
              Most Discord bots want your attention. DaisyFlower wants the opposite. It is a game
              you check in on, not one that demands you stay.
            </p>

            <p className="text-muted-foreground">
              Plants grow on timestamps, not timers. Weather rotates whether you're watching or not.
              A Sunflower planted at noon will be ready when you come back at dinner — and the bot
              will tell you, calmly, what changed.
            </p>

            <p className="text-muted-foreground">
              There is no leaderboard pressure. No daily login streak that punishes a missed day.
              No currency you can buy with real money. Just a small garden, the weather, and
              whatever you decide to plant next.
            </p>

            <p>
              <span className="text-sage italic">It's cozy, on purpose.</span>
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex items-center gap-3 pt-6 border-t border-border">
            <span className="font-display text-sm italic text-muted-foreground">— the DaisyFlower project</span>
            <span className="font-mono text-[11px] text-muted-foreground/70">
              written by a human, edited by a human
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
