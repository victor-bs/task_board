let loginc = 0;
for(var key in localStorage){
    if (key=='login') {
        loginc = 0;
        break
    }else{
        loginc = 1;
    }
}
if (loginc==1) {
    localStorage.setItem('login','')
}


$(".signup").css("display","none");

$(".s_s").click(function () {
    $(".signup").css("display","none");
    $(".login").css("display","block");
})
$(".l_s").click(function () {
    $(".signup").css("display","block");
    $(".login").css("display","none");
})

var id = Math.floor(Math.random()* 100)
var x = `https://picsum.photos/id/${id}/info`

$.getJSON(x,function (result,) {
    let p = result.download_url;
    localStorage.setItem("url",p)
});



if (localStorage.getItem("login")!=="") {
    window.location.replace("dashboard.html");
}

function signup() {
    let name = $("#name").val();
    let email = $("#email").val();
    let pass = $("#pass").val();
    let image = localStorage.getItem("url")
    let data = [name,pass,image]

    localStorage.setItem(email,JSON.stringify(data))
}


function login() {
    let email = $("#lemail").val();
    let pass = $("#lpass").val();
    let not = 0;
    let c = localStorage.length;
    console.log(c);
    for(var key in localStorage){
        if (key==email) {
            let x = localStorage.getItem(email)
            x = JSON.parse(x)
            if (pass==x[1]) {
                localStorage.setItem('login',email);
                $("#lform").attr('action','dashboard.html');
            } else {
                alert("Enter Valid Password");
            }
        }if(key!==email) {
            not = not + 1;
        }
    }
    console.log(not)
    if (not==c+6) {
        alert("Please Create a Account First");
    }
}