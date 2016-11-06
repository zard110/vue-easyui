<template>
  <ce-layout>
    <ce-layout-panel slot="north" region="north" :size="64">north</ce-layout-panel>
    <ce-layout-panel slot="south" region="south" :size="64">south</ce-layout-panel>
    <ce-layout-panel slot="west" region="west" :size="200">west</ce-layout-panel>
    <ce-layout-panel slot="east" region="east" :size="200">east</ce-layout-panel>
    <ce-layout-panel slot="center" region="center">
      <p style="font-size:14px">jQuery EasyUI framework helps you build your web pages easily.</p>
      <ul>
        <li>easyui is a collection of user-interface plugin based on jQuery.</li>
        <li>easyui provides essential functionality for building modem, interactive, javascript applications.</li>
        <li>using easyui you don't need to write many javascript code, you usually defines user-interface by writing some HTML markup.</li>
        <li>complete framework for HTML5 web page.</li>
        <li>easyui save your time and scales while developing your products.</li>
        <li>easyui is very easy but powerful.</li>
      </ul>
    </ce-layout-panel>
  </ce-layout>
</template>

<style>

  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

</style>

<script>
  export default {

  }
</script>
