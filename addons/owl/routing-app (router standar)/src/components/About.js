import { Component, xml } from "@odoo/owl";

export class About extends Component {
  static template = xml`
    <div>
      <h2>About Page</h2>
      <p>Ini adalah halaman About.</p>
      <p>Owl 2 adalah framework JavaScript modern untuk membangun aplikasi web.</p>
    </div>
  `;
}