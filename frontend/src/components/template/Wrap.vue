<template>
    <div class="wrap">
        <Sidebar />
        <Main />
    </div>
</template>

<script>
import Sidebar from './Sidebar'
import Main from './Main'

export default {
    name: 'Wrap',
    components: { Sidebar, Main }
}
</script>

<style>
    .wrap {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        position: relative;
        width: 100%;
        padding-top: 50px;
    }
</style>
