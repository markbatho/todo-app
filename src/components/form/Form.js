import BaseComponent from "../BaseComponent";
import FormField from "./FormField";

class Form extends BaseComponent {
  constructor(parent, formTitle, fields = []) {
    super(parent);
    this.formTitle = formTitle;
    this.fields = fields;
    this.data = {};
    this.render();
  }

  render() {
    super.clean();
    const form = document.createElement("form");
    const submit = document.createElement("button");
    const h2 = document.createElement("h2");

    h2.textContent = this.formTitle;
    submit.textContent = "Submit";

    form.appendChild(h2);

    this.fields.forEach((field) => {
      const formField = new FormField(
        form,
        field.title,
        field.id,
        field.name,
        field.type,
        field.value,
        field.options
      );

      this.data[formField.name] = formField.value;
      formField.htmlElem.onchange = () => {
        this.data[formField.name] = formField.value;
      };
    });

    form.appendChild(submit);

    this.htmlElem = form;
    this.parent.appendChild(form);
  }
}

export default Form;
