const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const {MergePdfs} = require('./testpdf.js')
const upload = multer({ dest: 'uploads/' })
const port = 3000


app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html')) // for using html file
})

app.post('/merge', upload.array('pdfs',2), async (req, res, next) => {
    console.log(req.files)
    let d = await MergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    setTimeout(() => {
        fs.unlinkSync(path.join(__dirname, req.files[0].path))
        fs.unlinkSync(path.join(__dirname, req.files[1].path))
    }, 100000);
    // res.send({data: req.files})
    }
    )

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})