

$(document).ready(function(){
    $('#searchForm').submit(function(event){
        event.preventDefault();
        buscarSuperheroe();
    });

    function buscarSuperheroe() {
        let heroId = $("#heroId").val();
        consultarAPI(heroId);
    }

    function consultarAPI(heroId) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `https://www.superheroapi.com/api.php/3525635500807579/${heroId}`,
            success: function(response){
                mostrarInformacion(response);
                mostrarGrafico(response.powerstats);
            },
        });
    }

    function mostrarInformacion(heroInfo) {
        $('#heroInfo').html(`
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${heroInfo.image.url}" class="img-fluid rounded-start" alt="${heroInfo.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${heroInfo.name}</h5>
                            <p class="card-text">Nombre completo: ${heroInfo.biography['full-name']}</p>
                            <p class="card-text">Lugar de nacimiento: ${heroInfo.biography['place-of-birth']}</p>
                            <p class="card-text">Primera aparición: ${heroInfo.biography['first-appearance']}</p>
                            <p class="card-text">Editorial: ${heroInfo.biography['publisher']}</p>
                            <p class="card-text">Ocupación: ${heroInfo.work['occupation']}</p>
                            <p class="card-text">Grupo de afiliación: ${heroInfo.connections['group-affiliation']}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
    
    function mostrarGrafico(powerstats) {
        let dataPoints = [];
        for(let power in powerstats) {
            dataPoints.push({label: power, y: parseInt(powerstats[power])});
        }
        
        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Poderes del Superhéroe"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00'%'",
                indexLabel: "{label} {y}",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    }
});


