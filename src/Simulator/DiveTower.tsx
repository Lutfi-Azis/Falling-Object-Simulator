import { FC, useState, useRef, useEffect, useCallback } from "react";
import classes from "./DiveTower.module.css";
import { debounce } from "../utils";

type props = Record<string, never>;

const DiveTower: FC<props> = () => {
  const ladderRef = useRef<HTMLDivElement>(null);

  const [nSteps, setNSteps] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    debounce(() => {
      if (!ladderRef.current) return;
      setNSteps(
        Math.floor(
          ladderRef.current.clientHeight / ladderRef.current.clientWidth
        )
      );
    }, 700),
    []
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const stepElems: JSX.Element[] = [];
  for (let i = 0; i < nSteps; i++) {
    stepElems.push(<div key={i} className={classes.ladderStep} />);
  }

  return (
    <div ref={ladderRef} className={classes.ladder}>
      <div className={classes.boardContainer}>
        <div className={classes.boardRailing}></div>
        <div className={classes.boardRailing}></div>
        <hr className={classes.board}></hr>
      </div>
      {stepElems}
    </div>
  );
};

export default DiveTower;