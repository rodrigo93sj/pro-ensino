<template>
    <div class="content">
        <!-- router-view: renderiza as rotas -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        background-color: #efefef;
        display: flex;
        flex-direction: column;
        padding: 20px;
        min-height: calc(100vh - 101px);
    }
</style>
