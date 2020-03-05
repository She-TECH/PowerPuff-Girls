import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    pythonApi: string;
    colorRed: string;
    colorGreen: string;
    colorOrange: string;
    colorBlue: string;

}

export const AppConfig: IAppConfig = {    
    pythonApi: "http://127.0.0.1:5000/",
    colorRed: "#e2434b",
    colorGreen: "#53d397",
    colorOrange: "#f7b32d",
    colorBlue: "#005792"
};