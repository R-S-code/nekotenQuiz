(function () {
    // weather api

    let now_weather = document.getElementById("now_weather");
    let weather_ico = document.getElementById("weather_ico");
    let now_weather_info = "";
    let place = "";
    const API_KEY = "bc8e78a3cf0205fe741650acc31fb9e8";
    const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
    const ICO_BASE_URL = "http://openweathermap.org/img/wn/";
    let request = new XMLHttpRequest();

    // main 

    let start_window = document.getElementById("start_window");
    let start_explanation = document.getElementById("start_explanation");
    let start_next_btn = document.getElementById("start_next_btn");
    let select_prefecture_contents = document.getElementById("select_prefecture_contents");
    let select_prefecture = document.getElementById("select_prefecture");
    let selected_prefecture = document.getElementById("selected_prefecture");
    let start_btn = document.getElementById("start_btn");
    let commentary_window = document.getElementById("commentary_window");
    let quiz_correct_which = document.getElementById("quiz_correct_which");
    let explanation = document.getElementById("explanation");
    let next_quiz_btn = document.getElementById("next_quiz_btn");
    let quiz = document.getElementById("quiz");
    let quiz_list = quiz.quizzes;
    let quiz_counter = 0;
    let quiz_theme = document.getElementById("quiz_theme");
    let q1txt = document.getElementById("q1txt");
    let q2txt = document.getElementById("q2txt");
    let q3txt = document.getElementById("q3txt");
    let decide_btn = document.getElementById("decide_btn");
    let plz_select_msg = "";
    let quetion_answer = 0;
    let your_correct_answer = 0;
    let your_title = document.getElementById("your_title");
    let result_window = document.getElementById("result_window");
    let result_comment = document.getElementById("result_comment");
    let retry_btn = document.getElementById("retry_btn");
    let rest_cat = document.getElementById("rest_cat");
    let back_btn = document.getElementById("back_btn");

    // けっていボタンを押したとき
    function answer() {
        let selected_answer = quiz_list.value;
        
        if (selected_answer == "") {
            plz_select_msg = "答えを選んでね";
            window.alert(plz_select_msg);
        } else if(selected_answer == quetion_answer) {
            commentary_window.classList.remove("vanish");
            quiz_correct_which.classList.add("correct_answer");
            quiz_correct_which.innerText = "正解!";
            if(now_weather_info == "Clear") {
                explanation.innerText = Clear_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Clouds") {
                explanation.innerText = Clouds_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Rain") {
                explanation.innerText = Rain_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Snow") {
                explanation.innerText = Snow_QandA[quiz_counter]["hitokoto"]; 
            }  
            your_correct_answer++;
            quiz_counter++;
            quizInit();
        } else {
            commentary_window.classList.remove("vanish");
            quiz_correct_which.classList.add("inncorrect_answer");
            quiz_correct_which.innerText = "不正解!";
            if(now_weather_info == "Clear") {
                explanation.innerText = Clear_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Clouds") {
                explanation.innerText = Clouds_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Rain") {
                explanation.innerText = Rain_QandA[quiz_counter]["hitokoto"]; 
            } else if(now_weather_info == "Snow") {
                explanation.innerText = Snow_QandA[quiz_counter]["hitokoto"]; 
            }
            quiz_counter++;
            quizInit();
        }
    }

    // 次ボタンを押したとき
    function quizNext() {
        if(quiz_counter === 6) {
            commentary_window.classList.add("vanish");
            result_window.classList.remove("vanish");
            your_title.innerText = title[your_correct_answer]["title"];
            result_comment.innerText = title[your_correct_answer]["comment"];
        }
        quiz_correct_which.classList.remove("correct_answer");
        quiz_correct_which.classList.remove("inncorrect_answer");
        commentary_window.classList.add("vanish");
    }

    function setQuiz(weather) {
        switch(weather) {
            case "Clear":
                quiz_theme.innerText = "Q" + (quiz_counter + 1) + ", " + Clear_QandA[quiz_counter]["quiz_theme"];
                q1txt.innerText = Clear_QandA[quiz_counter]["q1"];
                q2txt.innerText = Clear_QandA[quiz_counter]["q2"];
                q3txt.innerText = Clear_QandA[quiz_counter]["q3"];
                quetion_answer = Clear_QandA[quiz_counter]["answer"];
                break;
            case "Clouds":
                quiz_theme.innerText = "Q" + (quiz_counter + 1) + ", " + Clouds_QandA[quiz_counter]["quiz_theme"];
                q1txt.innerText = Clouds_QandA[quiz_counter]["q1"];
                q2txt.innerText = Clouds_QandA[quiz_counter]["q2"];
                q3txt.innerText = Clouds_QandA[quiz_counter]["q3"];
                quetion_answer = Clouds_QandA[quiz_counter]["answer"];
                break;
            case "Rain": 
                quiz_theme.innerText = "Q" + (quiz_counter + 1) + ", " + Rain_QandA[quiz_counter]["quiz_theme"];
                    q1txt.innerText = Rain_QandA[quiz_counter]["q1"];
                    q2txt.innerText = Rain_QandA[quiz_counter]["q2"];
                    q3txt.innerText = Rain_QandA[quiz_counter]["q3"];
                    quetion_answer = Rain_QandA[quiz_counter]["answer"];
                    break;
            case "Snow": 
                quiz_theme.innerText = "Q" + (quiz_counter + 1) + ", " + Snow_QandA[quiz_counter]["quiz_theme"];
                q1txt.innerText = Snow_QandA[quiz_counter]["q1"];
                q2txt.innerText = Snow_QandA[quiz_counter]["q2"];
                q3txt.innerText = Snow_QandA[quiz_counter]["q3"];
                quetion_answer = Snow_QandA[quiz_counter]["answer"];
                break;
            default:
                quiz_theme.innerText = "ごめんね、今の天気はquizおやすみだよ";
                q1txt.classList.add("vanish");
                q2txt.classList.add("vanish");
                q3txt.classList.add("vanish");
                decide_btn.classList.add("vanish");
                rest_cat.setAttribute("src", "../images/rest_cat.png");
                back_btn.classList.remove("vanish");
        }
       
    }

    function quizInit() {
        let ele = document.getElementsByName("quizzes"); 
        for(let i = 0; i < ele.length; i++){
            ele[i].checked = false; 
        }; 
        setQuiz(now_weather_info);
    }
       
    // 最初の画面の自分の場所を選択した時の処理
    select_prefecture.onchange = ()=>{
        selected_prefecture.innerText = select_prefecture.value;
        switch (selected_prefecture.value) {
            case "北海道":
                place = "hokkaido";
                break;
            case "岩手県":
                place = "iwate";
                break;
            case "秋田県":
                place = "akita";
                break;
            case "福島県":
                place = "fukushima";
                break;
            case "栃木県":
                place = "tochigi";
                break;
            case "埼玉県":
                place = "saitama";
                break;
            case "東京都":
                place = "tokyo";
                break;
            case "新潟県":
                place = "niigata";
                break;
            case "石川県":
                place = "ishikawa";
                break;
            case "山梨県":
                place = "yamanashi";
                break;
            case "岐阜県":
                place = "gifu";
                break;
            case "愛知県":
                place = "aichi";
                break;
            case "滋賀県":
                place = "shiga";
                break;
            case "大阪府":
                place = "osaka";
                break;
            case "奈良県":
                place = "nara";
                break;
            case "鳥取県":
                place = "tottori";
                break;
            case "岡山県":
                place = "okayama";
                break;
            case "山口県":
                place = "yamaguchi";
                break;
            case "香川県":
                place = "kagawa";
                break;
            case "高知県":
                place = "kochi";
                break;
            case "佐賀県":
                place = "saga";
                break;
            case "熊本県":
                place = "kumamoto";
                break;
            case "宮崎県":
                place = "miyazaki";
                break;
            case "沖縄県":
                place = "okinawa";
                break;
            case "青森県":
                place = "aomori";
                break;
            case "宮崎県":
                place = "miyazaki";
                break;
            case "山形県":
                place = "yamagata";
                break;
            case "茨城県":
                place = "ibaraki";
                break;
            case "群馬県":
                place = "gunma";
                break;
            case "千葉県":
                place = "chiba";
                break;
            case "神奈川県":
                place = "kanagawa";
                break;
            case "富山県":
                place = "toyama";
                break;
            case "福井県":
                place = "fukui";
                break;
            case "長野県":
                place = "nagano";
                break;
            case "静岡県":
                place = "shizuoka";
                break;
            case "三重県":
                place = "mie";
                break;
            case "京都府":
                place = "kyoto";
                break;
            case "兵庫県":
                place = "hyogo";
                break;
            case "和歌山県":
                place = "wakayama";
                break;
            case "広島県":
                place = "hiroshima";
                break;
            case "徳島県":
                place = "tokushima";
            break;
            case "愛媛県":
                place = "ehime";
            break;
            case "福岡県":
                place = "fukuoka";
            break;
            case "長崎県":
                place = "nagasaki";
            break;
            case "大分県":
                place = "oita";
            break;
            case "鹿児島県":
                place = "kagoshima";
            break;
            default:
                place = "tokyo";
        }
    }

    // addEventListener
    start_next_btn.addEventListener("click", ()=> {
        start_explanation.classList.add("vanish");
        select_prefecture_contents.classList.remove("vanish");
        start_next_btn.classList.add("vanish");
        start_btn.classList.remove("vanish");   
    })
    start_btn.addEventListener("click", ()=>{
        if(select_prefecture.value == "自分の場所を選んでね") {
            window.alert("まずは自分のいる場所を選んでね");
        } else {
            let api_url = BASE_URL + place + "&APPID=" + API_KEY;
            // http://api.openweathermap.org/data/2.5/weather?q=tokyo&APPID=bc8e78a3cf0205fe741650acc31fb9e8
            
            request.open('GET', api_url, true);
            request.responseType = "json";
            request.onload = function () {
                let data = this.response;
                console.log(data);
                now_weather_info = data["weather"][0]["main"];
                let now_weather_info_jp = data["weather"][0]["main"];
                switch (now_weather_info_jp) {
                    case "Clear":
                        now_weather_info_jp = "はれ";
                        break;
                    case "Clouds":
                        now_weather_info_jp = "くもり";
                        break;
                    case "Rain":
                        now_weather_info_jp = "あめ";
                        break;
                    case "Snow":
                        now_weather_info_jp = "ゆき！";
                        break;
                    case "Thunderstorm":
                        now_weather_info_jp = "らいう(こわい)";
                        break;
                    case "Drizzle":
                        now_weather_info_jp = "きりさめ";
                    default:
                        now_weather_info_jp = "異常気象かも?";
                }
                let weather_ico_info = data["weather"][0]["icon"];
                let weather_ico_url = ICO_BASE_URL + weather_ico_info + "@2x.png";
                weather_ico.setAttribute("src", weather_ico_url);
                now_weather.innerText = select_prefecture.value + "の天気は" + now_weather_info_jp;
                quizInit();
            }
            request.send();

            start_window.classList.add("vanish");
        }
    })
    decide_btn.addEventListener("click", answer);
    next_quiz_btn.addEventListener("click", quizNext);
    retry_btn.addEventListener("click", ()=> {
        window.location.reload();
    })
    back_btn.addEventListener("click", ()=> {
        window.location.reload();
    })
}());