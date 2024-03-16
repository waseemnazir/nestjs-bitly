export function validateUrl(value: string): boolean {
  // to check url starts with http | https | ftp
  const urlRegex: RegExp =
    /^(ftp|http|https):\/\/[a-zA-Z0-9@:%._\+~#?&//=]{2,256}./;

  return urlRegex.test(value);
}
