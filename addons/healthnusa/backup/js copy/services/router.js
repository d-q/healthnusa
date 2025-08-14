/** @odoo-module **/

export class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.listeners = new Set();
        this.baseUrl = '/emr';
        
        window.addEventListener('popstate', () => this.handlePopState());
    }

    register(path, component) {
        if (path === '/dashboard') {
            this.routes.set('/emr', component);
        } else {
            const fullPath = this.baseUrl + path;
            this.routes.set(fullPath, component);
        }
    }

    navigate(path) {
        if (path === '/dashboard') {
            const fullPath = '/emr';
            if (fullPath !== window.location.pathname) {
                window.history.pushState(null, '', fullPath);
                this.handleRoute(fullPath);
            }
        } else {
            const fullPath = this.baseUrl + path;
            if (fullPath !== window.location.pathname) {
                window.history.pushState(null, '', fullPath);
                this.handleRoute(fullPath);
            }
        }
    }

    handleRoute(path = window.location.pathname) {
        const route = this.routes.get(path) || this.routes.get('/emr');
        if (route && route !== this.currentRoute) {
            this.currentRoute = route;
            this.notifyListeners(route);
        }
    }

    addListener(callback) {
        this.listeners.add(callback);
    }

    notifyListeners(route) {
        this.listeners.forEach(callback => callback(route));
    }

    handlePopState() {
        this.handleRoute();
    }
}