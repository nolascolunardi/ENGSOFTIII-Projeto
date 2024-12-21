import express from "express";
import "reflect-metadata";
import { iniciarRotas } from "./rotas/Rotas";
import arquivosEstaticos from "./config/template/arquivosEstaticos";
import {configuracaoViews} from "./config/template/configuracaoViews";

const app = express();

app.use(express.json());
app.use(arquivosEstaticos);
configuracaoViews(app);
iniciarRotas(app);

export default app;