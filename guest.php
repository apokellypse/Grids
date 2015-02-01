<?php include 'constants.php' ?>

<?php
	//initialize the value attribute variables, so we can save the temporary data of users
	$user_first_name = "";
	$user_last_name = "";
	$user_comment = "";

	//initialize error messages
	$first_name_error = "";
	$last_name_error = "";
	$comment_error = "";

	//CSS styling for errors
	$first_name_error_css = "";
	$last_name_error_css = "";
	$comment_error_css = "";

	//MAKING AN ARRAY
	//http://php.net/str_getcsv is where I found this function, so nice
	$censor_helper = array_map('str_getcsv', file('comment_censor.csv'));

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		//prevent the html hackers from doing crap
		$user_first_name = htmlspecialchars($_POST['first_name_input']);
		$user_last_name = htmlspecialchars($_POST['last_name_input']);
		$user_comment = htmlspecialchars($_POST['comment_input']);

		//validate first and last names while inserting helpful CSS
		if ((preg_match("/[^A-Za-z -]/", $user_first_name))) {
			$first_name_error = "Please reformat your first name to only contain letters, dashes, and spaces.";
			echo $first_name_error_css;
		}

		if ((preg_match("/[^A-Za-z -]/", $user_last_name))) {
			$last_name_error = "Please reformat your last name to only contain letters, dashes, and spaces.";	
			echo $last_name_error_css;
		}

		//check to make sure things aren't empty
		if (trim($user_first_name) == "") {
			$first_name_error = 'The field "First name" must not be empty.';
			echo $first_name_error_css;
		}

		if (trim($user_last_name) == "") {
			$last_name_error = 'The field "Last name" must not be empty.';
			echo $last_name_error_css;
		}

		if (trim($user_comment) == "") {
			$comment_error = "YOU MUST LEAVE A COMMENT.";
		}

		//for some reason it's a nested array. so tragic, really
		//debugging purposes
		// var_dump($censor_helper);
		foreach ($censor_helper as $aray) {
			//if a censored word is detected:
			foreach ($aray as $subaray) {
				// echo $subaray;
				//want to match exact word, not substring
				if (strpos("$user_comment", "$subaray") !== FALSE) {
					$comment_error .= "Please keep your comments appropriate.";
					break;
				}
			}		
		}

		//NO ERRORS = THE COMMENT IS SUCCESSFUL YAY	
		if ($first_name_error = "" && $last_name_error == "" && $comment_error == "") {

		}
	}
?>

<!doctype html>
<html>
<head>
	<?php include 'meta.php' ?>
	<style type="text/css">
		span {
			color: #db0000;
		}
	</style>
</head>
<body id="guest">
	<?php include 'header.php' ?>
	<section id="container">
		<h1>GuestBook</h1>
		<article>
			<h2>Leave a friendly comment!</h2>
			<form action="guest.php" method="post">
				<fieldset>
					<legend>About Yourself</legend>
					<label for="first">First name:</label><br>
					<span><?=$first_name_error?></span>
					<input id="first" type="text" name="first_name_input" value="<?=$user_first_name?>"><br>
					<label for="last">Last name:</label><br>
					<span><?=$last_name_error?></span>
					<input for="last" type="text" name="last_name_input" value="<?=$user_last_name?>"><br>
				</fieldset>
				<label for="box">Type your comment here:</label><br>
				<span><?=$comment_error?></span>
				<textarea id="box" name="comment_input" rows="5"><?=$user_comment?></textarea><br>
				<input type="submit" value="Submit"><br>
			</form>
		</article>
		<article>
			<h2>Comments</h2>
		</article>
	</section>
</body>
</html>