import { useEffect, useRef } from 'react';

type EntryHandler = (entry: IntersectionObserverEntry) => void;

// Shared singleton IntersectionObserver to reduce overhead
const observers: Record<string, IntersectionObserver> = {};
const callbacksMap = new WeakMap<Element, EntryHandler>();

interface OptionsKey {
    root?: string;
    rootMargin?: string;
    threshold?: string;
}

function optionsToKey(opts: IntersectionObserverInit = {}): string {
    return [opts.root ? 'r:' + opts.root : '', opts.rootMargin ? 'm:' + opts.rootMargin : '', Array.isArray(opts.threshold) ? 't:' + opts.threshold.join(',') : opts.threshold !== undefined ? 't:' + opts.threshold : ''].join('|');
}

export function useSharedIntersectionObserver(
    elementRef: React.RefObject<Element>,
    handler: EntryHandler,
    options: IntersectionObserverInit = { rootMargin: '0px 0px 200px 0px', threshold: 0 }
) {
    const handlerRef = useRef(handler);
    handlerRef.current = handler;

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;
        const key = optionsToKey(options);
        if (!observers[key]) {
            observers[key] = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const cb = callbacksMap.get(entry.target);
                    cb && cb(entry);
                });
            }, options);
        }
        const observer = observers[key];
        callbacksMap.set(el, (entry) => handlerRef.current(entry));
        observer.observe(el);
        return () => {
            callbacksMap.delete(el);
            observer.unobserve(el);
        };
    }, [elementRef, options]);
}
