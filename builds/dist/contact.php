<!-- This is the HTML form that is being processed by this php file. It is meant to be a guide but if you copy and paste it into your HTML it will work.

<form name="Form" action="contact_process.php" method="post">
	<label for="email" id="email">Email</label>
	<input type="text" name="email" required>
	<fieldset>
		<legend>Subject</legend>
	<select name="subject">
  	<option value="help">Build me a site!</option>
  	<option value="suggestion">I have a suggestion.</option>
  	<option value="question">I have a question.</option>
  	<option value="issue">I found an issue.</option>
	</select>
	</fieldset>
	<label for="name">Name</label>
	<input type="text" name="name" required>	
	<label for="subject">What's Up?</label>
	<label for="message">Tell me more...</label>
	<textarea name="message" rows="5" required></textarea>
	<input type="submit" name="submit" value="Submit">
	</form>

-->

<?php

$Referer = $_SERVER['HTTP_REFERER'];
// Gets posted data from the HTML form fields and creates local variables. The items with the ' marks around them are the name values from the fields in the HTML form. Note, the first three variables are required for all email messages.

$EmailFrom = Trim(stripslashes($_POST['email'])); 
$EmailTo = "joshboyan@yahoo.com";
$Subject = Trim(stripslashes($_POST['subject'])); 
$Name = Trim(stripslashes($_POST['name'])); 
$Message = Trim(stripslashes($_POST['message'])); 
$current_date = date("Y-m-d");
 // This date is created when the form is submitted.

// Note -- with variable names (above beginning with $), I usually used mixed case to distinguish them from the all lower case HTML input field names (the POST fields above). Variable names can be called anything, but cannot use spaces. For example, if you are pulling data from a name field in an HTML form, you may want to call the PHP variable $Name and if you are pulling data from a comments field, you may want to call the variable $Comments. 

// This section below validates the $EmailFrom (data from the Email From field) and $Name (data from the Name field).

// Note -- you should always validate at least one field you use from your form so your form doesn't get "Submit Spam" (in other words, people continuous clicking submit and spamming your email without sending data). Even if you are using Javascript or Spry validation, it's still a very good idea to do this. Javascript and Spry (which is also Javascript) can easily be bypassed if the user doesn't allow Javascript to be active through their browser -- and it can easily be turned off through most browser preferences. 

// The fields being validated here, from the form example above, are the email and name fields. Those must contain some form of data for the PHP to accept them, otherwise the error.html page is generated to the form user.

$validationOK=true;
if (!filter_var(Trim($EmailFrom), FILTER_VALIDATE_EMAIL)) {
    $validationOK=false;
} 
if (Trim($Name)=="") $validationOK=false;
if (!$validationOK) {
print "<meta http-equiv=\"refresh\" content=\"0;URL=$Referer\">";
echo "<script type='text/javascript'>alert('It seems your email address is invalid!');</script>";
exit;
}	

// This section below creates a file called form-data.csv (if one doesn't already exist) in the contacts/ folder (you should have created). The purpose of this is to collect all your form contacts in one .csv file for use later.

// If a file with the name form-data.csv does exist in that folder already, then the submitted form info is submitted to it. (The a+ means to append to a file if it already exists.)

// A .csv file is a comma-delimited file that can be pulled into a spreadsheet program like Excel. 

// Be sure to edit the $form_data variable to include all the correct variables you created above.

// The str_replace function is used to remove any commas from the username data so it doesn't create extraneous fields in the .csv file.

$myFilePath = "contacts/";
$myFileName = "form-data.csv";
$myPointer = fopen ($myFilePath.$myFileName, "a+");
$form_data = $current_date . "," . $EmailFrom . "," . $Name . "," . $Date . "," . "," . $Message . "\n";
fputs ($myPointer, $form_data);
fclose ($myPointer);


// This section of PHP prepares the email body text. This is the fourth and final required element to compose and send an email message from a server-side script. 

$Body = "";
$Body .= $Message;
$Body .= "\n";

// Note -- The ".=" means to append to (added to) the previous variable. So there is only one $Body variable, and all the other parts are appended to that one. The "\n" means to place a hard return between these lines in the email message. If the "\n" weren't included, all the items would be run together on one long line.

// This is the sendmail function which send an email message from the server to the email address listed in the $EmailTo variable above.

$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// If the page validates and there are no errors in the PHP, this line redirect to ok.html page, which is the "success page" for the form submission.

if ($success){  
  echo "<script type='text/javascript'>alert('Message has been successfully sent!');</script>";
  print "<meta http-equiv=\"refresh\" content=\"0;URL=$Referer\">";
}
else{ 
  echo "<script type='text/javascript'>alert('There was an error with the message!');</script>";
   print "<meta http-equiv=\"refresh\" content=\"0;URL=$Referer\">";
}
//Should I change these two meta tags to HTML5: <meta charset="UTF-8">?

?>


