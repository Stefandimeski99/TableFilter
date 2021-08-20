
var text = document.getElementById("prio_text");
var rating = document.getElementById("rating");
var datesort = document.getElementById("date");
var min_rate = document.getElementById("min_rating");
var tabela = document.getElementById("tabela")
var data;

var finalList = []

// fetch("reviews.json")
//     .then(response => response.json())
//     .then(json => data = json);


function filter() {
   resetList();
   var txt =  text.options[text.selectedIndex].value;
   var rate =  rating.options[rating.selectedIndex].value;
   var date = datesort.options[datesort.selectedIndex].value;
   var minrate =  min_rate.options[min_rate.selectedIndex].value;

   if(txt === 'true'){
       //polnenje na lista
       for(var i in data){
           if(data[i]['reviewText'] !== ''){
               finalList.push(data[i]);
           }
       }

       //1.rating

       rate === 'high_first' ? finalList = sortRating(true,finalList) : finalList = sortRating(false, finalList);

       //2.date

       // var tmp =  finalList[0]['rating'];
       // var tmparr = []
       // var dateSorted = []
       //
       // for(var i in finalList){
       //     console.log(tmp)
       //     if(finalList[i]['rating'] === tmp){
       //         tmparr.push(finalList[i]);
       //     }else{
       //         // console.log(tmparr)
       //        date === 'old_first' ? f1(true, tmparr).then(function (result) {
       //              console.log('ova e rez', result)
       //              dateSorted.push(result)
       //        }) : dateSorted.push(f1(false, tmparr))
       //         // setTimeout() =>{, 200}
       //         // date === 'old_first' ? dateSorted.push(sortDate(true, tmparr)) : dateSorted.push(sortDate(false, tmparr))
       //         tmp =  finalList[i]['rating'];
       //         tmparr = [];
       //     }
       // }

       var tempLista = [];
       for(var i in data){
           if(data[i]['reviewText'] == ''){
               tempLista.push(data[i]);
           }
       }

       rate === 'high_first' ? tempLista = sortRating(true,tempLista) : tempLista = sortRating(false, tempLista);

       var pomoshnaMinRate = []
       for(var k in finalList){
           if(finalList[k]['rating'] >= minrate){
               pomoshnaMinRate.push(finalList[k])
           }
       }
       for(var k in tempLista){
           if(tempLista[k]['rating'] >= minrate){
               pomoshnaMinRate.push(tempLista[k])
           }
       }

       finalList = pomoshnaMinRate;

       popolniTabela();
       finalList = []
       resetList()

   }else{
       for(var i in data){
           if(data[i]['reviewText'] == ''){
               finalList.push(data[i]);
           }
       }
       rate === 'high_first' ? finalList = sortRating(true,finalList) : finalList = sortRating(false, finalList);
       var tempLista = [];
       for(var i in data){
           if(data[i]['reviewText'] !== ''){
               tempLista.push(data[i]);
           }
       }
       rate === 'high_first' ? tempLista = sortRating(true,tempLista) : tempLista = sortRating(false, tempLista);

       var pomoshnaMinRate = []
       for(var k in finalList){
           if(finalList[k]['rating'] >= minrate){
               pomoshnaMinRate.push(finalList[k])
           }
       }
       for(var k in tempLista){
           if(tempLista[k]['rating'] >= minrate){
               pomoshnaMinRate.push(tempLista[k])
           }
       }

       finalList = pomoshnaMinRate;

       popolniTabela();
       finalList = []
       resetList()
   }
}

function resetList() {
    fetch("reviews.json")
        .then(response => response.json())
        .then(json => data = json);
}

function sortRating(type, array) {
    if(type){ //asc
        array = array.sort(function (a, b) {  return b.rating - a.rating;  });
    }else{ //desc
        array = array.sort(function (a, b) {  return a.rating - b.rating;  });
    }
    return array;
}

async function f1(a,b) {
    var x = await sortDate(a,b);
    return x;
    // console.log(x); // 10
}

function sortDate(type, array) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (type) { //asc
                array = finalList.sort(function (a, b) {
                    var c = new Date(a.reviewCreatedOnDate);
                    var d = new Date(b.reviewCreatedOnDate);
                    return c - d;
                });
            } else { //desc
                array = finalList.sort(function (a, b) {
                    var c = new Date(a.reviewCreatedOnDate);
                    var d = new Date(b.reviewCreatedOnDate);
                    return d - c;
                });
            }
            resolve(array);
        }, 10)
    })
}

function popolniTabela() {
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    for (var i in finalList){
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var text1 = document.createTextNode(finalList[i]['rating']);
        var text2 = document.createTextNode(finalList[i]['reviewText']);
        var text3 = document.createTextNode(finalList[i]['reviewCreatedOnDate']);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tabela.appendChild(tr);
    }
}