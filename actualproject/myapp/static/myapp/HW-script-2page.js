const occup_radio = document.querySelector(".radio");
const occup_dots = document.querySelectorAll(".radio-select-dot");
const HSE_relation = document.querySelector("#HSE_relation");

const Kurs_box = document.querySelector("#Kurs_box");
const kurs_btns = document.querySelectorAll('.kurs-button');
const no_kurs = document.querySelector(".no-kurs-but");
const Occ_ref = document.querySelector("#Occ_ref");
const Kurs_ref = document.querySelector("#Kurs_ref");

const EduLevel = document.querySelector("#EduLevel");
const Facult = document.querySelector("#Facult");
const Prog = document.querySelector("#Prog");
const Job = document.querySelector("#job");
const Ed_ref = document.querySelector("#Ed_ref");
const Fac_ref = document.querySelector("#Fac_ref");
const Pr_ref = document.querySelector("#Pr_ref");
const Job_ref = document.querySelector("#Job_ref");
const datalists = document.querySelectorAll(".list-input");
const list_options = document.querySelectorAll(".option");

const Edu_arrow = document.querySelector("#Edu_arrow");
const Facult_arrow = document.querySelector("#Facult_arrow");

const continue_butt = document.querySelector("#continue-butt");

const Kurs_preview = document.querySelector("#kurs-preview");
const Kurs_full = document.querySelector("#kurs");
const Job_preview = document.querySelector(".job-preview");

let kurs_chosen = false;
let which_kurs = -1;
let HSE_finished= false;
let occup_chosen = false;
let correct_Edu = ["Основное общее","Среднее общее","Среднее профессиональное","Бакалавриат","Магистратура"]; 
let correct_Facult = ["ФКН", "ВШБ","ФП","ФД", "МИЭМ"];
let correct_Prog = ["ИТСС","ИБ","ИВТ","ЭБ","ПИ"];

/* Инпуты и части превью с данными прошлой страницы */
const Name = document.querySelector("#your_name");
const Gender = document.querySelector("#gender");
const Birth_date = document.querySelector("#birth_date");
const Telega = document.querySelector("#telega");
const Phone = document.querySelector("#phone_num");
const O_sebe = document.querySelector("#O_sebe");
/* const Photo = document.querySelector('#profile_pic'); */

const account_preview = document.querySelector(".account-preview");
const Extend_o_sebe_but = document.querySelector("#extend_o_sebe_but");
const Extend_arrow = document.querySelector(".Extend_arr");
const Photo_preview = document.querySelector(".photo-preview");
const Name_preview = document.querySelector("#Name_preview");
const Gender_preview = document.querySelector("#gender-preview");
const Age_preview = document.querySelector("#age-preview");
const O_sebe_preview = document.querySelector(".o-sebe-preview");
let arrow_upside_down=false;
const currentDate = new Date();



function calculateAge (birthDate) {
    birthDate = new Date(birthDate);
    var years = (currentDate.getFullYear() - birthDate.getFullYear());
    if (currentDate.getMonth() < birthDate.getMonth() ||
        currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
}

try{
    x=localStorage.getItem('reset_flag');
    if (x){
        localStorage.clear();
    }
}
catch{}

try{/* Заполнение превью */
imageUrl=localStorage.getItem('picture');
Photo_preview.style.cssText = "background:url(" + imageUrl + ") no-repeat;background-size: contain; background-position: center center; border:0px;";
Name_preview.innerHTML=localStorage.getItem('name');
Gender_preview.innerHTML=localStorage.getItem('gender');
Age_preview.innerHTML=localStorage.getItem('age');
O_sebe_preview.innerHTML=localStorage.getItem('o_sebe');

/* Заполнение скрытых инпутов для формы */
Name.value=localStorage.getItem('name');
Gender.value=localStorage.getItem('gender');
date=localStorage.getItem('birth_date');
Birth_date.value=date[6]+date[7]+date[8]+date[9]+"-"+date[3]+date[4]+"-"+date[0]+date[1];
Telega.value=localStorage.getItem('telega');
Phone.value=localStorage.getItem('phone_num');
O_sebe.value=localStorage.getItem('o_sebe');}
catch{
    alert("Первая страница не была заполнена");
    Name_preview.innerHTML="Иван Иванов";
    Gender_preview.innerHTML="Пол";
    Age_preview.innerHTML="Возраст";
    O_sebe_preview.innerHTML="Мне очень нравится...";
}
/* "Развернуть" в превью аккаунта  */
Extend_o_sebe_but.addEventListener("click", but =>{
    if (arrow_upside_down){
        O_sebe_preview.style.cssText="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; transition:0.3s;";
        Extend_arrow.style.cssText="rotate:0deg; transition:0.3s";
        account_preview.style.height="fit-content";
        arrow_upside_down=false;
    }
    else{
        O_sebe_preview.style.cssText="max-height: 500px; height: fit-content; overflow: visible; text-overflow:clip; white-space: normal; transition:0.3s; word-wrap: break-word;";
        Extend_arrow.style.cssText="rotate:180deg; transition:0.3s";
        let acc_height= positionInfo = account_preview.getBoundingClientRect().height;
        let sebe_height= positionInfo = O_sebe_preview.getBoundingClientRect().height;
        if (sebe_height>30){
            account_preview.style.height=acc_height+sebe_height-30+"px";
        }
        arrow_upside_down=true;
    }
})


datalists.forEach(list => {
    list.style.display = "none";
})

occup_radio.addEventListener("click", note => {
    occup_radio.style.cssText="width:350px; height:30px; border-radius:5px; padding: 3px; background-color:white; transition: 0.3s;";
    occup_dots.forEach(dot =>{
        dot.style.cssText="background-color: white; transition:0.3s";
    })
    HSE_relation.value=note.target.value;
})

/* измен. при наведении и нажатии курса */
kurs_btns.forEach(btn => {
    btn.addEventListener("mouseenter", (e) =>{
        if (e.target.style.color!="white"){
            e.target.style.cssText = "background-color: #a9a9a9; box-shadow: 0px 0px 5px 0px rgba(211, 211, 211, 0.806); transition:0.2s;";
        }
    })
    btn.addEventListener("mouseleave", (e) =>{
        if (e.target.style.color!="white"){
            e.target.style.cssText = "background-color: #e7e7e7; box-shadow: 0px 0px 5px 0px #e7e7e7; transition:0.2s;";
        }
    })
	btn.addEventListener('click', (e) => {
        kurs_btns.forEach(bt => {
            bt.style.cssText="background-color: #e7e7e7; color:black; transition:0.4s;";
        })
        no_kurs.style.cssText="background-color:#e7e7e7; transition:0.4s;";
		e.target.style.cssText = "background-color: rgb(109, 0, 181); color: white; transition:0.4s;";
        Kurs_box.style.cssText="background-color: #e7e7e7; border:solid 0px red; width: fit-content; padding: 10px; border-radius:10px; transition: 0.3s";
        kurs_chosen=true;
        which_kurs=btn.innerHTML;
        if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(occup_chosen==true)){
            continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
        }
        else{
            continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
        }
        Check_Education_Info_Fill_Preview(btn);
        HSE_finished=false;
	})
})
no_kurs.addEventListener("click", (e) => {
    kurs_btns.forEach(bt => {
        bt.style.cssText="background-color: #e7e7e7; color:black; transition:0.4s;";
    })
    Kurs_box.style.cssText="background-color: #e7e7e7; border:solid 0px red; width: fit-content; padding: 10px; border-radius:10px; transition: 0.3s";
    e.target.style.cssText="background-color: rgb(109, 0, 181); border: 0px; transition:0.4s;";
    kurs_chosen=true;
    which_kurs=0;
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(occup_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
    Kurs_preview.innerHTML="Закончил Вышку";
    HSE_finished=true;
})

/* проверка выбора Студент/выпуск... */
occup_radio.addEventListener("click", e =>{
    occup_chosen=true;
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 1s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 1s;";
    }
})

/* Не мой код, его самого не изменял, но много дополнений в остальном коде для его правильной работы */
function fancyDropdown(inputId){
    id = document.getElementById(inputId);
    datalist = id.nextElementSibling;
  var minWidth = datalist.offsetWidth;
    
  function outputsize(){
    if (id.offsetWidth < minWidth ){
      datalist.style.minwidth = id.offsetWidth+'px';
    }else{
      datalist.style.width = id.offsetWidth+'px';
    }
  }

  new ResizeObserver(outputsize).observe(id);

  id.addEventListener("input", function(e){
    datalist.style.display = "block";
    var text = id.value.toUpperCase();
    let hide = 1;
    for (let option of datalist.options) {
      if(option.value.toUpperCase().indexOf(text) > -1){
        option.style.display = "block";
        hide = 0;
      }else{
        option.style.display = "none";
      }
    }
    if (hide){
        datalist.style.display = "none";
    }
  });

  id.addEventListener("click", function(e){
  
    let hide = 1;
    for (let option of datalist.options) {
        if (window.getComputedStyle(option, null).display == "block") hide = 0;
    }
  
    if (datalist.style.display == "block" || hide == 1){
      datalist.style.display = "none";
    }else{
      datalist.style.display = "block";
    }
  });
  
  document.addEventListener("click", function(e){

    if (e.target.tagName == "OPTION"){
      id.value = e.target.value;
    }
    if (e.target.tagName !== "DATALIST" && e.target.tagName !== "INPUT"){
      datalist.style.display = "none";
    }

  });

    datalist.style.display = "none";
}

/* Чтобы списки были только у одного */
EduLevel.addEventListener("click", e => {
    datalists[0].style.display="block";
    datalists[1].style.display="none";
    datalists[2].style.display="none";
    fancyDropdown('EduLevel');
    Edu_arrow.style.cssText="rotate:180deg; transition:0.3s";
})
Facult.addEventListener("click", e => {
    datalists[1].style.display="block";
    datalists[0].style.display="none";
    datalists[2].style.display="none";
    fancyDropdown('Facult');
    Facult_arrow.style.cssText="rotate:180deg; transition:0.3s";
})
Prog.addEventListener("click", e => {
    datalists[2].style.display="block";
    datalists[1].style.display="none";
    datalists[0].style.display="none";
    fancyDropdown('Prog');
})

/* Проверка для кнопки continue, возвращения от крсаного и изменения превью у Job*/
EduLevel.addEventListener("change", e =>{
    Edu_arrow.style.cssText="rotate:0deg; transition:0.3s";
    Facult_arrow.style.cssText="rotate:0deg; transition:0.3s";
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
    EduLevel.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;";
    Check_Education_Info_Fill_Preview();
})
Facult.addEventListener("change", e =>{
    Edu_arrow.style.cssText="rotate:0deg; transition:0.3s";
    Facult_arrow.style.cssText="rotate:0deg; transition:0.3s";
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
    Facult.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;";
    Check_Education_Info_Fill_Preview();
})
Prog.addEventListener("change", e =>{
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
    Prog.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;";
    Check_Education_Info_Fill_Preview();
})
Job.addEventListener("change", e =>{
    if((EduLevel.value!="")&&(Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
    Job.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;";
    Job_preview.innerHTML=Job.value;
    Job_preview.style.cssText="width: fit-content; transition: 1s;";
})
list_options.forEach(option =>{
    option.addEventListener("click", opt =>{
        Edu_arrow.style.cssText="rotate:0deg; transition:0.3s";
        Facult_arrow.style.cssText="rotate:0deg; transition:0.3s";

        /* Почему-то при клике value не обновляется прям сразу, поэтому для каждого листа убираем проверку заполненности */
        /* Позже заменил ссылки на листы на ссылки на опции, чтобы знать выбранные value для превью */
        if (option.parentNode.id=="EduLevel"){
            if((Facult.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
            }
            else{
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
            }
            Check_Education_Info_Fill_Preview(option);
        }
        if (option.parentNode.id=="Prog"){
            if((Facult.value!="")&&(EduLevel.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
            }
            else{
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
            }
            Check_Education_Info_Fill_Preview(option);
        }
        if (option.parentNode.id=="Facult"){
            if((EduLevel.value!="")&&(Prog.value!="")&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true)){
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
            }
            else{
                continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
            }
            Check_Education_Info_Fill_Preview(option);
        }
    })
})
/* Для возвращения к стандартному виду от красного по нажатию в листе */
datalists[0].addEventListener("click", e=>{
    EduLevel.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;"
})
datalists[1].addEventListener("click", e=>{
    Facult.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;"
})
datalists[2].addEventListener("click", e=>{
    Prog.style.cssText="border:solid 0px red; background-color: #ececec; transition: 0.3s;"
})


/* Две функции, отличие в комменте: Обязательное поле и Неподходящие данные, для первых отдельные поправки у курса и занятости */
function MakeRed_NoInp(InputId, pos_ref){
    const notice = document.createElement("span");
    /* Нужно добавить места после Prog, но почему-то не применяется окрашивание тогда, поэтому для него свои поправки style здесь */
    if (InputId==Prog){
        Prog.style.cssText="margin-bottom:20px; border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
        notice.innerHTML = `
        <span style="position: absolute; left:270px; top:60px; color:red; width:150px; transition: 0.3s;">
            Обязательное поле
        </span>`;
        pos_ref.appendChild(notice);
        Prog.addEventListener("change", e =>{
            Prog.style.cssText="margin-bottom:20px; transition:0.3;"
            try{notice.parentNode.removeChild(notice);}catch{}
        })
        datalists[2].addEventListener("click", e=>{
            Prog.style.cssText="margin-bottom:20px; transition:0.3;"
            try{notice.parentNode.removeChild(notice);}catch{}
        })
    }
    else if (InputId==occup_radio){
        occup_radio.style.cssText="padding: 3px; border-radius: 5px; width:350px; height:30px; border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
        notice.innerHTML = `
        <span style="position: absolute; left:155px; top:34px; color:red; width:150px; transition: 0.3s;">
            Обязательное поле
        </span>`;
        occup_dots.forEach(dot =>{
            dot.style.cssText="background-color: rgb(0, 0, 0, 0); transition: 0.3;";
        })
        pos_ref.appendChild(notice);
        occup_radio.addEventListener("click", oe =>{
            try{notice.parentNode.removeChild(notice);}catch{};
        })
    }
    else if (InputId==Kurs_box){
        Kurs_box.style.cssText="background-color: rgb(196, 126, 126, 0.5); border:solid 2px red; width: fit-content; padding: 10px; border-radius:10px;";
        no_kurs.style.cssText="min-height: 19px; min-width: 19px; border-radius:3px; border: solid 1.5px red; background-color: rgb(196, 126, 126, 0.5);";
        notice.innerHTML = `
        <span style="position: absolute; left:200px; top:85px; color:red; width:150px; transition: 0.3s;">
            Обязательное поле
        </span>`;
        pos_ref.appendChild(notice);
        kurs_btns.forEach(btn =>{
            btn.addEventListener("click", oe =>{
                try{notice.parentNode.removeChild(notice);}catch{}
            })
        })
        no_kurs.addEventListener("click", oe =>{
            try{notice.parentNode.removeChild(notice);}catch{}
        })
    }
    else if (InputId==Job){
        Job.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
        notice.innerHTML = `
        <span style="position: absolute; left:270px; top:42px; color:red; width:150px; transition: 0.3s;">
            Обязательное поле
        </span>`;
        pos_ref.appendChild(notice);
        Job.addEventListener("change", e =>{
            try{notice.parentNode.removeChild(notice);}catch{}
        })
    }
    else{
        InputId.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
        notice.innerHTML = `
        <span style="position: absolute; left:270px; top:60px; color:red; width:150px; transition: 0.3s;">
            Обязательное поле
        </span>`;
        pos_ref.appendChild(notice);
        InputId.addEventListener("change", e =>{
            try{notice.parentNode.removeChild(notice);}catch{}
        })
        if (InputId==EduLevel){
            datalists[0].addEventListener("click", e=>{
                try{notice.parentNode.removeChild(notice);}catch{}
            })
        }
        else{
            datalists[1].addEventListener("click", e=>{
                try{notice.parentNode.removeChild(notice);}catch{}
            })
        }
    }
}
function MakeRed_WrongInp(InputId, pos_ref){
    InputId.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
    /* Нужно добавить места после Prog, но почему-то не применяется окрашивание тогда, поэтому для него повтор style здесь */
    if (InputId==Prog){
        Prog.style.cssText="margin-bottom:20px; border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
    }
    const notice = document.createElement("span");
    notice.innerHTML = `
    <span style="position: absolute; left:242px; top:60px; color:red; width:200px; transition: 0.3s;">
        Неподходящие данные
    </span>`;
    pos_ref.appendChild(notice);
    InputId.addEventListener("change", e =>{
        try{notice.parentNode.removeChild(notice);}catch{};
    })
    if (InputId==EduLevel){
        datalists[0].addEventListener("click", e=>{
            try{notice.parentNode.removeChild(notice);}catch{};
        })
    }
    else if (InputId==Facult){
        datalists[1].addEventListener("click", e=>{
            try{notice.parentNode.removeChild(notice);}catch{};
        })
    }
    else if (InputId==Prog){
        datalists[2].addEventListener("click", e=>{
            try{notice.parentNode.removeChild(notice);}catch{};
        })
    }
}

/* Проверка и заполнение образования в превью */
function Check_Education_Info_Fill_Preview(option_click_value){
    if (which_kurs==0){
        Kurs_preview.innerHTML="Закончил Вышку";
    }
    else{
        let corr_Edu_flag=false;
        let corr_Prog_flag=false;
        let corr_Facult_flag=false;
        correct_Edu.forEach(e =>{
            if(EduLevel.value==e){
                corr_Edu_flag=true;
            }
        })
        correct_Facult.forEach(e =>{
            if(Facult.value==e){
                corr_Facult_flag=true;
            }
        })
        correct_Prog.forEach(e =>{
            if(Prog.value==e){
                corr_Prog_flag=true;
            }
        })
        console.log(kurs_chosen, corr_Edu_flag, corr_Facult_flag, corr_Prog_flag);


        /* Так как при нажатии в списке это запускается раньше обновления .value, прописаны исключения */
        if(kurs_chosen&&corr_Edu_flag&&corr_Facult_flag&&(option_click_value.parentNode.id=="Prog")){
            education=which_kurs+" курс "+EduLevel.value+" "+Facult.value+" "+option_click_value.value;
            Kurs_preview.innerHTML=education;
        }
        else if(kurs_chosen&&corr_Edu_flag&&corr_Prog_flag&&(option_click_value.parentNode.id=="Facult")){
            education=which_kurs+" курс "+EduLevel.value+" "+option_click_value.value+" "+Prog.value;
            Kurs_preview.innerHTML=education;
        }
        else if(kurs_chosen&&corr_Prog_flag&&corr_Facult_flag&&(option_click_value.parentNode.id=="EduLevel")){
            education=which_kurs+" курс "+option_click_value.value+" "+Facult.value+" "+Prog.value;
            Kurs_preview.innerHTML=education;
        }
        else if (kurs_chosen&&corr_Edu_flag&&corr_Facult_flag&&corr_Prog_flag){
            education=which_kurs+" курс "+EduLevel.value+" "+Facult.value+" "+Prog.value;
            Kurs_preview.innerHTML=education;
        }
        else{
            Kurs_preview.innerHTML="Недостаточно данных";
        }
    }
    Kurs_full.value=Kurs_preview.innerHTML;
}

/* Проверка правильности ввода */
continue_butt.addEventListener("click", but =>{
    let corr_Edu_flag=false;
    let corr_Prog_flag=false;
    let corr_Facult_flag=false;

    correct_Edu.forEach(e =>{
        if(EduLevel.value==e){
            corr_Edu_flag=true;
        }
    })
    correct_Facult.forEach(e =>{
        if(Facult.value==e){
            corr_Facult_flag=true;
        }
    })
    correct_Prog.forEach(e =>{
        if(Prog.value==e){
            corr_Prog_flag=true;
        }
    })

    if((corr_Edu_flag&&corr_Facult_flag&&corr_Prog_flag&&(Job.value!="")&&(kurs_chosen==true)&&(occup_chosen==true))||(HSE_finished&&(Job.value!="")&&kurs_chosen&&occup_chosen)){
        but.preventDefault();
        if(Gender_preview.innerHTML=="Пол"){
            alert("Первая страница не была заполнена");
        }
        else{
            postData();
        }
    }
    else{
        but.preventDefault();
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
        if ((EduLevel.value=="")&&(HSE_finished==false)){
            MakeRed_NoInp(EduLevel, Ed_ref);
        }
        else if ((corr_Edu_flag==false)&&(HSE_finished==false)){
            MakeRed_WrongInp(EduLevel, Ed_ref);
        }

        if ((Facult.value=="")&&(HSE_finished==false)){
            MakeRed_NoInp(Facult, Fac_ref);
        }
        else if ((corr_Facult_flag==false)&&(HSE_finished==false)){
            MakeRed_WrongInp(Facult, Fac_ref);
        }

        if ((Prog.value=="")&&(HSE_finished==false)){
            MakeRed_NoInp(Prog, Pr_ref);
        }
        else if ((corr_Prog_flag==false)&&(HSE_finished==false)){
            MakeRed_WrongInp(Prog, Pr_ref);
        }

        if (Job.value==""){
            MakeRed_NoInp(Job, Job_ref);
        }

        /* заянтость и курс */
        if (occup_chosen!=true){
            MakeRed_NoInp(occup_radio, Occ_ref);
        }

        if (kurs_chosen!=true){
            MakeRed_NoInp(Kurs_box, Kurs_ref);
        }
    }
})

function postData() {
    const form2 = new FormData(document.getElementById("form2"));
    for (var pair of form2.entries()) {
    }
    fetch('/myapp/api/users/', {
        method: 'POST',
        body: form2
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("reset_flag", true);
        alert('User data saved successfully!');
        window.location.href = "thirdpage";
    })
    .catch(error => {
        if (response.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.error('Error:', error);
    });
}