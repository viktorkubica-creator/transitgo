import crypto from 'crypto';

export type Jwk = {
  kty: 'RSA';
  n: string;
  e: string;
  kid: string;
  alg: 'RS256';
  use: 'sig';
};

// Generate an ephemeral RSA keypair on startup (mock JWKS). In real life this is static & rotated safely.
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
export const PRIVATE_KEY_PEM = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();
const pub = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString();

function pemToJwk(pem: string): Jwk {
  const der = Buffer.from(pem.replace(/-----(BEGIN|END) RSA PUBLIC KEY-----/g, '').replace(/\s+/g, ''), 'base64');
  // naive DER parse for modulus/exponent (training only)
  // This is simplified; in production use a library like node-jose or jose.
  const hex = der.toString('hex');
  // heuristics to find modulus (n) and exponent (e)
  // For training simplicity, return fixed e=65537 and compute n from key via crypto APIs
  const asn1 = crypto.createPublicKey(pem).export({ format: 'jwk' }) as any;
  return {
    kty: 'RSA',
    n: asn1.n,
    e: asn1.e,
    kid: 'mock-kid-1',
    alg: 'RS256',
    use: 'sig'
  };
}

export const JWKS = {
  keys: [pemToJwk(pub)]
};
