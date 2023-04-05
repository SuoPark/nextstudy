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
