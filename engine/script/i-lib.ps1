. "C:\atari-monk\Code\micro-engine\script\CommonFunctions.ps1"

$libFolder = "engine"
$libName = "engine"
$build = "$libFolder\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\engine_tests\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
