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

	//the final comment block will be here
	$comment_html = "";

	// //CSS styling for errors
	// $first_name_error_css = "";
	// $last_name_error_css = "";
	// $comment_error_css = "";

	function update_comments() {
		global $comment_html;
		$comment_html = "";
		//process comments and post to the same page
		$post_helper = array_map('str_getcsv', file('comments.csv'));
		$individual_post = "";
		foreach ($post_helper as $aray) {
			
			for ($x = 0; $x < sizeof($aray); $x++) {
				// echo $x;
				if ($x == 0) {
					// echo "inside if";
					$individual_post .= '<div class="comment"><h3>' . "$aray[$x] ";
				} elseif ($x == sizeof($aray) - 1) {
					// echo "inside elseif";
					$individual_post .= "</h3>" . "<p>$aray[$x]</p></div>";
				} else {
					// echo "inside else";
					$individual_post .= "$aray[$x]";
				}
			}
			$comment_html .= $individual_post;
			$individual_post = "";
			// var_dump($aray);
			// echo $aray;
		}
	}

	update_comments();

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		//prevent the html hackers from doing crap
		$user_first_name = htmlspecialchars($_POST['first_name_input']);
		$user_last_name = htmlspecialchars($_POST['last_name_input']);
		$user_comment = htmlspecialchars($_POST['comment_input']);

		//validate first and last names while inserting helpful CSS
		if ((preg_match("/[^A-Za-z -]/", $user_first_name))) {
			$first_name_error = "Please reformat your first name to only contain letters, dashes, and spaces.";
			// echo $first_name_error_css;
		}

		if ((preg_match("/[^A-Za-z -]/", $user_last_name))) {
			$last_name_error = "Please reformat your last name to only contain letters, dashes, and spaces.";	
			// echo $last_name_error_css
;		}

		//check to make sure things aren't empty
		if (trim($user_first_name) == "") {
			$first_name_error = 'The field "First name" must not be empty.';
			// echo $first_name_error_css;
		}

		if (trim($user_last_name) == "") {
			$last_name_error = 'The field "Last name" must not be empty.';
			// echo $last_name_error_css;
		}

		if (trim($user_comment) == "") {
			$comment_error = "Please leave a comment.";
		}


		//MAKING AN ARRAY
		//http://php.net/str_getcsv is where I found this function, so nice
		$censor_helper = array_map('str_getcsv', file('comment_censor.csv'));

		//for some reason it's a nested array. so tragic, really
		//debugging purposes
		// var_dump($censor_helper);
		foreach ($censor_helper as $aray) {
			//if a censored word is detected:
			foreach ($aray as $subaray) {
				// echo $subaray;
				//want to match exact word, not substring
				if (strpos(strtolower("$user_comment"), "$subaray") !== FALSE) {
					$comment_error .= "Please keep your comments appropriate.";
					break;
				}
			}		
		}

		//NO ERRORS = THE COMMENT IS SUCCESSFUL YAY	
		if ($first_name_error == "" && $last_name_error == "" && $comment_error == "") {
			//we write this data to a csv file
			//helpful: http://stackoverflow.com/questions/11399197/add-a-new-line-to-a-csv-file
			//"a" is for append


			//process comment, getting rid of newlines and double spaces:
			//http://stackoverflow.com/questions/3760816/remove-new-lines-from-string
			$user_comment = preg_replace('/\s+/', ' ', trim($user_comment));

			$opener = fopen("comments.csv", "a");
			$packaged_comment = array($user_first_name, $user_last_name, $user_comment);
			fputcsv($opener, $packaged_comment);
			fclose($opener);

			//resetting the form
			$user_first_name = "";
			$user_last_name = "";
			$user_comment = "";
		}

		//provide instant feedback to a successful comment
		update_comments();
	}
?>

<!doctype html>
<html>
<head>
	<title>Kelly Yu | GuestBook</title>
	<?php include 'meta.php' ?>
	<!--styling for error messages-->
	<style type="text/css">
		span {
			color: #db0000;
		}
		div.comment {
			border: 1px black dashed;
			padding: 0 10px;
			margin: 15px 0;
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
					<input id="last" type="text" name="last_name_input" value="<?=$user_last_name?>"><br>
				</fieldset>
				<label for="box">Type your comment here:</label><br>
				<span><?=$comment_error?></span>
				<textarea id="box" name="comment_input" rows="5"><?=$user_comment?></textarea><br>
				<input type="submit" value="Submit"><br>
			</form>
		</article>
		<article>
			<h2>Comments</h2>
			<?=$comment_html?>
		</article>
	</section>
</body>
</html>