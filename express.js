const express = require("express");
const app = express();

const a = (req, res,next) => {
    console.log("this first middleware will run on over request")

    next();
};
    app.use(a)

app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

app.get("/about",(req, res) => {
     res.send("aboutpage");
});


app.get("/api/data",(req, res) => {
    res.json({
        message:"data received",
        data:req.body,
    });
    });

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
  ];
  res.json(products);
});


app.get("/products/:productId", (req, res) => {
  console.log("request params", req.params);


  const productId = parseInt(req.params.productId);
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
  ];

  const getSingleProduct = products.find((product) => product.id === productId);

  if (getSingleProduct) {
    res.json(getSingleProduct);
  } else {
    res.status(404).send("product is not found! please try with different id");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});