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
