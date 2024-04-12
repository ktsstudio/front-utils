import * as React from 'react';
import noop from "../noop";


/**
 * Предотвращает стандартное поведение браузера при скролле на мобильных устройствах.
 */
export default (): React.RefObject<HTMLDivElement> => {
  const refContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = refContainer.current;

    if (!container) {
      return noop;
    }

    const preventDefaultTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      return false;
    };

    container.addEventListener('touchmove', preventDefaultTouchMove, {
      capture: true,
      passive: false,
    });

    return () => {
      container.removeEventListener('touchmove', preventDefaultTouchMove);
    };
  }, []);

  return refContainer;
};
