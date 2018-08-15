var express= require('express')
var bodyParser=require('body-parser')
var path=require('path');
var mongoose=require('mongoose');
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var contactList=require('./model/mongo');


app.use(express.static(path.join(__dirname + '/public')));



//to setup mongodb connection

mongoose.connect('mongodb://localhost:27017/connect');


//to check on
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
});

//if error
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error')
    }
    console.log('connected to database')
})

// var category=require('../model/mongo')

app.get('/contactlist',function(req,res){
  contactList.find(function(err,docs){
      res.json(docs)
  })
    
});
app.get('/contactlist/:id', function(req, res){
	contactList.findOne({_id:req.params.id}, function(err, doc){
		if(err)
			res.send(err);
		res.json(doc);
	});
});

  app.post('/contactlist',function(req,res){
    contactList.create(req.body,function(err,docs){
        res.json(docs)
    })
      
  })

app.put('/api/contactlist/:id', function(req, res){
	var query = {
	name:req.body.name,
    email:req.body.email,
    number:req.body.number 
	}
	contactList.findOneAndUpdate({_id:req.params.id}, query, function(err, docum){
		if(err)
			res.send(err);
		res.json(docum);
	});
});

app.delete('/contactlist/:id',function(req,res){
    contactList.findOneAndRemove({_id:req.params.id},function(err,doc){
         if(err)
             res.send(err);
      res.json(doc);
    })
      
  })

app.listen(3000);
console.log('port started on 3000')