namespace form {
  class AddHtml {
    add(): void {
      let a: string = "";
      a += `<div id="div1">
    <div id="divbutton">
    
    <button class="button" id="butLogin" type="button">Log in</button>
    <button class="button" id="butRegister"  type="button"> TO Register</button>
    
    
    </div>
    
    <div id="divform">
    
    </div>
    
    </div>`;
      document.body.innerHTML = a;
    }

    logform() {
      let log = new AddLogin();
      log.addLog();
    }

    regform() {
      let reg = new Registeret();
      reg.addReg();
    }
  }

  let addHtml = new AddHtml();
  addHtml.add();

  let butLogin = <HTMLElement>document.getElementById("butLogin");
  let butRegister = <HTMLElement>document.getElementById("butRegister");

  butLogin.addEventListener("click", addHtml.logform, true);

  butRegister.addEventListener("click", addHtml.regform);

  // var _div = document.createElement('div');
  // (document.querySelector('body') as HTMLElement).appendChild(_div)

  export class AddLogin {
    addLog() {
      let a: string = "";

      a = `<form class="logform" method="post"  name="loginForm" action="">

<div class="container">
  <label for="uname"><b>Username</b></label>
  <input type="text" placeholder="Enter Username" name="uname" required >

  <label for="psw"><b>Password</b></label>
  <input type="password" placeholder="Enter Password" name="psw" required>

  <button id="setlog" type="button">Login</button>
 
</div>


</form>`;

      let myContainer = <HTMLElement>document.getElementById("divform");
      myContainer.innerHTML = a;
    }

    protected static getLocation(password: string) {
      let x1 = <HTMLElement>document.getElementById("demo1");
      let x2 = <HTMLElement>document.getElementById("demo2");
      let x3 = <HTMLElement>document.getElementById("demo3");
      let loccountry = "Armenia";
      let loccity = "";

      type obj = {
        [password: string]: {
          name: string;
          surname: string;
          year: number;
          email: string;
          username: string;
          password: string;
          country: string;
          city: string;
        };
      };

      let cartinfo: obj = {};

      cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);
      if (cartinfo[password].city !== undefined) {
        loccountry = cartinfo[password].country;
        loccity = cartinfo[password].city;
      }

      x1.innerHTML = `<form class="mapform" method="post"  name="mapForm" action="">

<div class="container2">
  
  <input type="text" placeholder="Enter country" name="country" value=""  required  >

 
  <input type="text" placeholder="Enter city" name="city"  value=""  required>
 
</div>

<div>
  <button id="setmap" type="button">Search</button>
  <button id="savemap" type="button">Save map</button>
</div>


</form>`;
      x2.innerHTML = `

<iframe 
      
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      let city="";
      src="https://maps.google.com/maps?q=${loccountry},${loccity}&hl=es;z=14&amp;output=embed">
     </iframe>
`;

      let middleAge = AddLogin.getMiddleAge();
      x3.innerHTML = `<h2>in  this  website middle age  is   ${middleAge}</h2>`;

      let but1 = <HTMLElement>document.getElementById("setmap");
      let but2 = <HTMLElement>document.getElementById("savemap");

      let country: HTMLElement;
      let city: HTMLElement;
      let flagsev: boolean = true;

      but1.addEventListener("click", function() {
        country = <HTMLElement>document.forms[0]["country"].value;
        city = <HTMLElement>document.forms[0]["city"].value;

        flagsev = false;

        x2.innerHTML = `

<iframe   
  frameborder="0" 
  scrolling="no" 
  marginheight="0" 
  marginwidth="0" 
  let city="";
  src="https://maps.google.com/maps?q=${country},${city}&hl=es;z=14&amp;output=embed">
 </iframe>
 `;
      });

      but2.addEventListener("click", function() {
        // let country=<HTMLElement>document.forms[0]['country'].value;
        // let city=<HTMLElement>document.forms[0]['city'].value;

        let cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);
        if (!flagsev) {
          cartinfo[password].country = country;
          cartinfo[password].city = city;
          localStorage.setItem("cartinfo", JSON.stringify(cartinfo));
        }

        AddLogin.localin(cartinfo[password].username, password);
      });
    }

    protected static getMiddleAge() {
      let sum: number = 0;
      let m: number = 0;
      // let year:number=0;

      if (localStorage.getItem("cartinfo")) {
        let cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);

        let dnow = new Date();
        let ynow = dnow.getFullYear();

        for (let key in cartinfo) {
          sum += ynow - cartinfo[key].year;
          m++;
        }
        return sum / m;
      }
    }

    protected static localin(username: string, password: string) {
      let flag1: boolean = false;
      let flag2: boolean = false;
      type obj = {
        [password: string]: {
          name: string;
          surname: string;
          year: number;
          email: string;
          username: string;
          password: string;
          country?: string;
          city?: string;
          url?:string;
        };
      };
      let cartinfo: obj;
      if (localStorage.getItem("cartinfo")) {
        cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);
        for (let key in cartinfo) {
          if (password === key) {
            flag1 = true;
            if (cartinfo[password].username === username) {
              flag2 = true;
            }

            break;
          }
        }

        if (flag1 && flag2) {
          let a = `
<div class="account" >
<div>
<div id="upimg">
<img id="img" src="${cartinfo[password].url}">
<input type="file"  id="inputup">
</div>
</div>

<table>
  
  <tr>
    <th>Name</th>  
    <td>${cartinfo[password].name}</td>
   
  </tr>
  <tr>
   <th>Surname</th>  
    <td>${cartinfo[password].surname}</td>
  </tr>
  <tr>
   <th>Year</th>  
    <td>${cartinfo[password].year}</td>
  </tr>
`;

          if (cartinfo[password].country) {
            a += `<tr>
  <th>Country</th>  
   <td>${cartinfo[password].country}</td>
 </tr> `;
          }
          if (cartinfo[password].city) {
            a += `<tr>
  <th>City</th>  
   <td>${cartinfo[password].city}</td>
 </tr> `;
          }

          a += `</table>`;

          a += `

</div>
<div class="pPhoto" id="demo">
<div  id="demo1">
</div>
<div  id="demo2">
</div>
<div  id="demo3">
</div>
</div>`;

          // <div class="pPhoto"  >
          // <iframe id="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8455441799733!2d44.51998801541696!3d40.19025067939211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcdf8e5524c5%3A0x7d6e02506a8e68e7!2zMTA1IFRlcnlhbiBTdCwgWWVyZXZhbiwg0JDRgNC80LXQvdC40Y8!5e0!3m2!1sru!2s!4v1530175788725" frameborder="0"  style="border:0; width:50%; height: 50vh;" allowfullscreen></iframe>  </div>
          // <div class="pInfo">

          let div1 = <HTMLElement>document.getElementById("div1");
          div1.innerHTML = a;

          let up = <HTMLElement>document.getElementById("inputup");

          up.addEventListener("change", function(e:any) {
           let x: any = document.getElementById("inputup");

             let img = <HTMLElement>document.getElementById("img");
          
            var input = e.target;

            var reader = new FileReader();
            reader.onload = function(){
              var dataURL = reader.result;
             
              img.setAttribute("src", "" + dataURL);


              let cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);
              cartinfo[password].url=dataURL ;

              localStorage.setItem("cartinfo", JSON.stringify(cartinfo));



            
            };
            reader.readAsDataURL(input.files[0]);




          });

          AddLogin.getLocation(password);
        } else {
          if (!flag1) {
            document.forms[0]["psw"].style.border = "2px solid red";
          }

          if (!flag2) {
            document.forms[0]["uname"].style.border = "2px solid red";
          }
        }
      } else {
        alert("There are no registered people yet");
      }
    }

    logvaled() {
      let logval = document.forms[0]["uname"];
      let pasval = document.forms[0]["psw"];
      logval.style.border = "";
      pasval.style.border = "";

      let tes = /^\w{2,20}$/i.test(logval.value);
      let pas = /^\w{3,15}$/i.test(pasval.value);
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
    }
  }

  export class Registeret {
    addReg() {
      let b: string = "";

      b = `<form class="regform"  method="post"  action="">
        <div class="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr>
          <label for="nam"><b>Name</b></label>
          <input type="text" placeholder="Enter Name" name="nam" required>
          <label for="sur"><b>Surname</b></label>
          <input type="text" placeholder="Enter Surname" name="sur" required>
      
          <label for="yea"><b>Year</b></label>
          <select name="yea">
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
          <option value="1995">1995</option>
          <option value="1996">1996</option>
          <option value="1997">1997</option>
          <option value="1998">1998</option>
          <option value="1999">1991</option>
          <option value="2000">1992</option>
          <option value="2001">2001</option>
         
        </select>


          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required>
          <label for="use"><b>Usernam</b></label>
          <input type="text" placeholder="Enter Username" name="use" required>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" name="psw-repeat" required>
          <hr>
          <button type="button" id="setRegister" class="registerbtn">To Register</button>
        </div>
        
       
      </form>`;

      let myContainer = <HTMLElement>document.getElementById("divform");
      myContainer.innerHTML = b;
    }

    protected static getForm() {
      return {
        nam: document.forms[0]["nam"],
        sur: document.forms[0]["sur"],
        use: document.forms[0]["use"],
        yea: document.forms[0]["yea"],
        email: document.forms[0]["email"],
        psw: document.forms[0]["psw"],
        psw_repeat: document.forms[0]["psw-repeat"]
      };
    }

    protected static localadd() {
      let flag: boolean = true;

      type obj = {
        [password: string]: {
          name: string;
          surname: string;
          year: number;
          email: string;
          username: string;
          password: string;
          country?: string;
          city?: string;
        };
      };

      let cartinfo: obj = {};
      let form2 = Registeret.getForm();
      let val2 = {
        name: form2.nam.value,
        surname: form2.sur.value,
        year: +form2.yea.value,
        email: form2.email.value,
        username: form2.use.value,
        password: form2.psw.value
      };

      if (localStorage.getItem("cartinfo")) {
        cartinfo = JSON.parse(localStorage.getItem("cartinfo") as string);
      }

      for (let key in cartinfo) {
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
      } else {
        form2.psw.style.border = "2px solid red";
        form2.psw_repeat.style.border = "2px solid red";
        if (flag) {
          alert("this password has already been used choose another");
        } else {
          alert(
            "this password and username has already been used choose another"
          );
        }
      }
    }

    pasvaled() {
      let val = Registeret.getForm();

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

      let mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      let emailtest = mail.test(val.email.value);
      let pass1test = /^\w{3,15}$/i.test(val.psw.value);
      let pass2test = /^\w{3,15}$/i.test(val.psw_repeat.value);
      let namtest = /^[a-z]{2,20}$/i.test(val.nam.value);
      let surtest = /^\w{2,20}$/i.test(val.sur.value);
      let usetest = /^\w{2,20}$/i.test(val.use.value);

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
      if (
        emailtest &&
        pass1test &&
        pass2test &&
        namtest &&
        surtest &&
        usetest &&
        val.psw.value === val.psw_repeat.value
      ) {
        Registeret.localadd();
      }
    }
  }

  let log = new AddLogin();
  let pas = new Registeret();
  log.addLog();

  let Login = <HTMLElement>document.getElementById("setlog");
  Login.addEventListener("click", log.logvaled);

  butLogin.addEventListener("click", () => {
    let Login2 = <HTMLElement>document.getElementById("setlog");
    Login2.addEventListener("click", log.logvaled);
  });

  butRegister.addEventListener("click", () => {
    let passw = <HTMLElement>document.getElementById("setRegister");
    passw.addEventListener("click", pas.pasvaled);
  });
}
