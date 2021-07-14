import { useMemo, useRef, useCallback, useEffect } from 'react'
import { debounce as lodashDebounce } from 'lodash'

const createCallback = (callback, debounce, options) => {
    if (debounce) return lodashDebounce(callback, debounce, options)
    else return callback
}

const useBottomScroll = (callback, options = { offset: 0, debounce: 200, debounceOptions: { leading: true } }) => {

    const containerRef = useRef(null)


    const { offset, debounce, debounceOptions } = useMemo(() => ({
        offset: options.offset,
        debonce: options.debounce,
        debounceOptions: options.debounceOptions
    }), [options.offset, options.debounce, options.debounceOptions])

    const onBottomCallback = useMemo(() => createCallback(callback, debounce, debounceOptions), [callback, debounce, debounceOptions])

    const handleOnScroll = useCallback(() => {
        if (containerRef.current) {
            const node = containerRef.current
            const scrollBottomPosition = Math.round(node.scrollTop + node.clientHeight)
            const scrollPosition = Math.round(node.scrollHeight - offset)

            if (scrollPosition <= scrollBottomPosition) {
                onBottomCallback()
            }
        } else {
            const node = document.scrollingElement || document.documentElement;
            const scrollBottomPosition = Math.round(node.scrollTop + window.innerHeight);
            const scrollPosition = Math.round(node.scrollHeight - offset);

            if (scrollPosition <= scrollBottomPosition) {
                onBottomCallback()
            }
        }
    }, [offset, onBottomCallback])


    useEffect(() => {
        const ref = containerRef.current
        if(ref) ref.addEventListener('scroll', handleOnScroll)
        else window.addEventListener('scroll', handleOnScroll)

        return () => {
            if(ref) ref.removeEventListener('scroll', handleOnScroll)
            else window.removeEventListener('scroll', handleOnScroll)
        }
    }, [handleOnScroll, containerRef])

    return containerRef
}

export default useBottomScroll