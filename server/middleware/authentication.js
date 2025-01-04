import jwt from 'jsonwebtoken' ; 

const Auth = (req,res,next) => {
    try {
        const token = req.cookies.token ;  
        const tokenData = jwt.verify(token,process.env.JWT_PASSWORD) ; 
        req.user = tokenData ;
        next() ; 
    } catch (e) {
        console.log(e);
    } 
}

export default Auth ;  