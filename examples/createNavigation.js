function ClearContent(myNode) {
  //Remove child nodes,
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function CreateTag(tagname, barid, thisdocument, tagclass, parenttag) {
  var bar = thisdocument.createElement(tagname);
  bar.id = barid;
  bar.className = tagclass;
  if (parenttag !== undefined) {
    parenttag.appendChild(bar);
  }
  return bar;
}

function TagWithText(tagname, tagtext, tagclass) {
  var tag = document.createElement(tagname);
  tag.textContent = tagtext;
  tag.className = tagclass;
  return tag;
}

function TagParent(tagname, childlist, classname, tagid) {
  var tag = document.createElement(tagname);
  tag.className = classname;
  for (var child_idx in childlist) {
    tag.appendChild(childlist[child_idx]);
  }
  if (tagid !== undefined) {
    tag.id = tagid;
  }
  return tag;
}

export function CreateNavigation(prestype) {
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
      CreateTag(
        "section",
        "section_nav",
        document,
        "navchildsec",
        navigatorcontainer
      );
      //This is where the upcoming/previous slides will be presented
      CreateTag(
        "section",
        "previewer",
        document,
        "navchildsec",
        navigatorcontainer
      );

      //This is where any spontaneously added slides will be listed
      var linkheader = TagWithText("h3", "Lisätty sisältö", "unhlpresentation");
      linkheader.id = "addedcontentheader";
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
