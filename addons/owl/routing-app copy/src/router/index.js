// Router dengan History API untuk URL bersih (tanpa #)
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
        this.currentRoute = route;
        this.notifyListeners();
      } else {
        // Fallback ke home jika route tidak ditemukan
        const homeRoute = this.routes.find(r => r.path === '/');
        if (homeRoute) {
          this.currentRoute = homeRoute;
          this.notifyListeners();
        }
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
  
  // Definisi routes
  import { Home } from "../components/Home.js";
  import { About } from "../components/About.js";
  import { Contact } from "../components/Contact.js";
  
  export const appRouter = new SimpleRouter([
    { path: "/", component: Home, name: "home" },
    { path: "/about", component: About, name: "about" },
    { path: "/contact", component: Contact, name: "contact" },
  ]);