function switchToDefault() {
  //just a stub
}

function movePres() {
  //just a stub
}

function listToLink(this_li) {
  this_li.addEventListener("click", movePres, false);
}

function clearContent(myNode) {
  //Remove child nodes,
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function createTag(tagname, barid, thisdocument, tagclass, parenttag) {
  var bar = thisdocument.createElement(tagname);
  bar.id = barid;
  bar.className = tagclass;
  if (parenttag !== undefined) {
    parenttag.appendChild(bar);
  }
  return bar;
}

function tagWithText(tagname, tagtext, tagclass) {
  var tag = document.createElement(tagname);
  tag.textContent = tagtext;
  tag.className = tagclass;
  return tag;
}

function tagParent(tagname, childlist, classname, tagid) {
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

export function createNavigation(items) {
  var contentlist = document.createElement("div");

  var navigatorcontainer = createTag(
    "section",
    "navigatorcontainer",
    document,
    ""
  );

  //This is where the general navigation between sections is
  createTag(
    "section",
    "section_nav",
    document,
    "navchildsec",
    navigatorcontainer
  );
  //This is where the upcoming/previous slides will be presented
  createTag(
    "section",
    "previewer",
    document,
    "navchildsec",
    navigatorcontainer
  );

  var addedContentHeader = tagWithText(
    "h3",
    "Lisätty sisältö",
    "unhlpresentation"
  );
  addedContentHeader.id = "addedcontentheader";
  navigatorcontainer.appendChild(
    tagParent(
      "div",
      [addedContentHeader, tagParent("div", [], "", "addedcontent")],
      "",
      "addedcontentparent"
    )
  );

  var sectionlist = document.createElement("ul");
  sectionlist.id = "navigator_sectionlist";
  sectionlist.className = "hlnavsection";

  for (let thissec of items) {
    var this_li = document.createElement("li");
    if (thissec.name) {
      this_li.textContent = thissec.name;
    } else {
      this_li.textContent = "Untitled";
    }
    //The section_nav_header class helps in highlighting in the navigator
    var sec_classname = "unhlsection";
    this_li.className = sec_classname;
    listToLink(this_li);
    //Now, feed the lower level elements to the tree
    if (thissec.type === "section") {
      var subsectionlist = document.createElement("ul");
      for (let thissubsec of thissec.items) {
        var this_subli = document.createElement("li");
        this_subli.className = sec_classname;
        this_subli.textContent = thissubsec.name;
        subsectionlist.appendChild(this_subli);
        listToLink(this_subli);
      }
      this_li.appendChild(subsectionlist);
    }
    sectionlist.appendChild(this_li);
  }

  var linkheader = tagWithText("h3", "Sisältö", "hlpresentation");
  linkheader.id = "defaultcontentheader";
  linkheader.addEventListener("click", switchToDefault, false);
  contentlist.appendChild(linkheader);

  contentlist.appendChild(sectionlist);

  document.body.appendChild(contentlist);
  document.body.appendChild(navigatorcontainer);
  document.body.style.overflow = "auto";
}
