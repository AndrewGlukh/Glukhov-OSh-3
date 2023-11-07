const Photo_input = document.querySelector("#photo_input");
const Name_input = document.querySelector("#Name");

const Female_radio = document.querySelector("#Female_radio");
const Male_radio = document.querySelector("#Male_radio");
const Gender_radio = [Male_radio,Female_radio];
const gender_dots = document.querySelectorAll(".radio-select-dot");

const Birth_input = document.querySelector("#Birth_date_inp");
const Calendar_icon = document.querySelector("#Calendar_icon");
const currentDate = new Date();

const Telegram_input = document.querySelector("#telegram");
const Phone_input = document.querySelector("#phone-num")
const O_sebe_textbox = document.querySelector(".o-sebe-form");

const Photo_ref = document.querySelector(".photo-box");
const Under_photo_text = document.querySelector(".input-file-text");
const Name_ref = document.querySelector("#Name_ref");
const Radio_ref = document.querySelector(".radio");
const Teleg_ref = document.querySelector("#Teleg_ref");
const Phone_ref = document.querySelector("#Phone_ref");
const Birth_ref = document.querySelector("#Date_ref");
let o_sebe_notice_exists=false;

const account_preview = document.querySelector(".account-preview");
const Photo_preview = document.querySelector(".photo-preview");
const Name_preview = document.querySelector("#Name_preview");
const Gender_preview = document.querySelector("#gender-preview");
const Age_preview = document.querySelector("#age-preview");
const O_sebe_preview = document.querySelector(".o-sebe-preview");
const Extend_o_sebe_but = document.querySelector("#extend_o_sebe_but");
const Extend_arrow = document.querySelector(".Extend_arr");
let arrow_upside_down=false;

const continue_butt = document.querySelector("#continue-butt");

const numbers=["0","1","2",'3','4','5','6','7','8','9'];
let gender_chosen = false;
let Name_correct = false;
let Telegram_correct = false;
let Phone_correct = false;
let Date_correct = false;
let Photo_chosen = false;

function check_Continue_Button(){
    if (Photo_chosen&&gender_chosen&&(Name_input.value!="")&&(Telegram_input.value!="")&&(Phone_input.value!="")&&(Birth_input.value!="")&&(O_sebe_textbox.value!="")){
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 1); transition: 0.3s;";
    }
    else{
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";
    }
}
function calculateAge (birthDate) {
    birthDate = new Date(birthDate);
    var years = (currentDate.getFullYear() - birthDate.getFullYear());
    if (currentDate.getMonth() < birthDate.getMonth() ||
        currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Месяц буквами в месяц числом, для цифр 0 в начале */
function month_word_to_number(month_word){
    if(month_word=="Январь"){
        return "01";
    }
    else if(month_word=="Февраль"){
        return "02";
    }
    else if(month_word=="Март"){
        return "03";
    }
    else if(month_word=="Апрель"){
        return "04";
    }
    else if(month_word=="Май"){
        return "05";
    }
    else if(month_word=="Июнь"){
        return "06";
    }
    else if(month_word=="Июль"){
        return "07";
    }
    else if(month_word=="Август"){
        return "08";
    }
    else if(month_word=="Сентябрь"){
        return "09";
    }
    else if(month_word=="Октябрь"){
        return "10";
    }
    else if(month_word=="Ноябрь"){
        return "11";
    }
    else if(month_word=="Декабрь"){
        return "12";
    }
}
/* Для чисел месяца добавляет 0 в начале где надо */
function single_digit_to_date(singledigit){
    if (singledigit.length==1){
        return "0"+singledigit
    }
    else{
        return singledigit
    }
}

/* Создает календарик и почти всю логику с ним связанную */
function CreateCalendar(ParentInput){
    let chosen_year=0;
    let chosen_month=0;
    let chosen_day=0;
    let years_exists=false;
    let months_exists=false;
    let days_exists=false;
    const years = document.createElement("span");
    const months = document.createElement("span");
    const days = document.createElement("span");

    /* Чтобы при нажатии вне календаря/ввода даты календарь удалялся */
    const body = document.querySelector("#body");
    body.addEventListener("click", q=>{
        if (years_exists&&!(years.contains(q.target))&&!(months.contains(q.target))&&!(days.contains(q.target))&&!(Calendar_icon.contains(q.target))&&!(Birth_input.contains(q.target))){
            years.parentNode.removeChild(years);
            years_exists=false;
        }
        if (months_exists&&!(years.contains(q.target))&&!(months.contains(q.target))&&!(days.contains(q.target))&&!(Calendar_icon.contains(q.target))&&!(Birth_input.contains(q.target))){
            months.parentNode.removeChild(months);
            months_exists=false;
        }
        if (days_exists&&!(years.contains(q.target))&&!(months.contains(q.target))&&!(days.contains(q.target))&&!(Calendar_icon.contains(q.target))&&!(Birth_input.contains(q.target))){
            days.parentNode.removeChild(days);
            days_exists=false;
        }
    })

    years.innerHTML = `
<span style="background-color: white; overflow-y: scroll; position: absolute; border-radius:20px; left:280px; top:0px; width:270px; height:200px; transition: 0.2s; box-shadow: 0px 0px 10px 0px rgba(146, 146, 146, 0.806); z-index:2;">
    <span style="display: flex; margin-top:5px;">
        <span style="display: flex; flex-direction:column; margin-left:12px;">
            <button type="button" class="year-but">1976</button>
            <button type="button" class="year-but">1980</button>
            <button type="button" class="year-but">1984</button>
            <button type="button" class="year-but">1988</button>
            <button type="button" class="year-but">1992</button>
            <button type="button" class="year-but">1996</button>
            <button type="button" class="year-but">2000</button>
            <button type="button" class="year-but">2004</button>
            <button type="button" class="year-but">2008</button>
            <button type="button" class="year-but">2012</button>
            <button type="button" class="year-but">2016</button>
            <button type="button" class="year-but">2020</button>
        </span>
        <span style="display: flex; flex-direction:column;">
            <button type="button" class="year-but">1977</button>
            <button type="button" class="year-but">1981</button>
            <button type="button" class="year-but">1985</button>
            <button type="button" class="year-but">1989</button>
            <button type="button" class="year-but">1993</button>
            <button type="button" class="year-but">1997</button>
            <button type="button" class="year-but">2001</button>
            <button type="button" class="year-but">2005</button>
            <button type="button" class="year-but">2009</button>
            <button type="button" class="year-but">2013</button>
            <button type="button" class="year-but">2017</button>
            <button type="button" class="year-but">2021</button>
        </span>
        <span style="display: flex; flex-direction:column;">
            <button type="button" class="year-but">1978</button>
            <button type="button" class="year-but">1982</button>
            <button type="button" class="year-but">1986</button>
            <button type="button" class="year-but">1990</button>
            <button type="button" class="year-but">1993</button>
            <button type="button" class="year-but">1997</button>
            <button type="button" class="year-but">2002</button>
            <button type="button" class="year-but">2006</button>
            <button type="button" class="year-but">2010</button>
            <button type="button" class="year-but">2014</button>
            <button type="button" class="year-but">2018</button>
            <button type="button" class="year-but">2022</button>
        </span>
        <span style="display: flex; flex-direction:column;">
            <button type="button" class="year-but">1979</button>
            <button type="button" class="year-but">1983</button>
            <button type="button" class="year-but">1987</button>
            <button type="button" class="year-but">1991</button>
            <button type="button" class="year-but">1995</button>
            <button type="button" class="year-but">1999</button>
            <button type="button" class="year-but">2003</button>
            <button type="button" class="year-but">2007</button>
            <button type="button" class="year-but">2011</button>
            <button type="button" class="year-but">2015</button>
            <button type="button" class="year-but">2019</button>
            <button type="button" class="year-but">2023</button>
        </span>
    </span>
</span>`;

/* Так как при смене выбранного года нужно менять следующие объекты, я сделал объявления 
и все связанные вещи вложенными в предыдущие объявления
Можно попрбовать запихнуть это в свои функции или добавлять в innerHTML айдишники и их innerHTML находить и менять, но пока так */
    if (years_exists){
        years.parentNode.removeChild(years);
    }
    insertAfter(ParentInput, years);
    years_exists=true;
    const year_butns = document.querySelectorAll(".year-but");
    year_butns.forEach(bt=>{
        bt.addEventListener("mouseenter", (e) =>{
            if (e.target.innerHTML!=chosen_year){
                e.target.style.cssText = "background-color: #ececec;";
            }
        })
        bt.addEventListener("mouseleave", (e) =>{
            if (e.target.innerHTML!=chosen_year){
                e.target.style.cssText = "background-color: white;";
            }
        })
        bt.addEventListener("click", e=>{
            year_butns.forEach(b=>{
                b.style.cssText="background-color:white;";
            })
            e.target.style.cssText="background-color:#e7e7e7;";
            chosen_year=e.target.innerHTML;
            if (months_exists){
                months.parentNode.removeChild(months);
            }


            months.innerHTML = `
            <span style="text-align: center; color: rgb(109, 0, 181); padding-top:5px; background-color: white; position: absolute; border-radius:20px; left:280px; top:210px; width:270px; height:190px; transition: 0.2s; box-shadow: 0px 0px 10px 0px rgba(146, 146, 146, 0.806); z-index:2;">
                `+chosen_year+`
                <span style="display: flex; margin-top:5px;">
                    <span style="display: flex; flex-direction:column; margin-left:8px;">
                        <button type="button" class="month-but">Январь</button>
                        <button type="button" class="month-but">Апрель</button>
                        <button type="button" class="month-but">Июль</button>
                        <button type="button" class="month-but">Октябрь</button>
                    </span>
                    <span style="display: flex; flex-direction:column;">
                        <button type="button" class="month-but">Февраль</button>
                        <button type="button" class="month-but">Май</button>
                        <button type="button" class="month-but">Август</button>
                        <button type="button" class="month-but">Ноябрь</button>
                    </span>
                    <span style="display: flex; flex-direction:column;">
                        <button type="button" class="month-but">Март</button>
                        <button type="button" class="month-but">Июнь</button>
                        <button type="button" class="month-but">Сентябрь</button>
                        <button type="button" class="month-but">Декабрь</button>
                    </span>
                </span>
            </span>`;
            /* Здесь объявление days нужно для обновления года при всех открытых окошках и нажатии в years */
            days.innerHTML = `
                    <span style="text-align: center; color: rgb(109, 0, 181); padding-top:5px; background-color: white; position: absolute; border-radius:20px; left:280px; top:420px; width:270px; height:240px; transition: 0.2s; box-shadow: 0px 0px 10px 0px rgba(146, 146, 146, 0.806);z-index:2;">
                        `+chosen_month+" "+chosen_year+`
                        <span style="display: flex; margin-top:5px;">
                            <span style="display: flex; flex-direction:column; margin-left:8px;">
                                <button type="button" class="day-but">1</button>
                                <button type="button" class="day-but">8</button>
                                <button type="button" class="day-but">15</button>
                                <button type="button" class="day-but">22</button>
                                <button type="button" class="day-but">29</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">2</button>
                                <button type="button" class="day-but">9</button>
                                <button type="button" class="day-but">16</button>
                                <button type="button" class="day-but">23</button>
                                <button type="button" class="day-but">30</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">3</button>
                                <button type="button" class="day-but">10</button>
                                <button type="button" class="day-but">17</button>
                                <button type="button" class="day-but">24</button>
                                <button type="button" class="day-but">31</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">4</button>
                                <button type="button" class="day-but">11</button>
                                <button type="button" class="day-but">18</button>
                                <button type="button" class="day-but">25</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">5</button>
                                <button type="button" class="day-but">12</button>
                                <button type="button" class="day-but">19</button>
                                <button type="button" class="day-but">26</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">6</button>
                                <button type="button" class="day-but">13</button>
                                <button type="button" class="day-but">20</button>
                                <button type="button" class="day-but">27</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">7</button>
                                <button type="button" class="day-but">14</button>
                                <button type="button" class="day-but">21</button>
                                <button type="button" class="day-but">28</button>
                            </span>
                        </span>
                    </span>`;


            insertAfter(years, months);
            months_exists=true;
            const month_butns = document.querySelectorAll(".month-but");
            month_butns.forEach(bt2=>{
                bt2.addEventListener("mouseenter", (e) =>{
                    if (e.target.innerHTML!=chosen_month){
                        e.target.style.cssText = "background-color: #ececec;";
                    }
                })
                bt2.addEventListener("mouseleave", (e) =>{
                    if (e.target.innerHTML!=chosen_month){
                        e.target.style.cssText = "background-color: white;";
                    }
                })
                bt2.addEventListener("click", e=>{
                    month_butns.forEach(b=>{
                        b.style.cssText="background-color:white;";
                    })
                    e.target.style.cssText="background-color:#e7e7e7;";
                    chosen_month=e.target.innerHTML;
                    if (days_exists){
                        days.parentNode.removeChild(days);
                    }


                    days.innerHTML = `
                    <span style="text-align: center; color: rgb(109, 0, 181); padding-top:5px; background-color: white; position: absolute; border-radius:20px; left:280px; top:420px; width:270px; height:240px; transition: 0.2s; box-shadow: 0px 0px 10px 0px rgba(146, 146, 146, 0.806);z-index:2;">
                        `+chosen_month+" "+chosen_year+`
                        <span style="display: flex; margin-top:5px;">
                            <span style="display: flex; flex-direction:column; margin-left:8px;">
                                <button type="button" class="day-but">1</button>
                                <button type="button" class="day-but">8</button>
                                <button type="button" class="day-but">15</button>
                                <button type="button" class="day-but">22</button>
                                <button type="button" class="day-but">29</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">2</button>
                                <button type="button" class="day-but">9</button>
                                <button type="button" class="day-but">16</button>
                                <button type="button" class="day-but">23</button>
                                <button type="button" class="day-but">30</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">3</button>
                                <button type="button" class="day-but">10</button>
                                <button type="button" class="day-but">17</button>
                                <button type="button" class="day-but">24</button>
                                <button type="button" class="day-but">31</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">4</button>
                                <button type="button" class="day-but">11</button>
                                <button type="button" class="day-but">18</button>
                                <button type="button" class="day-but">25</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">5</button>
                                <button type="button" class="day-but">12</button>
                                <button type="button" class="day-but">19</button>
                                <button type="button" class="day-but">26</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">6</button>
                                <button type="button" class="day-but">13</button>
                                <button type="button" class="day-but">20</button>
                                <button type="button" class="day-but">27</button>
                            </span>
                            <span style="display: flex; flex-direction:column;">
                                <button type="button" class="day-but">7</button>
                                <button type="button" class="day-but">14</button>
                                <button type="button" class="day-but">21</button>
                                <button type="button" class="day-but">28</button>
                            </span>
                        </span>
                    </span>`;


                    insertAfter(months, days);
                    days_exists=true;
                    const day_butns = document.querySelectorAll(".day-but");
                    day_butns.forEach(bt3=>{
                        bt3.addEventListener("mouseenter", (e) =>{
                            if (e.target.innerHTML!=chosen_day){
                                e.target.style.cssText = "background-color: #ececec;";
                            }
                        })
                        bt3.addEventListener("mouseleave", (e) =>{
                            if (e.target.innerHTML!=chosen_day){
                                e.target.style.cssText = "background-color: white;";
                            }
                        })
                        bt3.addEventListener("click", e=>{
                            month_butns.forEach(c=>{
                                c.style.cssText="background-color:white;";
                            })
                            e.target.style.cssText="background-color:#e7e7e7;";
                            chosen_day=e.target.innerHTML;
                            days.parentNode.removeChild(days);
                            days_exists=false;
                            months.parentNode.removeChild(months);
                            months_exists=false;
                            years.parentNode.removeChild(years);
                            years_exists=false;
                            chosen_month=month_word_to_number(chosen_month);
                            chosen_day=single_digit_to_date(chosen_day);
                            Birth_input.value=chosen_year+"-"+chosen_month+"-"+chosen_day;

                            /* Здесь просто копия того, что в Birth_input.onblur */
                            Birth_input.style.cssText="width: 230px; background-color: white; border: 0px; transition:0.3s; margin-bottom:0px; "
                            let date = Birth_input.value;
                            Birth_input.type="text";
                            if (Birth_input.value.length==10){
                                Birth_input.value=date[8]+date[9]+"."+date[5]+date[6]+"."+date[0]+date[1]+date[2]+date[3];
                            }
                            Birth_input.style.cssText="min-width: 230px; max-width: 230px;"
                            try{}catch{}
                            if ((calculateAge(date)>=0)&&(calculateAge(date)<=100)&&(calculateAge(date)!=NaN)){
                                Date_correct=true;
                                Age_preview.innerHTML=calculateAge(date);
                            }
                            else{
                                Date_correct=false;
                            }
                            check_Continue_Button();
                        })
                    })
                })
            })
        })
    })

    ParentInput.addEventListener("change", to_del =>{
        try{days.parentNode.removeChild(days);}catch{}
        try{months.parentNode.removeChild(months);}catch{}
        try{years.parentNode.removeChild(years);}catch{}
        ParentInput.removeEventListener("change", to_del);
    })
}

/* Случаи создания календаря */
Birth_input.addEventListener("click", e=>{
    CreateCalendar(Birth_input);
})
Calendar_icon.addEventListener("click", e=>{
    CreateCalendar(Birth_input);
})

/* Изменения при вводе фото */
Photo_input.onchange = function() {
    Photo_chosen=true;
    var url = URL.createObjectURL(this.files[0]);
    Photo_preview.style.cssText = "background:url(" + url + ") no-repeat;background-size: contain; background-position: center center; border:0px;";
    Photo_ref.style.cssText="background-color:white; border: dashed 3px rgb(207, 207, 207); transition:0.3s;";
    Under_photo_text.style.cssText="color:rgb(174, 174, 174); transition: 0.3s;";
    check_Continue_Button();
}

/* Изменения при нажатии на это радио */
Gender_radio.forEach(radio =>{
    radio.addEventListener("click", e =>{
        Radio_ref.style.cssText="border:0px; background-color:white; transition:0.3s";
        gender_dots.forEach(dot =>{
            dot.style.cssText="background-color: white; transition:0.3s";
        })
        Gender_preview.innerHTML=e.target.value;
        gender_chosen = true;
        check_Continue_Button();
    })
})

/* Изменения при вводе даты через клавиатуру */
Birth_input.onblur = function(){
    Birth_input.style.cssText="width: 230px; background-color: white; border: 0px; transition:0.3s; margin-bottom:0px; "
    let date = Birth_input.value;
    Birth_input.type="text";
    if (Birth_input.value.length==10){
        Birth_input.value=date[8]+date[9]+"."+date[5]+date[6]+"."+date[0]+date[1]+date[2]+date[3];
    }
    Birth_input.style.cssText="min-width: 230px; max-width: 230px;"
    if ((calculateAge(date)>=0)&&(calculateAge(date)<=100)&&(calculateAge(date)!=NaN)){
        Date_correct=true;
        Age_preview.innerHTML=calculateAge(date);
    }
    else{
        Date_correct=false;
    }
    check_Continue_Button();
}

/* Изменения при вводе "О себе" */
O_sebe_textbox.addEventListener("change", e =>{
    O_sebe_textbox.style.cssText="border: 0px; background-color: #ececec;"
    O_sebe_preview.innerHTML = O_sebe_textbox.value;
    check_Continue_Button();

    O_sebe_preview.style.cssText="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; transition:0.3s;";
    Extend_arrow.style.cssText="rotate:0deg; transition:0.3s";
    account_preview.style.height="fit-content";
    arrow_upside_down=false;
})
/* Изменения при вводе имени */
Name_input.addEventListener("change", e=>{
    Name_input.style.cssText="border: 0px; background-color: #ececec; margin-bottom:0px; transition:0.3s";
    Name_preview.innerHTML="<b>"+Name_input.value+"</b>";
    let Name_array = Name_input.value.split(" ");
    if ((Name_array.length==2)||((Name_array.length==3)&&(Name_array[2]==""))){
        if((/^\p{Lu}/u.test(Name_array[0]))&&(/^\p{Lu}/u.test(Name_array[1]))){
            Name_correct=true;
        }
        else{
            Name_correct=false;
        }
    }
    else{
        Name_correct=false;
    }
    check_Continue_Button();
})
/* Изменения при вводе телеги */
Telegram_input.addEventListener("change", e=>{
    Telegram_input.style.cssText="border: 0px; background-color: #ececec; transition: 0.3s; margin-bottom:0px;"
    let teleg_letters=Telegram_input.value.split("");
    if(teleg_letters[0]=="@"){
        let i = 1;
        Telegram_correct = true;
        while (i<teleg_letters.length){
            if ((/^[a-zA-Z0-9]+$/.test(teleg_letters[i])==false) && (numbers.includes(teleg_letters[i])==false) && (teleg_letters[i]!="_")){
                Telegram_correct=false;
            }
            i=i+1;
        }
    }
    else{
        Telegram_correct=false;
    }
    check_Continue_Button();
})
/* Изменения при вводе номера телефона */
Phone_input.addEventListener("change", e=>{
    Phone_input.style.cssText="border: 0px; background-color: #ececec; transition: 0.3s; margin-bottom:0px;"
    let phone_chars=Phone_input.value.split("");
    if( ((phone_chars[0]=="+")&&(phone_chars[1]=="7")&&(phone_chars.length==12)) || ((phone_chars[0]=="8")&&(phone_chars.length==11))){
        let i = 1;
        Phone_correct = true;
        while (i<phone_chars.length){
            if ((numbers.includes(phone_chars[i])==false)){
                Phone_correct=false;
            }
            i=i+1;
        }
    }
    else{
        Phone_correct=false;
    }
    check_Continue_Button();
})

continue_butt.addEventListener("click", but=>{

    alert(1);
    if(!(Photo_chosen&&gender_chosen&&Name_correct&&Telegram_correct&&Phone_correct&&Date_correct&&(O_sebe_textbox.value!=""))){
        alert(2);
        but.preventDefault();
        continue_butt.style.cssText="background-color: rgb(109, 0, 181, 0.5); transition: 0.3s;";

        if(Photo_chosen==false){
            Photo_ref.style.cssText="background-color:rgb(196, 126, 126, 0.5); border: dashed 3px red; transition:0.3s;";
            Under_photo_text.style.cssText="color:red; transition: 0.3s;";
        }

        if(gender_chosen==false){
            Radio_ref.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:200px; top:15px; color:red; width:200px; transition: 0.3s;">
                Обязательное поле
            </span>`;
            gender_dots.forEach(dot =>{
                dot.style.cssText="background-color: rgb(0, 0, 0, 0); transition: 0.3;";
            })
            Radio_ref.appendChild(notice);
            Gender_radio.forEach(radio =>{
                radio.addEventListener("click", to_del =>{
                    try{notice.parentNode.removeChild(notice);}catch{}
                    Gender_radio.forEach(rad =>{
                        rad.removeEventListener("click", to_del);
                    })
                })
            })
        }

        if(Name_input.value==""){
            Name_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;margin-bottom:10px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:270px; top:50px; color:red; width:200px; transition: 0.3s;">
                Обязательное поле
            </span>`;
            Name_ref.appendChild(notice);
            Name_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Name_input.removeEventListener("change", to_del);
            })
        }
        else if(Name_correct==false){
            Name_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s; margin-bottom:20px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:42px; top:50px; color:red; width:500px; transition: 0.3s;">
                Неправильный формат (Требуется "Фамилия Имя")
            </span>`;
            Name_ref.appendChild(notice);
            Name_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Name_input.removeEventListener("change", to_del);
            })
        }

        if(Telegram_input.value==""){
                Telegram_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;margin-bottom:16px;";
                const notice = document.createElement("span");
                notice.innerHTML = `
                <span style="position: absolute; left:270px; top:50px; color:red; width:200px; transition: 0.3s;">
                    Обязательное поле
                </span>`;
                Teleg_ref.appendChild(notice);
                Telegram_input.addEventListener("change", to_del =>{
                    try{notice.parentNode.removeChild(notice);}catch{}
                    Telegram_input.removeEventListener("change", to_del);
            })
        }
        else if(Telegram_correct==false){
            Telegram_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s; margin-bottom:16px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:250px; top:50px; color:red; width:200px; transition: 0.3s;">
                Неправильный формат
            </span>`;                    
            Teleg_ref.appendChild(notice);
            Telegram_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Telegram_input.removeEventListener("change", to_del);
            })
        }

        if(Phone_input.value==""){
            Phone_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;margin-bottom:10px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:270px; top:50px; color:red; width:200px; transition: 0.3s;">
                Обязательное поле
            </span>`;
            Phone_ref.appendChild(notice);
            Phone_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Phone_input.removeEventListener("change", to_del);
            })
        }
        else if(Phone_correct==false){
            Phone_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s; margin-bottom:10px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:250px; top:50px; color:red; width:200px; transition: 0.3s;">
                Неправильный формат
            </span>`;                    
            Phone_ref.appendChild(notice);
            Phone_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Phone_input.removeEventListener("change", to_del);
            })
        }

        if(Birth_input.value==""){
            Birth_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;margin-bottom:10px; width: 230px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:100px; top:50px; color:red; width:200px; transition: 0.3s;">
                Обязательное поле
            </span>`;
            Birth_ref.appendChild(notice);
            Birth_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Birth_input.removeEventListener("change", to_del);
            })
            Calendar_icon.addEventListener("click", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Calendar_icon.removeEventListener("click", to_del);
            })
            Birth_input.addEventListener("click", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Birth_input.removeEventListener("click", to_del);
            })
        }
        else if(Date_correct==false){
            Birth_input.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s; margin-bottom:10px; width: 230px;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="position: absolute; left:85px; top:50px; color:red; width:200px; transition: 0.3s;">
                Неправильный формат
            </span>`;                    
            Birth_ref.appendChild(notice);
            Birth_input.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Birth_input.removeEventListener("change", to_del);
            })
            Calendar_icon.addEventListener("click", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Calendar_icon.removeEventListener("click", to_del);
            })
            Birth_input.addEventListener("click", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                Birth_input.removeEventListener("click", to_del);
            })
        }

        if(O_sebe_textbox.value==""){
            O_sebe_textbox.style.cssText="border:solid 2px red; background-color: rgb(196, 126, 126, 0.5); transition: 0.3s;";
            const notice = document.createElement("span");
            notice.innerHTML = `
            <span style="color:red; width:200px; transition: 0.3s;">
                Обязательное поле
            </span>`;
            if (o_sebe_notice_exists==false){
                insertAfter(O_sebe_textbox, notice);
                o_sebe_notice_exists=true;
            }
            O_sebe_textbox.addEventListener("change", to_del =>{
                try{notice.parentNode.removeChild(notice);}catch{}
                o_sebe_notice_exists=false;
                O_sebe_textbox.removeEventListener("change", to_del);
            })
        }
    }
})

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