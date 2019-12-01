import {Menu} from "@models/Menu";
import getConfig from "next/config";
const env: string = process.env.ENV || 'development';
const {publicRuntimeConfig} = getConfig();
export const config = publicRuntimeConfig;
export const menuTop: Menu[] = [
    new Menu("menu-top.about", "/about"),
    new Menu("menu-top.contact", "/contact"),
    new Menu("menu-top.signup", "/signup"),
    new Menu("menu-top.signin", "/signin"),
];
export const AppName = "What you need";


export const Company = {
    appName: AppName,
    address: "34 Street Name, City Name Here, United States",
    phone: "+34 123 456 789",
    email: "info@yourdomain.com",
};

export const apiRoutes = {
    allCategories: "api/retrieve_categories",
    createAccount: "api/users/insert_user",
    signIn: "api/users/user",
    createPublication: "api/publications/insert_publications",
    publications: "api/publications/retrieve_publications",
};
