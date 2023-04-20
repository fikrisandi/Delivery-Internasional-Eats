$(document).ready(function () {
  var token = localStorage.getItem("token");
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    const name = decodedPayload.name;
    $.ajax({
      url: "https://food-delivery.kreosoft.ru/api/account/profile",
      type: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "text/plain",
      },
      success: function (data) {
        $("#fullName").val(data.fullName);
        $("#email").val(data.email);
        $("#birthDate").val(data.birthDate.substring(0, 10));
        $("#gender").html(data.gender);
        $("#address").val(data.address);
        $("#phoneNumber").val(data.phoneNumber);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      },
    });

    $("#header").html(`
          <div>
            ${name}
            <form id="logout" class="d-inline">
              <button class="btn btn-outline-secondary" type="submit">Logout</button>
            </form>
          </div>
        `);

    $("#logout").submit(function (event) {
      event.preventDefault();

      localStorage.removeItem("token");

      $.ajax({
        url: "https://food-delivery.kreosoft.ru/api/account/logout",
        type: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        success: function (response) {
          window.location.href = "/login";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert(jqXHR.responseJSON.message);
        },
      });
    });
  } else {
    $("#header").html(`
            <a class="btn btn-outline-secondary" href="/login">Login</a>
          `);
  }
});
