export function GrainyFilter() {
  return (
    <svg className="absolute inset-0 -z-10 h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence baseFrequency="0.5" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix
          in="colorNoise"
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
        ></feColorMatrix>
        <feComposite operator="in" in2="SourceGraphic" result="monoNoise"></feComposite>
        <feBlend in="SourceGraphic" in2="monoNoise" mode="screen"></feBlend>
      </filter>
    </svg>
  );
}
