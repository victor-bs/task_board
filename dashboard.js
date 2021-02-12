$(".addlist").click(function () {
    $(".menu_div").css("display","none");
    $(".addlist_a").css("display","block");
})
$(".addlist_close").click(function () {
    $(".addlist_a").css("display","none");
})



if (navigator.onLine) {
    let x = localStorage.getItem(localStorage.getItem('login'))
    x = JSON.parse(x)
    x = x[2]
    $('.menu img').attr('src',x);
    $('.profile img').attr('src',x);
}

$('.logout a').click(function () {
    localStorage.setItem('login','');
})


$(".menu").click(function () {
    $(".menu_div").css("display","block");
})
$(".logout a").click(function () {
    alert("Logout Successfully");
})



let datak = localStorage.getItem(localStorage.getItem('login'))
datak = JSON.parse(datak)
datak = datak[0]

let datac = 0;
for(var key in localStorage){
    if (key==`${datak}_data`) {
        datac = 0;
        break
    }else{
        datac = 1;
    }
}
if (datac==1) {
    localStorage.setItem(`${datak}_data`,'')
}
var data = new Object;
if (localStorage.getItem(`${datak}_data`)!=='') {
    var data = JSON.parse(localStorage.getItem(`${datak}_data`))
}



let count = 0;

for (let i in data) {
    $('.body').append(`<div class='${i} list'><h2>${data[i]['listname']}</h2>
        <i class="fa fa-trash delete_l"><p class="info">${count+1}</p></i>
        <button class="add_task">Add Task<span>${count+1}</span></button></div>`
    );
    
    for(let x=0; x<data[i]['taskname'].length; x++){
        
        $(`.${i}`).append(`<div class="task"><h3>${data[i]['taskname'][x]}</h3>
            <i class="fa fa-trash"><p class="info_t">${count+1}${x}</p></i>
            <p class="tvalue">${data[i]['taskvalue'][x]}</p>
            <p class="tdate">${data[i]['taskdate'][x]}</p>
            </div>`
        );
    }
    count++;
}


$('.list_btn').click(function () {
    let x = $('#list_name').val();
    console.log(x)
    if (x=='') {
        alert("Enter List Name");
    } else {
        data[`list${count+1}`] = {
            listname:`${x}`,
            taskname:[],
            taskvalue:[],
            taskdate:[]
        };
        localStorage.setItem(`${datak}_data`,JSON.stringify(data))
        location.reload()
    }

    
})


$('.list .delete_l').click(function () {
    let x = $(this).text();
    x = Number(x)
    console.log(x)


    const del = count;
    
    for (let index = x; index <= del; index++) {
        data[`list${index}`] = data[`list${index+1}`]
        
    }
    
    delete data[`list${del}`];
    
    localStorage.setItem(`${datak}_data`,JSON.stringify(data))
    location.reload()
    
})
let ad;
$(".add_task").click(function () {
    $(".addtask").css("display","block");
    ad = $(this).text();
})
$(".addtask_close").click(function () {
    $(".addtask").css("display","none");
})

$('.task_btn').click(function () {
    let n = $('#task_name').val();
    let v = $('#task_value').val();
    let d = $('#task_date').val();
    list = ad.slice(8,)
    let pos = data[`list${list}`]['taskname'].length

    if (n=='') {
        alert("Enter List Name");
    } else {
        data[`list${list}`]['taskname'][pos] = n;
        data[`list${list}`]['taskvalue'][pos] = v;
        data[`list${list}`]['taskdate'][pos] = d;
        localStorage.setItem(`${datak}_data`,JSON.stringify(data))
        location.reload()
    }

})



$('.task i').click(function () {
    let x = $(this).text();
    let p = x.length;
    let list = x.slice(0,p/2)
    list = Number(list)
    let task = x.slice(p/2,)
    task = Number(task)
    const pos = data[`list${list}`]['taskname'].length

    for (let index = task; index < pos; index++) {
        
        data[`list${list}`]['taskname'][index] = data[`list${list}`]['taskname'][index+1];
        data[`list${list}`]['taskvalue'][index] = data[`list${list}`]['taskvalue'][index+1];
        data[`list${list}`]['taskdate'][index] = data[`list${list}`]['taskdate'][index+1];
    }

    data[`list${list}`]['taskname'].pop();
    data[`list${list}`]['taskvalue'].pop();
    data[`list${list}`]['taskdate'].pop();

    localStorage.setItem(`${datak}_data`,JSON.stringify(data))
    location.reload()
})

$('.task').click(function () {
    $(this).toggleClass("taskc");
})