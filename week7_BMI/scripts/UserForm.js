var SERVER_URL = 'http://127.0.0.1:3000';

$("#btnUserClear").click(function () {
  clearUserForm();
});

$("#frmUserForm").submit(function () { //Event : submitting the form
  saveUserForm();
  return true;
});

function checkUserForm() { //Check for empty fields in the form
  //for finding current date 
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' +
    (('' + month).length < 2 ? '0' : '') +
    month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

  if (($("#txtFirstName").val() != "") &&
    ($("#txtLastName").val() != "") &&
    ($("#txtHealthCardNumber").val() != "") &&
    ($("#datBirthdate").val() != "") && ($(
      "#datBirthdate").val() <= currentDate)) {
    return true;
  } else {
    return false;
  }
}

function saveUserForm() {
  if (checkUserForm()) {
    var user = {
      "email": $("#txtEmail").val(),
      "FirstName": $("#txtFirstName").val(),
      "LastName": $("#txtLastName").val(),
      "HealthCardNumber": $(
        "#txtHealthCardNumber").val(),
      "NewPassword": $("#changePassword").val(),
      "DOB": $("#datBirthdate").val()
    };

    if ($("#btnUserUpdate").val() == "Create") {
      var userData = {
        newUser: user
      }
      $.post(SERVER_URL + '/saveNewUser',
        userData,
        function (data) {
          alert(
            "New User Created Successfully!"
          );
          sessionStorage.user = JSON.stringify(
            user);
          sessionStorage.password = user.newPassword;
          $("#btnUserUpdate").val("Update");
          $.mobile.changePage("#pageMenu");
          window.location.reload();
        }).fail(function (error) {
        alert(error.responseText);
      });
    } else {
      user.agreedToLegal = JSON.parse(
        sessionStorage.user).agreedToLegal;
      user.password = sessionStorage.password;
      $.post(SERVER_URL + '/updateUser', user,
        function (data) {
          sessionStorage.user = JSON.stringify(
            user);
        }).fail(function (error) {
        alert(error.responseText);
      }).done(function () {
        $.mobile.changePage("#pageMenu");
        window.location.reload();
      });
    }
  } else {
    alert("Please complete the form properly.");
  }
}

function clearUserForm() {
  localStorage.removeItem("user");
  alert("The stored data have been removed");
}

function showUserForm() { //Load the stored values in the form
  try {
    var user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (user != null) {
    $("#txtFirstName").val(user.FirstName);
    $("#txtLastName").val(user.LastName);
    $("#txtHealthCardNumber").val(user.HealthCardNumber);
    $("#changePassword").val(user.NewPassword);
    $("#datBirthdate").val(user.DOB);
  }
}