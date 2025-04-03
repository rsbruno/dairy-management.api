export const generateSecret = (length: number = 32, specialChars?: boolean): string => {
  const special = '@(#)$&!';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (specialChars) chars.concat(special);
  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    secret += chars[randomIndex];
  }
  return secret;
};
