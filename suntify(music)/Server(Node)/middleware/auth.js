const { verifyToken } = require('../util/jws');

const auth = (req , res ,next)=>{
    try{
        const userToken = req.header('authorization');
        if (!userToken) return res.status(401).json({ error: 'unauthorization' });
        const token = userToken.split(" ")[1];
        const payload = verifyToken(token);
        if (!payload) return res.status(401).json({ error: 'unauthorization' });
        req.user = payload
        next();
    }catch(err){
     return res.status(401).json({ error: 'EXP' });

    }
}

const authorize = (artist) =>{
    return (req , res , next)=>{
        const user = req.user;
        if(artist) next();
        else res.status(401)
    }
}
module.exports = {auth , authorize}