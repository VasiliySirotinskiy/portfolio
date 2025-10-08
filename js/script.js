const skills = {
  data: [
    { title: "html", level: 40, icon: "skills/html.svg" },
    { title: "css", level: 40, icon: "skills/css.svg" },
    { title: "python", level: 65, icon: "skills/python.svg" },
    { title: "javascript", level: 50, icon: "skills/javascript.svg" },
    { title: "typescript", level: 70, icon: "skills/typescript.svg" },
    { title: "c++", level: 80, icon: "skills/c++.svg" }
  ],
  generateList(parentElement) {
    if (!parentElement) {
      return;
    }

    this.data.forEach((skill) => {
      const term = document.createElement("dt");
      term.classList.add("skill-item");
      term.textContent = skill.title;
      term.style.backgroundImage = `url("img/${skill.icon}")`;

      const definition = document.createElement("dd");
      definition.classList.add("skill-level");

      const progress = document.createElement("div");
      progress.style.width = `${skill.level}%`;

      definition.append(progress);
      parentElement.append(term, definition);
    });
  }
};

const skillList = document.querySelector(".skill-list");
skills.generateList(skillList);