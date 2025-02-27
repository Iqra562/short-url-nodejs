const express = require('express');
const {connectToMongoDB} = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();
const PORT = 8001;


connectToMongoDB('mongodb+srv://iqra44938:mtnwR3jdxJ4dUhl1@cluster0.rd6d3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('mongodb connected'))

app.use(express.json())

app.use("/url",urlRoute)
app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push :{ 
        visitHistory: {
            timestamp: Date.now()

        }
    }})
    res.redirect(entry.redirectURL)
})
app.listen(PORT,()=>console.log('Server started')) 