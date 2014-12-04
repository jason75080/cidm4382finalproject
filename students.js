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
    mongoose.connection.once('open', function() 
    {
        Students.find({}, function(err, docs) 
        {
            console.log("Before delete: ");
            for (var i in docs) 
            {
                console.log(docs[i].fullName());
            }
            var query = Students.remove();
            query.exec(function(err, results) 
            {
                console.log("\n%d Documents Deleted.", results);
                Students.find({}, function(err, docs) 
                {
                    console.log("\nAfter delete: ");
                    for (var i in docs) 
                    {
                        console.log(docs[i].fullName());
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

    var Student = mongoose.model('Student', studentSchema);

    setTimeout(function() 
    {
        mongoose.disconnect();
    }, 5000);

    //again, once is the event-handling "hook" for when the database is opened
    mongoose.connection.once('open', function() 
    {

        //we create a new instance off the Model object
        var student001 = new Student(
        {
            firstname: "Jason",
            lastname: "Madison",
            phone: "2143549810",
            email: "jason75080@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/jason75080/cidm4382finalproject",
            linkin: "linkedin.jason75080.com"
        });
        
        var student002 = new Student(
        {
            firstname: "Secia",
            lastname: "Chase",
            phone: "2145556666",
            email: "secia@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/seciachase/cidm4382finalproject",
            linkin: "linkedin.seciachase.com"
        });
        
        var student003 = new Student(
        {
            firstname: "Mayra",
            lastname: "Gomez",
            phone: "8062211910",
            email: "mayrag006@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/mayra/cidm4382finalproject",
            linkin: "linkedin.mayragomez.com"
        });
        
        var student004 = new Student(
        {
            idnumber: "004",
            firstname: "Lauren",
            lastname: "Alvarez",
            phone: "2146664499",
            email: "lauren@gmail.com",
            classification: "Junior",
            status: "Current",
            portfolio: "github.com/lauren/project",
            linkin: "linkedin.laurenalvarez.com"
        });
        
        var student005 = new Student(
        {
            firstname: "Anthony",
            lastname: "Petruccione",
            phone: "8065559321",
            email: "anthony@gmail.com",
            classification: "Sophomore",
            status: "Current",
            portfolio: "github.com/anthony/finalproject",
            linkin: "linkedin.anthonyp.com"
        });
        
        var student006 = new Student(
        {
            firstname: "Dustin",
            lastname: "Bell",
            phone: "9722387766",
            email: "dustin@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/dustin/finalproject",
            linkin: "linkedin.dustinbell.com"
        });
        
        var student007 = new Student(
        {
            firstname: "Jordan",
            lastname: "Brittenham",
            phone: "8062569900",
            email: "jordan@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/jordan/finalproject",
            linkin: "linkedin.jordanb.com"
        });
        
        var student008 = new Student(
        {
            firstname: "Derrick",
            lastname: "Burns",
            phone: "8174439087",
            email: "derrick@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/derrick/finalproject",
            linkin: "linkedin.derrickburns.com"
        });
        
        var student009 = new Student(
        {
            firstname: "Brett",
            lastname: "Dunlap",
            phone: "8065550123",
            email: "brett@gmail.com",
            classification: "Junior",
            status: "Current",
            portfolio: "github.com/brett/finalproject",
            linkin: "linkedin.brettd.com"
        });
        
        var student010 = new Student(
        {
            firstname: "Leeland",
            lastname: "Hackbarth",
            phone: "7135550123",
            email: "lee@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/leeland/finalproject",
            linkin: "linkedin.leelandh.com"
        });
        
        var student011 = new Student(
        {
            firstname: "Chern",
            lastname: "Hee",
            phone: "8175550123",
            email: "chern@gmail.com",
            classification: "HS",
            status: "Prospect",
            portfolio: "github.com/chern/finalproject",
            linkin: "linkedin.chernhee.com"
        });
        
        var student012 = new Student(
        {
            firstname: "Alejandro",
            lastname: "Magallanes",
            phone: "2145559876",
            email: "alejandro@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/magallanes/finalproject",
            linkin: "linkedin.magallanes.com"
        });
        
        var student013 = new Student(
        {
            firstname: "Rodrigo",
            lastname: "Mata",
            phone: "2145555648",
            email: "mata@gmail.com",
            classification: "Graduate",
            status: "Alumni",
            portfolio: "github.com/mata/finalproject",
            linkin: "linkedin.mata.com"
        });
        
        var student014 = new Student(
        {
            firstname: "James",
            lastname: "Ritter",
            phone: "5035550123",
            email: "james@gmail.com",
            classification: "Senior",
            status: "Current",
            portfolio: "github.com/james/finalproject",
            linkin: "linkedin.james.com"
        });
        
        var student015 = new Student(
        {
            firstname: "Skyler",
            lastname: "Schmidt",
            phone: "6025550123",
            email: "skyler@gmail.com",
            classification: "Freshman",
            status: "Current",
            portfolio: "github.com/skyler/finalproject",
            linkin: "linkedin.skyler.com"
        });
        

        Student.create([student004], function(err, records) 
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
