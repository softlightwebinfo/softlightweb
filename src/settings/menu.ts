import {MenuItem} from "@models/MenuItem";

export const menu: MenuItem[] = [
    // new MenuItem("index", "header.home", true, "compute"),
    new MenuItem("musicians", "header.musicians", false, "user", "NUEVO"),
    new MenuItem("search", "header.search", true, "search"),
    new MenuItem("blog", "header.blog", false, "notebookApp"),
    new MenuItem("animals", "header.list", false, "editorUnorderedList"),
    new MenuItem("publish", "header.publish", false, "indexOpen"),
    new MenuItem("forum", "header.forum", false, "importAction"),
    new MenuItem("stores", "header.stores", false, "folderOpen"),
    new MenuItem("events", "header.events", false, "calendar", "NUEVO"),
    new MenuItem("help", "header.help", false, "help"),
];

export const menuPersonal: MenuItem[] = [
    new MenuItem("dashboard-rs-items", "menu.items", false, "list"),
    new MenuItem("publish", "menu.publish", false, "indexOpen"),
    new MenuItem("dashboard-rs-list-blog", "menu.blog", false, "notebookApp"),
    new MenuItem("dashboard-rs-create-blog", "menu.publishBlog", false, "reportingApp"),
    new MenuItem("dashboard-rs-list-event", "menu.listEvents", false, "list"),
];
