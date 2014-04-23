// Module dependencies                                                                                                                                     

var express    = require('express'),
    mysql      = require('mysql');
    ejs        = require('ejs');
    connect    = require('connect');

// Application initialization                                                                                                                              

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'kvasconcellos',
        password : '3475503'

    });

//var app = module.exports = express.createServer();                                                                                                       

var app = express()
app.set('subtitle', 'Lab 18');
app.set('view engine','ejs');
app.set('views', 'views');

// Database setup                                                                                                                                          

        connection.query('CREATE DATABASE IF NOT EXISTS kvasconcellos', function (err) {
            if (err) throw err;
            connection.query('USE kvasconcellos', function (err) {
                if (err) throw err;
                connection.query('CREATE TABLE IF NOT EXISTS Artists('
                    + 'id INT NOT NULL AUTO_INCREMENT,'
                    + 'PRIMARY KEY(id),'
                    + 'username VARCHAR(30),'
                    + 'password VARCHAR(30)'
                    +  ')', function (err) {
                        if (err) throw err;
                    });
            });
        });

// Configuration                                                                                                                                           

console.log(__dirname + '/views');

//app.use(express.bodyParser());                                                                                                                           
app.use(connect.urlencoded());
app.use(connect.json());

// Main route sends our HTML file                                                                                                                          

app.get('/', function(req, res) {
    res.render('lab18');
});

app.get('/enterArtist', function(req,res) {
    res.render('lab18part2');
   // res.sendfile('/lab18part2.ejs', {root:__dirname});                                                                                                   
});

app.get('/enterMembers', function(req, res) {
    res.render('lab18Members');
});


app.get('/lab18', function(req,res) {
    console.log(__dirname);
    res.render('lab18');
    //res.render('lab18');                                                                                                                                 
});

app.get('/users', function(req,res) {
    var result = [{UserID: 1, Email: 'mhaderman'},
                  {UserID: 2, Email: 'test'}];
    res.render('displayUserTable.ejs', {rs: result});
});

app.post('/enterArtist', function (req, res) {
    console.log(req.body);
    connection.query('INSERT INTO Artists (ID,ArtistName,Genre,FormedIn,NumMembers) VALUES(?,?,?,?,?)', [req.body.ID,req.body.ArtistName,req.body.Genre,re\
q.body.FormedIn,req.body.NumMembers],
        function (err, result) {
            if (err) throw err;
            connection.query('select * from Artists where ID = ?', req.body.ID,
                function (err, result) {
                    console.log(result);
                    if(result.length > 0) {
                      res.send('ID: ' + result[0].ID + '<br />' +
                               'Artist: ' + result[0].ArtistName + '<br />' +
                               'Genre: ' + result[0].Genre + '<br />' +
                               'Formed In: ' + result[0].FormedIn + '<br />' +
                               'Number of Members: ' + result[0].NumMembers
                      );
                    }
                    else
                      res.send('Artist was not inserted.');
                });
        }
    );
});

app.post('/enterMembers', function (req, res) {
    console.log(req.body);
    connection.query('INSERT INTO Members (ID,Artist,MemberName,Instrument) VALUES(?,?,?,?)', [req.body.ID,req.body.Artist,req.body.Member,req.body.Instru\
ment],
        function (err, result) {
            if (err) throw err;
            connection.query('select * from Members where ID = ?', req.body.ID,
                function (err, result) {
                    console.log(result);
                    if(result.length > 0) {
                      res.send('ID: ' + result[0].ID + '<br />' +
                               'Artist: ' + result[0].Artist + '<br />' +
                               'Member: ' + result[0].Member + '<br />' +
                               'Instrument: ' + result[0].Instrument + '<br />'
                      );
                    }
                    else
                      res.send('Member was not inserted.');
                });
        }
    );
});

// Begin listening                                                                                                                                         

app.listen(8026);
console.log("Express server listening on port %d in %s mode",  app.settings.env);
