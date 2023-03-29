const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'sikkimcms@gmail.com',
		pass: 'Sikkim@#321'
	}
});

let mailDetails = {
	from: 'sikkimcms@gmail.com',
	to: 'paulnric@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
