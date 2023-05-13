console.log('perica');

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Set up body parser middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res) =>{
  console.log('sta ima gospodjo!')
	res.send('lets gooo!!!');
})

app.get('/send-email',(req,res)=>{
  console.log('sta ima gospodjo!')
	res.send('lets gooo email!!!');
})


// Define a route to handle email sending
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;



  // Set up a nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    secure:false,
    auth: {
      user: 'buza95@gmail.com',
      pass: 'tdfruqzxwuskupvu',
    },
  });

  //tdfruqzxwuskupvu

  // Define the email message options
  const mailOptions = {
    from: 'buza95@gmail.com',
    to: `buzadzija.nikola13@gmail.com`,
    subject: 'Contact Me',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html:`<h2>${name}</h2>
          <h3>Message:</h3>
          <p>${message}</p>
          <h4>Email: ${email}</h4>`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
