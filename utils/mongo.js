import mongoose from "mongoose";
mongoose.connect("mongodb+srv://abduhamidbotirovweb:abduhamidjon707@cluster0.ab9kvno.mongodb.net/restourant?retryWrites=true&w=majority").then(() => {
  console.log("connection");
});

// users.
// find() 
//   .where("sport")
//   .equals("Tennis")
//   .where("age")
//   .gt(17)
//   .lt(50) //Дополнительное условие
//   .limit(5)
//   .sort({ age: -1 })
//   .select("name age")
//   .exec(callback);
// users.find({},{name:1})
// users.find({$or:[{age:30},{age:25}]},{name:1})
// users.find({$or:[{$gte:{age:20}},{age:25}]}) 
// users.find({ father: { $exists: true } });
// users.find({language:{$size:2}});
// users.find({language.1:'Uz');
// users.set('language.1.body', 'new comment');
// users.find({ name: "Ali" }).sort({ _id: -1 }).skip(5).limit(10)
// db.stats()
// users.bulkWrite([
//   { insertOne: { document: { name: "ohunjon" } } },
//   { updateOne: { filter: { name: "ohunjon" }, update: { $set: { age: 25 } } } },
// ]);
// users.createIndex({ comment: "text" });
// users.find({ $text: { $search:  "salom"  } });
// users.find({ $text: { $search:  "salom"  } },{score:{$meta:"textScore"}});
// users.find({ $text: { $search:  "salom"  } },{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}});
// users.createIndex({name:1})
// users.createIndex({name:-1})

// {
//   type: Number,
//   max: 23,
//   min:10,
//   default:20
// }
// {
//   type: String,
//
//   default:20
// }
// {
//   timestamps: {
//     createAt:'create_at'
//   }
// }