import { Component, xml } from "@odoo/owl";

export class Home extends Component {
  static template = xml`
    <div>
      <h2>Home Page</h2>
      <p>Selamat datang di halaman utama!</p>
      <p>Ini adalah contoh routing sederhana menggunakan Owl 2.</p>
      <button t-on-click="handleShowData">
        Console data
      </button>
    </div>
  `;

  handleShowData() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({});

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include"
    };

    fetch("/api/healthnusa/employees", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

  }
}