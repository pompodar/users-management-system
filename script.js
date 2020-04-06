let action;

$("#add1").on('click', function(){
    action = "add";
$("#submit").html("Add");
$("#modalHeader").html("Add a User");
$("#fname").val("");
$("#lname").val(""); 
$("#status").val("not active"); 
$("#role").val("user");
$('#status').prop('checked', false);
$("#statusLabel").html("Not Active");
});

$("#add").on('click', function(){
  action = "add";
$("#submit").html("Add");
$("#modalHeader").html("Add a User");
$("#status").val("not active");
$('#status').prop('checked', false);
$("#fname").val("");
$("#lname").val(""); 
$("#status").val("not active"); 
$("#role").val("user");
$('#status').prop('checked', false);
$("#statusLabel").html("Not Active");
});

$("#closeModalWindow").on('click', function(){
  $("#fname").val("");
  $("#lname").val(""); 
  $("#status").val("not active"); 
  $("#role").val("user");
$('#status').prop('checked', false);
$("#statusLabel").html("Not Active");
});

function show() {
    $.get("show.php", function(data, status){
        let data1 = JSON.parse(data);
        
        for(let i = 0; i < data1.length; i++) {
            tabBody=document.getElementsByTagName("tbody").item(0);
            row=document.createElement("tr");
            row.setAttribute("id", "row" + data1[i].id);

            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");
            cell4 = document.createElement("td");
            cell5 = document.createElement("td");
        
            checkbox=document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "name" + data1[i].id;
            checkbox.value = "value" + data1[i].id;
            checkbox.id = "checkbox" + data1[i].id;

            
            cell2.setAttribute("class", "name");
            cell2.setAttribute("id", "name" + data1[i].id);
            cell4.setAttribute("id", "role" + data1[i].id);
            checkbox.setAttribute("class", "checkbox");
            checkbox.onclick = check;
            textnode2=document.createTextNode(data1[i].fname + " " + data1[i].lname);
            textnode3=document.createTextNode(data1[i].status);
            circle = document.createElement("i");
            circle.setAttribute("class", "fas fa-circle");
            circle.setAttribute("id", "circle" + data1[i].id);
            if (data1[i].status == "active") {
              circle.style.color = "green";
            } else {
              circle.style.color = "grey";

            }
            textnode4=document.createTextNode(data1[i].role);
            trash=document.createElement("i");
            edit=document.createElement("i");
            trash.setAttribute("id", "delete" + data1[i].id);
            edit.setAttribute("id", "edit" + data1[i].id);
            trash.setAttribute("class", "fas fa-trash-alt");
            edit.setAttribute("class", "fas fa-pen-square" + " " + "ml-2" + " " + i);
            trash.onclick = delete_user;
            edit.onclick = edit_user;
        
            cell1.appendChild(checkbox);
            cell2.appendChild(textnode2);
            cell3.appendChild(circle);
            cell4.appendChild(textnode4);
            cell5.appendChild(trash);
            cell5.appendChild(edit);
          
        
        
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cell5);
        
            tabBody.appendChild(row);
          }
        });   
}

show();
 

  $("#closeConfirm").on("click", function(){
    $('#myModalLabel').html("Are you sure to do this?");
      $('#modal-btn-si').show();
      $('#modal-btn-no').show();
  });

  $('#exampleModal').on('shown.bs.modal', function () {
    $('#fname').trigger('focus')
  })

 function delete_user () {
  let id = this.id.slice(6);
  $('#exampleModal2').modal('show');
  $('#closeConfirm').show();
  $('#modal-btn-no').show();
  $('#myModalLabel').html("Are you sure to do this?");
  $("#modal-btn-si").on("click", async function(){
    $("#mi-modal").modal('hide');
    await $.post(
      "delete.php",
      {
        id: id
      }, 
    );
    $('#row' + id).remove();
  
  });
  
  $("#modal-btn-no").on("click", function(){
    $("#mi-modal").modal('hide');
    id = null;
  });
}

let status;

let edit_id;

async function edit_user () {
  edit_id = this.id.slice(4);
  let id = $(this).prop("class");
  id = id.slice(23);
    $('#exampleModal').modal('show');
  await $.get("show.php", function(data, status){
    let data1 = JSON.parse(data);
  $("#fname").val(data1[id].fname);
  $("#lname").val(data1[id].lname); 
  if (data1[id].status == "active") {
    $("#status").prop( "checked", true );
    $("#status").val("active");
    $("#statusLabel").html("Active");
  } else {
    $("#status").prop( "checked", false );
    $("#statusLabel").html("Not Active");
    $("#status").val("not active");
  }; 
  $("#role").val(data1[id].role); 
 });
  

  action = "edit";
$("#submit").html("Edit");
$("#modalHeader").html("Edit the User");
 }

$("#submit").on('click', async function(event){

  if ($("#status").is(":checked")) {  
    status = "active";
    
} else {
    status = "not active";
}

if (action == "add") {
  await $.post(
    "add.php",
    {
      fname: $("#fname").val(),
      lname: $("#lname").val(),
      status: status,
      role: $( "#role" ).val()
    },
    
  );

   await $.get("show.php", function(data, status){
    let data1 = JSON.parse(data);
    
    for(let i = data1.length - 1; i < data1.length; i++) {
        tabBody=document.getElementsByTagName("tbody").item(0);
        row=document.createElement("tr");
        row.setAttribute("id", "row" + data1[i].id);

        cell1 = document.createElement("td");
        cell2 = document.createElement("td");
        cell3 = document.createElement("td");
        cell4 = document.createElement("td");
        cell5 = document.createElement("td");
    
        checkbox=document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "name" + data1[i].id;
        checkbox.value = "value" + data1[i].id;
        checkbox.id = "checkbox" + data1[i].id;

        
        cell2.setAttribute("class", "name");
        cell2.setAttribute("id", "name" + data1[i].id);
        cell4.setAttribute("id", "role" + data1[i].id);
        checkbox.setAttribute("class", "checkbox");
        checkbox.onclick = check;
        textnode2=document.createTextNode(data1[i].fname + " " + data1[i].lname);
        textnode3=document.createTextNode(data1[i].status);
        circle = document.createElement("i");
        circle.setAttribute("class", "fas fa-circle");
        circle.setAttribute("id", "circle" + data1[i].id);
        if (data1[i].status == "active") {
          circle.style.color = "green";
        } else {
          circle.style.color = "grey";

        }
        textnode4=document.createTextNode(data1[i].role);
        trash=document.createElement("i");
        edit=document.createElement("i");

        
        trash.setAttribute("id", "delete" + data1[i].id);
        edit.setAttribute("id", "edit" + data1[i].id);
        trash.setAttribute("class", "fas fa-trash-alt");
        edit.setAttribute("class", "fas fa-pen-square" + " " + "ml-2" + " " + i);        trash.onclick = delete_user;
        edit.onclick = edit_user;
    
        cell1.appendChild(checkbox);
        cell2.appendChild(textnode2);
        cell3.appendChild(circle);
        cell4.appendChild(textnode4);
        cell5.appendChild(trash);
        cell5.appendChild(edit);
      
    
    
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
    
        tabBody.appendChild(row);
      }
    });   
} else {
    await $.post(
    "edit.php",
    {
      fname: $("#fname").val(),
      lname: $("#lname").val(),
      status: status,
      role: $("#role").val(),
      id: edit_id
    }, 
  );
  document.getElementById("name" + edit_id).innerHTML = $("#fname").val() + " " + $("#lname").val();
  if ($("#statusLabel").html() == "Active") {
    document.getElementById("circle" + edit_id).style.color = "green";
  } else {
    document.getElementById("circle" + edit_id).style.color = "grey";
  }; 

  document.getElementById("role" + edit_id).innerHTML = $("#role").val();
  
  $("#fname").val("");
  $("#lname").val(""); 
  $("#status").val("not active"); 
  $("#role").val("user");
$('#status').prop('checked', false);
$("#statusLabel").html("Not Active");
}

  
});

let id_array = [];

function what_is_checked () {
  $(document).ready(function () {  
      $('.checkbox:checked').each(function () { 

    var id = (this.checked ? $(this).val().slice(5) : "");
    id_array.push(id); 
   }); 
  });
}

let val;
let val1;


let selectValue;
let selectInput;

  $("#ok1").on('click', ok);
  $("#ok2").on('click', ok);

   async function ok (){
    what_is_checked();
    if (this.id == "ok1") {
      selectValue = $('#selection').val();
      selectInput = "#selection";
    } else {
      selectValue = $('#selection1').val();
    selectInput = "#selection1";
    }
    if ($('.checkbox:checked').length == 0) {
      $("#exampleModal2").modal('show');
      $('#myModalLabel').html("Please choose a user!");
      $('#modal-btn-si').html("Ok");
      $('#closeConfirm').hide();
      $('#modal-btn-no').hide();
    }
   else if(selectValue == 'select') {
    $("#exampleModal2").modal('show');
      $('#myModalLabel').html("Please choose an action!");
      $('#modal-btn-no').hide();
      $('#modal-btn-si').html("Ok");
      $('#closeConfirm').hide();
      $('#modal-btn-no').hide();
    } 
     if(selectValue == 'active') {
      if ($('.checkbox:checked').length == $('.checkbox').length) {
        $("#exampleModal2").modal('show');
        $('#closeConfirm').show();
        $('#modal-btn-no').show();
        $('#myModalLabel').html("Are you sure to do this?");
        $("#modal-btn-si").on("click", async function(){
          await $.post(
            "setActive.php",
            {
              id_array: id_array
            }, 
          );
          for (let i = 0; i < id_array.length; i++) {
            let id = id_array[i];
            document.getElementById("circle" + id).style.color = "green";
          }
          if (id_array.length > 0) {
            $(selectInput).val('select');
          }
          id_array = [];
          $('input[type=checkbox]').prop('checked', false);
          $('#modal-btn-si').off();
        }); 
      } else{
      await  $.post(
          "setActive.php",
          {
            id_array: id_array
          }, 
        );
        for (let i = 0; i < id_array.length; i++) {
          let id = id_array[i];
          document.getElementById("circle" + id).style.color = "green";
        }     
        if (id_array.length > 0) {
          $(selectInput).val('select');
        }
        id_array = [];
        $('input[type=checkbox]').prop('checked', false);
        $('#modal-btn-si').off();
      }
    } else if (selectValue == "notActive") {
      if ($('.checkbox:checked').length == $('.checkbox').length) {
        $("#exampleModal2").modal('show');
        $('#closeConfirm').show();
        $('#modal-btn-no').show();
        $('#myModalLabel').html("Are you sure to do this?");
        $("#modal-btn-si").on("click", async function(){
          await  $.post(
            "setNotActive.php",
            {
              id_array: id_array
            }, 
          );
          for (let i = 0; i < id_array.length; i++) {
            document.getElementById("circle" + id_array[i]).style.color = "grey";
          }
          if (id_array.length > 0) {
            $(selectInput).val('select');
          }
          id_array = [];
          $('input[type=checkbox]').prop('checked', false);
          $('#modal-btn-si').off();
        });       
      } else{
      await  $.post(
          "setNotActive.php",
          {
            id_array: id_array
          }, 
        );
        for (let i = 0; i < id_array.length; i++) {
          document.getElementById("circle" + id_array[i]).style.color = "grey";
        }
        if (id_array.length > 0) {
          $(selectInput).val('select');
        }
        id_array = [];
        $('input[type=checkbox]').prop('checked', false);
        $('#modal-btn-si').off();
        }
    } else if (selectValue == "delete") {
      if ($('.checkbox:checked').length > 0) {
        $("#exampleModal2").modal('show');
        $('#closeConfirm').show();
        $('#modal-btn-no').show();
        $('#myModalLabel').html("Are you sure to do this?");
        $("#modal-btn-si").on("click", async function(){
          await  $.post(
            "delete1.php",
            {
              id_array: id_array
            }, 
          );
          for (let i = 0; i < id_array.length; i++) {
    
            $('#row' + id_array[i]).remove();    
            }

            $(selectInput).val('select');
            $('input[type=checkbox]').prop('checked', false);
            $('#modal-btn-si').off();

            id_array = [];
          });
        $("#modal-btn-no").on("click", function(){
          id_array = [];
        });   

      }
        
         
  }

  };

  

$('.checkAll').click(function() {
  if ($(this).is(':checked')) {
      $('input[type=checkbox]').prop('checked', true);
  } else {
      $('input[type=checkbox]').prop('checked', false);
  }
});

function check () {
  $('.checkAll').prop('checked', false);
}

$('.status').click(function() {
  if ($(this).is(':checked')) {
    $('#statusLabel').html("Active");
  } else {
    $('#statusLabel').html("Not Active"); 
  }
});


$('#form').submit(function (evt) {
  evt.preventDefault();
});
