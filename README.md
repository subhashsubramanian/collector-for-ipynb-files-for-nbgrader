# Collect ipynb files via Google form and create folder structure for subsequent evaluation by nbgrader 
a an apps script that creates the folder structure in G-Drive which can then be downloaded for evaluation by nbgrader

## How to use ?

## Step 1 Create a Google form for students to upload their ipynb files

The form must have only 3 questions : Roll no, Test number, File upload

## Step 2 Install the Google apps script code

Open Tools  Script Editor and replace any existing code with the code in MoveFiles.gs

Rename Code.gs to meetAttendance.gs

To run the script, Refresh the spreadsheet click on the spreadsheet menu item "Move files" > Move files

Click Resources Advanced Services Turn on Drive API V2

You will be required to authorise the code. Do so.

Refresh the spreadsheet. You will see a menu item "Move files". 

## Step 3 Running the script

After students have uploaded their ipynb files, Click on Move files > Move files

Download the entire folder submitted-do not delete and unzip it in Documents for evaluation bu nbgrader. Note folder under Documents must be named "submitted"
