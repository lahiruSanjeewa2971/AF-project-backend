const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

//lahiru added to file upload
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
require("dotenv").config();

const PORT = process.env.PORT || 8070;
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true
}))

//cookie-parser is parse the Cookie header and handle cookie separation and encoding, maybe even decrypt it
app.use(cookieParser())

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/researcherRoute'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/workshopRouter'))

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log('Mongodb connected..!');
})

const messageRouter = require('./routes/message.js');
app.use("/message", messageRouter);

const EditorDashboardWorkshop = require('./routes/EditorDashboardWorkshop.js');
app.use("/workshop", EditorDashboardWorkshop);

const conferenceRouter = require('./routes/conference.js');
app.use("/conferences", conferenceRouter);

const adminConferenceRouter = require('./routes/adminConferenceView.js');
app.use("/adminConference", adminConferenceRouter);

const Editormodel = require('./routes/editoRoute.js');
app.use('/users', Editormodel);

const WorkshopsRouter = require('./routes/EditorDashboardWorkshop.js');
app.use('/workshops', WorkshopsRouter);

const editorConferenceRouter = require('./routes/editorConference.js');
app.use('/editorConference', editorConferenceRouter);

const editorDisplayUserRouter = require('./routes/EditorDisplayUsers');
app.use('/usersDisplayEditor', editorDisplayUserRouter);

//AdminShowAllWorkshopsRouter adminDashboardWorkshopRouter
const adminDashboardWorkshopRouter = require('./routes/AdminDashboardWorkshops.js');
app.use('/adminDashboardViewWorkshops', adminDashboardWorkshopRouter);

//tempary user handling router
const tempUsersViewRouter = require('./routes/tempUsersView');
app.use('/tempuser', tempUsersViewRouter);

//route for manage researchers for editor and admin
const manageResearchersRouter = require('./routes/manageResearchers.js');
app.use('/manageResearchers', manageResearchersRouter);


const reviewerWorkshopRouter = require('./routes/reviewerWorkshopRouter.js');
app.use("/workshopsReviewer", reviewerWorkshopRouter);

const ReviewerResearchRouter = require('./routes/ReviewerResearchRouter');
app.use("/researchers", ReviewerResearchRouter);

app.listen(PORT, ()=>{
    console.log('Server is up and running on :', PORT)
})