<?php

function scanProjectFolder($path){
	
	$project = array();

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
					$item['type']	= "text";
					$item['url'] 	= $filename.'.'.$extension;
					$item['md'] 	= "";
				break;

				case 'mp4';
					$item['type']	= "video";
					$item['url'] 	= $filename.'.'.$extension;
					$item['md'] 	= "";
				break;
			}
			array_push($project, $item);
		}
	}

	return $project;
}

function initNavigationFile($path, &$navigationLayout){

	foreach (glob( $path.'/*' ) as $file ) {

		$directory_parts = explode('/', $file);

		if ( filetype( $file ) == 'dir') {

			// if we are in the 2rd hierachy (categorys)
			if($directory_parts[1] != '' && $directory_parts[2] == ''){
				$category = $directory_parts[1];
				$categoryArray = array();
				$categoryArray['category'] = $category;
				$categoryArray['visible'] = true;
				$categoryArray['items'] = array();

				array_push($navigationLayout['navigation'], $categoryArray);
				// Go deeper (projects)
				initNavigationFile($file, $navigationLayout);
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
				$projectArray['visible'] = true;

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
		$existingLayout = json_decode($fileContent, true);
		
		echo "exists".PHP_EOL;
	}

	// if layout-file doesn't exist
	else{
	
		// load array from folder structure
		$newProjectLayout = scanProjectFolder('content/'.$category.'/'.$projectname.'/');
		// save array in layout-file
		file_put_contents($file, json_encode($newProjectLayout));
	
		echo "doesn't exist".PHP_EOL;
	}

}


function updateNavigation(){


}


function initContent($path){

	// create empty navigationLayout
	$navigationLayout = array();

	// add websiteTitle to navigationLayout
	$navigationLayout['websiteTitle'] = array();
	$navigationLayout['websiteTitle']['file'] = "websiteTitle.txt";
	$navigationLayout['websiteTitle']['type'] = "title";
	$navigationLayout['websiteTitle']['md'] = "";

	// add empty navigation array to navigationLayout
	$navigationLayout['navigation'] = array();

	// iterate through folder structure to generate navigationLayout
	initNavigationFile($path, $navigationLayout);

	// get all categorys
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

	$navigationLayoutFile = 'navigationLayout.json';
	file_put_contents($navigationLayoutFile, json_encode($navigationLayout));
}




if(isset($_POST['test'])){
	initContent('content');
}


function iterate(){
	$navigationLayout = array();
	$navigationLayout['navigation'] = array();

	foreach($projects as $category => $projects_in_category){
		$categoryArray = array();
		$categoryArray['category'] = $category;
		$categoryArray['visible'] = true;
		$categoryArray['items'] = array();

 		foreach($projects_in_category as $projectname => $project){
			$projectArray = array();
			$projectArray['name'] = $projectname;
			$projectArray['visible'] = true;

			array_push($categoryArray['items'], $projectArray);
		}	
		array_push($navigationLayout['navigation'], $categoryArray);
	}

	array_push($navigationLayout['websiteTitle'], $content['websiteTitle']);
	$navigationLayoutFile = 'navigationLayout.json';
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

if(isset($_POST['regenerate'])){
	scanFolder('content',0,false);
	writeContent();
}

if(isset($_POST['renameFolder'])){
 	$url = $_POST['url'];
 	$newFolder = $_POST['folderName'];
  	rename($url, $newFolder);
}

?>