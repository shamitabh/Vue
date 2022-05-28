<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

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

          <div class="notification is-danger" v-show="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>

          <hr />

          Or <router-link to="/signup">click here</router-link> to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { authType } from "@/interfaces";
import { AxiosError } from "axios";
import { toast } from "bulma-toast";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const auth = namespace("auth");

@Options({
  watch: {
    isAuthenticated: {
      handler(newVal: boolean, _oldVal: boolean) {
        if (newVal) {
          this.$router.push(this.toPath);
        }
      },
      immediate: true,
    },
  },
})
export default class SigninView extends Vue {
  @auth.State isAuthenticated!: boolean;
  @auth.Action logIn!: (form: authType) => Promise<void>;
  username: string = "";
  password: string = "";
  errors: string[] = [];

  created() {
    // set page title
    document.title = "Log in | Djackets";
  }

  get toPath() {
    return this.$route.query.to || "/cart";
  }

  onSubmit() {
    this.validateForm();

    if (!this.errors.length) {
      const form = {
        username: this.username,
        password: this.password,
      };

      this.logIn(form)
        .then(() => {
          toast({
            message: `Welcome back <b>${this.username}</b>.`,
            type: "is-success",
          });
        })
        .catch((error: AxiosError) => {
          const errorResponse = error.response?.data as {
            [key: string]: string[];
          };
          Object.keys(errorResponse).map((property) => {
            errorResponse[property].map((errorMessage) =>
              property === "non_field_errors"
                ? this.errors.push(errorMessage)
                : this.errors.push(`${property}: ${errorMessage}`)
            );
          });
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
  }
}
</script>

<style>
</style>