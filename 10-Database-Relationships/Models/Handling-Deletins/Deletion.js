const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ✅ Db connection

mongoose.connect('mongodb://127.0.0.1:27017/Relationship')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
 
//✅ Create Order schema
const ordersSchema = new Schema({
    product_name : String,
    price : Number,
    quantity : Number
});

//✅  Create customer schema
const customerSchema = new Schema({
    name : String,
    // this is the way we can refernce to other schema 
    orders : [{
        // yaha hm bta rhe type kisi doosre schema ki id hai
        type : Schema.Types.ObjectId,
        ref : "Order"
    },]
});

// ✅ Query Middleware => after the deleting customers we have to delete all its orders 
customerSchema.post("findOneAndDelete", async(customer)=>
{
    if( customer.orders.length > 0 )
    {
        let res = await Order.deleteMany({ _id : {$in: customer.orders}})

        console.log("Orders deleted successfully \n",res);
    }
})

customerSchema.pre("findOneAndDelete", async(customer)=>{
    console.log('pre middeware')
})

//✅ Create Order model
const Order = mongoose.model('Order',ordersSchema);

//✅  Create Customer model
const Customer = mongoose.model('Customer',customerSchema);

let createOrders = async()=>{

    let products = [
        { 
            product_name : 'Laptop',
            price : 10000,
            quantity : 2
        },
        { 
            product_name : 'Mobile',
            price : 5000,
            quantity : 3
        },
        { 
            product_name : 'Tablet',
            price : 4000,
            quantity : 1
        },
        { 
            product_name : 'Headphones',
            price : 1500,
            quantity : 4
        }
    ];

    await Order.insertMany(products);
}

let createCostomer = async()=>{
    // await createOrders();

    let newCustomer = new Customer({
        name : "Ujjwal"
    });

    let order1 = await Order.findOne({product_name: "Tablet"});
    let order2 = await Order.findOne({product_name: "Mobile"});
    let order3 = await Order.findOne({product_name: "Laptop"});
    newCustomer.orders.push(order1 , order2 , order3);

    let res = await newCustomer.save();
    console.log(res);
}
// createCostomer();


//✅Deleting data from related data

let deleteCustomer = async()=>
{
    let customer = await Customer.findByIdAndDelete("673c4e009a300fb580820fcc");

    console.log("Customer is deleted Successfully \n",customer);
}
deleteCustomer();