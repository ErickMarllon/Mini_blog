
import { useWindowWidth } from "window-dimensions-hooks";
export function useViewPort() {
  let width = useWindowWidth();

  return {width};
}
