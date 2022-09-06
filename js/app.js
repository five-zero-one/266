/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

const sections = document.querySelectorAll("section");
const ul = document.getElementById("navbar__list");
const form = document.getElementById("subscribe");

const VALUE = 150;

// build the nav

ul.append(...[...sections].map(createLink));

// add event listeners

document.addEventListener("scroll", makeActive);
document.addEventListener("click", onClick);

form.addEventListener("submit", e => { e.preventDefault(); new FormData(form); });
form.addEventListener("formdata", ({ formData }) => alert(`Thank you ${formData.get("name")} for signing up with ${formData.get("email")}`));

// Scroll to section

function onClick(e) {
    const { target: el } = e;
    switch (el.tagName.toLowerCase()) {
        case "a":
            e.preventDefault();
            return navToSection(el);
    }
}

function navToSection(el) {
    document
        .getElementById(el.dataset.section)
        .scrollIntoView({ behavior: "smooth" });

    document.getElementById("navbar__list").style.display = "none";
    console.log(document.getElementById("navbar__list"));
}

// Add class 'active' to section when near top of viewport

function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        const a = ul.querySelector(`[data-section="${section.id}"]`);

        //Find a value that works best, but 150 seems to be a good start.
        if (box.top <= VALUE && box.bottom >= VALUE) {
            //apply active state on current section and corresponding Nav link
            section.classList.add("active--section");
            a.classList.add("active--link");

        } else {
            //Remove active state from other section and corresponding Nav link
            section.classList.remove("active--section");
            a.classList.remove("active--link");
        }
    }
}

// Create nav link that will be appended to the nav list

function createLink(section, i) {
    const [a, li] = [document.createElement("a"), document.createElement("li")];

    a.classList.add("menu__link");
    a.innerHTML = section.dataset.nav;
    a.dataset.section = section.id;
    a.dataset.position = `${++i}`;

    li.appendChild(a);

    return li;
};
