let dataArray = [{
    name: "Brandon I",
    email: "b.i@mail.com",
    remove: "<button type='button' onclick='deleteRow(this)'>Delete</button>"     
 }, {
    name: "John Bishops",
    email: "johnb@mail.com",
    remove: "<button type='button' onclick='deleteRow(this)'>Delete</button>"
 }];


      // need to add to select user at random when clicked add button
    const randomElement = dataArray[Math.floor(Math.random() *    dataArray.length)];  
    
    var table = $('customer');
    var row = table.insertRow(-1);
    var name = row.insertCell(0);
    var email = row.insertCell(1);
    var remove = row.insertCell(2);
    name.innerHTML = randomElement.name;
    email.innerHTML = randomElement.email;
    remove.innerHTML = randomElement.remove;
    

    $(".customer-table").append(`
    <tr>
    <td>${customers[i].firstName}</td>
    <td>${customers[i].lastName}</td>
    <td>${customers[i].email}</td>
    <tr>
    `)
