const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: [],
      categorias: [],
      valorSearch: "",
      categoriaSeleccionada: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        let categoriasRepetidas = this.eventos.map((evento) => evento.category);
        this.categorias = Array.from(new Set(categoriasRepetidas));
      })
      .catch((error) => console.log(error));
  },
  methods: {
    filtrar() {
      this.categorias.filter((categoria) => {
         return categoria.name
          .toLowerCase()
          .startsWith(this.valorSearch.toLowerCase()) &&
          (this.categoriaSeleccionada.includes(categoria.category) ||
            this.categoriaSeleccionada.length == 0);
      });
      console.log(this.valorSearch);
      console.log(this.categoriaSeleccionada);
    },
  },
};
const app = createApp(options);
app.mount("#app");
