/** @odoo-module **/

import { useState, onMounted } from "@odoo/owl";

export function useTheme() {
    const state = useState({
        isDarkMode: false
    });

    onMounted(() => {
        initDarkMode();
    });

    function initDarkMode() {
        // Cek localStorage untuk preference yang tersimpan
        const savedMode = localStorage.getItem("darkMode");
        const html = document.documentElement;
        const body = document.body;

        // Default mode adalah light, hanya dark jika explicitly disimpan sebagai "true"
        if (savedMode === "true") {
            state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
        } else {
            // Default light mode
            state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            // Set localStorage to explicitly save light mode preference
            if (savedMode === null) {
                localStorage.setItem("darkMode", "false");
            }
        }
        
        // Force scrollbar refresh setelah mode change
        setTimeout(() => forceScrollbarRefresh(), 100);
    }

    function toggleDarkMode() {
        console.log("toggleDarkMode called");
        
        const html = document.documentElement;
        const body = document.body;

        if (state.isDarkMode) {
            // Switch to light mode
            state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        } else {
            // Switch to dark mode
            state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
        
        forceScrollbarRefresh();
    }

    function forceScrollbarRefresh() {
        const container = document.querySelector('.data-list-container');
        if (container) {
            const originalDisplay = container.style.display;
            container.style.display = 'none';
            container.offsetHeight; // Force reflow
            container.style.display = originalDisplay || 'block';
            
            const originalOverflow = container.style.overflowY;
            container.style.overflowY = 'hidden';
            setTimeout(() => {
                container.style.overflowY = originalOverflow || 'auto';
            }, 10);
        }
    }

    return {
        state,
        toggleDarkMode
    };
}