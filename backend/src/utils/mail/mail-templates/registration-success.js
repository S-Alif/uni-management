const registrationSuccess = (name) => {
    const markUp = `
        <!DOCTYPE html><html><head><style>.body{font-family:sans-serif}.greet h1{font-size:32px}.greet p{font-size:20px}.regards{padding-top:30px}.regards h4{font-size:22px;margin-bottom:10px}.regards p{font-size:16px}</style></head><body><div class="greet"><h1>Hi, ${name},</h1><p>Thank you for joing us. We hope thhat you will contribute a lot to the success of our future generation</p></div><div class="regards"><h4>Sincerely regards,</h4><p>Uni-Manager</p></div></body></html>
    `
    return markUp
}
export default registrationSuccess