function getRatingHtml(rating) {
  var fullStar = Math.round(rating);
  // var halfStar = rating - fullStar;
  // var halfStarCount = 0;

  // if (halfStar > 0.25 && halfStar < 0.75) halfStarCount = 1;
  // else fullStar += 1;

  var emptyStar = 10 - fullStar; // - halfStarCount;

  var starHtml = "";
  for (var i = 0; i < fullStar; i++) {
    starHtml += '<i class="fa-solid fa-star text-primary"></i>';
  }

  // if (halfStarCount > 0) {
  //   starHtml += '<i class="fa-solid fa-star-half-stroke text-primary"></i>';
  // }

  for (var i = 0; i < emptyStar; i++) {
    starHtml += '<i class="fa-solid fa-star"></i>';
  }

  return starHtml;
}

function AddToCart(dishId) {
  var token = localStorage.getItem("token");
  if (token) {
    $.ajax({
      url: "https://food-delivery.kreosoft.ru/api/basket/dish/" + dishId,
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      data: "",
      success: function (response) {
        alert("Dish added to cart");
        location.reload();
      },
      error: function (error) {
        alert("Error");
        console.log(error);
      },
    });
  }
}

function RemoveFromCart(dishId, increase = true) {
  var token = localStorage.getItem("token");
  if (token) {
    $.ajax({
      url:
        "https://food-delivery.kreosoft.ru/api/basket/dish/" +
        dishId +
        "?increase=" +
        increase,
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      data: "",
      success: function (response) {
        if (increase) alert("Dish amount decreased");
        else alert("Dish removed from cart");
        location.reload();
      },
      error: function (error) {
        alert("Error");
        console.log(error);
      },
    });
  }
}

$(document).ready(function () {
  var token = localStorage.getItem("token");
  if (token) {
    $.ajax({
      url: "https://food-delivery.kreosoft.ru/api/basket",
      type: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "text/plain",
      },
      success: function (data) {
        var count = 0;
        data.forEach(function (item) {
          count += item.amount;
        });
        $("#cartCount").html(count);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      },
    });
  } else {
    $("#cartCount").html(0);
  }
});

function confirmDelivery(orderId) {
  var token = localStorage.getItem("token");
  if (token) {
    $.ajax({
      url: "https://food-delivery.kreosoft.ru/api/order/" + orderId + "/status",
      type: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      success: function (response) {
        alert("Order confirmed");
        location.reload();
      },
      error: function (error) {
        alert("Error");
        console.log(error);
      },
    });
  }
}

function submitRating(rating, id, canRate) {
  var token = localStorage.getItem("token");
  if (token && canRate)
    $.ajax({
      url:
        "https://food-delivery.kreosoft.ru/api/dish/" +
        id +
        "/rating?ratingScore=" +
        rating,
      type: "POST",
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
      success: function (data) {
        alert("Rating submitted successfully");
        location.reload();
      },
      error: function (error) {
        alert("Rating submission failed");
      },
    });
}
