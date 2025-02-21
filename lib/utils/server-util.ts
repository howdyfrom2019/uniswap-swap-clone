export function isServer() {
  return typeof window === "undefined" ? true : false;
}
