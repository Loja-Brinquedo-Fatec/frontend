<template>
    <footer class="footer">
        <p>@Copyrtig</p>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Footer',
  });
  </script>
  
  <style scoped>
  .footer {
    background-color: #e7e5e5;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5dvh;
  }
  .link {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
  }
  </style>
  