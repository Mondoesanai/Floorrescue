import Image from "next/image";

export function PhotoBanner({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="relative h-[40vh] w-full overflow-hidden sm:h-[55vh]">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
      {caption ? (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.1em] text-warm-white/70 uppercase">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
