<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="north" :size="248" :split="true" :collapsible="true"></ce-layout-panel>
    <ce-layout-panel region="south" :size="148" :split="true" :collapsible="true">south</ce-layout-panel>
    <ce-layout-panel region="west" :size="220"  :split="true" :collapsible="true" :collapsedSize="100" title="Menu"></ce-layout-panel>
    <ce-layout-panel region="east" :size="400"  :split="true" :collapsible="true"></ce-layout-panel>
    <ce-layout-panel region="center" title="Container">
      <ce-layout id="child">
        <ce-layout-panel region="south" :size="200"  :split="true"  :collapsible="true"></ce-layout-panel>
        <ce-layout-panel region="north" :size="120"  :split="true"  :collapsible="true"></ce-layout-panel>
        <ce-layout-panel region="east"  :size="320"  :split="true"  :collapsible="true"></ce-layout-panel>
        <ce-layout-panel region="west"  :size="220"  :split="true"  :collapsible="true"></ce-layout-panel>
        <ce-layout-panel region="center"></ce-layout-panel>
      </ce-layout>
    </ce-layout-panel>
  </ce-layout>
</template>
