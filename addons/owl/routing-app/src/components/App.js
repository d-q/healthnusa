import { Component, xml, useState } from "@odoo/owl";
import { appRouter } from "../router/index.js";

export class App extends Component {
  static template = xml`
    <div class="app">
      <nav style="padding: 20px; background: #2c3e50; margin-bottom: 20px; color: white;">
        <h1 style="margin: 0 0 15px 0;">Owl 2 Routing Example</h1>
        <style>
          .nav-button {
            padding: 8px 16px; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer; 
            background: #34495e; 
            color: white; 
            transition: all 0.3s;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            overflow: hidden;
          }
          
          .nav-button:hover {
            background: #4a6741;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          
          .nav-button.active {
            background: #3498db;
            box-shadow: 0 4px 12px rgba(52,152,219,0.4);
            transform: translateY(-1px);
          }
          
          .nav-button.active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #fff;
            border-radius: 2px;
          }
          
          .nav-button.active::after {
            content: '●';
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            font-size: 8px;
          }
        </style>
        
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <button t-on-click="() => this.navigate('/')" 
                  t-att-class="getNavClass('/')"
                  class="nav-button">
            🏠 Home
          </button>
          <button t-on-click="() => this.navigate('/about')" 
                  t-att-class="getNavClass('/about')"
                  class="nav-button">
            ℹ️ About
          </button>
          <button t-on-click="() => this.navigate('/contact')" 
                  t-att-class="getNavClass('/contact')"
                  class="nav-button">
            📞 Contact
          </button>
          <button t-on-click="() => this.navigate('/users')" 
                  t-att-class="getNavClass('/users')"
                  class="nav-button">
            👥 Users
          </button>
        </div>
      </nav>
      
      <div class="content" style="padding: 20px; min-height: 500px; background: #ecf0f1;">
        <t t-component="state.currentComponent" 
           t-if="state.currentComponent"
           t-props="getComponentProps()"/>
      </div>
    </div>
  `;

  setup() {
    this.router = appRouter;
    this.state = useState({
      currentComponent: null,
      currentRoute: null,
      currentParams: {}
    });

    // Setup router
    this.router.start();
    
    // Listen untuk perubahan route
    this.router.onRouteChange((route, params) => {
      this.state.currentComponent = route.component;
      this.state.currentRoute = route;
      this.state.currentParams = params;
    });

    // Set komponen awal
    const currentRoute = this.router.getCurrentRoute();
    const currentParams = this.router.getCurrentParams();
    if (currentRoute) {
      this.state.currentComponent = currentRoute.component;
      this.state.currentRoute = currentRoute;
      this.state.currentParams = currentParams;
    }
  }

  getComponentProps() {
    // Pass router dan params ke child components
    return {
      router: this.router,
      params: this.state.currentParams,
      route: this.state.currentRoute
    };
  }

  navigate(path) {
    this.router.navigate(path);
  }

  getNavClass(path) {
    // Check active state untuk Users dan sub-routes
    if (path === '/users') {
      return this.isUsersActive() ? 'active' : '';
    }
    return this.isActive(path) ? 'active' : '';
  }

  isActive(path) {
    return window.location.pathname === path;
  }

  isUsersActive() {
    const currentPath = window.location.pathname;
    return currentPath === '/users' || 
           currentPath.startsWith('/user/');
  }
}