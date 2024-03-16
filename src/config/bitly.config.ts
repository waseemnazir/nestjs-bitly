import { registerAs } from '@nestjs/config';

export const bitlyConfig = registerAs('bitly', () => ({
  token: process.env.BITLY_ACCESS_TOKEN,
}));
