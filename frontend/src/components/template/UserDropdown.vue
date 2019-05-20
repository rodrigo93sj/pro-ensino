<template>
    <div class="user-dropdown" v-if="user">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <a href="#"><i class="fas fa-cog"></i>Administração</a>
            <a href @click.prevent="logout"><i class="fas fa-sign-out-alt"></i>Sair</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
import { userKey } from '@/global'

export default {
    name: 'userDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth'})
            this.$store.state.user = null
            this.$store.state.sidebarOpen = null
        }
    }
}
</script>
    
<style>
    .user-dropdown {
        height: 100%;
        position: relative;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 50px;
        padding: 0 20px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.1)
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        visibility: hidden;
        opacity: 0;
        transition: all 0.5s ease-in-out; 
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #666666;
        padding: 10px;
        font-size: 1rem;
    }

    .user-dropdown-content a:hover {
        text-decoration: none;
    }

    .user-dropdown-content a i {
        margin-right: 10px;
    }
</style>
