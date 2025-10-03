import express from "express"
import user from "./user.js"

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res)=> {
    res.send("server is ready")
})

app.get("/api/user", (req, res)=> {
    res.send(user)
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
})