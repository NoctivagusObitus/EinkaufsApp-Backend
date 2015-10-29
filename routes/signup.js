var express = require('express');
var User = require('../models/user');
var router = express.Router();

function validateEmail(email) {
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(email);
}

router.get('/', function (req, res) {
    res.render('signup', {
        user: '',
        cusername: '',
        cmail: '',
        cpassword: '',
        cpasswordconfirm: ''
    });
});

router.post('/', function (req, res) {
    
    //Allgemeine Hinweise: 
    //1. Variablen müssen natürlich im richtigen Scope definiert werden. 
    // Wenn du die in einem Else Definierts gelten die nur für das Else und sind außerhalb nicht aufrufbar!
    //2. Wenn man nur einen Befehl in einem if oder else hat braucht man keine {} ;) 
    //3. Console logs brauchen wir in Production nicht. Nur zum testen. Deshalb bitte vorm push entfernen bzw               auskommentieren
    //4. und am wichtigsten: CODE IMMER LOKAL TESTEN BEVOR MAN PUSHT. Wenn ich das hier nicht überprüft hätte wäre der Login nicht funktional gewesen...
    
    var email, emailx, userx, pw, cpw;
    
    if (!validateEmail(req.body.email)) {
        req.flash('error', 'Deine E-Mail Adresse scheint nicht korrekt zu sein  ');
        return res.redirect('/signup')
        emailx = '';
    } else emailx = req.body.email;
    
    if (req.body.password != req.body.confirm) {
        req.flash('error', 'Passwörter nicht gleich  ');
        pw = '';
        cpw = '';
    } else {
        pw = req.body.password;
        cpw = req.body.confirm;
    }
    
    User.findOne({ username: req.body.username}, function (err, user) {
        if (err) console.log(err);
        
        if (user) {
            req.flash('error', 'Benutzername bereits vergeben  ');
            userx = '';
        } else userx = req.body.username;

        User.findOne({
            email: req.body.email
        }, function (err, user) {       
            if (err) console.log(err);
            
            if (user) {
                req.flash('error', 'E-Mail bereits vergeben  ');
                email = '';
            } else email = req.body.email;
            
            //Bitte die Bedinungen auch richtig ausschreiben, sonst funktioniert das nicht!
            if ((email == '') || (pw == '')|| (cpw == '')|| (userx == '')) {
                return res.render('signup', {
                    cusername: userx,
                    cmail: emailx,
                    cpassword: pw,
                    cpasswordconfirm: cpw
                });
            }
            
            var user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            user.save(function (err) {
                req.logIn(user, function (err) {
                    res.redirect('/Inside');
                });
            });
        });
    });
});


// Wir brauchen eine ZWEITE Route für die App, welche uns nur JSON zurückgibt ;)
router.post('/app', function (req, res) {
    if (!validateEmail(req.body.email)) {
        req.flash('error', 'Deine E-Mail Adresse scheint nicht korrekt zu sein.');
        return res.send({
            status: 'error',
            message: 'Deine E-Mail Adresse scheint nicht korrekt zu sein.'
        });
    }
    if (req.body.password != req.body.confirm) {
        req.flash('error', 'Passwörter nicht gleich');
        return res.send({
            status: 'error',
            message: 'Passwörter nicht gleich'
        });
    }
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        //if (err) console.log(err);
        if (user) {
            req.flash('error', 'Benutzername bereits vergeben.');
            return res.send({
                status: 'error',
                message: 'Benutzername bereits vergeben.'
            });
        }
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            //if (err) console.log(err);
            if (user) {
                req.flash('error', 'E-Mail bereits vergeben.');
                return res.send({
                    status: 'error',
                    message: 'E-Mail bereits vergeben.'
                });
            }
            var user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            user.save(function (err) {
                req.logIn(user, function (err) {
                    res.send({
                        status: 'ok'
                    });
                });
            });
        });
    });
});


module.exports = router;