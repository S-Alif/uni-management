import nodemailer from "nodemailer"
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_URL } from "../../constants/dotenv.constants"

const sendEmail = async (mailto, mailText, mailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: `${MAIL_HOST}`,
            port: MAIL_PORT,
            secure: false,
            auth: {
                user: `${MAIL_URL}`,
                pass: `${MAIL_PASS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let mailOption = {
            from: `Uni-Manager${MAIL}`,
            to: mailto,
            subject: mailSubject,
            text: mailText
        }

        return await transporter.sendMail(mailOption)
    } catch (error) {
        return false
    }
}

export default sendEmail