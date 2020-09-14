/* Move files to folders as required by nbgrader v1.0- Subhash Subramanian */
// assumes that ipynb submitted are named Test1.ipynb, Test2.ipynb and so on

// Menu Options 
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Move files')
  .addItem('Move files', 'moveFilesToFolder')
  .addToUi();
}


function moveFilesToFolder() {
var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
// find how many students wrote the test  
lastRow = ss.getLastRow()
  
// get the id of the submitted folder  
//var submittedFolderId = DriveApp.getFolderById('replace-with-your-folder-id');
var submittedFolderId = checkAndCreateFolder(false, "submitted-do not delete");  
//var submittedFolderName = submittedFolderId.getName();
//Browser.msgBox(submittedFolderName);
  
 // get number of rows 
var numStudents = lastRow +1;
    
//for each student - move his submission to the test folder under his roll no  
  for (var i = 2; i < numStudents; i++) {
  //get roll no, test no and fileID
  var rollNo = ss.getRange(i,2).getValue();
  var testNo = "Test" + ss.getRange(i,3).getValue();    
  var filefullpath = ss.getRange(i,4).getValue().toString();
  var fileId = filefullpath.substring(filefullpath.length-33);
  // there are 33 characters before file id
  // https://drive.google.com/open?id=
  var filename = DriveApp.getFileById(fileId).getName();    
  var fileRename = filename.substring(0,filename.indexOf(' ')) + ".ipynb" ; //get only first few characters till space 
  DriveApp.getFileById(fileId).setName(fileRename) ;
  
  //create a folder by roll no if it doesn't exist
  //var rollNofolderId = CreateSubFolder(rollNo, submittedFolderName);
  //Browser.msgBox(rollNofolderId);
  // var rollNofolderId = submittedFolder.createFolder(testNo).getId(); 
  var rollNofolderId = checkAndCreateFolder(submittedFolderId,rollNo);   
   
  //  create a folder by test name under folder of student
  // var testfolderId = CreateSubFolder(testNo, rollNo);
  // Browser.msgBox(testfolderId);
  // var testfolderId = rollNofolder.createFolder(testNo).getId();
  var testfolderId = checkAndCreateFolder(rollNofolderId,testNo);  
    
  // move submitted file to the test folder of that student
  Drive.Files.update({ parents: [{ id: testfolderId }] }, fileId);  
  }
  
  Browser.msgBox("You may now downloaded the folder named submitted")
}
  
  
function checkAndCreateFolder(base_folderId, folder_name) {
  if (base_folderId){ //Checks if is specified main folder
    var folders = DriveApp.getFolderById(base_folderId).getFolders(); //Getting folder list from specified location
  } else { //If not specified folder we take all Drive folders
   var folders = DriveApp.getFolders(); //Getting all folders in Drive
  }

   var folder_exist = false, folder; //By default folder don`t exists till we check and confirm that it exists

  while(folders.hasNext()){ //Looping through all folders in specified location while we have folders which to check
    folder = folders.next(); //Taking next folder to check if it is folder that we are looking for
    if(folder.getName() == folder_name){ //Checking it`s name
     folder_exist = folder.getId(); //If folder is found we assign its ID to our return variable
    } //If folder don`t exists we have already assigned false to return value
  }

  if (!folder_exist) { //Checks if folder don`t exists than we need to create it
    if(base_folderId){ //Checking where we should create folder
      DriveApp.getFolderById(base_folderId).createFolder(folder_name); //If base folder is specified than we create there folder
    } else {
      DriveApp.createFolder(folder_name); //If base folder not specified than we create folder in Drive root folder
    }
   folder_exist = checkAndCreateFolder(base_folderId, folder_name); //Now run self again to check if folder was created and if it is created than we get folder ID
  }

  return folder_exist; //Returning false if our folder is not created or folder ID if folder exists and is created
}
