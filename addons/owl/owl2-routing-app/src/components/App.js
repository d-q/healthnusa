import { Component, xml, useState } from "@odoo/owl";
import { appRouter } from "../router/index.js";
import { AuthService } from "../services/auth.js";

export class App extends Component {
    static template = xml`
    <div class="app">
      <nav t-if="state.isLoggedIn" style="padding: 20px; background: #f0f0f0; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h1>Owl 2 Routing Example</h1>
          <div style="font-size: 14px;">
            Welcome, <strong t-esc="state.username"/>
            <button t-on-click="handleLogout" style="margin-left: 10px; padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Logout
            </button>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <button t-on-click="() => this.navigate('/')" style="margin-right: 10px;">Home</button>
          <button t-on-click="() => this.navigate('/about')" style="margin-right: 10px;">About</button>
          <button t-on-click="() => this.navigate('/contact')">Contact</button>
        </div>
      </nav>
      
      <div class="content" style="padding: 20px;">
        <t t-component="state.currentComponent" t-if="state.currentComponent" t-props="{ router: this.router }"/>
      </div>
    </div>
  `;

    setup() {
        this.router = appRouter;
        this.state = useState({
            currentComponent: null,
            isLoggedIn: AuthService.isLoggedIn(),
            username: AuthService.getUsername()
        });

        // Setup router
        this.router.start();

        // Listen untuk perubahan route
        this.router.onRouteChange((route) => {
            this.state.currentComponent = route.component;
            // Update login status setiap route change
            this.state.isLoggedIn = AuthService.isLoggedIn();
            this.state.username = AuthService.getUsername();
        });

        // Set komponen awal
        const currentRoute = this.router.getCurrentRoute();
        if (currentRoute) {
            this.state.currentComponent = currentRoute.component;
        }
    }

    navigate(path) {
        this.router.navigate(path);
    }

    handleLogout() {
        AuthService.logout();
        this.state.isLoggedIn = false;
        this.state.username = '';
        this.router.navigate('/login');
    }
}