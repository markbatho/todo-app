import BaseComponent from "../BaseComponent";

class FormField extends BaseComponent {
  constructor(parent, title, id, name, type, value, options = {}) {
    super(parent);
    this.title = title;
    this.id = id;
    this.name = name;
    this.type = type;
    this.value = value;
    this.options = options;
    this.render();
  }

  render() {
    super.clean();
    const formField = document.createElement("div");
    const label = document.createElement("label");

    formField.appendChild(label);
    formField.classList.add("form-field");

    if (this.type === "selection") {
      label.htmlFor = this.id;
      label.textContent = this.title;

      const select = document.createElement("select");
      select.required = true;
      select.id = this.id;
      select.name = this.name;

      Object.keys(this.options).forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.label = priority;

        if (this.value) {
          if (priority === this.value.value) {
            option.selected = true;
          }
        }

        select.appendChild(option);
      });

      this.value = this.options[select.value];
      select.onchange = () => {
        this.value = this.options[select.value];
      };

      formField.appendChild(select);
    } else {
      const input = document.createElement("input");

      label.htmlFor = this.id;
      label.textContent = this.title;

      input.required = true;
      input.id = this.id;
      input.name = this.name;
      input.type = this.type;
      input.value = this.value;

      if (this.type === "date") {
        if (this.value) {
          input.valueAsDate = new Date(this.value);
        }
      }

      input.onchange = () => {
        this.value = input.value;
      };

      formField.appendChild(input);
    }

    this.htmlElem = formField;
    this.parent.appendChild(formField);
  }
}

export default FormField;
