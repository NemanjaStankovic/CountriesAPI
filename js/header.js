class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="header">
      <p class="headerText">Where in the world?</p>
      <button class="toggleDarkMode">Dark Mode</button>
    </div> `
  }
}
customElements.define('main-header', Header);