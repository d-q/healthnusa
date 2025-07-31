/** @odoo-module **/

import { whenReady } from "@odoo/owl";
import { mountComponent } from "@web/env";
import { Root } from "../components/root/root";

whenReady(() => mountComponent(Root, document.body));