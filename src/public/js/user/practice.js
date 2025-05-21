const btn_loc_test = document.querySelector("[btn-loc-test]");
const tim_kiem_test = document.querySelector("[tim-kiem-test]");
btn_loc_test.addEventListener("click", async () => {
  const keyword = tim_kiem_test.value;
  const url = new URL(window.location.href);
  if (keyword && keyword !== "") url.searchParams.set("keyword", keyword);
  else {
    url.searchParams.delete("keyword");
  }
  url.searchParams.set("page", 1);
  window.location.href = url;
});
