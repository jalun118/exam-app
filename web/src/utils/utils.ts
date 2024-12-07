export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function deltaTimeSecond(
  start: string | number | Date,
  end: string | number | Date,
): number {
  return Math.floor(
    (new Date(end).valueOf() - new Date(start).valueOf()) / 1000,
  );
}

interface prefixPath {
  href(dest: string): string;
}

export function SetPrefixPathname(prefix: string): prefixPath {
  function href(path: string): string {
    return prefix + path;
  }
  return {
    href: href,
  };
}
