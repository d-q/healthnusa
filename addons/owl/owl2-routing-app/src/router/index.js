import { AuthService } from "../services/auth.js";

// Router dengan History API dan route protection
export class SimpleRouter {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this.listeners = [];

        // Listen untuk perubahan URL browser (back/forward button)
        window.addEventListener('popstate', () => {
            this.handleRouteChange();
        });
    }

    start() {
        this.handleRouteChange();
    }

    handleRouteChange() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path);

        if (route) {
            // Check if route requires authentication
            if (route.requiresAuth && !AuthService.isLoggedIn()) {
                // Redirect ke login jika belum login
                this.navigate('/login');
                return;
            }

            // Jika sudah login dan mencoba akses login page, redirect ke home
            if (route.name === 'login' && AuthService.isLoggedIn()) {
                this.navigate('/');
                return;
            }

            this.currentRoute = route;
            this.notifyListeners();
        } else {
            // Import NotFound component
            import("../components/NotFound.js").then(module => {
                this.currentRoute = {
                    path: window.location.pathname,
                    component: module.NotFound,
                    name: "notfound"
                };
                this.notifyListeners();
            });
        }
    }

    navigate(path) {
        // Gunakan History API untuk mengubah URL tanpa reload
        window.history.pushState({}, '', path);
        this.handleRouteChange();
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    onRouteChange(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentRoute));
    }
}

// Definisi routes dengan protection
import { Home } from "../components/Home.js";
import { About } from "../components/About.js";
import { Contact } from "../components/Contact.js";
import { Login } from "../components/Login.js";

export const appRouter = new SimpleRouter([
    { path: "/login", component: Login, name: "login" },
    { path: "/", component: Home, name: "home", requiresAuth: true },
    { path: "/about", component: About, name: "about", requiresAuth: true },
    { path: "/contact", component: Contact, name: "contact", requiresAuth: true },
]);