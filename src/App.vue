<template>
    <div id="app">
        <view-styles></view-styles>
        <router-view></router-view>
    </div>
</template>

<script>
    import ViewStyles from './ViewStyles'

    export default {
        name: 'app',
        components: { ViewStyles: ViewStyles }
    }
</script>

<style>
    html,
    body,
    #app {
        height: 100%;
    }

    body {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        margin: 0;
        overflow: auto;
    }
</style>

<style scoped>
    #app>>>.el-table__header-wrapper th {
        /* 所有表头的背景色 */
        background-color: #F5F7FA;
    }
</style>