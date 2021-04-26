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
            type:String,
            require: true
        },
        PublicPaste:{
            type:String,
            required: true
        },
        PrivatePaste:{
            type:String,
            required: true
        },
        TotalPaste:{
            type:String,
            required: true
        }

    }
}
</script>

<style>

</style>