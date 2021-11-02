/* Aggiungere la checkbox che indica un elemento come completato
Se un elemento è completato, mostrare il testo barrato
Nell’inserire un nuovo elemento nella lista, aggiungiamo la possibilità di impostare un colore per qull’elemento e di conseguenza, usiamo quel colore per colorare il bordo di sx dell’elemento.
Aggiungere un filtro che mostri solo gli elementi completati o solo gli elementi da completare
Aggiungere un filtro che permetta di cercare un elemento in base al testo, tenendo Comunque conto degli altri filtri esistenti */

Vue.config.devtools = true;

const tasks = [
  {
    text: "Fare la spesa",
    checked: false,
    tagIndex: 1,
    color: "#ff0000",
  },
  {
    text: "Giocare",
    checked: false,
    tagIndex: 1,
    color: "#ff0000",
  },
  {
    text: "Mangiare",
    checked: false,
    tagIndex: 1,
    color: "#ff0000",
  },
  {
    text: "Studiare",
    checked: false,
    tagIndex: 1,
    color: "#ff0000",
  },
];

const tags = [
  { id: 0, name: "All tags", color: "#6c757d" },
  { id: 1, name: "Lavoro", color: "#ff0000" },
  { id: 2, name: "Famiglia", color: "#00ff00" },
  { id: 3, name: "Tempo Libero", color: "#0000ff" },
];

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      tabs: ["Crea", "Filtra"],
      selectedTabIndex: 0,

      tasksList: [...tasks],
      tagsList: [...tags],

      inputTask: "",
      selectedTag: tags[0],
      inputIsValid: true,
      invalidFeedback: "",

      inputSearch: "",
      filteredList: [],
    },
    methods: {
      selectTab(tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.filterTasks();
      },
      isSelectedTab(tabIndex) {
        return this.selectedTabIndex === tabIndex;
      },

      createTask(inputText) {
        return {
          text: inputText,
          checked: false,
          tagIndex: this.selectedTag.id,
          color: this.selectedTag.color,
        };
      },
      onClickAddTask() {
        let inputText = this.inputTask.trim();

        taskIsDuplicate = this.tasksList.some(
          (el) =>
            el.text.toLowerCase() === inputText.toLowerCase() &&
            el.tagIndex === this.selectedTag.id
        );

        if (this.inputTask && !taskIsDuplicate && this.selectedTag.id !== 0) {
          this.tasksList.push(this.createTask(inputText));
          this.inputTask = "";
        } else {
          this.inputIsValid = false;
          this.invalidFeedback = taskIsDuplicate
            ? "Non è possibile aggiungere un task già esistente"
            : "Non è possibile aggiungere un task vuoto o senza tag";
        }
      },

      onClickCloseTask(i) {
        this.tasksList.splice(i, 1);
      },
      onClickCloseFilteredTask(i) {
        taskIndex = this.tasksList.indexOf(this.filteredList[i]);
        this.tasksList.splice(taskIndex, 1);
        this.filterTasks();
      },

      onClickSelectTag(index) {
        this.selectedTag = this.tagsList[index];
        this.inputIsValid = true;
      },
      onClickSelectFilterTag(index) {
        this.selectedTag = this.tagsList[index];
        console.log(this.selectedTag);
        this.filterTasks();
      },

      filterTasks() {
        this.filteredList = this.tasksList.filter((el) => {
          if (el.text.toLowerCase().includes(this.inputSearch.toLowerCase())) {
            return this.selectedTag.id === 0
              ? true
              : el.tagIndex === this.selectedTag.id;
          }
        });
      },
    },
  });
});

/*  */
