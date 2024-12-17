const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const securityMiddleware = (req, res, next) => {
    // Security checks implementation
    const suspiciousPatterns = /[<>{}]/g;
    
    if (suspiciousPatterns.test(req.path)) {
        return res.status(403).json({
            error: 'Potentially malicious request pattern detected'
        });
    }

    next();
};

module.exports = {
    securityMiddleware,
    defaultMiddleware: [
        helmet(),
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100
        })
    ]
};