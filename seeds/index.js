const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const dbUrl =
	process.env.DB_URL ||
	"mongodb+srv://Durgesh:Durgesh516348@cluster0.iefxjnx.mongodb.net/?retryWrites=true&w=majority";
// 	.replace(
// 	"<password>",
// 	process.env.MONGO_ATLAS_PASSWORD
// );
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			//YOUR USER ID
			author: "653cb16bb882755390584895",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dttieobbt/image/upload/v1698481575/Yelpcamp/camp2_uwnsqb.jpg",
					filename: "YelpCamp/camp2_uwnsqb",
				},
				{
					url: "https://res.cloudinary.com/dttieobbt/image/upload/v1698481574/Yelpcamp/camp4_wcuhgs.jpg",
					filename: "YelpCamp/camp4_wcuhgs",
				},
				{
					url: "https://res.cloudinary.com/dttieobbt/image/upload/v1698481574/Yelpcamp/camp3_qm3fbq.jpg",
					filename: "YelpCamp/camp3_qm3fbq",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
