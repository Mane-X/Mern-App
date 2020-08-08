const PORT = process.env.PORT || 5050;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

// Make use of .env for config
require('dotenv').config(); 
// Init Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend/build")));
// App middlewear
app.use(express.json()) // enable this to recieve JSON data from client
app.use(morgan('dev')) // visualize api requests
app.use(cors());

// Connect to MongoDb
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected ...'))
    .catch(err => console.log('DB CONNECTION ERROR', err))

// Import Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');
const carRoutes = require('./routes/cars.routes');

// Use Routes middleware
app.use('/api', authRoutes);
app.use("/api", carRoutes);
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "build", "index.html")
		);
	});
}
// Establish Port
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))