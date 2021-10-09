<?php
//error_reporting(-1);

include './Sitemap.php';
use SitemapPHP\Sitemap;
//https://github.com/evert/sitemap-php

function getFromURL($url){
  try {
    //create & init curl
    $curl = curl_init();
    if ($curl === false) {
        throw new Exception('failed to initialize');
    }
    // set url
    curl_setopt($curl, CURLOPT_URL, $url);
    // set return respolse
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_USERAGENT, 'janky sitmap generator');
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_VERBOSE, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    // fetch
    $result = curl_exec($curl);
    if ($result === false) {
        throw new Exception(curl_error($curl), curl_errno($curl));
    }

    curl_close($curl);
    return json_decode($result, true);
  } catch (\Exception $e) {
    trigger_error(sprintf(
        'Curl failed with error #%d: %s',
        $e->getCode(), $e->getMessage()),
        E_USER_ERROR);
  }
}





// print_r($arr["data"]);
$sitemap = new Sitemap('https://peter-ehses.de');




$sitemap->addItem('/', '1.0', 'daily', 'Today');
$sitemap->addItem('/projects', '0.8', 'weekly', 'Today');
$projectarr = getFromURL("https://directus.peter-ehses.de/api/items/ps_projects");
foreach ($projectarr["data"] as $k=>$v){
  if ($v["status"] == "published") {
    $sitemap->addItem('/projects/'.$v["id"], '0.5', 'monthly', $v["modified_on"]);
  }

}

$sitemap->addItem('/blog', '0.8', 'weekly', 'Today');
$blogarr = getFromURL("https://directus.peter-ehses.de/api/items/ps_blogposts");
foreach ($blogarr["data"] as $k=>$v){
  if ($v["status"] == "published") {
    $sitemap->addItem('/blog/'.$v["id"], '0.5', 'yearly', $v["modified_on"]);
  }
}
$sitemap->addItem('/about', '0.8');
$sitemap->addItem('/christmas', '0.1');
$sitemap->addItem('/impressum', '0.1');
$sitemap->addItem('/datenschutz', '0.1');

$sitemap->createSitemapIndex('https://peter-ehses.de/sitemap/', 'Today');
echo "success";



/*
* Sitemap Submitter
* Use this script to submit your site maps automatically to Google, Bing.MSN and Ask
* Trigger this script on a schedule of your choosing or after your site map gets updated.
*/

//Set this to be your site map URL
$sitemapUrl = "https://peter-ehses.de/sitemap/sitemap-index.xml";

// cUrl handler to ping the Sitemap submission URLs for Search Engines…
function myCurl($url){
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return $httpCode;
}

//Google
$url = "http://www.google.com/webmasters/sitemaps/ping?sitemap=".$sitemapUrl;
$returnCode = myCurl($url);
echo "<p>Google Sitemaps has been pinged (return code: $returnCode).</p>";

//Bing / MSN
$url = "http://www.bing.com/ping?siteMap=".$sitemapUrl;
$returnCode = myCurl($url);
echo "<p>Bing / MSN Sitemaps has been pinged (return code: $returnCode).</p>";

//ASK
$url = "http://submissions.ask.com/ping?sitemap=".$sitemapUrl;
$returnCode = myCurl($url);
echo "<p>ASK.com Sitemaps has been pinged (return code: $returnCode).</p>";
?>
