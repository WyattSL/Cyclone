function id(i) {
    return document.getElementById(i);
}

var d = new Date();
var f1 = d.getMonth()+1;
var f2 = d.getDate()+1;
if (f1 < 10) f1 = `0${f1}`;
if (f2 < 10) f2 = `0${f2}`;
var f = `${d.getFullYear()-13}-${f1}-${f2}`;
id("birthday").max = f;