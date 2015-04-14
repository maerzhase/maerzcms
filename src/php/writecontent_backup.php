<?php
$id = 0;
$last_id = 0;
$content = array();
$projects = array();

$items_per_column = 4;
$column_count = 0;
$section_id = 0;
$last_folder = "";


function scanFolder( $directory , $gen, $reverse) {
	global $id, $last_id, $content, $projects, $items_per_column, $column_count, $section_id;
	$generation = $gen;
	$generation++;
	$file_parts=array();
	$ext='';
	$title='';
	$directory_parts= Array();
	if($id == 0) /*echo '<div class="section'.$section_id.'"> <div class="column">';*/

	if($reverse == false){
		// echo $directory;
		// echo "</br>";
		// echo "</br>";
		foreach (glob( $directory.'/*' ) as $file ) {
			// echo $file;
			// echo "</br>";

			$directory_parts = explode('/', $file);
	
			
			if ( filetype( $file ) == 'dir') {

				if($generation = 1){
					$last_folder = $file;
				}

				if($directory_parts[2] != ''){
					$projects[$directory_parts[1]][$directory_parts[2]]['picture'] = array();
					$projects[$directory_parts[1]][$directory_parts[2]]['items'] = array();
					$projects[$directory_parts[1]][$directory_parts[2]]['videos'] = array();
					$projects[$directory_parts[1]][$directory_parts[2]]['description'] = "";
					$projects[$directory_parts[1]][$directory_parts[2]]['visible'] = true;
					$projects[$directory_parts[1]][$directory_parts[2]]['markdown'] = "";
					$projects[$directory_parts[1]][$directory_parts[2]]['category'] = $directory_parts[1];
				}

				 
				scanFolder($file, $generation, false);
			}
			else {
				if($file=='.' || $file == '..') continue;
				$file_parts = explode( '.', $file );
				$ext = strtolower( array_pop( $file_parts ) );
				$title = basename( $file );
				$title = htmlspecialchars( $title );
				//$title = str_replace('.jpg', '', $title);
				$filename= preg_replace('/^([^.]*).*$/', '$1', $title);
				$filetype = '';
				//$fileurl = str_replace(' ', '%20', $file);
				//$fileurl = urlencode($file);
				$fileurl = $file;

	

				if($ext == 'jpg' || $ext == 'png' || $ext == 'jpeg')
				{
					$filetype = 'picture';
				}
				if($ext == 'txt')
				{
					$filetype = 'text';
				}
				if($ext == 'mp4'){
					$filetype = 'videos';
				}
				if($directory_parts[2] != '' && $ext != 'txt' && $ext != 'odt' ){
					$index = sizeof($projects[$directory_parts[1]][$directory_parts[2]]['items']);
					$projects[$directory_parts[1]][$directory_parts[2]]['items']['item'.$index] =  array();
					$projects[$directory_parts[1]][$directory_parts[2]]['items']['item'.$index]['url'] = $fileurl;
					$projects[$directory_parts[1]][$directory_parts[2]]['items']['item'.$index]['md'] = "";
					$projects[$directory_parts[1]][$directory_parts[2]]['items']['item'.$index]['type'] = $filetype;
					//array_push($projects[$directory_parts[1]][$directory_parts[2]][$filetype]['picture'.$index], $fileurl);
				}
				else if($filename == 'description'){
					echo'YES';
					$handle = fopen($fileurl, "r");
					$text = fread($handle, filesize($fileurl));
					fclose($handle);
					$projects[$directory_parts[1]][$directory_parts[2]]['description'] = array();
					$projects[$directory_parts[1]][$directory_parts[2]]['description']['md'] = $text;
					$projects[$directory_parts[1]][$directory_parts[2]]['description']['type'] = "text";
					$projects[$directory_parts[1]][$directory_parts[2]]['description']['url'] = $fileurl;

				}
				else if($filename == 'title'){
					$handle = fopen($fileurl, "r");
					$text = fread($handle, filesize($fileurl));
					fclose($handle);
					$content['title'] = $text; 
				}
				else if($filename == 'keywords'){
					$handle = fopen($fileurl, "r");
					$text = fread($handle, filesize($fileurl));
					fclose($handle);
					$content['keywords'] = $text; 
				}
				else if($filename == 'websiteTitle'){
					$handle = fopen($fileurl, "r");
					$text = fread($handle, filesize($fileurl));
					fclose($handle);
					$content['websiteTitle'] = array();
					$content['websiteTitle']['md'] = $text;
					$content['websiteTitle']['type'] = "title";
					$content['websiteTitle']['url'] = $fileurl;
				}
				else if($filename == 'headline'){
					$cnt = 1;
					$content['headlines'] = array();
					$handle = fopen($fileurl, "r");
					if ($handle) {
					    while (($line = fgets($handle)) !== false) {
					    	$highlighting = substr_count($line, '#');

					    	$content['headlines']['headline'.$cnt] = array();
					    	$content['headlines']['headline'.$cnt]['text'] = str_replace('\n', '', str_replace('#','',$line)); 
					    	$content['headlines']['headline'.$cnt]['type'] = 'h'.$highlighting.'';
					    	$cnt +=1;

					        // process the line read.
					    }

					    fclose($handle);
					} else {
					    // error opening the file.
					}

				}
			}
		}
	}
}



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
		
		return json_encode($existingLayout[0]);
	}

	// if layout-file doesn't exist
	else{
	
		// load array from folder structure
		$newProjectLayout = scanProjectFolder('content/'.$category.'/'.$projectname.'/');
		// save array in layout-file
		file_put_contents($file, json_encode($newProjectLayout));
	
		return "doesn't exist";
	}

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
			echo json_encode($projectName) . PHP_EOL;
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


function writeContent(){
	global $content, $projects;
	$file = 'content.json';
	//$result = array_merge($content, $projects);
	foreach($projects as $category => $projects_in_category){
		foreach($projects_in_category as $key => $value){
			$currentkey = $key;
			$md_string = '';
			$pictures = $value['picture'];
			$videos = $value['videos'];
			$description = $value['description'];
			$md_string .= '###'.$currentkey.'&#10;&#10;';
			$md_string .= $description.'&#10;&#10;';

			foreach($pictures as $key => $picture){
				$md_string .= '![picture'.$key.']('.$picture.')';
				$md_string .= ' &#10;&#10;';
			}

			$projectname = $currentkey;
			$projects[$category][$projectname]['markdown']  =  $md_string;
		}
	}

	$content['projects'] = $projects;
	$content = json_encode($content);
	file_put_contents($file, $content);
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