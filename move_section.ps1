$content = Get-Content -Path "index.html" -Raw -Encoding UTF8

$aboutRegex = '(?s)    <!-- \[Step 3\] About Me Section -->.*?    </section>\r?\n'
$aboutMatch = [regex]::Match($content, $aboutRegex)

if ($aboutMatch.Success) {
    $aboutText = $aboutMatch.Value
    
    # Remove about text from its original place
    $content = $content -replace [regex]::Escape($aboutText), ""
    
    # Find the end of the projects section
    $projectsEndRegex = '(?s)        <!-- \[Step 4\.5\] Projects Section -->.*?        </section>\r?\n'
    $projectsMatch = [regex]::Match($content, $projectsEndRegex)
    
    if ($projectsMatch.Success) {
        $projectsText = $projectsMatch.Value
        
        # Insert about text right after projects text
        $content = $content -replace [regex]::Escape($projectsText), ($projectsText + "`r`n" + $aboutText)
        
        Set-Content -Path "index.html" -Value $content -Encoding UTF8
        Write-Host "Success!"
    } else {
        Write-Host "Projects section not found."
    }
} else {
    Write-Host "About section not found."
}
