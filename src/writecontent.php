<?php

require('php/login/connect.php');
	session_start();

function scanProjectFolder($path){
	
	$project = array();
	$project['visible'] = "true";
	$project['items'] = array();

	foreach (glob( $path.'/*' ) as $file ) {
		$directory_parts = explode('/', $file);
		
		// if file isn't folder
		if ( filetype( $file ) != 'dir') {
			if($file=='.' || $file == '..') continue;
			$file_parts = explode( '.', $file );
			$extension = strtolower( array_pop( $file_parts ) );
			$title = basename( $file );
			$title = htmlspecialchars( $title );
			$filename= preg_replace('/^([^.]*).*$/', '$1', $title);
			
			$item = array();
			switch($extension){
				case 'jpg':
				case 'png':
				case 'jpeg':
					$item['type']	= "image";
					$item['url'] 	= $filename.'.'.$extension;
					$item['md'] 	= "";
				break;

				case 'txt':

					$handle = fopen($file, "r");
					$md = fread($handle, filesize($file));
					fclose($handle);

					$item['type']	= "text";
					$item['url'] 	= $filename.'.'.$extension;
					$item['md'] 	= $md;
				break;

				case 'mp4';
					$item['type']	= "video";
					$item['url'] 	= $filename.'.'.$extension;
					$item['md'] 	= "";
				break;
			}
			array_push($project['items'], $item);
		}
	}

	return $project;
}

function updateNavigationLayout($path, &$navigationLayout){

	foreach (glob( $path.'/*' ) as $file ) {

		$directory_parts = explode('/', $file);

		if ( filetype( $file ) == 'dir') {

			// if we are in the 2rd hierachy (categorys)
			if($directory_parts[1] != '' && $directory_parts[2] == ''){
				$category = $directory_parts[1];
				$categoryArray = array();
				$categoryArray['category'] = $category;
				$categoryArray['visible'] = "true";
				$categoryArray['items'] = array();

				array_push($navigationLayout['navigation'], $categoryArray);
				// Go deeper (projects)
				updateNavigationLayout($file, $navigationLayout);
			}

			// if we are in the 3rd hierachy (projects)
			if($directory_parts[2] != ''){
				
				// iterate over refrences of categorys
				foreach($navigationLayout['navigation'] as &$value){

					// grab category if equals current
					if($value['category'] == $directory_parts[1]){
						$categoryArray =& $value;
						continue;
					}
				}

				$projectArray = array();
				$projectArray['name'] = $directory_parts[2];
				$projectArray['visible'] = "true";

				// add items to our referenced navigationLayout
				array_push($categoryArray['items'], $projectArray);
			}
		}
	}
}

function updateProjectLayout($category, $projectname){

	// path to current project layout-file
	$file = 'content/'.$category.'/'.$projectname.'/projectLayout.json';
	// get current layout-file content
	$fileContent = file_get_contents($file);

	// if layout-file exists
	if($fileContent !== FALSE){
	
		// encode fileContent to json object
		$existingLayout = json_decode($fileContent,true);
		// scan projectfolder for existing content
		$scannedLayout = scanProjectFolder('content/'.$category.'/'.$projectname.'/');
		// check every item generate from file structure
		foreach($scannedLayout['items'] as &$scannedItem){	
			//if item is type 'text'
			if($scannedItem['type'] == "text"){
				// check all existing items from old layout-file
				foreach($existingLayout['items'] as &$existingItem){
					// if we found the same item
					if($scannedItem['url'] == $existingItem['url']){
						// check if content (markdown) of file changed
						if($scannedItem['md'] != $existingItem['md']){
							// replace content of old item with new item
							$existingItem['md'] = $scannedItem['md'];
							// save layout-file
							file_put_contents($file, json_encode($existingLayout));
							echo "found changes, saving file".PHP_EOL;
						}
					}
				}
			}
		}
		echo "exists".PHP_EOL;
	}
	// if layout-file doesn't exist
	else{
	
		// load project layout from folder structure
		$newProjectLayout = scanProjectFolder('content/'.$category.'/'.$projectname.'/');
		// save array in layout-file
		file_put_contents($file, json_encode($newProjectLayout));
		echo "doesn't exist".PHP_EOL;
	}

}

function scanNavigationLayout($path){
	// create empty navigationLayout
	$navigationLayout = array();

	// looking for website title file
	$websiteTitleFile = "content/websiteTitle.txt";
	// if exists read markdown
	if($websiteTitleFile !== FALSE){
		$handle = fopen($websiteTitleFile, "r");
		$md = fread($handle, filesize($websiteTitleFile));
		fclose($handle);
	}else{
		// else create empty markdown
		$md = "";
	}

	// create website title item
	$navigationLayout['websiteTitle'] = array();
	$navigationLayout['websiteTitle']['url'] = "websiteTitle.txt";
	$navigationLayout['websiteTitle']['type'] = "title";
	$navigationLayout['websiteTitle']['md'] = $md;

	// add empty navigation array to navigationLayout
	$navigationLayout['navigation'] = array();

	// iterate through folder structure to generate navigationLayout (we pass $navigationLayout by reference so its being altered in updateNavigationLayout)
	updateNavigationLayout($path, $navigationLayout);

	return $navigationLayout;
}

function initContent($path){

	// path to current navigation layout-file
	$navigationLayoutFile = 'navigationLayout.json';
	// get current layout-file content
	$fileContent = file_get_contents($navigationLayoutFile);

	$doWrite = false;

	if($fileContent !== FALSE){
		$existingNavigationLayout = json_decode($fileContent,true);
		$scannedNavigationLayout = scanNavigationLayout($path);

		// check changes in websiteTitle.txt
		if($scannedNavigationLayout['websiteTitle']['md'] != $existingNavigationLayout['websiteTitle']['md']){
			$existingNavigationLayout['websiteTitle']['md'] = $scannedNavigationLayout['websiteTitle']['md'];
			$doWrite = true;
		}


		$navigationLayout = $existingNavigationLayout;
	}
	else{
		// create empty navigationLayout
		$navigationLayout = scanNavigationLayout($path);
		$doWrite = true;
	}
	

	// get all categorys from recent navigationLayout
	$categorys = $navigationLayout['navigation'];

	// get all categorysContents
	foreach($categorys as $categoryContent){
		$categoryName = $categoryContent['category'];
		// get all projects of categoryContent 
		foreach($categoryContent['items'] as $project){
			$projectName = $project['name'];
			// create project-layout-file
			updateProjectLayout($categoryName,$projectName);
		}
	}

	if($doWrite){
		file_put_contents($navigationLayoutFile, json_encode($navigationLayout));
	}
}

if(isset($_POST['updateNavigation'])){
	if(isLoggedIn()){
		echo "is logged in".PHP_EOL;
	}else{
		echo "is NOT logged in".PHP_EOL;
	}
	return;
	$nav_data = $_POST['nav_data'];

	$navigationLayoutFile = "navigationLayout.json";
	$fileContent = file_get_contents($navigationLayoutFile);
	$navigationLayout = json_decode($fileContent,true);

	$navigationLayout['navigation'] = $nav_data; 
	
//	file_put_contents($navigationLayoutFile, json_encode($navigationLayout));
}


if(isset($_POST['updateCategoryVisibility'])){
	$categoryName = $_POST['categoryName'];
	$categoryVisibility = $_POST['categoryVisibility'];

	$navigationLayoutFile = "navigationLayout.json";
	$fileContent = file_get_contents($navigationLayoutFile);
	$navigationLayout = json_decode($fileContent,true);


	foreach($navigationLayout['navigation'] as $key => &$categoryObject){

		if($categoryObject['category'] == $categoryName){

			$categoryObject['visible'] = $categoryVisibility;
		}
	}

	file_put_contents($navigationLayoutFile, json_encode($navigationLayout));
}

if(isset($_POST['test'])){
	initContent('content');
}

if(isset($_POST['updateProject']) && !empty($_POST['updateProject'])) {
	//echo "asdasdasd";
 	$json = $_POST['data'];
 	$path = $_POST['path'];
	$file = $path .'projectLayout.json';
	echo json_encode($json);

	file_put_contents($file, json_encode($json));
	$directory_parts = explode('/', $file);
	$category = $directory_parts[1];
	$item_name = $directory_parts[2];

	$navigationLayoutFile = "navigationLayout.json";
	$fileContent = file_get_contents($navigationLayoutFile);
	$navigationLayout = json_decode($fileContent,true);


	foreach($navigationLayout['navigation'] as $key => &$categoryObject){
		if($categoryObject['category'] == $category){
			foreach($categoryObject['items'] as &$item){
				if($item['name'] == $item_name){
					$item['visible'] = $json['visible'];
				}
			}
		}
	}

	file_put_contents($navigationLayoutFile, json_encode($navigationLayout));
}



// if PHP POST: Save File
if(isset($_POST['saveFile']) && !empty($_POST['saveFile'])) {
	//echo "asdasdasd";
 	$json = $_POST['saveFile'];
	$file = 'content.json';
	file_put_contents($file, json_encode($json));
}


if(isset($_POST['updateFile'])){
	$url = $_POST['fileURL'];
	$fileContent = $_POST['fileContent'];

	file_put_contents($url, $fileContent);
	echo $url;
}

if(isset($_POST['renameFolder'])){
 	$url = $_POST['url'];
 	$newFolder = $_POST['folderName'];
  	rename($url, $newFolder);
}


function isLoggedIn(){
	if(isset($_SESSION['username'])){
		return 1;
	}else{
		return 0;
	}
}





?>