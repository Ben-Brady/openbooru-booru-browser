export function reachedEndOfScroll(element: Element, threshold: number = 2000) {
    const { scrollTop, offsetHeight, scrollHeight } = element;
    let distanceFromTop = scrollTop + offsetHeight;
    let distanceFromBottom = scrollHeight - distanceFromTop;
    return distanceFromBottom < threshold;
}