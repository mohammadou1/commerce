# NextJS WooCommerce Provider

A NextJS provider that supports integrating your next commerce site with WooCommerce.
Pull requests are welcome

Note that this provider is going to be merged into next commerce main repo when it's done
[Next Commerce](https://github.com/vercel/commerce)

> The provider will start development phase as soon as next/commerce supports woocommerce difficulties
## Roadmap.

- [ ] next/commerce supporting WooCommerce data structure
- [ ] rebuilding config, WooCommerceProvider and settings
- [ ] useProducts hooks
- [ ] useLogin, useSignup and useCustomer
- [ ] useCart hooks
- [ ] useCheckout hooks
- [ ] normalize data to the unified version


<br />
Notice that the current goal is to finish GraphQL apis then do rest apis, prs to do both are welcome
<br />
<br />

>> Since WooCommerce doesn't have an integrated whishlist and cart apis, only order is supported so far

<br />
in order to run it in your localhost, you have to clone this repo and use the branch ```
feature/woocommerce```

create a ``` .env.local ``` file and copy ```.env.example ``` and paste your API keys for WooCommerce

the folder structure should follow NextJS Commerce as much as possible (differs only when the functionality requires that)
