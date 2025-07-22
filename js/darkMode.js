const toggleDarkModeButton = document.getElementsByClassName("toggleDarkMode")[0];

export function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", localStorage.getItem("darkMode")==="true"?false:true);
}

export function checkDarkMode(){
    localStorage.getItem("darkMode")===null?localStorage.setItem("darkMode", false):null;
    localStorage.getItem("darkMode")==="true"?document.body.classList.toggle("dark-mode"):null;
}

toggleDarkModeButton.addEventListener("click", toggleDarkMode);
