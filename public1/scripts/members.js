
var db = firebase.firestore();

// var source = document.getElementById("member_list_template").innerHTML;
var source = document.getElementById("testTemplate").innerHTML;
//console.log(source);

var template = Handlebars.compile(source);

function getMembers() {
    var member = [];
    db.collection('members')
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                member.push(doc.data().Name);
                //console.log("=> %o", doc.data());
            });
        });
    var result = new Array(member.length);
    result = member.copyWithin(0,member.length-1);
    return result;
}

var result1 = {};
result1.people = getMembers();
console.log("result: %o", result1);
document.getElementById("memberTable").innerHTML = template(result1);

var result2 = {
    people: [
        "Yehuda Katz",
        "Alan Johnson",
        "Charles Jolley"
    ]
};

console.log("result: %o", result2);

var html = template(result1);
console.log(html);
document.getElementById("peopleTable").innerHTML = html;
