<template>
    <div>
<body>
    <div class="wrapper">
        <Sidebar2/>
        <Alert></Alert>
        <div class="main-panel">
            <Navbar2></Navbar2>
            <div class="content">
                <router-view></router-view>
            </div>        
        </div>     
    </div>
</body> 
</div>
</template>

<script>
import Sidebar2 from "./Sidebar2";
import Navbar2 from "./Navbar2";
import Alert from "./AlertMessage";

export default {
components: {
    Sidebar2,
    Navbar2,
    Alert,
},
};
</script>

<style lang="scss" scoped>
@import "../assets/demo";
@import "../assets/light-bootstrap-dashboard";
</style>
