import BaseComponent from "../BaseComponent";
import FormField from "./FormField";

class Form extends BaseComponent {
  constructor(parent, parentObj, formTitle, fields = []) {
    super(parent);
    this.parentObj = parentObj;
    this.formTitle = formTitle;
    this.fields = fields;
    this.data = {};
    this.render();
  }

  render() {
    super.clean();
    const form = document.createElement("form");
    const formActions = document.createElement("div");
    const submit = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const h2 = document.createElement("h2");

    h2.textContent = this.formTitle;
    submit.textContent = "Submit";
    cancelBtn.textContent = "Cancel";

    formActions.appendChild(submit);
    formActions.appendChild(cancelBtn);
    formActions.classList.add("form-actions");

    cancelBtn.onclick = () => {
      this.parentObj.close();
    };

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

    form.appendChild(formActions);
    this.htmlElem = form;
    this.parent.appendChild(form);
  }
}

export default Form;
