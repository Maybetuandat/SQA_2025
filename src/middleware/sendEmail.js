const nodemailer = require('nodemailer');
const sendMailTo = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trinhvinhtuandat05102003@gmail.com',
            pass: 'kjgolknrohytwqou'
        }
    });
    const mailOptions = {
        from: 'trinhvinhtuandat05102003@gmail.com',
        to: email,
        subject: 'Mã OTP Xác Thực', // Tiêu đề email
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Nhóm 1</a>
                    </div>
                    <p style="font-size:1.1em">Xin chào,</p>
                    <p>Bạn đã lựa chọn quên mật khẩu ? Nếu không phải bạn hãy bỏ qua email này. OTP chỉ có hiệu lực trong vòng 5 phút</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Vui lòng không cung cấp mã OTP cho bất cứ ai</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Nhóm 1</p>
                        <p>Học viện công nghệ bưu chính viễn thông</p>
                        <p>Hà Nội</p>
                    </div>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
        }
    });
}
module.exports = sendMailTo