import { useCallback, useEffect, useRef, useMemo } from 'react';
import lodashDebounce from 'lodash.debounce';

const createCallback = (debounce, handleOnScroll, options) => {
  if (debounce) {
    return lodashDebounce(handleOnScroll, debounce, options);
  } else {
    return handleOnScroll;
  }
};

function useBottomScrollListener(
  onBottom = () => { },
  options = {},
) {
  const { offset, triggerOnNoScroll, debounce, debounceOptions, id } = useMemo(
    () => ({
      offset: options?.offset ?? 20,
      debounce: options?.debounce ?? 200,
      debounceOptions: options?.debounceOptions ?? { leading: true },
      triggerOnNoScroll: options?.triggerOnNoScroll ?? false,
      id: options?.id ?? null
    }),
    [options?.offset, options?.debounce, options?.debounceOptions, options?.triggerOnNoScroll, options?.id],
  );

  const debouncedOnBottom = useMemo(() => createCallback(debounce, onBottom, debounceOptions), [onBottom, debounce, debounceOptions]);
  const containerRef = useRef(null);
  const handleOnScroll = useCallback(() => {

    if (containerRef.current != null) {
      const scrollNode = containerRef.current;
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight);
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedOnBottom();
      }
    } else if (id !== null) {
      const scrollNode = document.getElementById(id);
      if (scrollNode) {
        const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight);
        const scrollPosition = Math.round(scrollNode.scrollHeight - offset);
        if (scrollPosition <= scrollContainerBottomPosition) {
          debouncedOnBottom();
        }
      }
    } else {
      const scrollNode = document.scrollingElement || document.documentElement;
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight);
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedOnBottom();
      }
    }
  }, [debouncedOnBottom, offset, id]);

  useEffect(() => {
    const ref = containerRef.current;
    const node = document.getElementById(id)

    if (ref != null) {
      ref.addEventListener('scroll', handleOnScroll);
    } else if (node !== null) {
      node.addEventListener('scroll', handleOnScroll);
    } else {
      window.addEventListener('scroll', handleOnScroll);
    }

    if (triggerOnNoScroll) {
      handleOnScroll();
    }

    return () => {
      if (ref != null) {
        ref.removeEventListener('scroll', handleOnScroll);
      } else if (node !== null) {
        node.addEventListener('scroll', handleOnScroll);
      } else {
        window.removeEventListener('scroll', handleOnScroll);
      }
    };
  }, [handleOnScroll, triggerOnNoScroll, id]);

  return containerRef;
}

export default useBottomScrollListener;
