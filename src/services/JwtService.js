import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken'

class JwtService {
    //Sign with gmail & password then generate the token with 5m duration
    static sign(payload,expiry='5m',secret = JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }

    //Verify the token
    static verify(token,secret = JWT_SECRET){
        return jwt.verify(token,secret)
    }
}

export { JwtService }