/* Rifare l’esercizio della to do list come fatto assieme in classe:
- stampare in pagina un item per ogni elemento contenuto in un array
- ogni item ha una “x” associata: cliccando su di essa, l’item viene rimosso dalla lista
- predisporre un input per aggiungere un nuovo item alla lista: digitando il tasto invio oppure ciccando su un pulsante, il testo digitato viene aggiunto alla lista */

Vue.config.devtools = true;

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      inputTask: "",
      tasksList: [],
      inputIsValid: true,
      invalidFeedback: "",
    },
    methods: {
      onClickAddTask() {
        taskIsDuplicate = this.tasksList.some(
          (el) => el.toLowerCase() === this.inputTask.toLowerCase()
        );
        if (this.inputTask && !taskIsDuplicate) {
          this.tasksList.push(this.inputTask);
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
