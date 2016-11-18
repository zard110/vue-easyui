<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="north" :size="248" :split="true" :collapsible="true">north</ce-layout-panel>
    <ce-layout-panel region="south" :size="148" :split="true" :collapsible="true">south</ce-layout-panel>
    <ce-layout-panel region="west" :size="320"  :split="true" :collapsible="true" :collapsedSize="100" title="Menu">menu</ce-layout-panel>
    <ce-layout-panel region="east" :size="200"  :split="true" :collapsible="true">east</ce-layout-panel>
    <ce-layout-panel region="center" title="Container">

      <ce-layout id="child">

        <ce-layout-panel region="south" :size="200"  :split="true"  :collapsible="true">child south</ce-layout-panel>
        <ce-layout-panel region="north" :size="120"  :split="true"  :collapsible="true">child north</ce-layout-panel>
        <ce-layout-panel region="east"  :size="320"  :split="true"  :collapsible="true">child east</ce-layout-panel>
        <ce-layout-panel region="west"  :size="220"  :split="true"  :collapsible="true">child west</ce-layout-panel>
        <ce-layout-panel region="center">ABC</ce-layout-panel>

      </ce-layout>

    </ce-layout-panel>
  </ce-layout>
</template>
