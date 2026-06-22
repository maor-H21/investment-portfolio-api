





export const isReqHasBody = (req, res, next) => {
    const { body, method } = req;
    if (method !== "GET" && method !== "DELETE") {
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).send("Body (data) is required");
        }
    }
    next();
};
