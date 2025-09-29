export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = new Array<T>(...array);
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
}

export function secondsToTimeStr(timeInSeconds: number = 0, minSuffix = ":", secSuffix = ""): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;

  return `${minutes.toString().padStart(2, "0")}${minSuffix}${seconds.toFixed(0).padStart(2, "0")}${secSuffix}`;
}

export async function adjustVolume(
  element: HTMLMediaElement,
  newVolume: number,
  {
    duration = 200,
    easing = swing,
    interval = 13,
  }: {
  duration?: number,
  easing?: typeof swing,
  interval?: number,
  } = {},
): Promise<void> {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;

  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }

  const ticks = Math.floor(duration / interval);
  let tick = 1;

  return new Promise(resolve => {
    const timer = setInterval(() => {
      element.volume = originalVolume + (
        easing(tick / ticks) * delta
      );

      if (++tick === ticks + 1) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

function swing(p: number) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}
