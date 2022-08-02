document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");
  const header = document.querySelector(".main-header");
  const content = document.querySelector(".content");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  main.appendChild(scrollToTop);

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let currentScrollTop = window.scrollY;

    if (currentScrollTop > 50) {


      if (currentScrollTop > lastScrollTop) {
        //Scroll down
        scrollToTop.classList.remove("active");
      } else {
        //Scroll up
        scrollToTop.classList.add("active");
      }

      lastScrollTop = currentScrollTop;
    } else {      
      scrollToTop.classList.remove("active");
    }

    if (matchMedia("screen and (min-width: 481px)").matches) {
      currentScrollTop > 50 ? header.classList.add("scroll") : header.classList.remove("scroll")
    }
  });

  scrollToTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
    content.scrollTo({top: 0, behavior: "smooth"});
  });


  /* =====================================================
       Observer
  ===================================================== */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("active")
      } else {
        entry.target.classList.remove("active")
      }
    })
  })

  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    io.observe(section)
  })

  /* =====================================================
       Top menus
  ===================================================== */
  // const lnb = document.querySelector(".lnb")

  /* =====================================================
       Tooltip
  ===================================================== */
  // const tooltips = document.querySelectorAll(".tooltip-icon");
  // if (tooltips) {
  //   tooltips.forEach((tooltip) => {
  //     tooltip.addEventListener("click", (event) => {
  //       const content = event.target.nextElementSibling;
  //       content.classList.toggle("active");
  //     });
  //   });
  // }
  const tooltips = document.querySelectorAll("[data-tooltip]");
  if (tooltips[0]) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("mouseover", event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.style.zIndex = "5";
      });
    });
  }

  /* =====================================================
       Target Smooth Scroll
  ===================================================== */
  const anchors = document.querySelectorAll("a[href^='#']");
  if (anchors[0]) {
    anchors.forEach(anchor => {
      anchor.addEventListener("click", () => {
        anchor.getAttribute("href").scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  /* =====================================================
       Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  const showTabContent = event => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
    let menuIndex = [...tabs].indexOf(event.target);

    tabs.forEach(tab => {
      [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("active") : tab.classList.remove("active");
    });

    tabContents.forEach(content => {
      [...tabContents].indexOf(content) === 0 && content.classList.add("active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("active")
        : content.classList.remove("active");
    });
  };

  tabs.forEach(tab => {
    [...tabs][0].classList.add("active");
    [...tabContents][0].classList.add("active");
    tab.addEventListener("click", showTabContent);
  });

  /* =====================================================
       Toggle
  ===================================================== */
  const toggles = document.querySelectorAll(".toggle");
  if (toggles) {
    toggles.forEach(toggle => {
      toggle.addEventListener("click", event => {
        const button = event.target;
        button.classList.toggle("active");
      });
    });
  }

  const hamburgMenu = document.querySelector(".hamburg-menu");
  if(hamburgMenu) {
    hamburgMenu.addEventListener("click", () => {
      const aside = document.querySelector("aside");
      hamburgMenu.classList.toggle("active");
      aside.classList.toggle("active");
    });
  }

  /* =====================================================
       Dropdown
  ===================================================== */
  const dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("click", (event) => {
    dropdown.classList.toggle("active")
  })

  /* =====================================================
       Local Navigation Bar
  ===================================================== */
  const lnb = document.querySelector(".lnb");
  const subs = document.querySelector(".subs");
  lnb.addEventListener("mouseenter", () => {
    subs.classList.add("active")

    subs.addEventListener("mouseleave", () => {
      subs.classList.remove("active")
    })
  })
});