import nodemailer from "nodemailer";

//MAIL
const APP_EMAIL= "tecno.fla.f@gmail.com";
const APP_PASSWORD = "qzspqlpztckuuhux";

//genero el vinculo:
export default class MailerService{
    constructor(){
        this.mailer = nodemailer.createTransport({ 
            service: "gmail",
            port: 587,
            auth:{
                user: APP_EMAIL,
                pass: APP_PASSWORD
            }
            
        });
    }
}


sendMail= async () =>{ 
    try {
    const result = await transporter.sendMail({
        from:"Fla <tecno.fla.f@gmail.com>",
        to:"fferreyraflavia@gmail.com",
        subject:"Correo de prueba",
        html: `<div> <h1> Hola! </h1> </div> `,
        //(attachments, para mandar los files que desee.)
    })
    return result;
    } catch (error)
    {
        console.log(error);
        throw error;
    }
}


        

