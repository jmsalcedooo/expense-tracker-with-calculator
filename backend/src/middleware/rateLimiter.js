import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // In real world, we put the userId or ipAddress as key 
        const { success } = await ratelimit.limit("my-rate-limit");
        
        if(!success){
            return res.status(429).json({
                message: "Too many requests, please try again later.",
            });
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error);
        // Replace next(error) with a direct JSON response:
        res.status(500).json({ 
            success: false, 
            message: "Rate limit check failed", 
            error: error.message 
        });
    }
};

export default rateLimiter;
