class TypeWriter {
  constructor(txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = parseInt(wait, 10);

    this.txt = "";
    this.wordIndex = 0;
    this.numWords = words.length;
    this.isDeleting = false;

    this.type();
  }

  type() {
    const current = this.wordIndex % this.numWords;
    const currentWord = this.words[current];

    // Set initial typing speed, speed up deletion when fully typed.
    let typeSpeed = 50;

    // Add or remove characters, depending on whether or not word has been typed.
    if (this.isDeleting) {
      this.txt = currentWord.substring(0, this.txt.length - 1);
      typeSpeed = 25;
    } else {
      this.txt = currentWord.substring(0, this.txt.length + 1);
    }

    // Check if word is fully typed.
    if (!this.isDeleting && this.txt === currentWord) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    // Check is word is fully deleted.
    else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 50;
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    setTimeout(() => this.type(), typeSpeed);
  }
}

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}

document.addEventListener("DOMContentLoaded", init);
