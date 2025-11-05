function getComparer(key) {
  return (firstSkill, secondSkill) => {
    const firstValue = firstSkill[key];
    const secondValue = secondSkill[key];

    if (typeof firstValue === "string" && typeof secondValue === "string") {
      return firstValue.localeCompare(secondValue);
    }

    if (firstValue > secondValue) {
      return 1;
    }

    if (firstValue < secondValue) {
      return -1;
    }

    return 0;
  };
}

const skills = {
  data: [
    { name: "html", level: 40, icon: "skills/html.svg" },
    { name: "css", level: 40, icon: "skills/css.svg" },
    { name: "python", level: 65, icon: "skills/python.svg" },
    { name: "javascript", level: 50, icon: "skills/javascript.svg" },
    { name: "typescript", level: 70, icon: "skills/typescript.svg" },
    { name: "c++", level: 80, icon: "skills/c++.svg" }
  ],
  sortMode: null,
  listElement: null,
  
  generateList(parentElement) {
    if (!parentElement) {
      return;
    }

    this.listElement = parentElement;
    parentElement.innerHTML = "";

    this.data.forEach((skill) => {
      const term = document.createElement("dt");
      term.classList.add("skill-item");
      term.textContent = skill.name;
      term.style.backgroundImage = `url("img/${skill.icon}")`;

      const definition = document.createElement("dd");
      definition.classList.add("skill-level");

      const progress = document.createElement("div");
      progress.style.width = `${skill.level}%`;

      definition.append(progress);
      parentElement.append(term, definition);
    });
  },
  
  sortList(type) {
    if (!this.listElement) {
      return;
    }

    if (this.sortMode !== type) {
      this.data.sort(getComparer(type));
      this.sortMode = type;

    } else {
      this.data.reverse();
    }

    this.generateList(this.listElement);
  }
};

const skillList = document.querySelector(".skill-list");
skills.generateList(skillList);

const skillsSortControls = document.querySelector(".skills-sort");

if (skillsSortControls) {
  skillsSortControls.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.nodeName !== "BUTTON") {
      return;
    }

    const sortType = target.dataset.sortType;

    switch (sortType) {
      case "name":
        skills.sortList("name");
        break;
      case "level":
        skills.sortList("level");
        break;
      default:
        break;
    }
  });
}

const menu = {
  navElement: document.querySelector(".main-nav"),
  buttonElement: document.querySelector(".nav-btn"),

  open() {
    if (!this.navElement || !this.buttonElement) {
      return;
    }

    this.navElement.classList.remove("main-nav_closed");
    this.buttonElement.classList.remove("nav-btn_open");
    this.buttonElement.classList.add("nav-btn_close");

    const buttonText = this.buttonElement.querySelector(".visually-hidden");
    if (buttonText) {
      buttonText.textContent = "Закрыть меню";
    }
  },

  close() {
    if (!this.navElement || !this.buttonElement) {
      return;
    }

    this.navElement.classList.add("main-nav_closed");
    this.buttonElement.classList.add("nav-btn_open");
    this.buttonElement.classList.remove("nav-btn_close");

    const buttonText = this.buttonElement.querySelector(".visually-hidden");
    if (buttonText) {
      buttonText.textContent = "Открыть меню";
    }
  },

  toggle() {
    if (!this.navElement) {
      return;
    }

    if (this.navElement.classList.contains("main-nav_closed")) {
      this.open();
    } else {
      this.close();
    }
  }
};

menu.close();

if (menu.buttonElement) {
  menu.buttonElement.addEventListener("click", () => {
    menu.toggle();
  });
}
