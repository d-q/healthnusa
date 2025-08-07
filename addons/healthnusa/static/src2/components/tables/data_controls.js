/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";

export class DataControls extends Component {
    static template = "healthnusa.DataControls";
    static props = ["title?", "onAdd?", "onSearch?", "onSort?", "dataCount?"];

    setup() {
        this.state = useState({
            searchTerm: "",
            searchField: "all",
            showSearchFilter: false
        });
        this.searchInputRef = useRef("searchInput");
    }

    get title() {
        return this.props.title || "Data";
    }

    get dataCount() {
        return this.props.dataCount || "1-10 / 14";
    }

    onAddClick() {
        if (this.props.onAdd) {
            this.props.onAdd();
        }
    }

    onSearchInput(ev) {
        this.state.searchTerm = ev.target.value;
        if (this.props.onSearch) {
            this.props.onSearch(this.state.searchTerm, this.state.searchField);
        }
    }

    onSearchFieldChange(ev) {
        this.state.searchField = ev.target.value;
        if (this.props.onSearch) {
            this.props.onSearch(this.state.searchTerm, this.state.searchField);
        }
    }

    toggleSearchFilter() {
        this.state.showSearchFilter = !this.state.showSearchFilter;
    }

    onSort(field) {
        if (this.props.onSort) {
            this.props.onSort(field);
        }
    }

    onPrevPage() {
        console.log("Previous page");
    }

    onNextPage() {
        console.log("Next page");
    }
}