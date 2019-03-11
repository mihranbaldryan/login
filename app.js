"use strict";
var form;
(function (form) {
    var AddHtml = /** @class */ (function () {
        function AddHtml() {
        }
        AddHtml.prototype.add = function () {
            var a = "";
            a += "<div id=\"div1\">\n    <div id=\"divbutton\">\n    \n    <button class=\"button\" id=\"butLogin\" type=\"button\">Log in</button>\n    <button class=\"button\" id=\"butRegister\"  type=\"button\"> TO Register</button>\n    \n    \n    </div>\n    \n    <div id=\"divform\">\n    \n    </div>\n    \n    </div>";
            document.body.innerHTML = a;
        };
        AddHtml.prototype.logform = function () {
            var log = new AddLogin();
            log.addLog();
        };
        AddHtml.prototype.regform = function () {
            var reg = new Registeret();
            reg.addReg();
        };
        return AddHtml;
    }());
    var addHtml = new AddHtml();
    addHtml.add();
    var butLogin = document.getElementById("butLogin");
    var butRegister = document.getElementById("butRegister");
    butLogin.addEventListener("click", addHtml.logform, true);
    butRegister.addEventListener("click", addHtml.regform);
    // var _div = document.createElement('div');
    // (document.querySelector('body') as HTMLElement).appendChild(_div)
    var AddLogin = /** @class */ (function () {
        function AddLogin() {
        }
        AddLogin.prototype.addLog = function () {
            var a = "";
            a = "<form class=\"logform\" method=\"post\"  name=\"loginForm\" action=\"\">\n\n<div class=\"container\">\n  <label for=\"uname\"><b>Username</b></label>\n  <input type=\"text\" placeholder=\"Enter Username\" name=\"uname\" required >\n\n  <label for=\"psw\"><b>Password</b></label>\n  <input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required>\n\n  <button id=\"setlog\" type=\"button\">Login</button>\n \n</div>\n\n\n</form>";
            var myContainer = document.getElementById("divform");
            myContainer.innerHTML = a;
        };
        AddLogin.getLocation = function (password) {
            var x1 = document.getElementById("demo1");
            var x2 = document.getElementById("demo2");
            var x3 = document.getElementById("demo3");
            var loccountry = "Armenia";
            var loccity = "";
            var cartinfo = {};
            cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
            if (cartinfo[password].city !== undefined) {
                loccountry = cartinfo[password].country;
                loccity = cartinfo[password].city;
            }
            x1.innerHTML = "<form class=\"mapform\" method=\"post\"  name=\"mapForm\" action=\"\">\n\n<div class=\"container2\">\n  \n  <input type=\"text\" placeholder=\"Enter country\" name=\"country\" value=\"\"  required  >\n\n \n  <input type=\"text\" placeholder=\"Enter city\" name=\"city\"  value=\"\"  required>\n \n</div>\n\n<div>\n  <button id=\"setmap\" type=\"button\">Search</button>\n  <button id=\"savemap\" type=\"button\">Save map</button>\n</div>\n\n\n</form>";
            x2.innerHTML = "\n\n<iframe \n      \n      frameborder=\"0\" \n      scrolling=\"no\" \n      marginheight=\"0\" \n      marginwidth=\"0\" \n      let city=\"\";\n      src=\"https://maps.google.com/maps?q=" + loccountry + "," + loccity + "&hl=es;z=14&amp;output=embed\">\n     </iframe>\n";
            var middleAge = AddLogin.getMiddleAge();
            x3.innerHTML = "<h2>in  this  website middle age  is   " + middleAge + "</h2>";
            var but1 = document.getElementById("setmap");
            var but2 = document.getElementById("savemap");
            var country;
            var city;
            var flagsev = true;
            but1.addEventListener("click", function () {
                country = document.forms[0]["country"].value;
                city = document.forms[0]["city"].value;
                flagsev = false;
                x2.innerHTML = "\n\n<iframe   \n  frameborder=\"0\" \n  scrolling=\"no\" \n  marginheight=\"0\" \n  marginwidth=\"0\" \n  let city=\"\";\n  src=\"https://maps.google.com/maps?q=" + country + "," + city + "&hl=es;z=14&amp;output=embed\">\n </iframe>\n ";
            });
            but2.addEventListener("click", function () {
                // let country=<HTMLElement>document.forms[0]['country'].value;
                // let city=<HTMLElement>document.forms[0]['city'].value;
                var cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
                if (!flagsev) {
                    cartinfo[password].country = country;
                    cartinfo[password].city = city;
                    localStorage.setItem("cartinfo", JSON.stringify(cartinfo));
                }
                AddLogin.localin(cartinfo[password].username, password);
            });
        };
        AddLogin.getMiddleAge = function () {
            var sum = 0;
            var m = 0;
            // let year:number=0;
            if (localStorage.getItem("cartinfo")) {
                var cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
                var dnow = new Date();
                var ynow = dnow.getFullYear();
                for (var key in cartinfo) {
                    sum += ynow - cartinfo[key].year;
                    m++;
                }
                return sum / m;
            }
        };
        AddLogin.localin = function (username, password) {
            var flag1 = false;
            var flag2 = false;
            var cartinfo;
            if (localStorage.getItem("cartinfo")) {
                cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
                for (var key in cartinfo) {
                    if (password === key) {
                        flag1 = true;
                        if (cartinfo[password].username === username) {
                            flag2 = true;
                        }
                        break;
                    }
                }
                if (flag1 && flag2) {
                    var a = "\n<div class=\"account\" >\n<div>\n<div id=\"upimg\">\n<img id=\"img\" src=\"" + cartinfo[password].url + "\">\n<input type=\"file\"  id=\"inputup\">\n</div>\n</div>\n\n<table>\n  \n  <tr>\n    <th>Name</th>  \n    <td>" + cartinfo[password].name + "</td>\n   \n  </tr>\n  <tr>\n   <th>Surname</th>  \n    <td>" + cartinfo[password].surname + "</td>\n  </tr>\n  <tr>\n   <th>Year</th>  \n    <td>" + cartinfo[password].year + "</td>\n  </tr>\n";
                    if (cartinfo[password].country) {
                        a += "<tr>\n  <th>Country</th>  \n   <td>" + cartinfo[password].country + "</td>\n </tr> ";
                    }
                    if (cartinfo[password].city) {
                        a += "<tr>\n  <th>City</th>  \n   <td>" + cartinfo[password].city + "</td>\n </tr> ";
                    }
                    a += "</table>";
                    a += "\n\n</div>\n<div class=\"pPhoto\" id=\"demo\">\n<div  id=\"demo1\">\n</div>\n<div  id=\"demo2\">\n</div>\n<div  id=\"demo3\">\n</div>\n</div>";
                    // <div class="pPhoto"  >
                    // <iframe id="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8455441799733!2d44.51998801541696!3d40.19025067939211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcdf8e5524c5%3A0x7d6e02506a8e68e7!2zMTA1IFRlcnlhbiBTdCwgWWVyZXZhbiwg0JDRgNC80LXQvdC40Y8!5e0!3m2!1sru!2s!4v1530175788725" frameborder="0"  style="border:0; width:50%; height: 50vh;" allowfullscreen></iframe>  </div>
                    // <div class="pInfo">
                    var div1 = document.getElementById("div1");
                    div1.innerHTML = a;
                    var up = document.getElementById("inputup");
                    up.addEventListener("change", function (e) {
                        var x = document.getElementById("inputup");
                        var img = document.getElementById("img");
                        var input = e.target;
                        var reader = new FileReader();
                        reader.onload = function () {
                            var dataURL = reader.result;
                            img.setAttribute("src", "" + dataURL);
                            var cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
                            cartinfo[password].url = dataURL;
                            localStorage.setItem("cartinfo", JSON.stringify(cartinfo));
                        };
                        reader.readAsDataURL(input.files[0]);
                    });
                    AddLogin.getLocation(password);
                }
                else {
                    if (!flag1) {
                        document.forms[0]["psw"].style.border = "2px solid red";
                    }
                    if (!flag2) {
                        document.forms[0]["uname"].style.border = "2px solid red";
                    }
                }
            }
            else {
                alert("There are no registered people yet");
            }
        };
        AddLogin.prototype.logvaled = function () {
            var logval = document.forms[0]["uname"];
            var pasval = document.forms[0]["psw"];
            logval.style.border = "";
            pasval.style.border = "";
            var tes = /^\w{2,20}$/i.test(logval.value);
            var pas = /^\w{3,15}$/i.test(pasval.value);
            if (!tes) {
                logval.style.border = "2px solid red";
            }
            if (!pas) {
                pasval.style.border = "2px solid red";
            }
            if (tes && pas) {
                AddLogin.localin(logval.value, pasval.value);
                // document.forms[0].submit();
            }
        };
        return AddLogin;
    }());
    form.AddLogin = AddLogin;
    var Registeret = /** @class */ (function () {
        function Registeret() {
        }
        Registeret.prototype.addReg = function () {
            var b = "";
            b = "<form class=\"regform\"  method=\"post\"  action=\"\">\n        <div class=\"container\">\n          <h1>Register</h1>\n          <p>Please fill in this form to create an account.</p>\n          <hr>\n          <label for=\"nam\"><b>Name</b></label>\n          <input type=\"text\" placeholder=\"Enter Name\" name=\"nam\" required>\n          <label for=\"sur\"><b>Surname</b></label>\n          <input type=\"text\" placeholder=\"Enter Surname\" name=\"sur\" required>\n      \n          <label for=\"yea\"><b>Year</b></label>\n          <select name=\"yea\">\n          <option value=\"1990\">1990</option>\n          <option value=\"1991\">1991</option>\n          <option value=\"1992\">1992</option>\n          <option value=\"1993\">1993</option>\n          <option value=\"1994\">1994</option>\n          <option value=\"1995\">1995</option>\n          <option value=\"1996\">1996</option>\n          <option value=\"1997\">1997</option>\n          <option value=\"1998\">1998</option>\n          <option value=\"1999\">1991</option>\n          <option value=\"2000\">1992</option>\n          <option value=\"2001\">2001</option>\n         \n        </select>\n\n\n          <label for=\"email\"><b>Email</b></label>\n          <input type=\"text\" placeholder=\"Enter Email\" name=\"email\" required>\n          <label for=\"use\"><b>Usernam</b></label>\n          <input type=\"text\" placeholder=\"Enter Username\" name=\"use\" required>\n          <label for=\"psw\"><b>Password</b></label>\n          <input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required>\n\n          <label for=\"psw-repeat\"><b>Repeat Password</b></label>\n          <input type=\"password\" placeholder=\"Repeat Password\" name=\"psw-repeat\" required>\n          <hr>\n          <button type=\"button\" id=\"setRegister\" class=\"registerbtn\">To Register</button>\n        </div>\n        \n       \n      </form>";
            var myContainer = document.getElementById("divform");
            myContainer.innerHTML = b;
        };
        Registeret.getForm = function () {
            return {
                nam: document.forms[0]["nam"],
                sur: document.forms[0]["sur"],
                use: document.forms[0]["use"],
                yea: document.forms[0]["yea"],
                email: document.forms[0]["email"],
                psw: document.forms[0]["psw"],
                psw_repeat: document.forms[0]["psw-repeat"]
            };
        };
        Registeret.localadd = function () {
            var flag = true;
            var cartinfo = {};
            var form2 = Registeret.getForm();
            var val2 = {
                name: form2.nam.value,
                surname: form2.sur.value,
                year: +form2.yea.value,
                email: form2.email.value,
                username: form2.use.value,
                password: form2.psw.value
            };
            if (localStorage.getItem("cartinfo")) {
                cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
            }
            for (var key in cartinfo) {
                if (val2.username == cartinfo[key].username) {
                    flag = false;
                    form2.use.style.border = "2px solid red";
                    break;
                }
            }
            if (cartinfo[val2.password] == undefined && flag) {
                cartinfo[val2.password] = val2;
                localStorage.setItem("cartinfo", JSON.stringify(cartinfo));
                alert("registration finished");
                document.forms[0].submit();
            }
            else {
                form2.psw.style.border = "2px solid red";
                form2.psw_repeat.style.border = "2px solid red";
                if (flag) {
                    alert("this password has already been used choose another");
                }
                else {
                    alert("this password and username has already been used choose another");
                }
            }
        };
        Registeret.prototype.pasvaled = function () {
            var val = Registeret.getForm();
            // let nam=document.forms[0]['nam'];
            // let sur=document.forms[0]['sur'];
            // let use=document.forms[0]['use'];
            // let email=document.forms[0]['email'];
            // let psw=document.forms[0]['psw'];
            // let psw_repeat=document.forms[0]['psw-repeat'];
            val.email.style.border = "";
            val.psw.style.border = "";
            val.psw_repeat.style.border = "";
            val.nam.style.border = "";
            val.sur.style.border = "";
            val.use.style.border = "";
            var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var emailtest = mail.test(val.email.value);
            var pass1test = /^\w{3,15}$/i.test(val.psw.value);
            var pass2test = /^\w{3,15}$/i.test(val.psw_repeat.value);
            var namtest = /^[a-z]{2,20}$/i.test(val.nam.value);
            var surtest = /^\w{2,20}$/i.test(val.sur.value);
            var usetest = /^\w{2,20}$/i.test(val.use.value);
            if (!namtest) {
                val.nam.style.border = "2px solid red";
            }
            if (!surtest) {
                val.sur.style.border = "2px solid red";
            }
            if (!usetest) {
                val.use.style.border = "2px solid red";
            }
            if (!emailtest) {
                val.email.style.border = "2px solid red";
            }
            if (!pass1test) {
                val.psw.style.border = "2px solid red";
            }
            if (!(val.psw.value === val.psw_repeat.value) || !pass2test) {
                val.psw_repeat.style.border = "2px solid red";
            }
            if (emailtest &&
                pass1test &&
                pass2test &&
                namtest &&
                surtest &&
                usetest &&
                val.psw.value === val.psw_repeat.value) {
                Registeret.localadd();
            }
        };
        return Registeret;
    }());
    form.Registeret = Registeret;
    var log = new AddLogin();
    var pas = new Registeret();
    log.addLog();
    var Login = document.getElementById("setlog");
    Login.addEventListener("click", log.logvaled);
    butLogin.addEventListener("click", function () {
        var Login2 = document.getElementById("setlog");
        Login2.addEventListener("click", log.logvaled);
    });
    butRegister.addEventListener("click", function () {
        var passw = document.getElementById("setRegister");
        passw.addEventListener("click", pas.pasvaled);
    });
})(form || (form = {}));
