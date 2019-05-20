<template>
    <div class="footer">
        <span><strong>Copyright © {{ year }}</strong></span>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data: function() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style>
    .footer {
        background-color: #fff;
        color: #444;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 15px 30px;
    }

    .footer span {
        font-size: 14px;
    }
</style>
