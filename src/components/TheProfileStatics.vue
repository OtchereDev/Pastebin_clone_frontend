<template>
  <p>
        Total number of active pastes: {{ActivePaste}}<br>
        Number of public pastes: {{PublicPaste}}<br>
        Number of private pastes: {{PrivatePaste}}<br>
        Number of views of your Pastebin page: 10<br>
        Number of total views of all your active pastes: {{TotalPaste}}<br>
  </p>
</template>

<script>
export default {
    props:{
        ActivePaste:{
            type:Number,
            require: true,
            default:0
        },
        PublicPaste:{
            type:Number,
            required: true,
            default:0
        },
        PrivatePaste:{
            type:Number,
            required: true,
            default:0
        },
        TotalPaste:{
            type:Number,
            required: true,
            default:0
        }

    }
}
</script>

<style>

</style>