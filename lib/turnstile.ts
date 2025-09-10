
import { NextApiRequest } from 'next';

interface TurnstileResponse {
  success: boolean;
  'error-codes': string[];
  challenge_ts: string;
  hostname: string;
  action: string;
  cdata: string;
}

export async function verifyTurnstile(req: NextApiRequest): Promise<boolean> {
  const token = req.headers['cf-turnstile-response'] as string;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!token) {
    return false;
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const data: TurnstileResponse = await response.json();

  return data.success;
}
