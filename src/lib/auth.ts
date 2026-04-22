import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    // For development fallback if not set. In production, this should throw an error.
    return "super-secret-key-corc-admin-2024-development";
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    throw new Error("Your token has expired or is invalid.");
  }
};

export const createToken = async (payload: { id: string; username: string; role: string }) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  
  return token;
};
