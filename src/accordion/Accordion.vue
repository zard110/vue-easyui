<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="north" :size="48">north</ce-layout-panel>
    <ce-layout-panel region="west" :size="320"  :split="true" :collapsible="true" title="Menu">

      <ce-accordion>

        <ce-panel title="111">111</ce-panel>
        <ce-panel title="222">222</ce-panel>
        <ce-panel title="333">333</ce-panel>


      </ce-accordion>

    </ce-layout-panel>
    <ce-layout-panel region="center" title="Container"></ce-layout-panel>
  </ce-layout>
</template>
