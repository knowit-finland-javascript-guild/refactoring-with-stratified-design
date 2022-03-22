function CreateTag(tagname, barid, thisdocument, tagclass, parenttag) {
  bar = thisdocument.createElement(tagname);
  bar.id = barid;
  bar.className = tagclass;
  if (parenttag !== undefined) {
    parenttag.appendChild(bar);
  }
  return bar;
}

function CreateNavigation(prestype) {
  var updated = false;
  if (prestype == "default") {
    //Create links in the secondary screen for jumping from one section to another

    var contentlist = document.getElementById("section_nav");
    if (contentlist == undefined) {
      var navigatorcontainer = CreateTag(
        "section",
        "navigatorcontainer",
        document,
        ""
      );

      //This is where the general navigation between sections is
      var contentlist = CreateTag(
        "section",
        "section_nav",
        document,
        "navchildsec",
        navigatorcontainer
      );
      //This is where the upcoming/previous slides will be presented
      var versepreview = CreateTag(
        "section",
        "previewer",
        document,
        "navchildsec",
        navigatorcontainer
      );

      //This is where any spontaneously added slides will be listed
      var linkheader = TagWithText("h3", "Lisätty sisältö", "unhlpresentation");
      linkheader.id = "addedcontentheader";
      linkheader.addEventListener("click", SwitchToSpontaneous, false);
      navigatorcontainer.appendChild(
        TagParent(
          "div",
          [linkheader, TagParent("div", [], "", "addedcontent")],
          "",
          "addedcontentparent"
        )
      );
    } else {
      ClearContent(contentlist);
      updated = true;
    }
  }

  var sectionlist = document.createElement("ul");
  sectionlist.id = "navigator_sectionlist";
  if (prestype == "spontaneous") {
    sectionlist.id = "addedcontent_sectionlist";
    sectionlist.className = "unhlnavsection";
  } else {
    //Highlight the default presentation's navigation
    sectionlist.className = "hlnavsection";
  }
}
