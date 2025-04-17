import { JWT_SECRET } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

export const signJWT = async (payload: { id: number; username: string }) => {
	const secret = new TextEncoder().encode(JWT_SECRET);
	const alg = 'HS256';
	return new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setExpirationTime('1w') // 1 week expiration time
		.setIssuedAt()
		.setSubject(payload.id.toString())
		.setSubject(payload.username)
		.sign(secret);
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
	return (await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))).payload as T;
};
