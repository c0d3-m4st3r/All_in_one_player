<?php
// Desactivar toda notificación de error
error_reporting(0);
// Notificar solamente errores de ejecución
error_reporting(E_ERROR | E_WARNING | E_PARSE);
define("MAX_RESULTS", 15);
    
     if (isset($_POST['submit']) )
     {
        $keyword = $_POST['keyword'];
               
        if (empty($keyword))
        {
            $response = array(
                  "type" => "error",
                  "message" => "Por favor ingrese la palabra clave."
                );
        } 
    }
         
?>



<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<link rel="shortcut icon" href="#" />
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
	<title>All_in_one_player</title>
    <style type="text/css">
	html,body{height:100vh; background:#d9d9d9; }
  </style>
  
</head>
<body>														
</div>
<div  style="display: inline-block; text-align: right; width: 100%" class="container">

	</font>

</p>



<div  aling="center" class="col-md-6">
        <button class="btn btn-success" id="shuf"><i class="fa fa-random"></i></button> 
              <ul class="list-group" id="playVideos"></ul>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div aling="center">
        <video  id="video" controls muted autoplay preload="metadata"></video>
        </div>


    </div>
  </div>                      
</div>

<br>


<form id="keywordForm" method="post" action="">
      <div class="form-row align-items-center">
        <div class="col-auto"> Busca tus videos: </div>
        <div class="form-row align-items-center">
          <div class="col-auto">
            <input class="form-control mb-2" type="search" id="keyword" name="keyword"  placeholder="Ingrese palabra a buscar">
          </div>
          <div class="col-auto">
            <input class="btn btn-primary mb-2" type="submit" name="submit" value="Busqueda">
          </div>
        </div>
      </div>
      </div>
    </form>
    <?php 
    if(!empty($response)) { ?>
    <div class="response <?php echo $response["type"]; ?>"> <?php echo $response["message"]; ?> </div>
    <?php }?>
    <?php
            if (isset($_POST['submit']) )
            {
                                         
              if (!empty($keyword))
              {
        $apikey = 'AIzaSyD3NacZWKtTCx7krRKDkp5fZ5bSwbqChvA';
              $googleApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='.$keyword.'&maxResults='.MAX_RESULTS.'&key='.$apikey;

                $ch = curl_init();

                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_URL, $googleApiUrl);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
                curl_setopt($ch, CURLOPT_VERBOSE, 0);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                $response = curl_exec($ch);

                curl_close($ch);
                $data = json_decode($response);
                $value = json_decode(json_encode($data), true);
            ?>
    <div class="result-heading">Acerca de <?php echo MAX_RESULTS; ?> Resultados</div>
    <div class="videos-data-container" id="SearchResultsDiv">
              <?php
                for ($i = 0; $i < MAX_RESULTS; $i++) {
                    $videoId = $value['items'][$i]['id']['videoId'];
                    $title = $value['items'][$i]['snippet']['title'];
                    $description = $value['items'][$i]['snippet']['description'];
                    ?>
              <div class="video-tile">
        <div  class="videoDiv">
                  <iframe id="iframe" style="width:100%;height:100%" src="//www.youtube.com/embed/<?php echo $videoId; ?>" data-autoplay-src="//www.youtube.com/embed/<?php echo $videoId; ?>?autoplay=1"></iframe>
                </div>
        <div class="videoInfo">
                  <div class="videoTitle"><b><?php echo $title; ?></b></div>
                  <div class="videoDesc"><?php echo $description; ?></div>
                </div>
      </div>
              <?php 
                    }
                } 
           
            }
            ?>

<div class="video-tile">
        <div  class="videoDiv">
          <iframe id="iframe" style="width:100%;height:100%" src="//www.youtube.com/embed/<?php echo $videoId; ?>" data-autoplay-src="//www.youtube.com/embed/<?php echo $videoId; ?>?autoplay=1"></iframe>
        </div>
</div>




   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>  
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script> 
	<script src="https://use.fontawesome.com/259583f9fc.js"></script>
	<script src="js/video.js"></script>

</body>
</html>

