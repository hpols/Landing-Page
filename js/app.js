/**
	* 
	* Manipulating the DOM exercise.
	* Exercise programmatically builds navigation,
	* scrolls to anchors from navigation,
	* and highlights section in viewport upon scrolling.
	* 
	* Dependencies: None
	* 
	* JS Version: ES2015/ES6
	* 
	* JS Standard: ESlint
	* 
*/

/* Define Global Variables*/
const sections = document.getElementsByTagName("section");
const navList = document.getElementById("navbar__list");

/* Helper Functions */
//Check whether section is in viewport
function isInViewport(section) {
	let sectionBounds = section.getBoundingClientRect();

	return ( //only checking vertically as the section is set to fill the width
		sectionBounds.top >= 0 || sectionBounds.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

/*Begin Main Functions*/

// build the nav
function createNav() {
	for (const section of sections) {
		/* Possibily sections are added that should not be offered in the navbar and thus don't have data-nav */
		if(section.hasAttribute("data-nav")) { 
			let navItem = document.createElement("li");
			
			/* retrieving the necessary info and setting it to the elements*/
			navItem.textContent = section.getAttribute("data-nav"); //data-nav provides the navItem text
			navItem.classList.add("menu__link"); // CSS class provided for styling 

			navList.appendChild(navItem);//appending all the information to the parent
		}
	}
}

// Add class 'active' to section when near top of viewport
function activateSectionInView() {
	document.addEventListener("scroll", function() {
		for (const section of sections) { //check which one(s) are active and set the classes accordingly
			if (isInViewport(section)) {
				section.classList.add("your-active-class");
			} else {
				section.classList.remove("your-active-class");
			}
		}	
	});
}

// Scroll to anchor ID using scrollTO event
function scrollToSelected() {
	document.querySelector(".navbar__menu").addEventListener("click", function (evt) {
		if(evt.target.nodeName =="LI") {
			evt.preventDefault;
			/*use the navitem text to get the element through its data-nav*/
			let targetElement = document.querySelector(`[data-nav="${evt.target.textContent}"]`);
			targetElement.scrollIntoView({behavior: "smooth"});
		}
	});
}

// Hide the navBar when further down and we are not scrolling
function hideNavBar() {
	window.addEventListener("scroll", function() { //show navList when scrolling
		navList.style.display = "inherit";
		window.setTimeout(function() { //once/everytime scrolling starts set a timer for 5 seconds
			navList.style.display = "none"; //5 seconds up? Bye bey, navList.
		},5000);
	})
}

/*Begin Events*/

// Build menu 
createNav();

// Scroll to section on link click
scrollToSelected();

// Set sections as active
activateSectionInView();

// hide the navBar when it is not needed
hideNavBar();