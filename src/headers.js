const setupSecurityHeaders = (app) => {
    return (req, res, next) => {
        // Set security headers
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        
        next();
    };
};

module.exports = { setupSecurityHeaders };