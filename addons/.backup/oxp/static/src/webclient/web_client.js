/** @odoo-module **/

import { Component, useState, useSubEnv, onMounted } from "@odoo/owl";
import { Navbar } from "./navbar";
import { Todoo } from "../todoo/todoo";
import { Dashboard } from "../dashboard/dashboard";
import { Contacts } from "../contacts/contacts";
import { TodoStore } from "../todoo/todo_store";

export class WebClient extends Component {
  static template = "oxp.WebClient";
  static components = { Navbar };

  setup() {
    this.apps = [
      { id: "todoo", name: "Todoo", Component: Todoo },
      { id: "dashboard", name: "Dashboard", Component: Dashboard },
      { id: "contacts", name: "Contacts", Component: Contacts },
    ];

    // Get current app from URL or default to first app
    const currentAppId = this.getCurrentAppFromUrl() || this.apps[0].id;
    const currentApp =
      this.apps.find((app) => app.id === currentAppId) || this.apps[0];

    this.state = useState({
      currentApp: currentApp,
    });

    const todoStore = useState(new TodoStore());
    // add store to environment
    useSubEnv({ todoStore });

    // Listen to browser navigation events (back/forward buttons)
    onMounted(() => {
      window.addEventListener("popstate", this.onPopState.bind(this));
      // Set initial URL if not present
      if (!this.getCurrentAppFromUrl()) {
        this.updateUrl(this.state.currentApp.id, true);
      }
    });
  }

  getCurrentAppFromUrl() {
    const hash = window.location.hash;
    if (hash.startsWith("#app=")) {
      const match = hash.match(/#app=([^&]*)/);
      return match ? match[1] : null;
    }
    return null;
  }

  updateUrl(appId, replace = false) {
    const newUrl = `${window.location.pathname}${window.location.search}#app=${appId}`;
    if (replace) {
      window.history.replaceState({}, "", newUrl);
    } else {
      window.history.pushState({}, "", newUrl);
    }
  }

  onPopState() {
    const appId = this.getCurrentAppFromUrl();
    if (appId) {
      const app = this.apps.find((app) => app.id === appId);
      if (app && app.id !== this.state.currentApp.id) {
        this.state.currentApp = app;
      }
    }
  }

  selectApp(appId) {
    const newApp = this.apps.find((app) => app.id === appId);
    if (newApp && newApp.id !== this.state.currentApp.id) {
      this.state.currentApp = newApp;
      this.updateUrl(appId);
    }
  }
}

// https://github.com/odoo/owl/issues/1573
