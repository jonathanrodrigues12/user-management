export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_TOKEN =
  typeof window !== "undefined"
    ? document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
    : null;