<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="south" :size="48"></ce-layout-panel>
    <ce-layout-panel region="west" :size="320" :split="true" title="Menu" :collapsible="true"></ce-layout-panel>
    <ce-layout-panel region="east" :size="200" :collapsible="true"></ce-layout-panel>
    <ce-layout-panel region="center" title="Container"></ce-layout-panel>
  </ce-layout>
</template>
