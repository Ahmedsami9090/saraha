import jwt from 'jsonwebtoken'

export const createToken = async (id, email, key, expiry = "2h")=>{
    const token = jwt.sign({_id : id, email}, key, {expiresIn : expiry})
    return token
}

export const verifyToken = async (token, key)=>{
    const decoded = jwt.verify(token, key)
    return decoded
}