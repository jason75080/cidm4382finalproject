var mongoose = require('mongoose');
var connString = "mongodb://" + process.env.IP + ":27017/";
var readLine = require('readline');

// Menu System
var r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("Choose any of the jobs below.");
console.log("***Warning: you must run job #1 at least once before the others.***");
console.log("-------------------------------------------------------------------------");
console.log("Job #1: Create database, create collection, and add all students to it.");
console.log("Job #2: Display all students in the students collection.");
console.log("Job #3: Delete students collection in studentsdb database.");
console.log("-------------------------------------------------------------------------");

r1.question("Please enter the number of the job you would like to run: ", function(answer) 
{
    switch (parseInt(answer)) 
    {
        case 1:
            console.log("\nYou selected job #1");
            console.log();
            CreateDatabaseAndCollection();
            break;
        case 2:
            console.log("\nYou selected job #2");
            console.log();
            DisplayStudentsCollectionObjects();
            break;
        case 3:
            console.log("\nYou selected job #3");
            console.log();
            DeleteCollection();
            break;
    } // end switch
    r1.close();
}); // end r1.question



// Job #3
function DeleteCollection() 
{
    var dbName = "users";

    //connect
    var studentsdb = mongoose.connect(connString + dbName);

    //get the schema - notice how we use the export
    var studentSchema = require('./models/students_model.js').studentSchema;

    var Student = mongoose.model('Student', studentSchema);
    setTimeout(function() 
    {
        mongoose.disconnect();
    }, 5000);
    mongoose.connection.once('open', function() 
    {
        Student.find({}, function(err, docs) 
        {
            console.log("Before delete: ");
            for (var i in docs) 
            {
                console.log(docs[i].firstname);
            }
            var query = Student.remove();
            query.exec(function(err, results) 
            {
                console.log("\n%d Documents Deleted.", results);
                Student.find({}, function(err, docs) 
                {
                    console.log("\nAfter delete: ");
                    for (var i in docs) 
                    {
                        console.log(docs[i].firstname);
                    }
                    mongoose.disconnect();
                }); // end Students.find
            }); // end query.exec
        }); // end Students.find
    }); // end mongoose.connection
} // end DeleteCollection function


// Job #2
function DisplayStudentsCollectionObjects() 
{
    var dbName = "studentsdb";

    //connect
    var studentsdb = mongoose.connect(connString + dbName);

    //get the schema - notice how we use the export
    var studentsSchema = require('./students_schema.js').studentsSchema;

    var Students = mongoose.model('Students', studentsSchema);

    setTimeout(function() 
    {
        mongoose.disconnect();
    }, 5000);

    //again, once is the event-handling "hook" for when the database is opened
    mongoose.connection.once('open', function() 
    {
        console.log("\nThese are the student documents that exist right now.");
        var query = Students.find();
        query.exec(function(err, docs) 
        {
            for (var i in docs) 
            {
                console.log("ID Number: " + docs[i].idnumber);
                console.log("Name: " + docs[i].fullName());
                console.log("Hometown: " + docs[i].hometown);
                console.log("Classification: " + docs[i].classification);
                console.log("Assignments\n" +
                    "HW1: " + docs[i].assignments.hw1 + " " +
                    "HW2: " + docs[i].assignments.hw2 + " " +
                    "HW3: " + docs[i].assignments.hw3 + " " +
                    "HW4: " + docs[i].assignments.hw4 + " " +
                    "HW5: " + docs[i].assignments.hw5);
                console.log("Homework average: " + docs[i].average() + "\n");
            } // end for loop
        }); // end query.exec
    }); // end mongoose.connection
} // end DisplayStudentsCollectionObjects function


// Job #1
function CreateDatabaseAndCollection() 
{
    var dbName = "users";

    //connect
    var studentsdb = mongoose.connect(connString + dbName);

    //get the schema - notice how we use the export
    var studentSchema = require('./models/students_model.js').studentSchema;
    var studentEvent = require('./models/students_model.js').studentEvent;

    var Student = mongoose.model('Student', studentSchema);
    var StudentEvent = mongoose.model('StudentEvent', studentEvent);

    setTimeout(function() 
    {
        mongoose.disconnect();
    }, 5000);

    //again, once is the event-handling "hook" for when the database is opened
    mongoose.connection.once('open', function() 
    {

        var resume = new StudentEvent({

        name: "Uploaded Resume",
        type: "Resume",
        description: "Revision of resume uploaded."

        });

        var mockInterview = new StudentEvent({

        name: "Mock Interview 1",
        type: "mockInterview",
        description: "The student attended a mock interview session."

        });

        var interview = new StudentEvent({
        name: "Interview with IBM",
        type: "interview",
        description: "The student attended an interview with IBM."

        });


        var jobFair = new StudentEvent({
        name: "Career Fair 2014",
        type: "jobFair",
        description: "The student communicated with a few prospective employers."

        });

        //we create a new instance off the Model object
        var student001 = new Student(
        {
            idnumber: "1",
            firstname: "Jason",
            lastname: "Madison",
            phone: "2143549810",
            email: "jason75080@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "www.github.com/jason75080/cidm4382finalproject",
            linkedin: "linkedin.jason75080.com",
            events: [resume, interview]
        });
        
        var student002 = new Student(
        {
            idnumber: "2",
            firstname: "Secia",
            lastname: "Chase",
            phone: "2145556666",
            email: "secia@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/seciachase/cidm4382finalproject",
            linkedin: "linkedin.seciachase.com",
            events: [resume, mockInterview, jobFair]
        });
        
        var student003 = new Student(
        {
            idnumber: "3",
            firstname: "Mayra",
            lastname: "Gomez",
            phone: "8062211910",
            email: "mayrag006@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/mayra/cidm4382finalproject",
            linkedin: "linkedin.mayragomez.com",
            events: [resume, mockInterview, jobFair, interview]
        });
        
        var student004 = new Student(
        {
            idnumber: "4",
            firstname: "Lauren",
            lastname: "Alvarez",
            phone: "2146664499",
            email: "lauren@gmail.com",
            classification: "Junior",
            status: "Current",
            portfolio: "github.com/lauren/project",
            linkedin: "linkedin.laurenalvarez.com",
            events: [mockInterview]
        });
        
        var student005 = new Student(
        {
            idnumber: "5",
            firstname: "Anthony",
            lastname: "Petruccione",
            phone: "8065559321",
            email: "anthony@gmail.com",
            classification: "Sophomore",
            status: "Current",
            portfolio: "github.com/anthony/finalproject",
            linkedin: "linkedin.anthonyp.com",
            events: [resume, interview]
        });
        
        var student006 = new Student(
        {
            idnumber: "6",
            firstname: "Dustin",
            lastname: "Bell",
            phone: "9722387766",
            email: "dustin@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/dustin/finalproject",
            linkedin: "linkedin.dustinbell.com",
            events: [resume]
        });
        
        var student007 = new Student(
        {
            idnumber:"7",
            firstname: "Jordan",
            lastname: "Brittenham",
            phone: "8062569900",
            email: "jordan@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/jordan/finalproject",
            linkedin: "linkedin.jordanb.com",
            events: [mockInterview]
        });
        
        var student008 = new Student(
        {
            idnumber:"8",
            firstname: "Derrick",
            lastname: "Burns",
            phone: "8174439087",
            email: "derrick@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/derrick/finalproject",
            linkedin: "linkedin.derrickburns.com",
            events: [resume]
        });
        
        var student009 = new Student(
        {
            idnumber:"9",
            firstname: "Brett",
            lastname: "Dunlap",
            phone: "8065550123",
            email: "brett@gmail.com",
            classification: "Junior",
            status: "Current",
            portfolio: "github.com/brett/finalproject",
            linkedin: "linkedin.brettd.com",
            events: [interview]
        });
        
        var student010 = new Student(
        {
            idnumber:"10",
            firstname: "Leeland",
            lastname: "Hackbarth",
            phone: "7135550123",
            email: "lee@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/leeland/finalproject",
            linkedin: "linkedin.leelandh.com",
            events: [mockInterview, interview]
        });
        
        var student011 = new Student(
        {
            idnumber:"11",
            firstname: "Chern",
            lastname: "Hee",
            phone: "8175550123",
            email: "chern@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/chern/finalproject",
            linkedin: "linkedin.chernhee.com",
            events: []
        });
        
        var student012 = new Student(
        {
            idnumber:"12",
            firstname: "Alejandro",
            lastname: "Magallanes",
            phone: "2145559876",
            email: "alejandro@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/magallanes/finalproject",
            linkedin: "linkedin.magallanes.com",
            events: [resume]
        });
        
        var student013 = new Student(
        {
            idnumber:"13",
            firstname: "Rodrigo",
            lastname: "Mata",
            phone: "2145555648",
            email: "mata@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/mata/finalproject",
            linkedin: "linkedin.mata.com",
            events: [resume, mockInterview, interview, jobFair]
        });
        
        var student014 = new Student(
        {
            idnumber: "14",
            firstname: "James",
            lastname: "Ritter",
            phone: "5035550123",
            email: "james@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/james/finalproject",
            linkedin: "linkedin.james.com",
            events: [mockInterview]
        });
        
        var student015 = new Student(
        {
            idnumber: "15",
            firstname: "Skyler",
            lastname: "Schmidt",
            phone: "6025550123",
            email: "skyler@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/skyler/finalproject",
            linkedin: "linkedin.skyler.com",
            events: [resume, interview]
        });
        
        var student016 = new Student(
        {
            idnumber: "16",
            firstname: "Tony",
            lastname: "Romo",
            phone: "2145554567",
            email: "tony09@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/tony09/cidm4382finalproject",
            linkedin: "linkedin.tony09.com",
            events:[resume,jobFair]
        });
        
        var student017 = new Student(
        {
            idnumber: "17",
            firstname: "DeMarco",
            lastname: "Murray",
            phone: "8065559876",
            email: "marco29@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/murray29/cidm4382finalproject",
            linkedin: "linkedin.marco29.com",
            events:[resume, mockInterview,jobFair]
        });
        
        var student018 = new Student(
        {
            idnumber: "18",
            firstname: "Dez",
            lastname: "Bryant",
            phone: "8175556372",
            email: "dez88@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/dez88/cidm4382finalproject",
            linkedin: "linkedin.dez88.com",
            events:[resume]
        });
        
        var student019 = new Student(
        {
            idnumber: "19",
            firstname: "Orlando",
            lastname: "Scandrick",
            phone: "2145550001",
            email: "orlando32@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/orlando32/cidm4382finalproject",
            linkedin: "linkedin.orlando32.com",
            events:[resume, jobFair]
        });
        
        var student020 = new Student(
        {
            idnumber: "20",
            firstname: "Dustin",
            lastname: "Vaughan",
            phone: "8065551526",
            email: "dustin10@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/dustin10/cidm4382finalproject",
            linkedin: "linkedin.dustin10.com",
            events:[resume, mockInterview]
        });
        

        Student.create([student001,student002,student003,student004,student005,student006,student007,
                        student008,student009,student010,student011,student012,student013,student014,
                        student015,student016,student017,student018,student019,student020], function(err, records) 
        {
            console.log("\nThese are the student documents that were created:");
            var query = Student.find();
            query.exec(function(err, docs) 
            {
                for (var i in docs) 
                {
                    console.log(docs[i].firstname);
                } // end for loop
            }); // end query.exec
        }); // end Student.create
    }); // end mongoose.connection
} // end CreateDatabaseAndCollectionFunction
