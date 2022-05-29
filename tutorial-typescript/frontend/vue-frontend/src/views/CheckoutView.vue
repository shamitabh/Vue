<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <CheckoutItem
              v-for="item in cart.items"
              :key="item.product.id"
              :item="item"
            />
          </tbody>
          <tfoot>
            <td colspan="2">Total</td>
            <td>{{ cartTotalLength }}</td>
            <td>{{ cartTotalPrice.toFixed(2) }}</td>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Shipping details</h2>
        <p class="has-text-grey mb-4">*All fields are required</p>
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="firstName"
                  placeholder="First name*"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="lastName"
                  placeholder="Last name*"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  type="email"
                  class="input"
                  v-model="email"
                  placeholder="Email address*"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="phone"
                  placeholder="Phone number*"
                />
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="address"
                  placeholder="Address*"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="zipcode"
                  placeholder="Zipcode*"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="place"
                  placeholder="Place*"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="notification is-danger mt-4" v-show="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <hr />

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength">
          <hr />

          <button @click="onSubmit" class="button is-dark">
            Pay with Stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CheckoutItem from "@/components/CheckoutItem.vue";
import { cartType, orderItemType, orderType } from "@/interfaces";
import { AxiosError } from "axios";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const cart = namespace("cart");

@Options({
  components: {
    CheckoutItem,
  },
})
export default class CheckoutView extends Vue {
  @cart.State cart!: cartType;
  @cart.Action checkout!: (form: orderType) => Promise<void>;
  @cart.Getter cartTotalLength!: number;
  @cart.Getter cartTotalPrice!: number;
  stripe: any = {};
  card: any = {};
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";
  address: string = "";
  zipcode: string = "";
  place: string = "";
  errors: string[] = [];

  created() {
    // add title
    document.title = "Checkout | Djackets";
  }

  mounted() {
    // stripe
    this.setStripeCard();

    // mount the custom UI of stripe only after the entire DOM is mounted
    (this.card as stripe.elements.Element).mount("#card-element");
  }

  onSubmit() {
    this.validateForm();

    if (!this.errors.length) {
      this.createStripe();
    }
  }

  setStripeCard() {
    if (this.cartTotalLength > 0) {
      this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISH_KEY);
      const element = (this.stripe as stripe.Stripe).elements();
      this.card = element.create("card", { hidePostalCode: true });
    }
  }

  createStripe() {
    (this.stripe as stripe.Stripe)
      .createToken(this.card)
      .then((result: any) => {
        if (result.error) {
          this.errors.push(
            "Something went wrong with Stripe. Please try again."
          );
        } else {
          this.stripeTokenHandler(result.token);
        }
      });
  }

  stripeTokenHandler(token: any) {
    const items: orderItemType[] = [];

    this.cart.items.map((item) => {
      let temp = {
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price! * item.quantity,
      };
      items.push(temp);
    });

    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      address: this.address,
      zipcode: this.zipcode,
      place: this.place,
      phone: this.phone,
      items: items,
      stripe_token: token.id,
    };

    this.checkout(data)
      .then(() => {
        this.$router.push({ name: "success" });
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

  validateForm() {
    this.errors = [];

    if (this.firstName === "") {
      this.errors.push("First name is missing!");
    }

    if (this.lastName === "") {
      this.errors.push("Last name is missing!");
    }

    if (this.email === "") {
      this.errors.push("Email address is missing!");
    }

    if (this.phone === "") {
      this.errors.push("Phone number is missing!");
    }

    if (this.address === "") {
      this.errors.push("Address is missing!");
    }

    if (this.zipcode === "") {
      this.errors.push("Zipcode is missing!");
    }

    if (this.place === "") {
      this.errors.push("Place is missing!");
    }
  }
}
</script>

<style>
</style>