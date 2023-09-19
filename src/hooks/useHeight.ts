import { ReactNode, useLayoutEffect, useState } from "react";

interface Props {
  ref: HTMLDivElement;
}
const useHeight = ({ ref }: Props) => {
  const [shiftUp, setShiftUp] = useState(0);
  const [show, setShow] = useState(true);

  useLayoutEffect(() => {
    const height = ref.current?.offsetHeight;
    if (height) setShiftUp(height);
    console.log(height);
    console.log(show);
  }, [show]);
  setInterval(() => setShow(false), 1);
};

export default useHeight;
