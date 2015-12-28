import "reflect-metadata";
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {Component, bind} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";
import {EventData} from "data/observable";
import {topmost} from "ui/frame";
import {NSLocationStrategy} from "./ns-location-strategy";

import {LoginPage} from "./views/login/login";
import {RegisterPage} from "./views/register/register";

@Component({
    selector: "main",
    directives: [ROUTER_DIRECTIVES],
    template: "<router-outlet></router-outlet>"
})
@RouteConfig([
    { path: '/', component: LoginPage, as: "Login" },
    { path: '/Register', component: RegisterPage, as: "Register" }
])
class AppComponent {}

export function loaded(args: EventData) {
    let page = args.object;
    if (page.ios) {
        let navigationBar = topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    
    nativeScriptBootstrap(AppComponent, [
        ROUTER_PROVIDERS, bind(LocationStrategy).toClass(NSLocationStrategy)
    ])
}
