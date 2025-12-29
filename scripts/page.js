function applyChanges(event) {
    // Evita que el formulari enviï les dades i recarregui la pàgina
    event.preventDefault(); 
    
    alert("send");
    
    // Aquí podries recollir les dades, per exemple:
    const formData = new FormData(event.target);
    console.log(formData.get("id")); // Agafa el valor del select
}