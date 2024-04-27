export function uuidgen(): number {
  let id = new Date().getTime();
  return id;
}
