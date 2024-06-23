function verifdate() {
    var dateNaissance = document.getElementById('naissance').value;
    var dateActuelle = new Date();
    var dateSaisie = new Date(dateNaissance);
    if (dateSaisie >= dateActuelle) {
        alert("La date de naissance doit être dans le passé.");
    }
}
    
var tableauDeContacts = JSON.parse(localStorage.getItem('contacts')) || [];
construitTable(tableauDeContacts);

$('#formContacts form').submit(function(event) {
    event.preventDefault();

    var nom = $('#name').val();
    var prenom = $('#subname').val();
    var telephone = $('#phone').val();
    var email = $("#mail").val();
    var dateNaissance = $("#naissance").val();
    var nombreEnfants = $("#nbrEnfants").val();

    tableauDeContacts.push({
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        dateNaissance: dateNaissance,
        nombreEnfants: nombreEnfants
    });

    localStorage.setItem('contacts', JSON.stringify(tableauDeContacts));
    $(this)[0].reset();
    construitTable(tableauDeContacts);
});

function construitTable(tableauDeContacts) {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    tableauDeContacts.forEach(function(contact, index) {
        var ligne = `<tr>
                        <td><img src="document.png" class="drag-handle" data-index="${index}" draggable="true" ></td>
                        <td>${contact.nom}</td>
                        <td>${contact.prenom}</td>
                        <td>${contact.telephone}</td>
                        <td>${contact.email}</td>
                        <td>${contact.dateNaissance}</td>
                        <td>${contact.nombreEnfants}</td>
                        <td><img src="delete.jpg" class="supprimer" data-index="${index}" alt="Supprimer" onclick="SupprimeContact(${index})"></td>
                     </tr>`;
        $('#tableauDeContacts tbody').append(ligne);
    });
    $('#tableDeContacts tbody').on('click', '.supprimer', function() {
        var index = $(this).data('index');
        supprimerContact(index); 
    });
}
    
function SupprimeContact(index) {
    tableauDeContacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(tableauDeContacts));
    construitTable(tableauDeContacts);
};

construitTable(tableauDeContacts);

    $('#tableauDeContacts').on('dragstart', '.drag-handle', function(event) {
        var index = $(this).data('index');
        event.originalEvent.dataTransfer.setData('text/plain', index);
    });

    $('#poubelle').on('drop', function(event) {
        event.preventDefault();
        var index = event.originalEvent.dataTransfer.getData('text/plain');
        SupprimeContact(index);
        var dropSound = document.getElementById('dropSound');
        dropSound.play();
    });

    $('#poubelle').on('dragover', function(event) {
        event.preventDefault();
    });
