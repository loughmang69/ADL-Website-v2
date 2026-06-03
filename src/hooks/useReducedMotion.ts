"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Thin wrapper over Framer Motion's reduced-motion hook that always returns a
 * boolean (Framer returns `boolean | null` before hydration).
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

export default useReducedMotion;
