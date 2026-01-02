function applyChanges(event) {
// Evita que el formulari enviï les dades i recarregui la pàgina
    event.preventDefault(); 
    const formData = new FormData(event.target);
    var str="";
    updateFields(formData);
    switch (formData.get("select-create")) {
        case "input":
            switch (formData.get("select-type")) {
                case "text":
                    str=generateTextbox(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"));
                    break;
                case "number":
                    str=generateNumber(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"),formData.get("input-min"),formData.get("input-max"));
                    break;
                case "email":
                    str=generateEmail(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"),formData.get("input-pattern"));
                    break;
                case "textarea":
                    str=generateTextarea(formData.get("id"),formData.get("label"),formData.get("placeholder"),formData.get("required"),formData.get("description"),formData.get("show-description"),formData.get("select-resize"),formData.get("input-lines"),formData.get("input-length"));
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
        break;
        case "img":
            str = generateImage(formData.get("input-src"));
        break

    }

    $("#code-preview").val(str)
    $("#prototype-preview .field").html(str)
}
const formulari = document.querySelector('form');
function updateFields(form=null){
    if (form==null && formulari!=null){
        $(formulari).find(".field").hide();
        $(formulari).find(".generic-field").show();

    }
    else{
        $(formulari).find("#input-id").attr("required", false)
        $(formulari).find(".field").hide();
        $(formulari).find(".generic-field").show();
        switch (form.get("select-create")) {
            case "input":
                //$(formulari).find("#input-id").attr("required", true)
                $(formulari).find(".input-field").show();
                $(formulari).find(".input-field.custom-field").hide();
                switch (form.get("select-type")) {
                    case "text":
                        break;
                    case "number":
                        $(formulari).find('.input-field:has("#input-min")').show();
                        $(formulari).find('.input-field:has("#input-max")').show();
                        break;
                    case "email":
                        $(formulari).find('.input-field:has("#input-pattern")').show();
                        break;
                    case "textarea":
                        $(formulari).find('.input-field:has("#input-length")').show();
                        $(formulari).find('.input-field:has("#input-lines")').show();
                        $(formulari).find('.input-field:has("#select-resize")').show();
                        break;
                    case "password":
                        break;
                    case "checkbox":
                        break;
                    default:
                        break;
                }
            break;
            case "img":
                $(formulari).find(".image-field").show();

            break;
            default:
            break;
        }
    }
}
updateFields()

let timeout;
formulari.addEventListener('input', (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        $("#submit-form").click();
    }, 300);
});

function generateTextbox(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="text" id="'+id+'" name="'+id+'" placeholder="'+placeholder+'" aria-describedby="'+id+'-help"'
    if (required == "on") output+=" required"
    output+='>\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateNumber(id,label,placeholder,required, description,showDescription, min, max){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="number" id="'+id+'" name="'+id+'" ';
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help"';
    if (required == "on") output+=" required"
    if(min != null && min.length>0) output+=' min="'+min+'"'
    if(max != null && max.length>0) output+=' max="'+max+'"'
    output+='>\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateTextarea(id,label,placeholder,required, description,showDescription,resize,lines,maxChars){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<textarea id="'+id+'" name="'+id+'" ';
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help" style="resize:'+resize+';"'
    if (required == "on") output+=" required"
    if(lines != null && lines.length>0) output+=' rows="'+lines+'"'
    if(maxChars!=null && maxChars.length>0) output+=' max-length="'+maxChars+'" aria-valuemax="'+maxChars+'" aria-valuenow="0"'
    output+='></textarea>\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateEmail(id,label,placeholder,required, description,showDescription, pattern){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="email" id="'+id+'" name="'+id+'" placeholder="'+placeholder+'" aria-describedby="'+id+'-help"'
    if (required == "on") output+=" required "
    if(pattern != null && pattern.length>0) output+=' pattern="'+pattern+'"'
    output+='>\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on")  output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generatePassword(id,label,placeholder,required, description,showDescription){
    var output = "";
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '<input type="password" id="'+id+'" name="'+id+'" ';
    if (required== "on") output+=" required "
    output += 'placeholder="'+placeholder+'" aria-describedby="'+id+'-help" data-visible="false">\n';
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on") output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}
function generateCheckbox(id,label,required, description,showDescription){
    var output = '<div class="inline-input">\n';
    output += '<input type="checkbox" id="'+id+'" name="'+id+'" aria-describedby="'+id+'-help""'
    if (required== "on") output+=" required "
    output+='>\n';
    output += '<label for="'+id+'">'+label+'</label>\n';
    output += '</div>\n'
    output += '<small id="'+id+'-help"';
    if (showDescription!== "on") output+=' class="sr-only" ';
    output += '>'+description+'</small>';
    return output;
}

function generateImage(image){
    debugger

    const fitxers = event.target.files;
      
      // Comprovem si hi ha algun fitxer seleccionat
      if (fitxers && fitxers[0]) {
        const fitxerImatge = fitxers[0];

        // Creem una URL temporal que apunta al fitxer local
        const objectURL = URL.createObjectURL(fitxerImatge);

        // Assignem aquesta URL al src de la imatge
        imatgePrevia.src = objectURL;
        imatgePrevia.style.display = 'block';
      }
    
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
