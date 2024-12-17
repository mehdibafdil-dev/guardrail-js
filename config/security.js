module.exports = {
    // Rate limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    },

    // Security headers
    headers: {
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
        },
        contentSecurity: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
                imgSrc: ["'self'"]
            }
        }
    },

    // Monitoring
    monitoring: {
        enabled: true,
        interval: 5000
    }
};