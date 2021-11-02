/* Aggiungere la checkbox che indica un elemento come completato
Se un elemento è completato, mostrare il testo barrato
Nell’inserire un nuovo elemento nella lista, aggiungiamo la possibilità di impostare un colore per qull’elemento e di conseguenza, usiamo quel colore per colorare il bordo di sx dell’elemento.
Aggiungere un filtro che mostri solo gli elementi completati o solo gli elementi da completare
Aggiungere un filtro che permetta di cercare un elemento in base al testo, tenendo Comunque conto degli altri filtri esistenti */

Vue.config.devtools = true;

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      inputTask: "",
      inputColor: "#ff0000",
      tasksList: [
        {
          text: "Fare la spesa",
          checked: false,
          color: "#ff0000",
        },
        {
          text: "Giocare",
          checked: false,
          color: "#ff0000",
        },
        {
          text: "Mangiare",
          checked: false,
          color: "#ff0000",
        },
        {
          text: "Studiare",
          checked: false,
          color: "#ff0000",
        },
      ],
      inputIsValid: true,
      invalidFeedback: "",
    },
    methods: {
      createTask(inputText) {
        return {
          text: inputText,
          checked: false,
          color: this.inputColor,
        };
      },
      onClickAddTask() {
        inputText = this.inputTask.trim();
        taskIsDuplicate = this.tasksList.some(
          (el) => el.text.toLowerCase() === inputText.toLowerCase()
        );
        if (this.inputTask && !taskIsDuplicate) {
          this.tasksList.push(this.createTask(inputText));
          this.inputTask = "";
        } else {
          this.inputIsValid = false;
          this.invalidFeedback = taskIsDuplicate
            ? "Non è possibile aggiungere un task già esistente"
            : "Non è possibile aggiungere un task vuoto, scrivi qualcosa";
        }
      },
      onClickCloseTask(i) {
        this.tasksList.splice(i, 1);
      },
    },
  });
});
