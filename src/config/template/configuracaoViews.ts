import express, {Express} from "express";
import path from "path";

export function configuracaoViews(app: Express): void {
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../../views"));
    app.use(express.urlencoded({ extended: false }));
}

export const expressStaticoConfiguracoes = express.static(path.join(__dirname, "../../../public"));