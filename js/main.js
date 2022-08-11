var BookmarkNameInput=document.getElementById("siteNameInput");
var WebsiteUrlInput=document.getElementById("WebsiteUrlInput");
var BookmarksList=document.getElementById("BookmarkList");
var BookmarksContainer ;
var unvalidNameInput=document.getElementById("unvalid Name");
var unvalidUrlInput=document.getElementById("unvalid Url");

if(localStorage.getItem("Bookmarks") ==null)
{
    var BookmarksContainer=[];
}
else
{
     BookmarksContainer=JSON.parse(localStorage.getItem("Bookmarks"));
     displayBookmarks();
 }


function submit()
{
    if(BookmarkNameInput.value == "" && WebsiteUrlInput.value == "")
    {
       unvalidNameInput.classList.replace("d-none","d-block")
       unvalidUrlInput.classList.replace("d-none","d-block")
    }   
    else if(BookmarkNameInput.value != "" && WebsiteUrlInput.value == "")
    {
       unvalidUrlInput.classList.replace("d-none","d-block")
    }
    else if(BookmarkNameInput.value == "" && WebsiteUrlInput.value != "")
    {
       unvalidNameInput.classList.replace("d-none","d-block")
    }


    if(existName() == true )
    {
        unvalidNameInput.innerHTML="this url already exist";
       unvalidNameInput.classList.replace("d-none","d-block")

    }
    else
    {
       var Bookmark = {
           Name: BookmarkNameInput.value,
           Url: WebsiteUrlInput.value
       };
       BookmarksContainer.push(Bookmark);
       unvalidNameInput.classList.replace("d-block","d-none")

       localStorage.setItem("Bookmarks",JSON.stringify( BookmarksContainer));
       displayBookmarks();
       clearForm();
    }   
    
};

function clearForm()
{
    BookmarkNameInput.value= ""  ;
    WebsiteUrlInput.value= "";
};

function displayBookmarks()
{
    var display= ``;
for ( var i=0 ; i<BookmarksContainer.length ;i++)
{
    display+= ` <div class="container ">
    <div class="Bookmarks-name d-flex" id="Bookmark'sName">
        <h2>${ BookmarksContainer[i].Name}</h2>
        <a href="${BookmarksContainer[i].Url}" target="_blank " class="btn btn-primary mx-2 ">Visit</a>
        <button onclick="DeleteBookmarks(${i})" class="btn  btn-danger">Delete</button>
     </div>
         
  </div>`;
};
BookmarksList.innerHTML=display;
};

function DeleteBookmarks(indexNumber)
{
BookmarksContainer.splice(indexNumber,1)
localStorage.setItem("Bookmarks",JSON.stringify( BookmarksContainer));
displayBookmarks();
}


function existName()
{
    for(var i=0 ; i<BookmarksContainer.length ; i++)
    {
        if(BookmarkNameInput.value == BookmarksContainer[i].Name)
        {
           return true;
        }
}
}