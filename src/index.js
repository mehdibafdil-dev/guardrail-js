const express = require('express');
const { securityMiddleware, defaultMiddleware } = require('./middleware');
const { setupSecurityHeaders } = require('./headers');
const { initializeMonitoring } = require('./monitoring');

class GuardRail {
    constructor(config = {}) {
        this.config = {
            rateLimit: config.rateLimit || 100,
            timeWindow: config.timeWindow || 15 * 60 * 1000,
            ...config
        };

        // Initialize core components
        this.securityMiddleware = securityMiddleware;
        this.setupSecurityHeaders = setupSecurityHeaders;
        this.monitoring = initializeMonitoring;
    }

    init(app) {
        if (!app || typeof app.use !== 'function') {
            throw new Error('Invalid Express application');
        }

        // Apply middleware stack
        defaultMiddleware.forEach(middleware => app.use(middleware));
        app.use(this.securityMiddleware);
        app.use(this.setupSecurityHeaders(app));
        
        // Initialize monitoring
        this.monitoring(app);

        return app;
    }

    getSecurityMiddleware() {
        return this.securityMiddleware;
    }

    getConfig() {
        return this.config;
    }
}

module.exports = new GuardRail();