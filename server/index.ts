// const express = require('express');
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import connectMongo from "connect-mongo";
import session from "express-session";
import LRUCache from "lru-cache";
import api from "./routes";
import nextI18next from "./i18n";
import nextI18NextMiddleware from "next-i18next/middleware";
import proxy from "http-proxy-middleware";
import getConfig from 'next/config';

const server = express();
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const defaultRequestHandler = app.getRequestHandler();
const LOCAL_DB = "theseed";
const MONGODB_URI =
    process.env.MONGODB_URI || `mongodb://localhost/${LOCAL_DB}`;
// const SESSION_KEY = "connect.sid";
const SESSION_SECRET = "jfoiesofj@#JIFSIOfsjieo@320923";
const SESSION_DOMAIN = undefined;
const PORT = process.env.NODE_ENV !== "production" ? 80 : 3000;
const {publicRuntimeConfig} = getConfig();
const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
    length: function (n: any) {
        return n.length
    },
    maxAge: 1000 * 60 * 60 * 24 * 30
});

app.prepare().then(() => {
    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({extended: false}));
    // Parse application/json
    server.use(bodyParser.json());

    // Theseed Custom
    server.use(compression());
    server.use(nextI18NextMiddleware(nextI18next));

    server.use(morgan("dev"));

    server.use('/api-server', proxy({
        target: publicRuntimeConfig.api,
        changeOrigin: true,
    }));
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
    server.use(
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
    server.use("/api", api);

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
    server.get("/about/:id", customRequestHandler.bind(undefined, "/about"));
    server.get("*", (req: express.Request, res: express.Response) => {
        defaultRequestHandler(req, res);
    });

    server.use(
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

