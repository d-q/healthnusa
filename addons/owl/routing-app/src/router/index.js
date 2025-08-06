// Router dengan History API untuk URL bersih (tanpa #) dan support parameter
export class SimpleRouter {
    constructor(routes) {
      this.routes = routes;
      this.currentRoute = null;
      this.currentParams = {};
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
      const matchedRoute = this.matchRoute(path);
      
      if (matchedRoute) {
        this.currentRoute = matchedRoute.route;
        this.currentParams = matchedRoute.params;
        this.notifyListeners();
      } else {
        // Fallback ke 404 jika route tidak ditemukan
        const notFoundRoute = this.routes.find(r => r.name === '404');
        if (notFoundRoute) {
          this.currentRoute = notFoundRoute;
          this.currentParams = {};
          this.notifyListeners();
        }
      }
    }
  
    // Match route dengan support untuk parameter
    matchRoute(path) {
      for (const route of this.routes) {
        const match = this.pathMatches(route.path, path);
        if (match) {
          return {
            route: route,
            params: match.params
          };
        }
      }
      return null;
    }
  
    // Check apakah path cocok dengan route pattern dan extract parameter
    pathMatches(pattern, path) {
      // Convert pattern seperti "/user/:id" menjadi regex
      const paramNames = [];
      const regexPattern = pattern.replace(/:([^/]+)/g, (match, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });
  
      const regex = new RegExp(`^${regexPattern}$`);
      const match = path.match(regex);
  
      if (match) {
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        return { params };
      }
  
      return null;
    }
  
    navigate(path) {
      // Gunakan History API untuk mengubah URL tanpa reload
      window.history.pushState({}, '', path);
      this.handleRouteChange();
    }
  
    getCurrentRoute() {
      return this.currentRoute;
    }
  
    getCurrentParams() {
      return this.currentParams;
    }
  
    onRouteChange(callback) {
      this.listeners.push(callback);
    }
  
    notifyListeners() {
      this.listeners.forEach(callback => callback(this.currentRoute, this.currentParams));
    }
  }
  
  // Import components
  import { Home } from "../components/Home.js";
  import { About } from "../components/About.js";
  import { Contact } from "../components/Contact.js";
  import { NotFound } from "../components/NotFound.js";
  import { Users } from "../components/Users.js";
  import { UserDetail } from "../components/UserDetail.js";
  import { UserNew } from "../components/UserNew.js";
  import { UserEdit } from "../components/UserEdit.js";
  
  // Definisi routes dengan parameter
  export const appRouter = new SimpleRouter([
    { path: "/", component: Home, name: "home" },
    { path: "/about", component: About, name: "about" },
    { path: "/contact", component: Contact, name: "contact" },
    { path: "/users", component: Users, name: "users" },
    { path: "/user/new", component: UserNew, name: "user-new" },
    { path: "/user/:id/edit", component: UserEdit, name: "user-edit" },
    { path: "/user/:id", component: UserDetail, name: "user-detail" },
    { path: "/404", component: NotFound, name: "404" },
  ]);