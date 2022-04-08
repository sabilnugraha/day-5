const { request } = require('express')
const express = require('express')
const res = require('express/lib/response') 
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')


const app = express()
const port = 2000

const db = require('./connection/db')

const upload = require('./middlewares/fileuload')
const { redirect } = require('express/lib/response')

app.set('view engine', 'hbs') //set view engine hbs

app.use('/public', express.static(__dirname + '/public')) //set public path folder

app.use('/uploads', express.static(__dirname + '/uploads')) //set public path folder

app.use(express.urlencoded({extended: false}));

app.use(flash())

app.use(session({
    secret: 'ok',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 2 * 60 * 60 * 1000 // 2 jam 
     }
}))

let isLogin = true

app.get('/', function(req, res) {

    console.log(req.session);
    
    db.connect(function(err, client, done){
        if (err) throw err;
        
        const query = 'SELECT * FROM tb_projects';
        client.query(query, function(err, result){
            if (err) throw err;
            let data = result.rows
            data = data.map(function(item){
                return {
                    ...item,
                    isLogin: req.session.isLogin,
                    durasi: durasiProject(item.start_date, item.end_date),
                    year: yearProject(item.end_date),
                    
                }
            })
            res.render ('index', {isLogin: req.session.isLogin, user: req.session.user,  projects:data});
            
    })
   
    
})
})
// map untuk menyimpan ke parameter

// memasukkan data dari myproject
app.post('/', upload.single('image'), function(req, res) {

    let data = req.body

    const image = req.file.filename
    
    const query = `INSERT INTO tb_projects(title, start_date, end_date, description, technologies, image) VALUES ('${data.title}', '${data.startdate}', '${data.enddate}', '${data.description}', '{${data.techno}}', '${image}')`
    db.connect(function(err, client, done){
       if (err) throw err
        
        client.query(query, function(err, result){
            if (err) throw err

            res.redirect('/')
        })
    })
    
    
    

    
})

app.get('/myproject', function(req, res){
    res.render ('myproject')
})

app.get('/contact', function(req, res){
    res.render ('contact')
})

app.get('/project-detail/:id', upload.single('image'), function(req, res){
    

    let id = req.params.id

    db.connect(function(err, client, done){
        if (err) throw err

        client.query(`SELECT * FROM public.tb_projects WHERE id = ${id}`, function(err, result){
            if (err) throw err
            done();

            //console.log(result.rows[0]);

            let data = result.rows[0]

            durasi = durasiProject(data.start_date, data.end_date)
            startDate = start(data.start_date)
            endDate = end(data.end_date)
            image = data.image

            

            res.render ('project-detail', {project: data, durasi, startDate, endDate, image})
        })
    })
        
    
})  //request data dalam parameter id



    


app.get('/delete-project/:id', function(req, res){

    
    const id= req.params.id
    const query = `DELETE FROM tb_projects WHERE id=${id};`
    
    db.connect(function(err, client, done){
        if (err) throw err
         
         client.query(query, function(err, result){
             if (err) throw err
            
             
             res.redirect('/')
         })
     })
    

    

})

app.get('/register', function(req, res){
    res.render('register')
})

app.post('/register', function(req, res){
    

    const {nama, email, password} = req.body

    if (nama == '' || email == '' || password == '') {
        req.flash('error', 'Please insert all field!');
        return res.redirect('/register');
      }
    

    const salt = 10

    const hashedPassword = bcrypt.hashSync(password, salt)


    const query = `INSERT INTO tb_user(nama, email, password) VALUES ('${nama}', '${email}', '${hashedPassword}');`

    db.connect(function(err, client, done){
        if (err) throw err
         
         client.query(query, function(err, result){
             if (err) throw err
            
             
             res.redirect('register')
         })
     })
    
})


app.get('/login', function(req, res){
    res.render('login')
})

app.post('/login', function (req, res) {
    const data = req.body;
    
  
    if (data.email == '' || data.password == '') {
      req.flash('error', 'Please insert all field!');
      return res.redirect('/login');
    }
  
    db.connect(function (err, client, done) {
      if (err) throw err;
  
      const query = `SELECT * FROM tb_user WHERE email = '${data.email}'`;
  
      client.query(query, function (err, result) {
        if (err) throw err;
  
        // Check account by email
        if (result.rows.length == 0) {
          console.log('Email not found!');
          return res.redirect('/login');
        }
  
        // Check password
        const isMatch = bcrypt.compareSync(
          data.password,
          result.rows[0].password
        );
  
        if (isMatch == false) {
          console.log('Wrong Password!');
          return res.redirect('/login');
        }
  
        req.session.isLogin = true;
        req.session.user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        nama: result.rows[0].nama,
      };

      req.flash('success', 'Login Success')
                res.redirect('/')
        
  
        
      });
    });
  });

  app.get('/logout', function(req, res){
    req.session.destroy()

    res.redirect('/')
})

function durasiProject(start, end){

    let x = new Date(start);
    let y = new Date(end);
    let durasi = y - x;
    let miliseconds = 1000;
    let secondInHours = 3600;
    let hoursInDay = 24;
    let distanceDay = Math.floor(durasi / (miliseconds * secondInHours * hoursInDay));
    let distanceMonth = Math.floor(distanceDay / 30);
    return `${distanceMonth} Bulan`
    
    
}

function start(start){
    let x = new Date(start);
    let month = ['Januari', 'Febuari', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'October','Nopember','December'];
    let monthIndex = start.getMonth();
    let year = start.getFullYear();
    let date = start.getDate();
    let fullDate = `${date} ${month[monthIndex]} ${year}`;
    return fullDate

}

function end(end){
    let x = new Date(end);
    let month = ['Januari', 'Febuari', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'October','Nopember','December'];
    let monthIndex = end.getMonth();
    let year = end.getFullYear();
    let date = end.getDate();
    let fullDate = `${date} ${month[monthIndex]} ${year}`;
    return fullDate

}

function yearProject(end){
    let x = new Date(end);
    let year = x.getFullYear();
    return year
}







app.listen(port, function() {
    console.log(`server listen on port ${port}`);
})
