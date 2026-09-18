export type Viewport = "desktop" | "tablet" | "mobile";

export interface SceneAsset {
  video?: string;
  poster: string;
}

export interface SceneAssetFamily {
  desktop: SceneAsset;
  tablet?: SceneAsset;
  mobile?: SceneAsset;
}

export type SceneKey =
  | "introRestoration"
  | "garageIdle"
  | "commercialBuild"
  | "commercialDoorEntry"
  | "commercialDeepDive";

/** Canonical filenames straight from the build package — do not rename without updating this file. */
function video(name: string) {
  return `/assets/video/${encodeURIComponent(name)}`;
}
function image(name: string) {
  return `/assets/images/${name}`;
}

export const videoRegistry: Record<SceneKey, SceneAssetFamily> = {
  introRestoration: {
    desktop: { video: video("intro floor restoration video.mp4"), poster: image("00-intro-damaged-start.jpg") },
    // Future: tablet/mobile 9:16 renders drop in here under the same keys —
    // see implementation/tablet-mobile-later.md. Left undefined on purpose.
  },
  garageIdle: {
    desktop: { video: video("intro floor loop video.mp4"), poster: image("01-gold-garage-hero.jpg") },
  },
  commercialBuild: {
    desktop: { video: video("intro to commercial video.mp4"), poster: image("03-commercial-building-in-garage.jpg") },
  },
  commercialDoorEntry: {
    desktop: {
      video: video("commercial from skyscraper into lobby.mp4"),
      poster: image("04-commercial-ground-floor-lobby.jpg"),
    },
  },
  commercialDeepDive: {
    desktop: { video: video("commercial from lobby to entrance.mp4"), poster: image("05-commercial-final-hero.jpg") },
  },
};

/**
 * Resolve the best available asset for a scene at a given viewport, following
 * the fallback chain from implementation/tablet-mobile-later.md:
 * exact viewport video -> viewport poster -> desktop poster -> desktop video.
 */
export function resolveSceneAsset(scene: SceneKey, viewport: Viewport): SceneAsset {
  const family = videoRegistry[scene];
  const exact = family[viewport];
  if (exact?.video) return exact;
  if (exact?.poster) return { poster: exact.poster };
  return family.desktop;
}

/** Best available static backdrop per environment for non-cinematic sector pages. */
export function getEnvironmentPoster(environment: "residential" | "commercial" | "industrial"): string {
  switch (environment) {
    case "commercial":
      return image("05-commercial-final-hero.jpg");
    case "industrial":
      return image("04-commercial-ground-floor-lobby.jpg");
    case "residential":
    default:
      return image("01-gold-garage-hero.jpg");
  }
}

export function getViewport(width: number): Viewport {
  if (width >= 1180) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}
