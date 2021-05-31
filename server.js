const express = require('express')
const expressFormidable = require('express-formidable')
const path = require('path')
const fs = require('fs')

//IP and Port
const IP = '127.0.0.1'
const PORT = process.env.PORT | 3300;

//checking required files
if(!fs.existsSync('./imgs')){
    fs.mkdirSync('./imgs')
}
if(!fs.existsSync('./galleryDetails.json')){
    fs.writeFileSync('./galleryDetails.json', '[]')
}

//get the previous gallery data
var galleryDetails = require('./galleryDetails.json')

//init express
const app = express()

//add middleware
app.use(expressFormidable({uploadDir: path.join(__dirname, 'imgs'), multiples: false}))

//app route
app.get('/', (req, res) => {
    console.log(`\nGET request for Home Page at ${new Date().toUTCString()}`)
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/uploadImageAndData', (req, res) => {
    if(req.fields['title'] == '' || req.fields['description'] == ''|| req.fields['submittedBy'] == '' || req.files.img.name == ''){
        console.log(`\nA bad POST request for Image Submission at ${new Date().toUTCString()}`)
        res.send('<h1>Your Application has not been Submitted<br>Fill All The Fields Carefully</h1>')
    }
    else{
        console.log(`\nPOST request no. ${galleryDetails.length + 1} for Image Submission at ${new Date().toUTCString()}`)
        fs.renameSync(req.files.img.path, path.join(__dirname, 'imgs', ('img' + String(galleryDetails.length) + '.' + path.parse(req.files.img.name).ext)))
        galleryDetails.push({
            imgID : galleryDetails.length,
            title : req.fields['title'],
            description: req.fields['description'],
            submittedBy: req.fields['submittedBy'],
        })
        const jsonstr = JSON.stringify(galleryDetails)
        fs.writeFileSync('./galleryDetails.json', jsonstr)
        res.send('<h1>Your Application has been Submitted Successfully</h1>')
    }
    
})

//listening server
app.listen(PORT, IP, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(`\n${process.env.npm_package_name} start listening at ${IP}:${PORT}`) 
    }
})