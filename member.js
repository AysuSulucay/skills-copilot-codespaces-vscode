function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var about = document.getElementById("about");
    var memberContent = document.getElementById("member-content");
    var skillsContent = document.getElementById("skills-content");
    var projectsContent = document.getElementById("projects-content");
    var contactContent = document.getElementById("contact-content");
    var aboutContent = document.getElementById("about-content");
    member.style.backgroundColor = "#f2f2f2";
    skills.style.backgroundColor = "#fff";
    projects.style.backgroundColor = "#fff";
    contact.style.backgroundColor = "#fff";
    about.style.backgroundColor = "#fff";
    memberContent.style.display = "block";
    skillsContent.style.display = "none";
    projectsContent.style.display = "none";
    contactContent.style.display = "none";
    aboutContent.style.display = "none";
}