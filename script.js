/*Inital Modal*/
var flag = false;
var count = 1;
var ans = "";

// let a = ["less18", "18-40", "30-60", "60+"]
// let b = ["male", "female"]
// let c = ["less98.2", "98.2-102", "102+"]
// let e = ["yes", "no"]
// let f = ["yes", "no"]
// let g = ["same", "improvement", "worsened"]
// let h = ["yes", "no"]

let params = [
        ["less18", "18-40", "30-60", "60+"],
        ["male", "female"],
        ["less98.2", "98.2-102", "102+"],
        ["yes", "no"],
        ["yes", "no"],
        ["same", "improvement", "worsened"],
        ["yes", "no"]
]

let parameter_list = [];
let answer_list = [];
//function to generate all possible answer types
function param_list_generate(params_list, index, string_formed){
    if (index===params_list.length){
        parameter_list.push(string_formed)
        // string.indexOf(substring) !== -1)
        if(string_formed.indexOf("#worsened#yes") !==-1 || string_formed.indexOf("#same#yes")!==-1 || string_formed.indexOf("#improvement#yes")!==-1){
            answer_list.push(2)
        }
        else if(string_formed.indexOf("#worsened#no") !==-1 || string_formed.indexOf("#same#no")!==-1){
            answer_list.push(1)
        }
        else{
            answer_list.push(0)
        }
    }
    else{
        for(let i=0; i<params_list[index].length; ++i){
            let new_string = string_formed
            new_string += "#" + params_list[index][i]
            param_list_generate(params_list, index+1, new_string)
        }
    }
    
}

// console.log(ans)
const results = {
    0: "Low Risk",
    1: "Moderate Risk",
    2: "High Risk"
}

x = ""
param_list_generate(params, 0, x)
console.log(parameter_list)
console.log(answer_list)

$(document).ready(function(){
    if(flag == false){
        $("#myModal").modal('show');
        flag = true;
    }
});


/*Remove Question*/
function removeQuestions(current_classname,current_ansclassname,next_count){
    $(current_classname).hide(500);
    $(current_ansclassname).hide(500);
    var next_classname = "#container"+next_count;
    $(next_classname).fadeIn();
    console.log(next_classname);

}

/*Collecting Answers*/
$(document).ready(function(){
    $('.myButton').click(function(){
        var curr_count = count;
        var current_classname="#container"+curr_count;
        var current_ansclassname="#anscontainer"+curr_count;
        var value = $(this).attr('value');
        var text = $(this).text();
        ans = ans+"#"+value;
        var next_count = curr_count+1;
        count = count+1
        if(count===8){
            for(let i=0; i<parameter_list.length; ++i){
                
                if(ans===parameter_list[i]){        
                    document.getElementById("result-div").innerHTML = `<br>${results[answer_list[i]]}`
                    if(answer_list[i]===2)
                        document.getElementById("result-div").style.color = "#FF0000";
                    else if(answer_list[i]===1)
                        document.getElementById("result-div").style.color = "#F1C40F";
                    else
                        document.getElementById("result-div").style.color = "#009688";
                    break
                }
            }
        }
        $(current_ansclassname).append('<h4> You have selected '+`"${text}"`+'</h4');
        setTimeout(removeQuestions,500,current_classname,current_ansclassname,next_count);
    })
});

