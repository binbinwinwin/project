<template>        
            <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#pablo" @click.prevent="signout">
                                    <span class="no-icon"><i class="fas fa-sign-out-alt">登出</i></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>       
</template>
<style lang="scss" scoped>
@import "../assets/demo";
@import "../assets/light-bootstrap-dashboard";
</style>

<script>
export default {
name:'Navbar',
methods:{
    signout(){
    const api = `${process.env.APIPATH}logout`;
    const vm = this;
    this.$http.post(api).then((response)=> {
        console.log(response.data);
        if(response.data.success){
        vm.$router.push('/login');
        }
    });
    }
}
}
</script>
