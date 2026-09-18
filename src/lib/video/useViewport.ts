"use client";

import { useEffect, useState } from "react";
import { getViewport, type Viewport } from "./registry";

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    function update() {
      setViewport(getViewport(window.innerWidth));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}
