const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})

app.post("/api/form", (req, res) => {
  //console.log(req.body)

  const data = req.body

  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "chisomemmanuel995@gmail.com",
      pass: "dtxmdkrnsgguustw",
    },
  })

  let mailOptions = {
    from: data.email,
    to: "chisomemmanuel995@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
<h3>Information</h3>
<ul>
<li>Name: ${data.name}</li>
<li>Email:${data.email}</li>
</ul>

<h3>Messaage</h3>
<p>${data.message}</p>
`,
  }
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error)
      console.log(error)
    } else {
      console.log("Email sent successfully")
      res.send("Success")
    }
  })

  smtpTransport.close()
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
