import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER_NAME,
    pass: process.env.NODEMAILER_PASS_KEY,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  // await transporter.sendMail({
  //   from: process.env.NODEMAILER_USER_NAME,
  //   to,
  //   subject,
  //   text,
  // });
  try{
    const mail_option={
      from : process.env.NODEMAILER_USER_NAME,
      to,
      subject,
      text,
    }
    await transporter.sendMail(mail_option,(err,info)=>{
      if(err){
        console.log("error in sending the message")
      }else{
        console.log("success sent email")
      }
    }) 

  }catch(e){
    console.log(e);
  }
};

