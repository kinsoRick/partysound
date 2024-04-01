type TDelayedClassNameFunc = (element: HTMLElement | string) => void;

const useDelayedClassName: (classList: string[], time: number) =>
TDelayedClassNameFunc = (classList, time) => (element) => {
  const currentElement = (typeof element === 'string')
    ? document.getElementById(element)
    : element;

  if (currentElement === null) {
    throw new Error(`${element} provided is not in DOM or not defined!`);
  }

  classList.forEach((className) => currentElement.classList.add(className));

  setTimeout(() => {
    classList.forEach((className) => currentElement.classList.remove(className));
  }, time);
};

export default useDelayedClassName;
