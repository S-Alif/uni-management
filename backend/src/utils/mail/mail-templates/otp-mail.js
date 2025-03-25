const otpMail = (name, otpCode) => {
    let markUp = `<!DOCTYPE html><html><head><style>.body{font-family:sans-serif}.greet h1{font-size:32px}.greet p{font-size:20px}.otpCode{text-align:center;margin:50px 0}.otpCode span{background-color:green;padding:10px;border-radius:5px;color:#fff}.warning{text-align:center;padding-top:10px}.regards{padding-top:30px}.regards h4{font-size:22px;margin-bottom:10px}.regards p{font-size:16px}</style></head><body><div class="greet"><h1>Hi, ${name},</h1><p>Please use this OTP to complete the account verification process</p></div><hr><h3 class="otpCode"><span>${otpCode}</span></h3><hr><p class="warning">If you did not send request for account verification please contact us</p><div class="regards"><h4>Sincerely regards,</h4><p>Uni-Manager</p></div></body></html>`

    return markUp
}

export default otpMail