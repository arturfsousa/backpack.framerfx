import * as React from "react"

export function useTimeout(callback, duration) {
    const savedCallback = React.useRef()

    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current()
        }
        if (duration !== null) {
            let id = setTimeout(tick, duration * 1000)
            return () => clearTimeout(id)
        }
    }, [duration])
}
