import { useEffect, useRef, useState, type CSSProperties } from "react";

type SlideVerticalProps = Readonly<{
  duration: number;
  onElementShown?: () => void;
  onElementRemoved?: () => void;
  children: React.ReactNode;
}>;

const getTransitionProps = (duration: number): CSSProperties => ({
  transitionProperty: "height, opacity",
  transitionDuration: `${duration/1000}s`,
  transitionTimingFunction: "ease-in-out",
});

export function SlideVertical({ duration, onElementShown, children }: SlideVerticalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const height = useRef(0);

  const [style, setStyle] = useState<CSSProperties | undefined>({ // start hidden
    opacity: 0,
    left: "-200%",
    position: "absolute",
    overflow: "hidden",
    ...getTransitionProps(duration),
  });

  useEffect(() => {
    if (ref.current && height.current === 0) {
      height.current = ref.current.clientHeight; // gets the total height
      ref.current.style.height = "0px"; // manually sets the height to 0

      setStyle({ // starts the transition to the total height
        opacity: 1,
        overflow: "hidden",
        height: `${height.current}px`,
        ...getTransitionProps(duration),
      });

      setTimeout(() => {
        setStyle(undefined);
        onElementShown?.();
      }, duration);
    }
  }, [ref]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  )
}
