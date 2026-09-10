import Image from "next/image";

export function Brand({ preload = false }: { preload?: boolean }) {
  return (
    <a className="brand" href="#main" aria-label="Tshabalala Innovations home">
      <Image
        className="brand-image"
        src="/tshabalala-logo.png"
        alt=""
        width={1254}
        height={1254}
        sizes="64px"
        preload={preload}
      />
      <span>
        TSHABALALA
        <span className="brand-subtitle">INNOVATIONS</span>
      </span>
    </a>
  );
}
