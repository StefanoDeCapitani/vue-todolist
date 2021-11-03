Vue.config.devtools = true;

const tasks = [
  {
    text: "Fare la spesa",
    checked: false,
    tagIndex: 1,
    color: "#008DD5",
  },
  {
    text: "Giocare",
    checked: false,
    tagIndex: 1,
    color: "#008DD5",
  },
  {
    text: "Mangiare",
    checked: false,
    tagIndex: 1,
    color: "#008DD5",
  },
  {
    text: "Studiare",
    checked: false,
    tagIndex: 1,
    color: "#008DD5",
  },
];

const tags = [
  { id: 0, name: "All tags", color: "#6c757d" },
  { id: 1, name: "Lavoro", color: "#008DD5" },
  { id: 2, name: "Famiglia", color: "#F56476" },
  { id: 3, name: "Tempo Libero", color: "#E43F6F" },
];

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      tabs: ["Crea", "Filtra"],
      selectedTabIndex: 0,

      tasksList: [...tasks],
      tagsList: [...tags],

      isNewTagCreated: false,
      newTagColor: "",
      newTagName: "",
      modalIsValid: true,
      modalInvalidFeedback: "",

      inputTask: "",
      selectedTag: tags[0],
      inputIsValid: true,
      invalidFeedback: "",

      inputSearch: "",
      isfilterOnlyChecked: false,
      filteredList: [],
    },
    mounted() {
      this.newTagColor = this.getRandomColor();
    },
    methods: {
      selectTab(tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.isfilterOnlyChecked = false;
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

        isTaskDuplicate = this.tasksList.some(
          (el) =>
            el.text.toLowerCase() === inputText.toLowerCase() &&
            el.tagIndex === this.selectedTag.id
        );

        if (this.inputTask && !isTaskDuplicate && this.selectedTag.id !== 0) {
          this.tasksList.push(this.createTask(inputText));
          this.inputTask = "";
        } else {
          this.inputIsValid = false;
          this.invalidFeedback = isTaskDuplicate
            ? "Non è possibile aggiungere un task già esistente"
            : "Non è possibile aggiungere un task vuoto o senza tag";
        }
      },

      createTag(text) {
        return {
          id: this.tagsList.length,
          name: text,
          color: this.newTagColor,
        };
      },
      onClickAddNewTag() {
        let newTagText = this.newTagName.trim();
        isTagDuplicate = this.tagsList.some(
          (el) => el.name.toLowerCase() === newTagText.toLowerCase()
        );

        if (this.newTagName && !isTagDuplicate) {
          this.tagsList.push(this.createTag(newTagText));
          this.newTagName = "";
        } else {
          this.modalIsValid = false;
          this.modalInvalidFeedback = isTagDuplicate
            ? "Non è possibile aggiungere un tag già esistente"
            : "Non è possibile aggiungere un tag senza nome";
        }
        this.isNewTagCreated = true;
      },

      getRandomColor() {
        let randomColor = "#";
        for (let i = 0; i < 3; i++) {
          randomColor += Math.round(Math.random() * 255).toString(16);
        }
        return randomColor;
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
        this.filterTasks();
      },

      filterTasks() {
        this.tasksList = [...this.tasksList].sort((el1, el2) => {
          if (el1.checked && !el2.checked) {
            return 1;
          }
          if (!el1.checked && el2.checked) {
            return -1;
          }
          return 0;
        });
        this.filteredList = this.tasksList.filter((el) => {
          if (el.text.toLowerCase().includes(this.inputSearch.toLowerCase())) {
            return this.selectedTag.id === 0
              ? true
              : el.tagIndex === this.selectedTag.id;
          }
        });
        if (this.isfilterOnlyChecked) {
          this.filteredList = this.filteredList.filter((el) => el.checked);
        }
      },
    },
    watch: {
      isfilterOnlyChecked: function () {
        this.filterTasks();
      },
    },
  });
});

/*  */
