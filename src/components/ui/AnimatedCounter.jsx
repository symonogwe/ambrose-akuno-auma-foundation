/**
 * AnimatedCounter — counts from 0 to `target` using requestAnimationFrame.
 * Triggers once when the element enters the viewport (Framer Motion useInView).
 *
 * Props:
 *   target   {number}  — final value to count to
 *   suffix   {string}  — text appended after the number (e.g. "+", "k+", "%")
 *   duration {number}  — animation duration in seconds (default 2.5)
 */

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Cubic ease-out: fast start, decelerates to final value
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const AnimatedCounter = ({ target, suffix = '', duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  // once:true — counter fires only on first scroll into view, never resets
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target, duration]);

  return (
    // ref must be on a real DOM element — span keeps it inline with the number
    // color is inherited from the parent so the caller controls it
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
