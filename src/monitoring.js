const winston = require('winston');

class SecurityMonitor {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: 'security-error.log', level: 'error' }),
                new winston.transports.File({ filename: 'security.log' })
            ]
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }
    }

    logSecurityEvent(event) {
        this.logger.info('Security Event', event);
    }

    logError(error) {
        this.logger.error('Security Error', error);
    }
}

const monitor = new SecurityMonitor();

function initializeMonitoring(app) {
    if (!app || typeof app.use !== 'function') {
        throw new Error('Invalid Express application');
    }

    app.use((req, res, next) => {
        // Log request
        monitor.logSecurityEvent({
            type: 'request',
            method: req.method,
            path: req.path,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });

        // Monitor response
        res.on('finish', () => {
            monitor.logSecurityEvent({
                type: 'response',
                status: res.statusCode,
                path: req.path,
                method: req.method
            });
        });

        next();
    });

    return app;
}

module.exports = { initializeMonitoring };