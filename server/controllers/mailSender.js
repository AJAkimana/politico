import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  }
}
const client = nodemailer.createTransport(sgTransport(options));
const mailSender = {
  send(infos){
    return new Promise((resolve,reject)=>{
      // Prepare the link
      const link =process.env.APP_LINK+"/v1/auth/reset/password?m="+infos.email+"&t="+infos.token
      const email = {
        from: process.env.APP_EMAIL,
        to:  infos.email,
        subject: "Password reset link from Politico",
        text: "<html>Please reset your password by clicking  <strong><a href=\""+link+"\"> link</a></strong></html>",
        html: "<html>Please reset your password by clicking  <strong><a href=\""+link+"\"> link</a></strong></html>"
      };

      client.sendMail(email, (err, info)=>{
        console.log(err,info)
        if (err ){
          reject(err);
        }
        resolve(info);  
      });
   })
  }
}

export default mailSender;
