





export const isReqHasBody = (req, res, next) => {
    const {body,method} = req    
    !body ||  Object.keys(body).length === 0 && (method!== "GET" && method !== "DELETE") ?
        res.status(400).send("Body (data) is required") :
        next()
}
