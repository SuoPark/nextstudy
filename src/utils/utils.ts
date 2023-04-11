export const cookieStringToObject = (
  cookieString: string
): { [key: string]: any } => {
  const result: { [key: string]: string } = {};
  if (cookieString) {
    const cookies = cookieString.split("; ");
    cookies.forEach((cookie) => {
      const cur = cookie.split("=");
      result[cur[0]] = cur[1];
    });
  }
  return result;
};
/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
