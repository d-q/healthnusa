import { Component, xml, useState } from "@odoo/owl";
import { appRouter } from "../router/index.js";

export class App extends Component {
  static template = xml`
    <div class="app">
      <nav style="padding: 20px; background: #f0f0f0; margin-bottom: 20px;">
        <h1>Owl 2 Routing Example</h1>
        <div style="margin-top: 10px;">
          <button t-on-click="() => this.navigate('/')" style="margin-right: 10px;">Home</button>
          <button t-on-click="() => this.navigate('/about')" style="margin-right: 10px;">About</button>
          <button t-on-click="() => this.navigate('/contact')">Contact</button>
        </div>
      </nav>
      
      <div class="content" style="padding: 20px;">
        <t t-component="state.currentComponent" t-if="state.currentComponent"/>
      </div>
    </div>
  `;

  setup() {
    this.router = appRouter;
    this.state = useState({
      currentComponent: null
    });

    // Setup router
    this.router.start();
    
    // Listen untuk perubahan route
    this.router.onRouteChange((route) => {
      this.state.currentComponent = route.component;
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
}