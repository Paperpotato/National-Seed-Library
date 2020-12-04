<template>
  <div class="home">

    <SeedBank />
  </div>
</template>

<script>
// @ is an alias to /src
import SeedBank from "@/components/SeedBank.vue";

export default {
  name: "Home",
  components: {
    SeedBank,
  },
};
</script>
