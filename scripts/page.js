function applyChanges(event) {
// Evita que el formulari enviï les dades i recarregui la pàgina
    event.preventDefault(); 
    const formData = new FormData(event.target);
    debugger
    var str="";
    switch (formData.get("input-type")) {
        case "text":
            str=generateTextbox(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"));
            break;
        case "email":
            str=generateEmail(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"));
            break;
        case "textarea":
            str=generateTextarea(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"));
            break;
        case "password":
            str=generatePassword(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"));
            break;
        case "checkbox":
            str=generateCheckbox(formData.get("id"),formData.get("label"),formData.get("required"),formData.get("description"),formData.get("show-description"));
            break;
        default:
            break;
    }

    $("#code-preview").val(str)
    $("#prototype-preview .field").html(str)
}

function generateTextbox(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="text" id="'+id+'" name="'+id+'" ';
    if (required ="on") output+=" required "
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help">\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!="on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateTextarea(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<textarea id="'+id+'" name="'+id+'" ';
    if (required ="on") output+=" required "
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help"></textarea>\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!="on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateEmail(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="email" id="'+id+'" name="'+id+'" ';
    if (required ="on") output+=" required "
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help">\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!="on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generatePassword(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="password" id="'+id+'" name="'+id+'" ';
    if (required="on") output+=" required "
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help" data-visible="false">\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!="on") output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}

function generateCheckbox(id,label,required, description,showDescription){
    var output = '<div class="inline-input">';
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="password" id="'+id+'" name="'+id+'" ';
    if (required="on") output+=" required "
    output += ' aria-describedby="'+id+'-help" data-visible="false">\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!="on") output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    output += '</div>'
    /*<div class="inline-input">
                    <input type="checkbox"  id="input-show-description"  name="show-description"  aria-describedby="input-show-description-help" >
                    <label for="input-show-description">S'ha de mostrar la descripció?</label>
                    </div>
                    <small id="input-show-description-help" class="help-text">La descripció estarà igualment pels lectors de pantalla, però serà invisible en l'àmbit visual.</small>*/
    return output;
}

var starterPrimary = new Color(Colors.randomColor());

var pagePalette = Colors.generatePalette(starterPrimary.hex, Colors.accessibilityLevel.aaa);
document.documentElement.style.setProperty('--primary-brand', pagePalette.basic.hex);
document.documentElement.style.setProperty('--primary-contrast', pagePalette.contrast.hex);
document.documentElement.style.setProperty('--primary-dark', pagePalette.dark.hex);
document.documentElement.style.setProperty('--primary-dark-min', pagePalette.darkMin.hex);
document.documentElement.style.setProperty('--primary-light', pagePalette.light.hex);
document.documentElement.style.setProperty('--primary-light-min', pagePalette.lightMin.hex);


starterPrimary.H = (starterPrimary.H + 180) % 360;
pagePalette = Colors.generatePalette(starterPrimary.hex, Colors.accessibilityLevel.aaa);

document.documentElement.style.setProperty('--secondary-brand', pagePalette.basic.hex);
document.documentElement.style.setProperty('--secondary-contrast', pagePalette.contrast.hex);
document.documentElement.style.setProperty('--secondary-dark', pagePalette.dark.hex);
document.documentElement.style.setProperty('--secondary-dark-min', pagePalette.darkMin.hex);
document.documentElement.style.setProperty('--secondary-light', pagePalette.light.hex);
document.documentElement.style.setProperty('--secondary-light-min', pagePalette.lightMin.hex);



const mq = window.matchMedia('(prefers-color-scheme: dark)');

function handleColorSchemeChange(e) {
    localStorage.setItem('DarkMode', e.matches);
    applyTheme()
}

function applyTheme(){
    console.log(localStorage.getItem('DarkMode'))
    if (localStorage.getItem('DarkMode')=="true"){
        $("body").addClass("dark")
    }
    else{
        $("body").removeClass("dark")

    }
}

mq.addEventListener('change', handleColorSchemeChange);
if (localStorage.DarkMode==null && localStorage.DarkMode==undefined)
    handleColorSchemeChange(mq);

$("#toggleDark").click(function(){
    if (localStorage.getItem('DarkMode')=="true"){
        localStorage.setItem('DarkMode', "false");
    }
    else{
        localStorage.setItem('DarkMode', "true");
    }
    applyTheme()
});
applyTheme()
