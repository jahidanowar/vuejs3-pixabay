const app = Vue.createApp({
  data() {
    return {
      api: "https://pixabay.com/api/?key=8684338-5ff3aaf5d8bea38de8c394feb",
      images: null,
      loading: false,
    };
  },
  // Vue Js Lifecycle hook: Get invoked when app is loaded
  mounted() {
    this.getImages();
  },
  methods: {
    getImages(key) {
      // If key has value then store it to query otherwise store an empty string
      const query = key ? `&q=${key}` : ``;
      // Sets loading value to true
      this.loading = true;
      // Making request to the REST API
      axios
        .get(this.api + query)
        .then((response) => {
          // Assigning server response data to images
          this.images = response.data.hits;
        })
        .catch((error) => console.log(error))
        .finally(() => {
          // Once the process is done sets the loading to false
          this.loading = false;
        });
    },
    searchImage(event) {
      // Assigns the input value to searchKey variable
      const searchKey = event.target.value;
      // If searchKey is empty then do nothing
      if (!searchKey && searchKey == "") return;
      // Else make the REST API call with searchKey
      this.getImages(searchKey);
    },
  },
});

// Mounting the app to id #app
app.mount("#app");
