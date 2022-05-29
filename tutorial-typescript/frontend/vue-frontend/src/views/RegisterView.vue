<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <div class="control">
              <input
                type="text"
                class="input"
                v-model="username"
                placeholder="Username"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                type="password"
                class="input"
                v-model="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                type="password"
                class="input"
                v-model="password2"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div class="notification is-danger mt-4" v-show="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

          <hr />

          Or <router-link to="/login">click here</router-link> to log in!
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { register } from "@/api";
import { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { Vue } from "vue-class-component";

export default class RegisterView extends Vue {
  username: string = "";
  password: string = "";
  password2: string = "";
  errors: string[] = [];

  created() {
    // set page title
    document.title = "Sign up | Djackets";
  }

  onSubmit() {
    this.validateForm();

    if (!this.errors.length) {
      const form = {
        username: this.username,
        password: this.password,
      };

      register(form)
        .then(() => {
          toast({
            message: "Account created successfully. Please log in.",
            type: "is-success",
          });
          this.$router.push({ name: "login" });
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 400) {
            const errorResponse = error.response?.data as {
              detail: {
                [key: string]: string[];
              };
            };
            Object.keys(errorResponse.detail).map((property) => {
              errorResponse.detail[property].map((errorMessage) =>
                this.errors.push(`${property}: ${errorMessage}`)
              );
            });
          }
        });
    }
  }

  validateForm() {
    this.errors = [];

    if (this.username === "") {
      this.errors.push("Username is missing!");
    }

    if (this.password === "") {
      this.errors.push("Password is missing!");
    }

    if (this.password2 !== this.password) {
      this.errors.push("Passwords do not match!");
    }
  }
}
</script>

<style>
</style>