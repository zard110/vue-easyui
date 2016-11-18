<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="north" :size="148" :collapsible="true">north</ce-layout-panel>
    <ce-layout-panel region="south" :size="148" :collapsible="true">south</ce-layout-panel>
    <ce-layout-panel region="west" :size="320" :split="true" title="Menu" :collapsible="true">menu</ce-layout-panel>
    <ce-layout-panel region="east" :size="200" :collapsible="true">east</ce-layout-panel>
    <ce-layout-panel region="center" title="Container">

      <ce-layout id="child">

        <ce-layout-panel region="south" :size="200" :collapsible="true">south</ce-layout-panel>
        <ce-layout-panel region="north" :size="120" :collapsible="true">north</ce-layout-panel>
        <ce-layout-panel region="east" :size="320" :collapsible="true">north</ce-layout-panel>
        <ce-layout-panel region="west" :size="220" :collapsible="true">south</ce-layout-panel>
        <ce-layout-panel region="center">ABC</ce-layout-panel>

      </ce-layout>

    </ce-layout-panel>
  </ce-layout>
</template>
