import { useState, useEffect } from "react";

export default function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // @ts-ignore
    function downHandler({ key }): void {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // @ts-ignore
    const upHandler = ({ key }): void => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);
  return keyPressed;
}
