<?php
$raw_obj;
$obj;

if(isset($_POST['callFunction']) && !empty($_POST['callFunction'])) {
	$raw_obj = file_get_contents("../content.json");
	$obj = json_decode($raw_obj,true);

    $action = $_POST['callFunction'];
    switch($action) {
        case 'projectTitles' : projectTitles();break;
        case 'getHeadlines' : getHeadlines();break;
        case 'getGeneral' : getGeneral();break;
        case 'getProjects' : getProjects();break;
        case 'getThumbs' : getThumbs();break;
        case 'theTitle' : theTitle();break;
        // ...etc...
    }
}else{
	$raw_obj = file_get_contents("./content.json");
	$obj = json_decode($raw_obj,true);

}

function theTitle(){
	global $obj;
	echo $obj['title'];
}

function theKeywords(){
	global $obj;
	echo $obj['keywords'];
}

function projectTitles(){
	global $obj;
	$projects = $obj['projects'];
	foreach($projects as $key => $value){
		$isVisible = $projects[$key]['visible'];
		if($isVisible){
			echo '<li><a href="#"><span>'. $key . '</span></a></li>';
		}
	}
}

function getImages($title){
	global $obj;
	$title = $title;
	$projects = $obj['projects'];
	$pictures = $projects[$title]['pictures'];

	foreach($pictures as $key => $value){

		echo '<a class="th" href="'. $value .'"><img src="'.$value.'"></a>';
	}
}

function getThumbs(){
	global $obj;
	$projects = $obj['projects'];
	$cnt = 0;
	foreach($projects as $key => $value){
		if($cnt < 6){
			$imagePath = $value['pictures'][0];
			echo '<li><a class="th" href="'. $imagePath .'"><img src="'.$imagePath.'"></a></li>';
			$cnt++;
		}else{
			continue;
		}
	}
}

function getGeneral_old(){
	global $obj;
	$headlines = $obj['headlines'];
	$title = $obj['title'];
	$keywords = $obj['keywords'];

	echo '<li><span class="key">' . 'Title' . '</span><span class="value edit-value">'. $title .'</span><input type="text" class="edit" style="display:none" /></li>';
	echo '<li><span class="key">' . 'Keywords' . '</span><span class="value edit-value">'. $keywords .'</span><input type="text" class="edit" style="display:none" /></li>';
	foreach ($headlines as $key => $value) {
		echo '<li><span class="key">' . $key . '</span></li>';
		foreach ($value as $key => $value) {
			echo '<li><span class="key">' . $key . '</span><span class="value edit-value">'. $value .'</span><input type="text" class="edit" style="display:none" /></li>';

		}
	}
}

function getGeneral(){
	global $obj;
	$headlines = $obj['headlines'];
	$title = $obj['title'];
	$keywords = $obj['keywords'];
	echo '<form><div class="row">';
	echo '<div class="large-12">';
	echo '<label>Title';
	echo '<input value="'.$title.'" type="text" class="text-edit" data-link="theTitle"/>';
	echo '</label></div></div>';

	echo '<div class="row">';
	echo '<div class="large-12">';
	echo '<label> Keywords';
	echo '<input value="'.$keywords.'" type="text" class="text-edit" />';
	echo '</label></div></div>';


	echo '<div class="row">';
	echo '<div class="large-12">';
	foreach ($headlines as $key => $value) {
		echo '<label class="">' . $key . '</label>';

		echo '<div class="row">';

		foreach ($value as $key => $value) {
			if($key == "type"){
				echo '<div class="large-3 columns">';
				echo '<select class="select-edit" data-link="getHeadlines">
						  <option value"'.$value.'">'.$value.'</option>
				          <option value="h1">h1</option>
				          <option value="h2">h2</option>
				          <option value="h3">h3</option>
				          <option value="h4">h4</option>
				      </select></div>';
			}
			if($key == "text"){
				echo '<div class="large-9 columns">';

				echo '<input value="'.$value.'" type="text" class="text-edit" data-link="getHeadlines"/></div>';

			}

		}
		echo'</div>';
	}
	echo '</label></div></div></form>';

}


function getProjects(){
	global $obj;
	$projects = $obj['projects'];


	$cnt = 0;
	foreach ($projects as $key => $value) {
		echo '<li class="accordion-navigation" ><a href="#panel'.$cnt.'a"><span class="key">' . $key . '</span></a>';
		$pictures = $value['pictures'];
		$videos = $value['videos'];
		$description = $value['description'];
		$markdown = $value['markdown'];
		echo'<div id="panel'.$cnt.'a" class="content"><label>Content Markdown <span id="mdhelp">?</span> 
        <textarea class="md-edit" placeholder="small-12.columns">';

        echo $markdown;

		// foreach ($pictures as $key => $value) {
		// 	echo '![picture'.$key.']('. $value .') &#10; &#10; &#10;';
		// }

		echo '</textarea> </label> </div> </li>';
		$cnt++;
	}



}

function getContentList(){
	global $obj;
	foreach($obj as $key => $value){
		if(!is_array($value)){
			echo '<li><span class="key">' . $key . '</span><span class="value">'. $value .'</span></li>';
		}
		else{
			foreach ($value as $key2 => $value2) {
				if(!is_array($value2)){

				}else{
					foreach ($value2 as $key3 => $value3) {
						echo '<li><span class="key">' . $key3 . '</span><span class="value">'. $value3 .'</span></li>';
					}

				}

			}
		}
	}
}

function getHeadlines(){
	global $obj;
	$headlines = $obj['headlines'];
	foreach ($headlines as $key => $value) {
		echo '<'.$value['type'].'><span>'.$value['text'].'</span></'.$value['type'].'>';
	}
}


