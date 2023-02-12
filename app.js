const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const productRouter=require('./src/routes/productRouter')
const registerRouter=require('./src/routes/registation')
const loginRouter=require('./src/routes/loginRouter')
const cartRouter=require('./src/routes/cartRouter')
const checkoutRouter=require('./src/routes/checkoutrouter')

app.set(express.static('./public'))
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/product',productRouter)
app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/cart',cartRouter)
app.use('/checkout',checkoutRouter)

app.listen(3000)