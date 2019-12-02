// const express = require('express');
require('custom-env').env(process.env.NODE_ENV);
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import connectMongo from "connect-mongo";
import session from "express-session";
import nextI18next from "./i18n";
import nextI18NextMiddleware from "next-i18next/middleware";
import api from "./routes";

const expressApp = express();
const server = require('http').createServer(expressApp);
const io = require('socket.io')(server);
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const defaultRequestHandler = app.getRequestHandler();

const LOCAL_DB = "theseed";
const MONGODB_URI =
    process.env.MONGODB_URI || `mongodb://localhost/${LOCAL_DB}`;
// const SESSION_KEY = "connect.sid";
const SESSION_SECRET = "jfoiesofj@#JIFSIOfsjieo@320923";
const SESSION_DOMAIN = undefined;
const PORT = process.env.NODE_ENV === "development" ? 3000 : 3000;
const proxyMiddleware = require('http-proxy-middleware');
const shrinkRay = require('shrink-ray-current');
// socket.io server
let sockets: any = [];
io.on('connection', (socket: any) => {
    console.log('User connect');
    sockets = [...sockets, socket]
});
const graphqlServer = process.env.GRAPHQL_SERVER;
var apiproxy = proxyMiddleware('/graphql', {pathRewrite: {'^/graphql': 'graphql'}, target: graphqlServer});
var wsproxy = proxyMiddleware('/graphql', {ws: true, target: graphqlServer});
app.prepare().then(() => {
    // Parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.urlencoded({extended: false}));
    // Parse application/json
    expressApp.use(bodyParser.json());

    // Theseed Custom
    expressApp.use(compression());
    expressApp.use(nextI18NextMiddleware(nextI18next));
    expressApp.use(morgan("dev"));
    // server.use(shrinkRay());
    expressApp.use(apiproxy); // the order here is important
    expressApp.use(wsproxy);
    // MongoDB
    // mongoose.set('debug', true);
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));

    // Session
    const MongoStore = connectMongo(session);
    expressApp.use(
        session({
            // key: SESSION_KEY,
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 365 * (24 * 60 * 60 * 1000),
                domain: dev ? undefined : SESSION_DOMAIN
            },
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: 365 * (24 * 60 * 60 * 1000)
            })
        })
    );

    // API routes
    expressApp.use("/api", api);

    // Next.js request handling
    const customRequestHandler = (
        page: any,
        req: express.Request,
        res: express.Response
    ) => {
        // Both query and params will be available in getInitialProps({query})
        const mergedQuery = Object.assign({}, req.query, req.params);
        app.render(req, res, page, mergedQuery);
    };

    // Routes
    // server.get('/', customRequestHandler.bind(undefined, '/'));
    expressApp.get("/about/:id", customRequestHandler.bind(undefined, "/about"));
    expressApp.get("*", (req: express.Request, res: express.Response) => {
        defaultRequestHandler(req, res);
    });

    expressApp.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            console.error(err.stack);
            return res.status(500).json({code: 0});
        }
    );

    server.listen(PORT, () => {
        console.log(
            `App running on http://localhost:${PORT}/\nAPI running on http://localhost:${PORT}/api/`
        );
    });
});
