. "C:\atari-monk\Code\micro-engine\script\CommonFunctions.ps1"

$libFolder = "engine_api"
$libName = "engine_api"
$build = "$libFolder\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\engine\",
  "$RepoPath\engine_node_tests\",
  "$RepoPath\engine_jsdom_tests\",
  "$RepoPath\desktop_client\",
  "$RepoPath\multi_desktop_client\",
  "$RepoPath\server\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
