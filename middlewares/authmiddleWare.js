import jwt  from 'jsonwebtoken';


export const proctect = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    success: false
                });
            }
            req.body.userId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(500).json({
        message: error.message,
        success: false,
        });
    }
    }