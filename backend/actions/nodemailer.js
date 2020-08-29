const nodemailer = require('nodemailer');

module.exports = (socket) => {
  // To test the fake SMTP Server

  try {
    const transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: 2525,
      secure: false,
      // auth: {
      //   user: options.user,
      //   pass: options.password
      // }
    });

    const email = {
      from: 'test@here.local',
      to: 'test@somewhere.local',
      subject: 'This is a test using nodemailer',
      text: 'Did you receive my email ?',
      html: '<h1>Hey !</h1><p>Did you receive my email ?</p>',
    };
    transporter.sendMail(email, (err, sent) => {
      if (err) {
        console.error(err);
        socket.emit('gotError', err);
      }
      console.info(sent);
      socket.emit('emailSent', JSON.stringify(sent));
    });
  } catch (e) {
    console.error(e);
    socket.emit('gotError', e);
  }
};
