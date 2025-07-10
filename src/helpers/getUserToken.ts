import {NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';
export function getUserToken(request: NextRequest)
{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken : any= jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log('Decoded Token:', decodedToken);
        return decodedToken.id;     
    } catch (error) {
        throw new Error('invalid token');
    }
}