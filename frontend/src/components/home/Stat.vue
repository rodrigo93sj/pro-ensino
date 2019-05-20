<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color']
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
        display: flex;
        align-items: center;
        color: #fff;
    }

    .stat-icon i {
        font-size: 3rem;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 1.2rem;
        color: #fff;
    }

    .stat-value {
        font-size: 3rem;
        color: #fff;
    }
</style>
