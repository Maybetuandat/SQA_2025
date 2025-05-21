document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const inputs = document.querySelectorAll(".form-control");
let api = ''
  editBtn.addEventListener("click", function () {
    inputs.forEach((input) => {
      if(input.id != 'MSV') {
        input.removeAttribute("readonly");
      } else {
        api = '/api/update-profile-student/' + input.value
      }
    });
    saveBtn.classList.remove("hide");
  });

  saveBtn.addEventListener("click", async () => {
    let formData = new FormData();
    console.log(api)
    inputs.forEach(async (input) => {
      formData[input.id] = input.value;
      console.log(input.id, input.value)
    });
    // console.log(formData)
    
    await fetch(api, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Profile updated:", data);
        saveBtn.classList.add("hide");
        inputs.forEach((input) => {
          input.setAttribute("readonly", true);
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  });
});
