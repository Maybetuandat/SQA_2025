document.querySelector("html").addEventListener("mousedown", function (e) {});

document.querySelector("i").addEventListener("transitionend", function () {
  document.querySelector("i").classList.remove("active");
});
const list_button_dropdown = document.querySelectorAll(
  "[button-dropdown-item]"
);
list_button_dropdown.forEach((button) => {
  button.addEventListener("click", (e) => {
    //dong het cac dropdown khac
    list_button_dropdown.forEach((btn) => {
      if (btn != button) {
        const dropdown = btn.nextElementSibling;
        dropdown.classList.remove("show");

        //ddoi arrow down
        const arrow = btn.querySelector("[arrow]");
        const icon = arrow.querySelector("i");
        if (icon.classList.contains("ti-angle-down")) {
          icon.classList.remove("ti-angle-down");
          icon.classList.add("ti-angle-right");
        }
      }
    });
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle("show");

    //ddoi arrow down
    const arrow = button.querySelector("[arrow]");
    const icon = arrow.querySelector("i");
    if (icon.classList.contains("ti-angle-right")) {
      icon.classList.remove("ti-angle-right");
      icon.classList.add("ti-angle-down");
    } else {
      icon.classList.remove("ti-angle-down");
      icon.classList.add("ti-angle-right");
    }
  });
});

var indexSlider = sessionStorage.getItem("indexSlider");
if (indexSlider !== null && (indexSlider === "1" || indexSlider === "2")) {
  document.addEventListener("DOMContentLoaded", function () {
    list_button_dropdown[parseInt(indexSlider) - 1].click();
  });
}
const studentResult = document.querySelectorAll("[result-student]");
const testResult = document.querySelectorAll("[result-test]");

studentResult.forEach((student) => {
  student.addEventListener("click", (e) => {
    const url = new URL(window.location.href);
    url.pathname = `/admin/result/student`;
    window.location.href = url;
  });
});

testResult.forEach((test) => {
  test.addEventListener("click", (e) => {
    const url = new URL(window.location.href);
    url.pathname = `/admin/result/test`;
    window.location.href = url;
  });
});
if (document.querySelector(".fixed-plugin")) {
  var fixedPlugin = document.querySelector(".fixed-plugin");
  var fixedPlugin = document.querySelector(".fixed-plugin");
  var fixedPluginButton = document.querySelector(".fixed-plugin-button");
  var fixedPluginButtonNav = document.querySelector(".fixed-plugin-button-nav");
  var fixedPluginCard = document.querySelector(".fixed-plugin .card");
  var fixedPluginCloseButton = document.querySelectorAll(
    ".fixed-plugin-close-button"
  );
  var navbar = document.getElementById("navbarBlur");
  var buttonNavbarFixed = document.getElementById("navbarFixed");

  if (fixedPluginButton) {
    fixedPluginButton.onclick = function () {
      if (!fixedPlugin.classList.contains("show")) {
        fixedPlugin.classList.add("show");
      } else {
        fixedPlugin.classList.remove("show");
      }
    };
  }

  if (fixedPluginButtonNav) {
    fixedPluginButtonNav.onclick = function () {
      if (!fixedPlugin.classList.contains("show")) {
        fixedPlugin.classList.add("show");
      } else {
        fixedPlugin.classList.remove("show");
      }
    };
  }

  fixedPluginCloseButton.forEach(function (el) {
    el.onclick = function () {
      fixedPlugin.classList.remove("show");
    };
  });

  document.querySelector("body").onclick = function (e) {
    if (
      e.target != fixedPluginButton &&
      e.target != fixedPluginButtonNav &&
      e.target.closest(".fixed-plugin .card") != fixedPluginCard
    ) {
      fixedPlugin.classList.remove("show");
    }
  };

  if (navbar) {
    if (navbar.getAttribute("data-scroll") == "true" && buttonNavbarFixed) {
      buttonNavbarFixed.setAttribute("checked", "true");
    }
  }
}
