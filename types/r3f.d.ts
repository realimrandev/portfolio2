// Register React Three Fiber's JSX intrinsic elements (mesh, group, ambientLight, etc.)
// so TypeScript recognizes them everywhere in the project.
// In React 19, the JSX namespace lives inside the "react" module.
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}

// Fallback for any consumer that still resolves the global JSX namespace.
declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}
