
const jwt = require('jsonwebtoken')
const verifyUser = (req,res,next)=>{
    console.log('inside middleware')
    // console.log(req.headers)


    const authheader = req.headers.authorization
    // console.log(authheader)


    if(!authheader) return res.status(401).json({error:"no auth token provided"})
    const token = authheader.split(' ')[1]
    
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({error:err.message})

        req.user = decoded
        // console.log(decoded)

    })
    next()
}

const verifyAdmin=(req,res,next)=>{
    if(req.user.role === 'admin') return next()
    res.status(403).json({error:"you are not authorized"})

}

module.exports = {verifyUser, verifyAdmin}