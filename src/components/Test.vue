<template>
  <div>
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
    />
    <div v-for="(message, index) in messages" :key="index">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TestPage',
  data() {
    return {
      userInput: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post(
          "https://dialogflow.googleapis.com/v2/projects/shopbuyphone-xtvq/agent/sessions/123456:detectIntent",
          {
            queryInput: {
              text: {
                text: this.userInput,
                languageCode: "en-US",
              },
            },
          },
          
        );
        this.messages.push(response.data.queryResult.fulfillmentText);
        this.userInput = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>
