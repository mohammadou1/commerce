# NextJS WooCommerce Provider

A NextJS provider that supports integrating your next commerce site with WooCommerce.
Pull requests are welcome

Note that this provider is going to be merged into next commerce main repo when it's done
[Next Commerce](https://github.com/vercel/commerce)

## Features.

- [x] getProducts
- [x] getProduct
- [ ] useSearch
- [ ] useLogin (Under development)
- [ ] useSignup (Under development)
- [ ] useCustomer (Under development)
- [x] useCart
- [ ] useCheckout
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
