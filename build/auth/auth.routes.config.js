"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        const authCheck = (req, res, next) => {
            if (!req.user) {
                res.status(401).json({
                    authenticated: false,
                    message: "user has not been authenticated"
                });
            }
            else {
                next();
            }
        };
        this.app.get("/", authCheck, (req, res) => {
            res.status(200).json({
                authenticated: true,
                message: "user successfully authenticated",
                user: req.user,
                cookies: req.cookies
            });
        });
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
