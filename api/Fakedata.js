const Product = require("./models/Product");

const json=[
    {
        name:"apple",
        price:80000,
        description:"nice phone for rich poeple",
        ratings:5,
        category:"mobile",
        stock:10,
    },
    {
        name:"14 pro max",
        price:140000,
        description:"nice phone for rich people",
        ratings:4.5,
        category:"mobile",
        stock:8,
    },
    {
        name:"samsung s22 ultra",
        price:90000,
        description:"nice phone for tech people",
        ratings:5,
        category:"mobile",
        stock:10,
    },
    {
        name:"redmi",
        price:70000,
        description:"nice phone for heavy user",
        ratings:4,
        category:"mobile",
        stock:10,
    },
    {
        name:"motoG",
        price:40000,
        description:"nice phone for basic poeple",
        ratings:3,
        category:"mobile",
        stock:10,
    },
    {
        name:"apple",
        price:80000,
        description:"nice phone for rich poeple",
        ratings:5,
        category:"mobile",
        stock:10,
    },
    {
        name:"macbook",
        price:140000,
        description:"best laptop for programmer",
        ratings:5,
        category:"laptop",
        stock:10,
    },
    {
        name:"macbook m20",
        price:200000,
        description:"best laptop for programmer",
        ratings:4,
        category:"laptop",
        stock:10,
    },
    {
        name:"lenove",
        price:40000,
        description:"best laptop for programmer",
        ratings:3,
        category:"laptop",
        stock:10,
    },
    {
        name:"HP",
        price:50000,
        description:"best laptop for programmer",
        ratings:4,
        category:"laptop",
        stock:10,
    },
    {
        name:"think pad",
        price:70000,
        description:"best laptop for programmer",
        ratings:4,
        category:"laptop",
        stock:10,
    },
    {
        name:"asus",
        price:90000,
        description:"best laptop for programmer",
        ratings:4,
        category:"laptop",
        stock:10,
    },
    {
        name:"pants",
        price:2000,
        description:"nice material",
        ratings:4,
        category:"cloth",
        stock:10,
    },
    {
        name:"shirt",
        price:2500,
        description:"nice material",
        ratings:5,
        category:"cloth",
        stock:10,
    },
    {
        name:"jeans",
        price:5000,
        description:"nice material",
        ratings:5,
        category:"cloth",
        stock:10,
    },
    {
        name:"tie",
        price:2000,
        description:"nice material",
        ratings:4,
        category:"cloth",
        stock:10,
    },
    {
        name:"salwaar",
        price:2000,
        description:"nice material",
        ratings:4,
        category:"cloth",
        stock:10,
    },
    {
        name:"kameez",
        price:2500,
        description:"nice material",
        ratings:5,
        category:"cloth",
        stock:10,
    },
    {
        name:"coat",
        price:20000,
        description:"nice material",
        ratings:5,
        category:"cloth",
        stock:10,
    },

];

const creatInBulk=async (data)=>{
    try {
        const createAll=await Product.create(json);
    } catch (error) {
        console.log(error);
    }

}
const deleteInBulk=async (data)=>{
    try {
        const createAll=await Product.deleteMany({});
    } catch (error) {
        console.log(error);
    }

}
console.log("hi");

creatInBulk(json);

module.exports={json,creatInBulk,deleteInBulk};