. "C:\atari-monk\Code\micro-engine\script\ps1\CommonFunctions.ps1"

$libName = "engine_api"
$build = "$libName\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\engine\",
  "$RepoPath\engine_tests\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
