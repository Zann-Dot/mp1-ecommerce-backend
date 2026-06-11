import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
    const token = req.cookies.login_user;

    if (!token)
        return res.status(401).json({ error: "Access Denied. Please log in." });

    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const verifiedUser = jwt.verify(token, JWT_SECRET_KEY);
        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
}

export default authenticateToken;