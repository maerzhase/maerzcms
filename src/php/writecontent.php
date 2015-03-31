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
					$projects[$directory_parts[2]]['pictures'] = array();
					$projects[$directory_parts[2]]['videos'] = array();
					$projects[$directory_parts[2]]['description'] = "";
					$projects[$directory_parts[2]]['visible'] = true;
					$projects[$directory_parts[2]]['markdown'] = "";
					$projects[$directory_parts[2]]['category'] = $directory_parts[1];
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
					$filetype = 'pictures';
				}
				if($ext == 'txt')
				{
					$filetype = 'text';
				}
				if($ext == 'mp4'){
					$filetype = 'videos';
				}
				if($directory_parts[2] != '' && $ext != 'txt' && $ext != 'odt' ){
					array_push($projects[$directory_parts[2]][$filetype], $fileurl);
				}
				else if($filename == 'description'){
					echo'YES';
					$handle = fopen($fileurl, "r");
					$text = fread($handle, filesize($fileurl));
					fclose($handle);
					$projects[$directory_parts[2]]['description'] = $text;
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


function writeContent(){
	global $content, $projects;
	$file = 'content.json';
	//$result = array_merge($content, $projects);
	foreach($projects as $key => $value){
		$currentkey = $key;
		$md_string = '';
		$pictures = $value['pictures'];
		$videos = $value['videos'];
		$description = $value['description'];
		$md_string .= '###'.$currentkey.'&#10;&#10;';
		$md_string .= $description.'&#10;&#10;';

		foreach($pictures as $key => $picture){
			$md_string .= '![picture'.$key.']('.$picture.')';
			$md_string .= ' &#10;&#10;';
		}

		$projectname = $currentkey;
		$projects[$projectname]['markdown']  =  $md_string;
	}

	$content['projects'] = $projects;
	$content = json_encode($content);
	file_put_contents($file, $content);
}


// if PHP POST: Save File
if(isset($_POST['saveFile']) && !empty($_POST['saveFile'])) {
	echo "asdasdasd";
    $json = $_POST['saveFile'];
	$file = 'contenttest.json';
	file_put_contents($file, json_encode($json));

}

?>
