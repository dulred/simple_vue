<template>
    <div class="home" id="main">
        home
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import * as echarts from 'echarts'
    onMounted(()=>{
        // Create the echarts instance
        var myChart = echarts.init(document.getElementById('main'));

        // Draw the chart
        myChart.setOption({
        title: {
            text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        xAxis: {
            data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
        },
        yAxis: {},
        series: [
            {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
            }
        ]
        });
    })
</script>

<style scoped lang="scss">
    #main{
        width:98%;
        height: calc(100vh - 100px);
        border:1px solid red;
    }
</style>