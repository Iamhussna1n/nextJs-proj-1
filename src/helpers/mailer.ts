import nodemailer from 'nodemailer';
import bycript from 'bcryptjs';
import {User} from '@/models/userModel';

export async function sendEmail({email, emailType, userID} : any) {
    try {
        const token = await bycript.hash(userID.toString(), 10);
        if(emailType === 'verify') {
            const r = await User.findOneAndUpdate(userID,{
                verifyToken: token,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
            console.log('User updated for verification:', r);
        }
        else if(emailType === 'reset') {
            await User.findOneAndUpdate({email : email},{
                forgotPasswordToken: token,
                forgotPasswordExpiry: (Date.now() + 3600000)// 1 hour
            });
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'l233073@lhr.nu.edu.pk',
                pass: 'vkpibpcoowsxedbl'
            }
        });
        const mailOptions = {
            from: 'l233073@lhr.nu.edu.pk',
            to: email,
            subject: emailType === 'verify' ? 'Verify your account' : 'Reset your password',
            text: emailType === 'verify' 
                ? `Please verify your account by clicking the link: ${process.env.DOMAIN!}/verify?token=${token}`
                : `Please reset your password by clicking the link: ${process.env.DOMAIN!}/newPass?token=${token}`,
            html: emailType === 'verify' 
                ? `<p>Please verify your account by clicking the link below:</p>
                <a href="${process.env.DOMAIN!}/verify?token=${token}">Verify Account</a>`
                : `<p>Please reset your password by clicking the link below:</p>
                <a href="${process.env.DOMAIN!}/newPass?token=${token}">Reset Password</a>`
        };
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    
        
    } catch (error) {
        throw new Error(`Error sending email: ${error}`);
    }
}