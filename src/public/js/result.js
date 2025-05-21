document.addEventListener("DOMContentLoaded", function () {
  var dropdownButton = document.getElementById("dropdownButton");
  var dropdownMenu = dropdownButton.nextElementSibling;

  dropdownButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("show");
  });

  // Đóng dropdown nếu click bên ngoài
  document.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
    }
  });

  dropdownMenu.querySelectorAll(".dropdown-item").forEach(function (item) {
    item.addEventListener("click", function (event) {
      dropdownMenu.classList.remove("show");
      // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng trang)
      event.preventDefault();
      // Lấy URL từ thuộc tính href của thẻ a
      let url = new URL(window.location.href);
      // Chuyển hướng trang đến URL đã lấy được
      var classValue = item.getAttribute("data-class");

      if (classValue === "all") {
        url.searchParams.delete("class");
      } else url.searchParams.set("class", item.getAttribute("data-class") || "");
      url.searchParams.delete("Role");
      url.searchParams.set("page", 1);
      window.location.href = url;
    });
  });

  dropdownMenu
    .querySelectorAll(".dropdown-item-admin")
    .forEach(function (item) {
      item.addEventListener("click", function (event) {
        dropdownMenu.classList.remove("show");
        // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng trang)
        event.preventDefault();
        // Lấy URL từ thuộc tính href của thẻ a
        let url = new URL(window.location.href);
        // Chuyển hướng trang đến URL đã lấy được
        var roleValue = item.getAttribute("data-role");

        if (roleValue === "all") {
          url.searchParams.delete("Role");
        } else url.searchParams.set("Role", item.getAttribute("data-role") || "");
        url.searchParams.set("page", 1);
        url.searchParams.delete("class");
        window.location.href = url;
      });
    });
});

console.log("result.js");

const btnloc = document.querySelectorAll("[btn-loc]");

btnloc.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    if (inputValue && inputValue !== "")
      url.searchParams.set("keyword", inputValue);
    else {
      url.searchParams.delete("keyword");
    }
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const btnDetailList = document.querySelectorAll("[btn-detail]");
btnDetailList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStu");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/student/${studentId}`;
    window.location.href = url;
  });
});

const btnDetailTestList = document.querySelectorAll(
  "[btn-detail-test-with-idStu]"
);
btnDetailTestList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    //console.log(testId);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${testId}`;
    window.location.href = url;
  });
});

const btnDetailResult = document.querySelectorAll(
  "[btn-detail-test-with-idResult]"
);
btnDetailResult.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idResult = btn.getAttribute("idResult");
    //console.log(idResult);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += "/" + idResult;
    window.location.href = url;
  });
});

const btnDetailSubmit = document.querySelectorAll("[btn-detail-submit]");
btnDetailSubmit.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idSubmit = btn.getAttribute("idSubmit");
    //console.log(idSubmit);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${idSubmit}`;
    window.location.href = url;
  });
});

const btnWidget = document.querySelectorAll("[btn-widget]");
btnWidget.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idProb = btn.getAttribute("idProb");
    //console.log(idProb);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${idProb}`;
    window.location.href = url;
  });
});

const btnLocTest = document.querySelectorAll("[btn-loc-test]");
btnLocTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-test]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    if (inputValue && inputValue !== "")
      url.searchParams.set("keyword", inputValue);
    else {
      url.searchParams.delete("keyword");
    }
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const btnTime = document.querySelectorAll("[btn-time]");
btnTime.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let timeState = localStorage.getItem("time");
    if (timeState == 0 || timeState === null) {
      localStorage.setItem("time", 1);
      btn.textContent = "Thi"; // Thay đổi textContent của nút được click
    } else {
      localStorage.setItem("time", 0);
      btn.textContent = "Luyện tập"; // Thay đổi textContent của nút được click
    }
  });
});

const btnDetailTest = document.querySelectorAll("[btn-detail-test]");
btnDetailTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/test/${testId}`;
    window.location.href = url;
  });
});

const btnDetailTestUser = document.querySelectorAll("[btn-detail-test-user]");

btnDetailTestUser.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    console.log(testId);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/result/test/${testId}`;
    window.location.href = url;
  });
});

const btnDetailStudentAndTest = document.querySelectorAll(
  "[btn-detail-test-and-student]"
);
btnDetailStudentAndTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStudent");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${studentId}`;
    window.location.href = url;
  });
});

const btnAgain = document.querySelectorAll("[btn-again]");

btnAgain.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let maBaiThi = btn.getAttribute("data-mbt");

    // Tạo URL mới từ URL hiện tại
    const url = new URL(window.location.href);

    // Thay thế phần cuối của đường dẫn với '/result/test/maBaiThi'
    const pathArray = url.pathname.split("/");
    pathArray[2] = "test";
    pathArray[3] = maBaiThi;
    url.pathname = pathArray.join("/");

    // Chuyển hướng đến URL mới
    window.location.href = url;
  });
});

const btnLocStu = document.querySelectorAll("[btn-loc-stu]");
btnLocStu.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-stu]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const sidebar_toggle = document.getElementById("sidebar-toggle");
const body = document.querySelector("body");

sidebar_toggle.addEventListener("click", function () {
  if (body.classList.contains("is-collapsed")) {
    body.classList.remove("is-collapsed");
    localStorage.setItem("sidebarState", "expanded"); // Lưu trạng thái là expanded
  } else {
    body.classList.add("is-collapsed");
    //dong tat ca dropdown
    const dropdowns = document.querySelectorAll(".show");
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove("show");
    });

    localStorage.setItem("sidebarState", "collapsed"); // Lưu trạng thái là collapsed
  }
});
//.slidebar-menu
const slideBarMenu = document.querySelector(".sidebar-menu");
console.log(slideBarMenu);
slideBarMenu.addEventListener("mouseleave", function () {
  if (body.classList.contains("is-collapsed")) {
    const dropdowns = document.querySelectorAll(".show");
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove("show");
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const storedState = localStorage.getItem("sidebarState");
  if (storedState === "collapsed") {
    body.classList.add("is-collapsed");
  } else {
    body.classList.remove("is-collapsed");
  }
});

const btnAdmin = document.querySelectorAll("[admin-btn]");
//console.log(btnAdmin);
const dropdownAdminProfile = document.querySelectorAll(
  "[dropdown-admin-profile]"
);
//console.log(dropdownAdminProfile);
btnAdmin.forEach(function (btn) {
  btn.addEventListener("click", function () {
    dropdownAdminProfile.forEach(function (dropdown) {
      dropdown.classList.toggle("show");
    });
  });
  //bam ra ngoai thi dong
  document.addEventListener("click", function (event) {
    if (
      !btn.contains(event.target) &&
      !dropdownAdminProfile[0].contains(event.target)
    ) {
      dropdownAdminProfile.forEach(function (dropdown) {
        //console.log("Test");
        dropdown.classList.remove("show");
      });
    }
  });
});
const btn_dark_bg_slide = document.querySelector("[btn-bg-slide-dark]");
const btn_white_bg_slide = document.querySelector("[btn-bg-slide-white]");
const nameAdmin = document.querySelector("[name-admin]");
const slideBg = document.querySelector("[slide-bar-item]");
console.log(slideBg);
btn_dark_bg_slide.addEventListener("click", function () {
  localStorage.setItem("backSlideBar", "black-bg");
  console.log("test black");
  if (!slideBg.classList.contains("black-bg")) {
    slideBg.classList.add("black-bg");
    nameAdmin.style.color = "white";
  }
  if (slideBg.classList.contains("white-bg")) {
    slideBg.classList.remove("white-bg");
  }
});
btn_white_bg_slide.addEventListener("click", function () {
  localStorage.setItem("backSlideBar", "white-bg");
  console.log("test white");
  if (!slideBg.classList.contains("white-bg")) {
    slideBg.classList.add("white-bg");
    nameAdmin.style.color = "black";
  }
  if (slideBg.classList.contains("black-bg")) {
    slideBg.classList.remove("black-bg");
  }
});

console.log(localStorage.getItem("backSlideBar"));
if (localStorage.getItem("backSlideBar") !== null) {
  slideBg.classList.add(localStorage.getItem("backSlideBar"));
  if (localStorage.getItem("backSlideBar") === "black-bg") {
    nameAdmin.style.color = "white";
  } else {
    nameAdmin.style.color = "black";
  }
} else {
  slideBg.classList.add("white-bg");
  nameAdmin.style.color = "black";
}

const listBtnNav = document.querySelectorAll("[btn-nav-tag]");
var indexSlider = sessionStorage.getItem("indexSlider");
if (indexSlider === null) {
  indexSlider = 0;
}
console.log("indexSlider: " + indexSlider);
listBtnNav[indexSlider].classList.add("active-item-nav");
var parent = listBtnNav[indexSlider].querySelector(".btn-nav");
parent.classList.add(localStorage.getItem("sidebarColor"));
console.log(listBtnNav);
for (var i = 0; i < listBtnNav.length; i++) {
  const btn = listBtnNav[i];
  let ind = i;
  btn.addEventListener("click", function () {
    console.log(ind);
    sessionStorage.setItem("indexSlider", ind.toString());
    console.log("Set indexSlider: " + ind.toString());
    btn.classList.add("active-item-nav");
    var parent = btn.querySelector(".btn-nav");
    parent.classList.add(localStorage.getItem("sidebarColor"));
    if (btn.classList.contains("active-item-nav")) {
      listBtnNav.forEach(function (btn1) {
        if (btn1 !== btn) {
          if (btn1.classList.contains("active-item-nav")) {
            btn1.classList.remove("active-item-nav");
          }
          //btn -> .btn-nav
          var parent = btn1.querySelector(".btn-nav");
          if (parent.classList.contains("bg-gradient-primary")) {
            parent.classList.remove("bg-gradient-primary");
          }
          if (parent.classList.contains("bg-gradient-dark")) {
            parent.classList.remove("bg-gradient-dark");
          }
          if (parent.classList.contains("bg-gradient-info")) {
            parent.classList.remove("bg-gradient-info");
          }
          if (parent.classList.contains("bg-gradient-success")) {
            parent.classList.remove("bg-gradient-success");
          }
          if (parent.classList.contains("bg-gradient-warning")) {
            parent.classList.remove("bg-gradient-warning");
          }
          if (parent.classList.contains("bg-gradient-danger")) {
            parent.classList.remove("bg-gradient-danger");
          }
        }
      });
    }
  });
}

function sidebarColor(a) {
  var parent = document.querySelector(".active-item-nav .btn-nav");

  //lay the a trong parent1
  console.log(parent);
  var color = a.getAttribute("data-color");
  //luu vao local storage
  localStorage.setItem("sidebarColor", "bg-gradient-" + color);
  if (parent.classList.contains("bg-gradient-primary")) {
    parent.classList.remove("bg-gradient-primary");
  }
  if (parent.classList.contains("bg-gradient-dark")) {
    parent.classList.remove("bg-gradient-dark");
  }
  if (parent.classList.contains("bg-gradient-info")) {
    parent.classList.remove("bg-gradient-info");
  }
  if (parent.classList.contains("bg-gradient-success")) {
    parent.classList.remove("bg-gradient-success");
  }
  if (parent.classList.contains("bg-gradient-warning")) {
    parent.classList.remove("bg-gradient-warning");
  }
  if (parent.classList.contains("bg-gradient-danger")) {
    parent.classList.remove("bg-gradient-danger");
  }
  parent.classList.add(localStorage.getItem("sidebarColor"));
}
