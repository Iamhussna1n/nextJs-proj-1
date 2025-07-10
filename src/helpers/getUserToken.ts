import {NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';
export function getUserToken(request: NextRequest)
{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log('Decoded Token:', decodedToken);
        return (decodedToken as { id: string }).id;     
    } catch {
        throw new Error('invalid token');
    }
}