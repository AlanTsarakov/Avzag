const openSuperDuolingoPage = () => {
  document.getElementById("try-super-button").classList.toggle('clicked');
  setTimeout(() => document.getElementById("try-super-button").classList.toggle('clicked'), 200)
  location.href = "../html/superduolingo.html"
}

const getLanguageFullForm = (languageCode) => {
  switch (languageCode) {
    case 'de': return "German"
    case 'ja': return "Japanese"
    case 'fr': return "French"
    case 'es': return "Spanish"
    default: "Languages"
  }
}

const getLanguageFlagPath = (languageCode) => {
  return `../assets/svg/country-flags/os-flag.svg`
}

const closeOtherOpenDialogBoxes = (event) => {
  event.stopPropagation();
  let currentButton = event.target.closest(".alignment-div").querySelector(".floating-start-box-bottom")
  document.querySelectorAll(".floating-start-box-bottom").forEach((dialog) => {
    if (dialog != currentButton) { dialog.classList.add("hidden") }
  });
}

const closeAllOpenDialogBoxes = () => {
  document.querySelectorAll(".floating-start-box-bottom").forEach((dialog) => {
    dialog.classList.add("hidden")
  });
}

const scrollToCurrentLesson = () => {
  const targetDivs = document.querySelectorAll(".circle_box.completed");
  const targetDiv= targetDivs[targetDivs.length-3];
  console.log(targetDiv);
  targetDiv.scrollIntoView();
}

const openDialogBoxes = (event) => {
  closeOtherOpenDialogBoxes(event);
  let parentDiv = event.target.closest(".alignment-div");
  parentDiv.querySelector(".lesson-button").classList.toggle('clicked')
  parentDiv.querySelector(".floating-start-box-bottom").classList.toggle("hidden");
  setTimeout(() => parentDiv.querySelector(".lesson-button").classList.toggle('clicked'), 150)
  parentDiv.querySelector(".floating-start-box")?.classList.toggle("hidden");
}
let sectionData;
async function fetchSectionData(lang, sectionId) {
  try {
    let response = await fetch(`https://webapiavzag.onrender.com/api/Section?sectionId=${sectionId}`);
    sectionData = await response.json();
    localStorage.setItem("sectionData", JSON.stringify(sectionData));
    showLessonsInSection();

  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
}
// This should be replaced with value from local storage ========================
fetchSectionData("es", 1);
//======================End of JSON==============================

const placeSectionList = () => {
  let sectionList = `<div class="section-container">
  <div class="middle-dev">
    <h1 class="section-name">Раздел 1: Новичок</h1>
    <div class="status-badge">
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/ee32b843ba0258510aa3d7d4a887cfa8.svg"
      />
      <p >В процессе!</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button active-section-button" onclick="showLessonsInSection(1)">
        <span class="_1fHYG">Продолжить</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/rookie-section-banner.svg"
  />
</div>
<div class="section-container locked-section">
  <div class="middle-dev">
    <h1 class="section-name">Раздел 2: Исследователь</h1>
    <div class="status-badge">
      <img
        src="../assets/svg/locked-button-grey.svg"
      />
      <p >Закрыто</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button">
        <span class="_1fHYG">Закрыто</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/explorer-section-banner.svg"
  />
</div>
<div class="section-container locked-section">
  <div class="middle-dev">
    <h1 class="section-name">Раздел 3: Чемпион</h1>
    <div class="status-badge">
      <img
        src="../assets/svg/locked-button-grey.svg"
      />
      <p >Закрыто</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button">
        <span class="_1fHYG">Закрыто</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/champion-section-banner.svg"
  />
</div>`
  scrollableContainer = document.querySelector(".scrollable-lesson-div");
  scrollableContainer.innerHTML = ''
  scrollableContainer.insertAdjacentHTML("beforeend", sectionList);
}

const getUserDataFromSessionStorage = () => {
  return JSON.parse(sessionStorage.getItem("user-info"))
}

const placeuserStatistics = () => {
  let userData = getUserDataFromSessionStorage();
  document.title = `Авзаг`;
  document.querySelectorAll("#profile-image").forEach(item => item.src = userData.profileImage);
  document.querySelectorAll(".fire-text").forEach(item => item.textContent = userData.xp);
  document.querySelectorAll(".heart-text").forEach(item => item.textContent = userData.hearts);
  document.querySelectorAll(".gem-text").forEach(item => item.textContent = userData.gems);
}

const placeUnitsandLessons = (sectionData, userData) => {
  console.log("userdata is ", userData);
  let completedChapters = userData.completedChapters;
  let completedUnits = userData.completedUnits
  let totalChaptersInUnit = sectionData.section.totalChaptersInUnit
  let totalUnitsInSection = sectionData.section.totalUnitsInSection

  console.log(completedChapters, "bulubulu", completedUnits)

  let lockedUnits = totalUnitsInSection - completedUnits - 1;
  let lockedLessons = totalChaptersInUnit - completedChapters - 1;
  let finishedUnitHeader = `
  <header class="unit unit-colorful">
    <h1 class="unit-number">Unit 2</h1>
    <span class="unit-description">
    Introduce yourself, order food and drink</span>
  </header>`

  let incompleteUnitHeader = `
<header class="unit unit-unfinished">
  <h1 class="unit-number">Unit 3</h1>
  <span class="unit-description">
  Talk about countries, ask for directions
  </span>
</header>
`

  let onProgressHtml = `
<div class="circle_box">
  <button class="lesson-button" onclick="openDialogBoxes(event);">
    <img src="../assets/svg/pirog.svg" class="star-image">
    <img src="../assets/svg/star-in-lesson-white.svg" class="star-image">
    <circle-progress value="0" max="100" text-format="none" ></circle-progress>
  </button>
  <div class="floating-start-box">
    <div class="text">
      НАЧАТЬ
    </div>
    <div class="triangle"></div>
  </div>
</div>
<div class="floating-start-box-bottom hidden">
  <div class="triangle-top"></div>
  <div class="text-container">
    <h1>Form basic sentences</h1>
    <p>Урок ${userData.currentLesson} из 4</p>
    <button onclick="startLesson()">Start +10 XP</button>
  </div>
</div>`

  let lockedDiv = `<div class="circle_box locked">
<button class="lesson-button inactive" onclick="openDialogBoxes(event);">
  <img src="../assets/svg/pirog.svg" class="star-image">
  <img src="../assets/svg/locked-button-grey.svg" class="star-image">
</button>
</div>
<div class="floating-start-box-bottom hidden locked">
<div class="triangle-top"></div>
<div class="text-container">
  <h1>Базовые формы предложений</h1>
  <p>Завершите все уровни,<br>чтобы разблокировать</p>
  <button>Закрыто</button>
</div>
</div>`
  let completedDiv = `
<div class="circle_box completed">
  <button
    class="lesson-button inactive"
    onclick="openDialogBoxes(event);"
  >
    <img src="../assets/svg/pirog.svg" class="star-image">
    <img
      src="../assets/svg/correct-tick-unit-completed.svg"
      class="star-image"
    />
  </button>
</div>
<div class="floating-start-box-bottom hidden completed">
  <div class="triangle-top"></div>
  <div class="text-container">
    <h1>Form basic sentences</h1>
    <p>You completed this level!</p>
    <button>Completed</button>
  </div>
</div>`

  let sectionHeader = `
<div class="sticky">
<div class="right-sidebar-header top-stats-mobile">
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/lesson-xp.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button fire-text"></span>
  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/gems-icon.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button gem-text"></span>
  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/heart-filled-red.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button heart-text"></span>
  </span>
</a>
</div>
<div class="section-name-header">
<div class="arrow" onclick="placeSectionList();"
  ><img alt="" src="../assets/svg/back-button-white.svg"
/>
<img alt="" src="../assets/svg/up-arrow-section.svg"
/></div>
<h2 class="_1Msxm">Раздел 1: Новичок</h2>
</div>
</div>
<div class="unit-placing-div">
<div>
`

  let bottomNavBar = `<div class="sidebar-buttons bottom-nav">
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap selected">
    <div class="icon-in-button">
      <img src="../assets/svg/home-in-sidebar.svg" alt="home-icon" />
    </div>

  </span>
</a>
<a href="leaderboard.html" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img src="../assets/svg/badge-in-sidebar.svg" alt="home-icon" />
    </div>

  </span>
</a>
<a href="profile-page.html" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        id="profile-image"
        src="../assets/svg/profile-image-temp.svg"
        alt="home-icon"
        class="profile"
      />
    </div>

  </span>
</a>
<a href="./shoppingpage.html" class="button-in-sidebar">
<span class="icon-and-text-wrap">
  <div class="icon-in-button">
    <img src="../assets/svg/shop-in-sidebar.svg" alt="home-icon" />
  </div>
</span>
</a>
<a href="./faq.html" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img src="../assets/images/sidebar-icon-faq.png" alt="home-icon" />
    </div>

  </span>
</a>
</div>
`

  let paddingArr = [0, 3, 5, 3, 0, -3, -5, -3, 0];
  let translateIndex = 0
  let paddingIndex = 0;

  const calculatePadding = () => {
    if (paddingArr[paddingIndex] < 0) {
      return `0 0 0 ${-60 * paddingArr[paddingIndex++]}px`
    }
    return `0 ${60 * paddingArr[paddingIndex++]}px 0 0`
  }

  const calculateTranslate = () => {
    return `${-30 * paddingArr[translateIndex++]}px`
  }

  let i = 0;
  const placecompletedChapters = (lessonCount, sectionRef, unitRef, start = 0) => {
    for (i = start; i < lessonCount + start; i++) {
      let circleNode = document.createElement("div");
      circleNode.setAttribute("class", "alignment-div");
      circleNode.style.padding = calculatePadding();
      circleNode.innerHTML = completedDiv;
      let box = circleNode.querySelector(".floating-start-box-bottom");
      box.style.translate = `calc(-50% + ${calculateTranslate()})`
      circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[i];
      sectionRef.appendChild(circleNode);
    }
  }

  const placeOngoingLessons = (sectionRef, unitRef, start = 0) => {
    let circleNode = document.createElement("div");
    circleNode.setAttribute("class", "alignment-div");
    circleNode.style.padding = calculatePadding();
    circleNode.innerHTML = onProgressHtml;
    let box = circleNode.querySelector(".floating-start-box-bottom");
    box.style.translate = `calc(-50% + ${calculateTranslate()})`
    circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[start];
    sectionRef.appendChild(circleNode);

  }


  const placeLockedLessons = (lessonCount, sectionRef, unitRef, start = 0) => {
    console.log("starting from", start);
    for (let i = start; i < lessonCount + start; i++) {
      let circleNode = document.createElement("div");
      circleNode.setAttribute("class", "alignment-div");
      circleNode.style.padding = calculatePadding();
      circleNode.innerHTML = lockedDiv;
      let box = circleNode.querySelector(".floating-start-box-bottom");
      box.style.translate = `calc(-50% + ${calculateTranslate()})`
      circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[i];
      sectionRef.appendChild(circleNode);
    }
  }

  let unitCounter = 1;
  scrollableContainer = document.querySelector(".scrollable-lesson-div");
  scrollableContainer.innerHTML = ''
  scrollableContainer.insertAdjacentHTML("beforeend", sectionHeader);
  let lessonContainer = document.querySelector(".unit-placing-div");
  console.log(completedUnits, "units complted")

  for (let i = 0; i < completedUnits; i++) {
    console.log("loop", i);
    paddingIndex = 0
    translateIndex = 0
    let section = document.createElement("section");
    section.setAttribute("id", `section-${unitCounter++}`);
    section.innerHTML = finishedUnitHeader;
    placecompletedChapters(totalChaptersInUnit, section, unitCounter - 2);
    section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
    section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;

   
    lessonContainer.append(section);
  }

  paddingIndex = 0;
  translateIndex = 0
  let section = document.createElement("section");
  section.setAttribute("id", `section-${unitCounter++}`);
  section.innerHTML = incompleteUnitHeader;
  placecompletedChapters(completedChapters, section, unitCounter - 2);




  placeOngoingLessons(section, unitCounter - 2,);
  placeLockedLessons(lockedLessons, section, unitCounter - 2,);
  section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
  section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;
  lessonContainer.append(section);

  for (let i = 0; i < lockedUnits; i++) {
    paddingIndex = 0;
    translateIndex = 0
    let section = document.createElement("section");
    section.setAttribute("id", `section-${unitCounter++}`);
    section.innerHTML = incompleteUnitHeader;
    placeLockedLessons(totalChaptersInUnit, section, unitCounter - 2);
    section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
    section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;





    lessonContainer.append(section);
  }

  scrollableContainer.insertAdjacentHTML("beforeend", bottomNavBar);
  placeuserStatistics();
  
  updateStatistics();
  scrollToCurrentLesson();
}

const showLessonsInSection = () => {
  let sectionData = JSON.parse(localStorage.getItem("sectionData"));
  let userData = getUserDataFromSessionStorage();
  placeUnitsandLessons(sectionData, userData);
}

const updateStatistics = () => {
  let userData = getUserDataFromSessionStorage();
  setTimeout(() => document.querySelector("circle-progress").value = (25 * (userData.currentLesson - 1)), 200);
}

const startLesson = () => {
  document.querySelector(".loading-screen").classList.toggle("hidden");
  document.body.style.overflow = "hidden"
  setTimeout(() => {
    window.location.href = "questionarie.html"
  }, 2500);

}