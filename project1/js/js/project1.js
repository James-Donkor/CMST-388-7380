document.addEventListener('DOMContentLoaded', () => {
    
    /* PART 1: INTRO TEXT
    --------------------------------------------------
    */

    let name = "James Donkor";
    let age = 27;
    let isStudent = true;

    const introduction = (name, age, isStudent) => {

        let studentStatus = isStudent
            ? "I am currently a student."
            : "I am not a student.";

        let message = "Hello, my name is " + name + ". I am " + age + " years old and " + studentStatus;

        const messageDisplayArea = document.getElementById('messageDisplayArea');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageDisplayArea.appendChild(messageElement);
    };
    
    introduction(name, age, isStudent);

    /* PART 2: SELECTORS
    --------------------------------------------------
    */

    document.querySelector("#add-classes").addEventListener('click', () => {

        document.querySelector('.selector-examples li:first-child').classList.add('first');

        document.querySelectorAll('.selector-examples li:nth-child(odd)').forEach(el => {
            el.classList.add('odd');
        });

        document.querySelector('.selector-examples li:nth-child(4)').classList.add('highlighter');
        document.querySelector('.selector-examples li:nth-child(5)').classList.add('highlighter');

        document.querySelector('.selector-examples li:last-child').classList.add('last');
    });

    /* PART 3: REPLACEMENT TEXT
    --------------------------------------------------
    */

    document.querySelector("#change-language").addEventListener('click', () => {
        let inputValue = document.getElementById("newLanguage").value;
        let element = document.querySelector(".currentLanguage");
        element.innerHTML = inputValue;
    });

    /* PART 4: TOGGLES
    --------------------------------------------------
    */

    let boxColor = "rgb(153, 51, 51)";

    document.querySelector("#button_toggle_colors").addEventListener('click', () => {
        document.querySelectorAll(".box").forEach(box => {
            const currentColor = window.getComputedStyle(box).backgroundColor;

            if (currentColor === boxColor) {
                box.style.backgroundColor = "white";
            } else {
                box.style.backgroundColor = boxColor;
            }
        });
    });

    document.querySelector("#button_toggle_roundedges").addEventListener('click', () => {
        document.querySelectorAll(".box").forEach(box => {
            box.classList.toggle("round-edge");
        });
    });
});
