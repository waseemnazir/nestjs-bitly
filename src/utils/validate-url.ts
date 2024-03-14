export function validateUrl(value: string): boolean {
  const urlRegex =
    /((http|https):\/\/)(www\.)?[a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)/;
  return urlRegex.test(value);
}
