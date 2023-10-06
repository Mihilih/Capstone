//JS for activity1
function speller(id){
    document.querySelector('#form').style.display = 'none'
    let words= document.querySelector('#words').value
    const myArr = words.split(" ");
    if (words==""){
        location.href = "/error/Please enter at least one word";
    }
    
    var ins=document.createElement('div')
    ins.innerHTML="<div class='alert alert-secondary' role='alert' style='margin-right:1cm;'><li>Click on the buttons 'Listen to word x' to listen to each word</li><li>Type in what you hear and submit!</li></div>"
    document.querySelector('#wordlist').appendChild(ins)

    for(let i=0; i < myArr.length ;i++){
        var item=document.createElement('div')
        var block=`<input id="input_${i}"" style="display: inline-block; margin-right:2mm;"><button class="btn btn-outline-dark " onclick="read('{{${myArr[i]}}}')">Listen to word ${i+1}</button><hr>`
        item.innerHTML=block
        document.querySelector('#wordlist').appendChild(item)
    }
    var submit=document.createElement('button')
    submit.innerHTML="Submit"
    submit.className="btn btn-outline-dark"
    submit.id="submit"
    document.querySelector('#wordlist').appendChild(submit)
    document.querySelector('#wordlist').style.display = 'block'
    document.querySelector('#submit').addEventListener('click', () =>{
        document.querySelector('#wordlist').style.display = 'none'
        var total=0
        var answers=document.createElement('div')
        var title=document.createElement('h4')
        title.innerHTML="corrections"
        answers.appendChild(title)
        answers.class="list-group"
        for (i=0;i<myArr.length;i++){
            if (document.querySelector(`#input_${i}`).value.toLowerCase()==myArr[i].toLowerCase()){
                total = total+1
            }else{
                var x=document.createElement("div")
                x.innerHTML=`<li class="list-group-item"><button class="btn btn-outline-dark " onclick="read('{{${myArr[i]}}}')">Listen to word ${i+1}</button> This is '${myArr[i]}'</li>`
                answers.appendChild(x)
            }
        }
        fetch('/points/'+ id,{
            method:'PUT',
            body: JSON.stringify({
                points: total
            })
        })
        .then((res) => res.json())
        .then((res) =>{
        var item=document.createElement('div')
        item.innerHTML=`
        <div class="jumbotron text-center" style="height: 7cm; padding: 2cm;">
            <div class="container">
                <h1 class="display-4" style="font-size: 1.2cm; text-align: center;">You got ${total} out of ${myArr.length} points !</h1>
            </div>
        </div>`
        document.querySelector("#body").appendChild(item)
        if (total != myArr.length){
            document.querySelector("#body").appendChild(answers)
        }
        
        var item2=document.createElement('div')
        item2.innerHTML=`</br></br><div class='text-center mx-auto justify-content-center'><a href="" class='btn btn-dark'>Play again!</a></div>`
        document.querySelector("#body").appendChild(item2)
        
        if (res.old<100 && res.new>=100){
            alert(`now you have ${res.new} marks. You're a bronze student!`)
        }else if (res.old<500 && res.new>=500){
            alert(`now you have ${res.new} marks. You're a silver student!`)
        }else if(res.old<1000 && res.new>=1000){
            alert(`now you have ${res.new} marks. You're a gold student!`)
        }
        })
    })
}

//speech synthesis
function read(i){
    var word = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    if (voices.length!=0){
        word.text=i
        word.voice=voices[2];
        window.speechSynthesis.speak(word);
    }
}

//JS for activity2
function counter(id){

    document.querySelector('#form').style.display="none"
    var no_of_questions=document.querySelector('#no_of_qs').value
    var min1=document.querySelector('#from1').value
    min1=parseInt(min1)
    var max1=document.querySelector('#to1').value
    max1=parseInt(max1)
    var min2=document.querySelector('#from2').value
    min2=parseInt(min2)
    var max2=document.querySelector('#to2').value
    max2=parseInt(max2)

    if(no_of_questions=="" || no_of_questions<1){
        console.log("error")
        location.href = "/error/Please enter a valid number of questions.";
    }else if(min1>=max1){
        console.log("error")
        location.href = '/error/Recheck the range of numbers for the first number.';
    }else if(min2>=max2){
        console.log("error")
        location.href = '/error/Recheck the range of numbers for the second number.';
    }else if(isNaN(min1) || isNaN(max1)  || isNaN(min2)  || isNaN(max2) ){
        console.log("error")
        location.href = "/error/Please enter the range of numbers.";
    }else{
        var item=document.createElement('div')
        item.id="questions"
        var answers=[]
        var first_nos=[]
        var second_nos=[]
        if (document.querySelector('#category').value=='Addition'){
            for (let i=0;i<no_of_questions;i++){
                var num1=Math.floor(Math.random() * (max1-min1+1) + (min1));
                var num2=Math.floor(Math.random() * (max2-min2+1) + (min2));
                var answer=num1+num2
                answers[i]=answer
                var item1=document.createElement('div')
                item1.innerHTML=`<li>${num1} + ${num2} = <div><input id='answer${i}' class="form-control col-md-3" autofocus type="number" step="any" placeholder='answer' ></div><br/><hr></li>`
                item.appendChild(item1)
                first_nos[i]=num1
                second_nos[i]=num2
            }  
        }else if (document.querySelector('#category').value=='Subtraction'){
            for (let i=0;i<no_of_questions;i++){
                var num1=Math.floor(Math.random() * (max1-min1+1) + (min1));
                var num2=Math.floor(Math.random() * (max2-min2+1) + (min2));
                if (document.querySelector('#to2').value=="No" && num1-num2<0){
                    var answer=num2-num1
                    answers[i]=answer
                    var item1=document.createElement('div')
                    item1.innerHTML=`<li>${num2} - ${num1} = <div><input id='answer${i}' class="form-control col-md-3" autofocus type="number" step="any" placeholder='answer'></div><br/><hr></li>`
                    item.appendChild(item1)
                }else{
                    var answer=num1-num2
                    answers[i]=answer
                    var item1=document.createElement('div')
                    item1.innerHTML=`<li>${num1} - ${num2} = <div><input id='answer${i}' class="form-control col-md-3" autofocus type="number" step="any" placeholder='answer'></div><br/><hr></li>`
                    item.appendChild(item1)
                }
                first_nos[i]=num1
                second_nos[i]=num2
                
            }
        }else if (document.querySelector('#category').value=='Multiplication'){
            for (let i=0;i<no_of_questions;i++){
                var num1=Math.floor(Math.random() * (max1-min1+1) + (min1));
                var num2=Math.floor(Math.random() * (max2-min2+1) + (min2));
                var answer=num1*num2
                answers[i]=answer
                var item1=document.createElement('div')
                item1.innerHTML=`<li>${num1} x ${num2} = <div><input id='answer${i}' class="form-control col-md-3" autofocus type="number" step="any" placeholder='answer'></div><br/><hr></li>`
                item.appendChild(item1)
                first_nos[i]=num1
                second_nos[i]=num2
            }
            
        }else{
            for (let i=0;i<no_of_questions;i++){
                do{
                    var num2=Math.floor(Math.random() * (max1-min1+1) + (min1));
                    var answer=Math.floor(Math.random() * (max2-min2+1) + (min2));
                    var num1=answer*num2
                }while(num1>max1 || num1<min1)
                answers[i]=answer
                var item1=document.createElement('div')
                item1.innerHTML=`<li>${num1} / ${num2} = <div><input id='answer${i}' class="form-control col-md-3" autofocus type="number" step="any" placeholder='answer'></div><br/><hr></li>`
                item.appendChild(item1)
                first_nos[i]=num1
                second_nos[i]=num2
            }   
        }
        var but=document.createElement("button")
        but.innerHTML="Submit"
        but.className="btn btn-outline-dark"
        but.id="submit"
        item.appendChild(but)
        document.querySelector('#body').appendChild(item)
        document.querySelector('#submit').addEventListener('click', () =>{
            document.querySelector('#questions').style.display='none'
            var points=0
            var answer=document.createElement('div')
            answers.class="list-group"
            var title=document.createElement('h4')
            title.innerHTML="corrections"
            answer.appendChild(title)
            for (i=0;i<no_of_questions;i++){
                if (document.querySelector(`#answer${i}`).value==answers[i]){
                    points = points + 1
                }else{
                    var x=document.createElement("div")
                    if (document.querySelector('#category').value=='Addition'){
                        x.innerHTML=`<li class="list-group-item">${first_nos[i]} + ${second_nos[i]}=${answers[i]} (Your answer: ${document.querySelector(`#answer${i}`).value})</li>`
                    }else if (document.querySelector('#category').value=='Subtraction'){
                        x.innerHTML=`<li class="list-group-item">${first_nos[i]} - ${second_nos[i]}=${answers[i]} (Your answer: ${document.querySelector(`#answer${i}`).value})</li>`
                    }else if (document.querySelector('#category').value=='Multiplication'){
                        x.innerHTML=`<li class="list-group-item">${first_nos[i]} x ${second_nos[i]}=${answers[i]} (Your answer: ${document.querySelector(`#answer${i}`).value})</li>`
                    }else {
                        x.innerHTML=`<li class="list-group-item">${first_nos[i]} / ${second_nos[i]}=${answers[i]} (Your answer: ${document.querySelector(`#answer${i}`).value})</li>`
                    }
                    answer.appendChild(x)
                }
            }
            console.log(points)
            fetch('/points/'+ id,{
                method:'PUT',
                body: JSON.stringify({
                    points: points
                })
            })
            .then((res) => res.json())
            .then((res) =>{
            var item3=document.createElement('div')
            item3.innerHTML=`
            <div class="jumbotron text-center" style="height: 7cm; padding: 2cm;">
                <div class="container">
                    <h1 class="display-4" style="font-size: 1.2cm; text-align: center;">You got ${points} out of ${no_of_questions} points !</h1>
                </div>
            </div>`
            document.querySelector("#body").appendChild(item3)
            document.querySelector("#body").appendChild(answer)
            var item4=document.createElement('div')
            item4.innerHTML=`</br></br><div class='text-center mx-auto justify-content-center'><a href="" class='btn btn-dark'>Play again!</a></div>`
            document.querySelector("#body").appendChild(item4)
            if (res.old<100 && res.new>=100){
                alert(`now you have ${res.new} marks. You're a bronze student!`)
            }else if (res.old<500 && res.new>=500){
                alert(`now you have ${res.new} marks. You're a silver student!`)
            }else if(res.old<1000 && res.new>=1000){
                alert(`now you have ${res.new} marks. You're a gold student!`)
            }
            })
        })
    }


    
}

//JS for activity3
function colours(id){
    var colours=["black","blue","darkblue","skyblue","aquamarine","khaki"
    ,"gray","orange","red","darkgreen","mediumseagreen","lightgreen","lime","olive"
    ,"magenta","indigo","hotpink","maroon","yellow", "white"]

    var names=["black","blue","dark blue","light blue","aqua blue","khaki","gray","orange","red","dark green","green","light green","lime green","olive green"
    ,"magenta","purple","pink","maroon","yellow","white"]

    var no_of_questions=document.querySelector('#no_of_qs').value
    if(no_of_questions=="" || no_of_questions<1){
        location.href = "/error/Please enter a valid number of questions";
    }
    document.querySelector('#form').style.display='none'
    var questions = document.createElement('div')
    questions.id="questions"
    var answers = []
    var integers = []
    for (i=0;i<no_of_questions;i++){
        do{
            var int=Math.floor((Math.random() * 20) + 1); 
            int=int-1
        }while(integers.includes(int))
        integers.push(int)
        answers.push(names[int])
        var question = document.createElement('div')
        question.innerHTML=`<li id="question">What colour is this?&nbsp&nbsp&nbsp
        <div class="card" style="background-color:${colours[int]}; display:inline-block;">
            <div class="card-body">
            </div>
        </div>&nbsp&nbsp&nbsp
        <div class="form-group" style="display:inline-block">
                <select class="form-control col-md-3" id="answer${i}" required>
                    <option value='0'>black</option>
                    <option value='1'>blue</option>
                    <option value='2'>dark blue</option>
                    <option value='3'>light blue</option>
                    <option value='4'>aqua blue</option>
                    <option value='5'>khaki</option>
                    <option value='6'>gray</option>
                    <option value='7'>orange</option>
                    <option value='8'>red</option>
                    <option value='9'>dark green</option>
                    <option value='10'>green</option>
                    <option value='11'>light green</option>
                    <option value='12'>lime green</option>
                    <option value='13'>olive green</option>
                    <option value='14'>magenta</option>
                    <option value='15'>purple</option>
                    <option value='16'>pink</option>
                    <option value='17'>maroon</option>
                    <option value='18'>yellow</option>
                    <option value='19'>white</option>
                </select>
        </div>
        </li><br/><br/><hr>`
        questions.appendChild(question)
    }
    var but=document.createElement("button")
    but.innerHTML="Submit"
    but.className="btn btn-outline-dark"
    but.id="submit"
    questions.appendChild(but)
    document.querySelector("#body").appendChild(questions)
    document.querySelector('#submit').addEventListener('click', () =>{
        document.querySelector('#questions').style.display='none'
        var points=0
        var answer=document.createElement('div')
        answers.class="list-group"
        for (i=0;i<no_of_questions;i++){
            if(document.querySelector(`#answer${i}`).value==integers[i]){
                points=points+1
            }else{
                var x=document.createElement("div")
                x.innerHTML=`<li><div class="card" style="background-color:${colours[integers[i]]}; display:inline-block;">
                <div class="card-body">
                </div>
            </div>&nbsp&nbsp&nbsp This is ${names[integers[i]]}`
            answer.appendChild(x)
            }
        }
        console.log(points)
        fetch('/points/'+ id,{
            method:'PUT',
            body: JSON.stringify({
                points: points
            })
        })
        .then((res) => res.json())
        .then((res) =>{
        var item3=document.createElement('div')
        item3.innerHTML=`
        <div class="jumbotron text-center" style="height: 7cm; padding: 2cm;">
            <div class="container">
                <h1 class="display-4" style="font-size: 1.2cm; text-align: center;">You got ${points} out of ${no_of_questions} points !</h1>
            </div>
        </div>`
        document.querySelector("#body").appendChild(item3)
        document.querySelector("#body").appendChild(answer)
        var item4=document.createElement('div')
        item4.innerHTML=`</br></br><div class='text-center mx-auto justify-content-center'><a href="" class='btn btn-dark'>Play again!</a></div>`
        document.querySelector("#body").appendChild(item4)
        if (res.old<100 && res.new>=100){
            alert(`now you have ${res.new} marks. You're a bronze student!`)
        }else if (res.old<500 && res.new>=500){
            alert(`now you have ${res.new} marks. You're a silver student!`)
        }else if(res.old<1000 && res.new>=1000){
            alert(`now you have ${res.new} marks. You're a gold student!`)
        }
        })
    })
}