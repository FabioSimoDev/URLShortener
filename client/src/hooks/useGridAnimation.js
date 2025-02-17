//TODO animazione da sistemare, non è fluida. disattivata per il momento

// import { useEffect, useState } from "react";

// export function useGridAnimation() {
//   const [gridPosition, setGridPosition] = useState(0);
//   useEffect(() => {
//     let start = null;

//     const animate = (timestamp) => {
//       if (!start) start = timestamp;
//       const progress = timestamp - start;
//       setGridPosition((progress / 10) % 100);
//       requestAnimationFrame(animate);
//     };

//     const animationFrameId = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);
//   return gridPosition;
// }
