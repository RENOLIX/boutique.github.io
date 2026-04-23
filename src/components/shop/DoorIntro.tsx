import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function DoorIntro() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("maison-door-intro-seen");
    if (seen === "true") {
      setVisible(false);
      return;
    }

    const t1 = window.setTimeout(() => setOpening(true), 800);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("maison-door-intro-seen", "true");
    }, 2400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none">
          <motion.div
            className="relative w-1/2 h-full overflow-hidden"
            animate={opening ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(220,230,240,0.45) 40%, rgba(255,255,255,0.6) 60%, rgba(200,215,228,0.4) 100%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0.7) 0%, transparent 30%, rgba(255,255,255,0.15) 60%, transparent 100%)",
              }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <div
                className="w-1 h-20 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(180,180,180,0.9), rgba(220,220,220,0.6), rgba(160,160,160,0.9))",
                }}
              />
              <div
                className="w-4 h-4 rounded-full border border-white/60"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(180,190,200,0.5))",
                }}
              />
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(180,180,180,0.3), rgba(255,255,255,0.6), rgba(180,180,180,0.3))",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-10">
              <span
                className="font-serif text-5xl md:text-7xl font-bold tracking-widest"
                style={{ color: "rgba(60,60,60,0.25)" }}
              >
                MAI
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative w-1/2 h-full overflow-hidden"
            animate={opening ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(225deg, rgba(255,255,255,0.55) 0%, rgba(220,230,240,0.45) 40%, rgba(255,255,255,0.6) 60%, rgba(200,215,228,0.4) 100%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(70deg, transparent 0%, rgba(255,255,255,0.15) 40%, transparent 70%, rgba(255,255,255,0.5) 100%)",
              }}
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <div
                className="w-1 h-20 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(180,180,180,0.9), rgba(220,220,220,0.6), rgba(160,160,160,0.9))",
                }}
              />
              <div
                className="w-4 h-4 rounded-full border border-white/60"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(180,190,200,0.5))",
                }}
              />
            </div>
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(180,180,180,0.3), rgba(255,255,255,0.6), rgba(180,180,180,0.3))",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-start pl-10">
              <span
                className="font-serif text-5xl md:text-7xl font-bold tracking-widest"
                style={{ color: "rgba(60,60,60,0.25)" }}
              >
                SON
              </span>
            </div>
          </motion.div>

          <div
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(150,150,150,0.4) 20%, rgba(200,200,200,0.6) 50%, rgba(150,150,150,0.4) 80%, transparent)",
            }}
          />
        </div>
      ) : null}
    </AnimatePresence>
  );
}
