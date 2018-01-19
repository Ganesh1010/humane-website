function loadLoggedInHistoryDetail(url) {
    $('.loader').show();
    $.getJSON(url, function (data) {})
        .done(function (data) {

            var count = $.parseJSON(data)['count']
            console.log("admin logged-in history " + count)
            if (parseInt(count) != 0)
                loadAdminHistoryDetal(data);
            else {
                $('.loader').hide();
                //document.getElementById("servicetab").innerHTML = "No Service Found";
            }
           
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("admin logged-in detail load complete");
        });
}


function loadAdminHistoryDetal(data) {
    var t = JSON.parse(jsonEscape(data))['results']
    $.each(t, function (key, value) {
        var loggedInHistoryId = value.logged_in_histyory_id
        var userName = value.username
        var loggedInDate = value.logged_in_date
        var loggedInDevice = value.logged_in_device
        var IPAddres = value.ip_address
        
        var row = createAdminLoggedInHistoryRow(loggedInHistoryId, userName, loggedInDate, loggedInDevice, IPAddres);

        var tableContent = document.createDocumentFragment();
        tableContent.appendChild(row);
        document.getElementById("admin-logged-in-table").append(tableContent);
	
    });
	$('.loader').hide();
}

function createAdminLoggedInHistoryRow(string1, string2, string3, string4, string5) {
    var row = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    td1.classList.add("media-heading");
    td1.classList.add("text-center");

    td2.classList.add("media-heading");
    td2.classList.add("text-center");

    td3.classList.add("media-heading");
    td3.classList.add("text-center");

    td4.classList.add("media-heading");
    td4.classList.add("text-center");

    td5.classList.add("media-heading");
    td5.classList.add("text-center");
    td1.appendChild(document.createTextNode(string1));
    td2.appendChild(document.createTextNode(string2));
    td3.appendChild(document.createTextNode(string3));
    td4.appendChild(document.createTextNode(string4));
    td5.appendChild(document.createTextNode(string5));

    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
    row.append(td5);

    return row;
}
