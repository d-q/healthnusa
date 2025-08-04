import { Component, xml, useRef } from "@odoo/owl";

export class LoginForm extends Component {
    static template = xml`
        <form class="login-form w-full max-w-sm mx-auto mt-16 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 flex flex-col gap-6">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-2 tracking-tight">Sign in to your account</h2>
            <div class="form-group flex flex-col gap-1">
                <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required=""
                    autocomplete="username"
                    class="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 text-base bg-gray-50"
                    placeholder="Enter your username"
                    t-ref="username"
                />
            </div>
            <div class="form-group flex flex-col gap-1">
                <input
                    type="password"
                    id="password"
                    name="password"
                    required=""
                    autocomplete="current-password"
                    class="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition placeholder-gray-400 text-base bg-gray-50"
                    placeholder="Enter your password"
                    t-ref="password"
                />
            </div>
            <button
                type="button"
                t-on-click="onLogin"
                class="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Login
            </button>
        </form>
    `;

    setup() {
        this.usernameRef = useRef("username");
        this.passwordRef = useRef("password");
    }

    onLogin() {
        // const username = this.usernameRef.el.value;
        // const password = this.passwordRef.el.value;

        // console.log(username)
        // console.log(password)

        var user = this.usernameRef.el.value;
        var password = this.passwordRef.el.value;
        var dbname = 'nusahealth_1';
        var server_url = 'http://localhost:8069/xmlrpc/'; // Adjust port and protocol as needed

        // Using a hypothetical XML-RPC library
        // This example uses a structure similar to 'jquery-xmlrpc' for demonstration
        $.xmlrpc({
            url: server_url + 'common', // Target the common service
            methodName: 'login', // Call the login method
            dataType: 'jsonp', // Or 'xml' depending on your library and Odoo configuration
            params: [dbname, user, password], // Parameters for the login method
            success: function (response, status, jqXHR) {
                // Handle successful login
                // The response typically contains the user's UID if successful
                console.log("Login successful! User ID:", response[0]);
            },
            error: function (jqXHR, status, error) {
                // Handle login error
                console.error("Login failed:", error);
            }
        });
    }
}
