import {connectToDatabase} from '@/dbConfig/dbConfig'
import {getUserToken} from '@/helpers/getUserToken'
import {User} from '@/models/userModel';
import {NextResponse, NextRequest} from 'next/server';

connectToDatabase();

export async function GET(request: NextRequest){
    const userid = getUserToken(request);
    console.log('User ID:', userid);
    const record =await User.findById(userid).select('-password -__v');
    if(!record)
    {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }
    return NextResponse.json(record, {status: 200});
}